import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import * as fs from 'fs';
import { SetObject, SetFile, SetLabel } from './src/shared/interfaces';
import { SA2Object } from './src/shared/objects';
import { SA2_LEVELS } from './src/shared/sa2-levels';
import { SA2_LABELS } from './src/shared/object-labels';
import { convertToSetFile } from './src/shared/content';

let win: BrowserWindow|null;
const BAMS_TO_DEGREES = 360.0 / 65536.0;
const DEGREES_TO_BAMS = 65536.0 / 360.0;

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 750,
        backgroundColor: '#fff',
        minWidth: 650,
        minHeight: 425,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.setTitle('Modern Set Editor');
    win.maximize();
    win.loadFile('compiled/set-editor/index.html');

    win.on('closed', () => {
        win = null;
    });

    win.webContents.setWindowOpenHandler(({url}) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

/** Write helper used to convert saved float values (hex|number) to float. **/
function convertToDecimal(value: string|undefined): number {
    if (value?.includes('x')) {
        value = parseInt(value.split('x')[1], 16).toString();
    }
    if (isNaN(Number(value))) {
        value = '0';
    }
    return Number(value);
}

/** Write helper used to convert saved rotation values to BAMS. */
function convertToBams(value: string|undefined): number {
    if (value?.includes('x')) {
        value = parseInt(value.split('x')[1], 16).toString();
    }
    else {
        value = value ?
                Math.round((Number(value) * DEGREES_TO_BAMS)).toString() : '0';
    }
    if (isNaN(Number(value))) {
        value = '0';
    }
    return Number(value);
}

/** Read helper used to convert a rotation to either hex or degrees. */
function processRotation(value: number, label: SetLabel|null,
            property: keyof SetLabel): string {
    // If this rotation doesn't have a description or the description contains
    // 'degree' or 'rotate,' convert to degrees.
    // (Note: leading letter cut for case insensitivity)
    const propertyLabel = label ? label[property] : null;
    if (!propertyLabel || propertyLabel?.includes('egree') || propertyLabel?.includes('otate')) {
        return Math.round(value * BAMS_TO_DEGREES).toString();
    }
    // Otherwise, convert to hex, and ensure 4 digits.
    let hexValue = value.toString(16);
    while (hexValue.length < 4) {
        hexValue = '0' + hexValue;
    }
    return 'x' + hexValue;
}

/** Read helper used to convert a float to either hex or decimal. */
function processFloat(value: number, label: SetLabel|null,
            property: keyof SetLabel): string {
    // If this float has a description that says 'digit' or 'place,' keep the
    // value as a hex. Otherwise, convert to decimal with 3 places.
    const propertyLabel = label ? label[property] : null;
    if (propertyLabel?.includes('digit') || propertyLabel?.includes('place')) {
        let hexValue = value.toString(16);
        while (hexValue.length < 4) {
            hexValue = '0' + hexValue;
        }
        return 'x' + hexValue;
    }
    const decimalPoint = property?.includes('var') ? 3 : 1;
    return value.toFixed(decimalPoint).toString();
}

/** Helper used to write individual bytes to file. */
function writeDataView(fd: number, dataview: DataView) {
    fs.appendFileSync(fd, new Uint8Array(dataview.buffer));
}

/** Helper used to read individual bytes from a file. */
function readDataView(fd: number, size: number): DataView|null {
    const dataview = new DataView(new ArrayBuffer(size));
    const bytesRead = fs.readSync(fd, dataview, 0, size, null);
    if (bytesRead === 0) {
        return null;
    }
    return dataview;
}

/** Open a file dialog, and try to estimate stage info. */
ipcMain.handle('openFile', (event): SetFile|null => {
    const filePath = dialog.showOpenDialogSync({
        filters: [{name: 'SET File (*.bin)', extensions: ['bin']}],
        properties: ['openFile'],
    });

    if (!filePath) {
        console.warn('No file path given, cancelling open.');
        return null;
    }

    return convertToSetFile(filePath[0]);
});

/** Read an object list from a file. */
// If ReadStream doesnt work, use fileHandle.read
ipcMain.handle('readFile', (event, setFile: SetFile): SetObject[]|null => {
    if (!setFile.isSA2Format || !setFile.stage || !setFile.filePath ||
            !fs.existsSync(setFile.filePath) ||
            !SA2_LEVELS.has(setFile.stage)) {
        console.warn('Initial error from reading file. Is there missing ' +
            'information?');
        return null;
    }

    const enableLittleEndian = !setFile.isSA2Format;
    const fd = fs.openSync(setFile.filePath, 'r');

    // Skip reading 32 byte header.
    let dataview = readDataView(fd, 32)
    if (!dataview) {
        fs.closeSync(fd);
        return null;
    }

    // Create objects from file.
    let id = 0;
    const objectList: SetObject[] =[];
    const levelObjects = new Map(Array.from(SA2_LEVELS.get(setFile.stage!)!)
                            .map((type, index) => [index, type]));

    dataview = readDataView(fd, 2);
    while (dataview) {
        let object: SetObject = {
            id,
            type: SA2Object.DMYOBJ,
        }
        id++;

        // Read clip & object type id. If littleEndian, type id goes first.
        if (enableLittleEndian) {
            object.type = levelObjects.get(dataview.getUint8(0))
                            ?? SA2Object.DMYOBJ;
        }
        else {
            object.type = levelObjects.get(dataview.getUint8(1))
                            ?? SA2Object.DMYOBJ;
        }

        // Retrieve label to see if values need to be stored as hex or degrees.
        let label: SetLabel|null = null;
        let objectLabelMap = SA2_LABELS.get(object.type);
        if (objectLabelMap &&
            (objectLabelMap.has(-1) || objectLabelMap.has(setFile.stage))) {
            label = {
                ...objectLabelMap.get(-1),
                ...objectLabelMap.get(setFile.stage),
            };
        }

        // Read x, y, and z rotation, from BAMS and convert to degrees.
        dataview = readDataView(fd, 6);
        if (!dataview) {
            return null;
        }
        const xRot = processRotation(dataview.getUint16(0, enableLittleEndian), label, 'xRot');
        const yRot = processRotation(dataview.getUint16(2, enableLittleEndian), label, 'yRot');
        const zRot = processRotation(dataview.getUint16(4, enableLittleEndian), label, 'zRot');
        object = {
            ...object,
            ...(xRot !== '0' && {xRot}),
            ...(yRot !== '0' && {yRot}),
            ...(zRot !== '0' && {zRot}),
        }

        // Read x, y, z, var1, var2, var3 from 32bit float.
        dataview = readDataView(fd, 24);
        if (!dataview) {
            return null;
        }
        const x = processFloat(dataview.getFloat32(0, enableLittleEndian), null, 'y');
        const y = processFloat(dataview.getFloat32(4, enableLittleEndian), label, 'y');
        const z = processFloat(dataview.getFloat32(8, enableLittleEndian), null, 'y');
        const var1 = processFloat(dataview.getFloat32(12, enableLittleEndian), label, 'var1');
        const var2 = processFloat(dataview.getFloat32(16, enableLittleEndian), label, 'var2');
        const var3 = processFloat(dataview.getFloat32(20, enableLittleEndian), label, 'var3');
        object = {
            ...object,
            ...(x !== '0' && {x}),
            ...(y !== '0' && {y}),
            ...(z !== '0' && {z}),
            ...(var1 !== '0' && {var1}),
            ...(var2 !== '0' && {var2}),
            ...(var3 !== '0' && {var3}),
        }
        objectList.push(object);
        dataview = readDataView(fd, 2);
    }

    fs.closeSync(fd);
    return objectList;
});

/**
 * Saves binary file from given file information and object list.
 * TODO: Update this to use WriteStream. Should be pretty easy,
 * just update the writeFileSync. Don't forget to set flag 'a'
 * (append).
*/
ipcMain.handle('saveFile', (event, setFile: SetFile): boolean => {
    let filePath = dialog.showSaveDialogSync({
        defaultPath: setFile.fileName + '.bin',
        filters: [{name: 'SET File (*.bin)', extensions: ['bin']}],
        properties: ['showOverwriteConfirmation', 'createDirectory'],
    });

    if (!filePath) {
        console.warn('No file path given, cancelling save.');
        return false;
    }
    if (!setFile.stage || !SA2_LEVELS.has(setFile.stage)) {
        console.error('Can\'t save! Stage: "' + setFile.stage + '" not found.');
        return false;
    }

    filePath = filePath.replace(/\.bin/gi, '') + '.bin';
    const levelObjects = Array.from(SA2_LEVELS.get(setFile.stage)!);
    const enableLittleEndian = !setFile.isSA2Format;
    const fd = fs.openSync(filePath, 'w');

    // Write 32 byte header to file.
    let dataview = new DataView(new ArrayBuffer(4));
    dataview.setUint32(0, setFile.setObjects.length, enableLittleEndian);
    writeDataView(fd, dataview);

    // Single write instead of append to overwrite file.
    // fs.writeFileSync(filePath, new Uint8Array(dataview.buffer));

    dataview = new DataView(new ArrayBuffer(28));
    writeDataView(fd, dataview);

    // Write objects to file. Account for endian differences.
    for (const setObject of setFile.setObjects) {
        // Write clip & id. If littleEndian, id goes first.
        dataview = new DataView(new ArrayBuffer(2));
        if (enableLittleEndian) {
            dataview.setUint8(0, levelObjects.indexOf(setObject.type));
        }
        else {
            dataview.setUint8(1, levelObjects.indexOf(setObject.type));
        }
        writeDataView(fd, dataview);

        /**
         * If coordinate style is blender, swap y and z. (But only if they
         * don't have an meaning via set labels)
         **/
        if (setFile.coordinateStyle === 'blender') {
            if (setObject.displayInfo?.setLabel?.y == undefined) {
                [setObject.y, setObject.z] = [setObject.z, '-' + setObject.y];
            }
            [setObject.yRot, setObject.zRot] = [
                setObject.zRot,
                setObject.yRot?.includes('x') ? 
                        setObject.yRot :
                        (65536.0 - Number(setObject.yRot)).toString(),
            ];
        }

        // Write x, y, and z rotation, in BAMS 2 byte short.
        dataview = new DataView(new ArrayBuffer(6));
        dataview.setUint16(0, convertToBams(setObject.xRot), enableLittleEndian);
        dataview.setUint16(2, convertToBams(setObject.yRot), enableLittleEndian);
        dataview.setUint16(4, convertToBams(setObject.zRot), enableLittleEndian);
        writeDataView(fd, dataview);

        // Write x, y, z, var1, var2, var3 in 32bit float.
        dataview = new DataView(new ArrayBuffer(24));
        dataview.setFloat32(0, convertToDecimal(setObject.x), enableLittleEndian);
        dataview.setFloat32(4, convertToDecimal(setObject.y), enableLittleEndian);
        dataview.setFloat32(8, convertToDecimal(setObject.z), enableLittleEndian);
        dataview.setFloat32(12, convertToDecimal(setObject.var1), enableLittleEndian);
        dataview.setFloat32(16, convertToDecimal(setObject.var2), enableLittleEndian);
        dataview.setFloat32(20, convertToDecimal(setObject.var3), enableLittleEndian);
        writeDataView(fd, dataview);
    }

    fs.closeSync(fd);
    return true;
});



// Legal jargon.
/*************************************************************************
 * Copyright 2023 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 * 
 *  https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *************************************************************************/
