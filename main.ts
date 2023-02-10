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

function writeDataView(filePath: string, dataview: DataView) {
    console.log(new Uint8Array(dataview.buffer));
    fs.appendFileSync(filePath, new Uint8Array(dataview.buffer));
}

ipcMain.handle('openFile', (event) => {
    dialog.showOpenDialogSync({
        filters: [{name: 'SET File (*.bin)', extensions: ['bin']}],
        properties: ['openFile'],
    });
});

ipcMain.handle('saveFile', (event, setFile: SetFile) => {
    let filePath = dialog.showSaveDialogSync({
        defaultPath: setFile.fileName + '.bin',
        filters: [{name: 'SET File (*.bin)', extensions: ['bin']}],
        properties: ['showOverwriteConfirmation', 'createDirectory'],
    });

    if (!filePath) {
        console.log('No file path given, cancelling save.');
        return;
    }
    if (!SA2_LEVELS.has(setFile.stage)) {
        console.error('Can\'t save! Stage: "' + setFile.stage + '" not found.');
        return;
    }

    filePath = filePath.replace(/\.bin/gi, '') + '.bin';
    const levelObjects = Array.from(SA2_LEVELS.get(setFile.stage)!);
    const enableLittleEndian = !setFile.isSA2Format;
    const degreesToBams = 65536.0 / 360.0;

    // Write 32 byte header to file.
    let dataview = new DataView(new ArrayBuffer(4));
    dataview.setUint32(0, setFile.setObjects.length, enableLittleEndian);
    console.log(new Uint8Array(dataview.buffer));
    // Overwrite if file already exists.
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
        dataview.setUint16(0, setObject.xRot ? setObject.xRot * degreesToBams : 0);
        dataview.setUint16(2, setObject.yRot ? setObject.yRot * degreesToBams : 0);
        dataview.setUint16(4, setObject.zRot ? setObject.zRot * degreesToBams : 0);
        writeDataView(filePath, dataview);

        // Write x, y, z, var1, var2, var3 in 32bit float.
        dataview = new DataView(new ArrayBuffer(24));
        dataview.setFloat32(0, setObject.x ?? 0);
        dataview.setFloat32(4, setObject.y ?? 0);
        dataview.setFloat32(8, setObject.z ?? 0);
        dataview.setFloat32(12, setObject.var1 ?? 0);
        dataview.setFloat32(16, setObject.var2 ?? 0);
        dataview.setFloat32(20, setObject.var3 ?? 0);
        writeDataView(filePath, dataview);
    }
});
