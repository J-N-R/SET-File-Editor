import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as fs from 'fs';
import { SetObject, SetFile } from './src/shared/interfaces';
import { SA2Object } from './src/shared/content';

let win: BrowserWindow|null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 610,
        backgroundColor: '#fff',
        minWidth: 650,
        minHeight: 370,
        icon: `file://${__dirname}/dist/assets/logo.png`,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

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
    fs.appendFile(filePath, new Uint8Array(dataview.buffer), (error) => {
        if (error) {
            console.log("Error writing to file");
            console.log(error);
        }
    });
}

ipcMain.handle('openFile', async (event) => {
    dialog.showOpenDialog({
        filters: [{name: 'SET File (*.bin)', extensions: ['bin']}],
        properties: ['openFile'],
    });
    /*
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, `${fileName}.json`);
  
    fs.writeFileSync(this.path, '', { flag: 'a' });
  
    const data = fs.readFileSync(this.path);
  
    return data.length > 0? JSON.parse(data) : null;
    */
});

ipcMain.handle('saveFile', async (event, setFile: SetFile) => {
    const response = await dialog.showSaveDialog({
        defaultPath: setFile.fileName + '.bin',
        filters: [{name: 'SET File (*.bin)', extensions: ['bin']}],
        properties: ['showOverwriteConfirmation', 'createDirectory'],
    });

    if (response.canceled || !response.filePath) {
        return;
    }

    const filePath = response.filePath.replace(/\.bin/gi, '') + '.bin';
    const enableLittleEndian = !setFile.isSA2Format;
    const allObjects = Object.values(SA2Object);
    const degreesToBams = 65536.0 / 360.0;

    // Write 32 byte header to file.
    let dataview = new DataView(new ArrayBuffer(4));
    dataview.setUint32(0, setFile.setObjects.length, enableLittleEndian);
    console.log(new Uint8Array(dataview.buffer));
    // Overwrite if file already exists.
    fs.writeFile(filePath, new Uint8Array(dataview.buffer), (error) => {
        if (error) {
            console.log("Error writing to file.");
            console.log(error);
        }
    });

    dataview = new DataView(new ArrayBuffer(28));
    writeDataView(filePath, dataview);

    // Write objects to file. Account for endian differences.
    for (const setObject of setFile.setObjects) {
        // Write clip & id. If littleEndian, id goes first.
        dataview = new DataView(new ArrayBuffer(2));
        console.log(allObjects.indexOf(setObject.object));
        if (enableLittleEndian) {
            dataview.setUint8(0, allObjects.indexOf(setObject.object));
        }
        else {
            dataview.setUint8(1, allObjects.indexOf(setObject.object));
        }
        writeDataView(filePath, dataview);

        // Write x, y, and z rotation, in BAMS 2 byte short.
        console.log(setObject.xRot! * degreesToBams);
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
