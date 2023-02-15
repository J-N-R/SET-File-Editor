"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var electron_1 = require("electron");
var fs = require("fs");
var objects_1 = require("./src/shared/objects");
var sa2_levels_1 = require("./src/shared/sa2-levels");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 750,
        backgroundColor: '#fff',
        minWidth: 650,
        minHeight: 370,
        icon: "file://".concat(__dirname, "/dist/assets/logo.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.maximize();
    win.loadURL("file://".concat(__dirname, "/dist/set-editor/index.html"));
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
/** Helper used to write individual bytes to file. */
function writeDataView(filePath, dataview) {
    fs.appendFileSync(filePath, new Uint8Array(dataview.buffer));
}
function readDataView(fd, size) {
    var dataview = new DataView(new ArrayBuffer(size));
    var bytesRead = fs.readSync(fd, dataview, 0, size, null);
    if (bytesRead === 0) {
        return null;
    }
    return dataview;
}
/** Open a file dialog, and try to estimate stage info. */
electron_1.ipcMain.handle('openFile', function (event) {
    var _a, _b, _c;
    var filePath = electron_1.dialog.showOpenDialogSync({
        filters: [{ name: 'SET File (*.bin)', extensions: ['bin'] }],
        properties: ['openFile']
    });
    if (!filePath) {
        console.warn('No file path given, cancelling open.');
        return null;
    }
    var fileName = (_a = filePath[0].split('\\').pop()) !== null && _a !== void 0 ? _a : '';
    var stage = Number((_c = (_b = fileName === null || fileName === void 0 ? void 0 : fileName.match(/\d/g)) === null || _b === void 0 ? void 0 : _b.join('')) !== null && _c !== void 0 ? _c : 0);
    var isSA2Format = fileName.includes('_');
    return __assign(__assign({ fileName: fileName }, (stage !== 0 && { stage: stage })), { isSA2Format: isSA2Format, setObjects: [], filePath: filePath[0] });
});
/** Read an object list from a file. */
// If ReadStream doesnt work, use fileHandle.read
electron_1.ipcMain.handle('readFile', function (event, setFile) {
    var _a, _b;
    if (!setFile.isSA2Format || !setFile.stage || !setFile.filePath ||
        !fs.existsSync(setFile.filePath) ||
        !sa2_levels_1.SA2_LEVELS.has(setFile.stage)) {
        console.warn('Initial error from reading file. Is there missing ' +
            'information?');
        return null;
    }
    var enableLittleEndian = !setFile.isSA2Format;
    var fd = fs.openSync(setFile.filePath, 'r');
    // Skip reading 32 byte header.
    var dataview = readDataView(fd, 32);
    if (!dataview) {
        fs.closeSync(fd);
        return null;
    }
    // Create objects from file.
    var id = 0;
    var BamsToDegrees = 360.0 / 65536.0;
    var objectList = [];
    var levelObjects = new Map(Array.from(sa2_levels_1.SA2_LEVELS.get(setFile.stage))
        .map(function (type, index) { return [index, type]; }));
    dataview = readDataView(fd, 2);
    while (dataview) {
        var object = {
            id: id,
            type: objects_1.SA2Object.DMYOBJ
        };
        // Read clip & object type id. If littleEndian, type id goes first.
        if (enableLittleEndian) {
            object.type = (_a = levelObjects.get(dataview.getUint8(0))) !== null && _a !== void 0 ? _a : objects_1.SA2Object.DMYOBJ;
        }
        else {
            object.type = (_b = levelObjects.get(dataview.getUint8(1))) !== null && _b !== void 0 ? _b : objects_1.SA2Object.DMYOBJ;
        }
        // Read x, y, and z rotation, from BAMS and convert to degrees.
        dataview = readDataView(fd, 6);
        if (!dataview) {
            return null;
        }
        var xRot = dataview.getUint16(0, enableLittleEndian) * BamsToDegrees;
        var yRot = dataview.getUint16(2, enableLittleEndian) * BamsToDegrees;
        var zRot = dataview.getUint16(4, enableLittleEndian) * BamsToDegrees;
        object = __assign(__assign(__assign(__assign({}, object), (xRot !== 0 && { xRot: xRot })), (yRot !== 0 && { xRot: xRot })), (zRot !== 0 && { xRot: xRot }));
        // Read x, y, z, var1, var2, var3 from 32bit float.
        dataview = readDataView(fd, 24);
        if (!dataview) {
            return null;
        }
        var x = dataview.getFloat32(0, enableLittleEndian);
        var y = dataview.getFloat32(4, enableLittleEndian);
        var z = dataview.getFloat32(8, enableLittleEndian);
        var var1 = dataview.getFloat32(12, enableLittleEndian);
        var var2 = dataview.getFloat32(16, enableLittleEndian);
        var var3 = dataview.getFloat32(20, enableLittleEndian);
        object = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, object), (x !== 0 && { x: x })), (y !== 0 && { y: y })), (z !== 0 && { z: z })), (var1 !== 0 && { var1: var1 })), (var2 !== 0 && { var2: var2 })), (var3 !== 0 && { var3: var3 }));
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
electron_1.ipcMain.handle('saveFile', function (event, setFile) {
    var _a, _b, _c, _d, _e, _f;
    var filePath = electron_1.dialog.showSaveDialogSync({
        defaultPath: setFile.fileName + '.bin',
        filters: [{ name: 'SET File (*.bin)', extensions: ['bin'] }],
        properties: ['showOverwriteConfirmation', 'createDirectory']
    });
    if (!filePath) {
        console.warn('No file path given, cancelling save.');
        return false;
    }
    if (!setFile.stage || !sa2_levels_1.SA2_LEVELS.has(setFile.stage)) {
        console.error('Can\'t save! Stage: "' + setFile.stage + '" not found.');
        return false;
    }
    filePath = filePath.replace(/\.bin/gi, '') + '.bin';
    var levelObjects = Array.from(sa2_levels_1.SA2_LEVELS.get(setFile.stage));
    var enableLittleEndian = !setFile.isSA2Format;
    var degreesToBams = 65536.0 / 360.0;
    // Write 32 byte header to file.
    var dataview = new DataView(new ArrayBuffer(4));
    dataview.setUint32(0, setFile.setObjects.length, enableLittleEndian);
    // This overwrites the file if it already exists.
    fs.writeFileSync(filePath, new Uint8Array(dataview.buffer));
    dataview = new DataView(new ArrayBuffer(28));
    writeDataView(filePath, dataview);
    // Write objects to file. Account for endian differences.
    for (var _i = 0, _g = setFile.setObjects; _i < _g.length; _i++) {
        var setObject = _g[_i];
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
        dataview.setFloat32(0, (_a = setObject.x) !== null && _a !== void 0 ? _a : 0, enableLittleEndian);
        dataview.setFloat32(4, (_b = setObject.y) !== null && _b !== void 0 ? _b : 0, enableLittleEndian);
        dataview.setFloat32(8, (_c = setObject.z) !== null && _c !== void 0 ? _c : 0, enableLittleEndian);
        dataview.setFloat32(12, (_d = setObject.var1) !== null && _d !== void 0 ? _d : 0, enableLittleEndian);
        dataview.setFloat32(16, (_e = setObject.var2) !== null && _e !== void 0 ? _e : 0, enableLittleEndian);
        dataview.setFloat32(20, (_f = setObject.var3) !== null && _f !== void 0 ? _f : 0, enableLittleEndian);
        writeDataView(filePath, dataview);
    }
    return true;
});
