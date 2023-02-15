import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as fs from 'fs';
import { SetObject, SetFile } from './src/shared/interfaces';
import { SA2Object } from './src/shared/objects';
import { SA2_LEVELS } from './src/shared/sa2-levels';

let win: BrowserWindow|null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 750,
        backgroundColor: '#fff',
        minWidth: 650,
        minHeight: 370,
        icon: `file://${__dirname}/dist/assets/logo.png`,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.maximize();

    win.loadURL(`file://${__dirname}/dist/set-editor/index.html`);

    win.on('closed', function() {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (win === null) {
        createWindow();
    }
});

/** Helper used to write individual bytes to file. */
function writeDataView(filePath: string, dataview: DataView) {
    fs.appendFileSync(filePath, new Uint8Array(dataview.buffer));
}

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

    const fileName = filePath[0].split('\\').pop() ?? '';
    const stage = Number(fileName?.match(/\d/g)?.join('') ?? 0);
    const isSA2Format = fileName.includes('_');

    return {
        fileName,
        ...(stage !== 0 && {stage}),
        isSA2Format,
        setObjects: [],
        filePath: filePath[0],
    };
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
    const BamsToDegrees = 360.0 / 65536.0;
    const objectList: SetObject[] =[];
    const levelObjects = new Map(Array.from(SA2_LEVELS.get(setFile.stage!)!)
                            .map((type, index) => [index, type]));

    dataview = readDataView(fd, 2);
    while (dataview) {
        let object: SetObject = {
            id,
            type: SA2Object.DMYOBJ,
        }

        // Read clip & object type id. If littleEndian, type id goes first.
        if (enableLittleEndian) {
            object.type = levelObjects.get(dataview.getUint8(0))
                            ?? SA2Object.DMYOBJ;
        }
        else {
            object.type = levelObjects.get(dataview.getUint8(1))
                            ?? SA2Object.DMYOBJ;
        }

        // Read x, y, and z rotation, from BAMS and convert to degrees.
        dataview = readDataView(fd, 6);
        if (!dataview) {
            return null;
        }
        const xRot = dataview.getUint16(0, enableLittleEndian) * BamsToDegrees;
        const yRot = dataview.getUint16(2, enableLittleEndian) * BamsToDegrees;
        const zRot = dataview.getUint16(4, enableLittleEndian) * BamsToDegrees;
        object = {
            ...object,
            ...(xRot !== 0 && {xRot}),
            ...(yRot !== 0 && {xRot}),
            ...(zRot !== 0 && {xRot}),
        }

        // Read x, y, z, var1, var2, var3 from 32bit float.
        dataview = readDataView(fd, 24);
        if (!dataview) {
            return null;
        }
        const x = dataview.getFloat32(0, enableLittleEndian);
        const y = dataview.getFloat32(4, enableLittleEndian);
        const z = dataview.getFloat32(8, enableLittleEndian);
        const var1 = dataview.getFloat32(12, enableLittleEndian);
        const var2 = dataview.getFloat32(16, enableLittleEndian);
        const var3 = dataview.getFloat32(20, enableLittleEndian);
        object = {
            ...object,
            ...(x !== 0 && {x}),
            ...(y !== 0 && {y}),
            ...(z !== 0 && {z}),
            ...(var1 !== 0 && {var1}),
            ...(var2 !== 0 && {var2}),
            ...(var3 !== 0 && {var3}),
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
    const degreesToBams = 65536.0 / 360.0;

    // Write 32 byte header to file.
    let dataview = new DataView(new ArrayBuffer(4));
    dataview.setUint32(0, setFile.setObjects.length, enableLittleEndian);

    // This overwrites the file if it already exists.
    fs.writeFileSync(filePath, new Uint8Array(dataview.buffer));

    dataview = new DataView(new ArrayBuffer(28));
    writeDataView(filePath, dataview);

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
        writeDataView(filePath, dataview);

        // Write x, y, and z rotation, in BAMS 2 byte short.
        dataview = new DataView(new ArrayBuffer(6));
        dataview.setUint16(0, setObject.xRot ? setObject.xRot * degreesToBams : 0, enableLittleEndian);
        dataview.setUint16(2, setObject.yRot ? setObject.yRot * degreesToBams : 0, enableLittleEndian);
        dataview.setUint16(4, setObject.zRot ? setObject.zRot * degreesToBams : 0, enableLittleEndian);
        writeDataView(filePath, dataview);

        // Write x, y, z, var1, var2, var3 in 32bit float.
        dataview = new DataView(new ArrayBuffer(24));
        dataview.setFloat32(0, setObject.x ?? 0, enableLittleEndian);
        dataview.setFloat32(4, setObject.y ?? 0, enableLittleEndian);
        dataview.setFloat32(8, setObject.z ?? 0, enableLittleEndian);
        dataview.setFloat32(12, setObject.var1 ?? 0, enableLittleEndian);
        dataview.setFloat32(16, setObject.var2 ?? 0, enableLittleEndian);
        dataview.setFloat32(20, setObject.var3 ?? 0, enableLittleEndian);
        writeDataView(filePath, dataview);
    }

    return true;
});
