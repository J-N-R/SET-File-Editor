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
var object_labels_1 = require("./src/shared/object-labels");
var content_1 = require("./src/shared/content");
var win;
var BAMS_TO_DEGREES = 360.0 / 65536.0;
var DEGREES_TO_BAMS = 65536.0 / 360.0;
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
    // win.setMenu(null);
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
/** Write helper used to convert saved float values (hex|number) to float. **/
function convertToDecimal(value) {
    if (value === null || value === void 0 ? void 0 : value.includes('x')) {
        value = parseInt(value.split('x')[1], 16).toString();
    }
    if (isNaN(Number(value))) {
        value = '0';
    }
    return Number(value);
}
/** Write helper used to convert saved rotation values to BAMS. */
function convertToBams(value) {
    if (value === null || value === void 0 ? void 0 : value.includes('x')) {
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
function processRotation(value, label, property) {
    // If this rotation doesn't have a description or the description contains
    // 'degree' or 'rotate,' convert to degrees.
    // (Note: leading letter cut for case insensitivity)
    var propertyLabel = label ? label[property] : null;
    if (!propertyLabel || (propertyLabel === null || propertyLabel === void 0 ? void 0 : propertyLabel.includes('egree')) || (propertyLabel === null || propertyLabel === void 0 ? void 0 : propertyLabel.includes('otate'))) {
        return Math.round(value * BAMS_TO_DEGREES).toString();
    }
    // Otherwise, convert to hex, and ensure 4 digits.
    var hexValue = value.toString(16);
    while (hexValue.length < 4) {
        hexValue = '0' + hexValue;
    }
    return 'x' + hexValue;
}
/** Read helper used to convert a float to either hex or decimal. */
function processFloat(value, label, property) {
    // If this float has a description that says 'digit' or 'place,' keep the
    // value as a hex. Otherwise, convert to decimal with 3 places.
    var propertyLabel = label ? label[property] : null;
    if ((propertyLabel === null || propertyLabel === void 0 ? void 0 : propertyLabel.includes('digit')) || (propertyLabel === null || propertyLabel === void 0 ? void 0 : propertyLabel.includes('place'))) {
        var hexValue = value.toString(16);
        while (hexValue.length < 4) {
            hexValue = '0' + hexValue;
        }
        return 'x' + hexValue;
    }
    var decimalPoint = (property === null || property === void 0 ? void 0 : property.includes('var')) ? 3 : 1;
    return value.toFixed(decimalPoint).toString();
}
/** Helper used to write individual bytes to file. */
function writeDataView(fd, dataview) {
    fs.appendFileSync(fd, new Uint8Array(dataview.buffer));
}
/** Helper used to read individual bytes from a file. */
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
    var filePath = electron_1.dialog.showOpenDialogSync({
        filters: [{ name: 'SET File (*.bin)', extensions: ['bin'] }],
        properties: ['openFile']
    });
    if (!filePath) {
        console.warn('No file path given, cancelling open.');
        return null;
    }
    return (0, content_1.convertToSetFile)(filePath[0]);
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
    var objectList = [];
    var levelObjects = new Map(Array.from(sa2_levels_1.SA2_LEVELS.get(setFile.stage))
        .map(function (type, index) { return [index, type]; }));
    dataview = readDataView(fd, 2);
    while (dataview) {
        var object = {
            id: id,
            type: objects_1.SA2Object.DMYOBJ
        };
        id++;
        // Read clip & object type id. If littleEndian, type id goes first.
        if (enableLittleEndian) {
            object.type = (_a = levelObjects.get(dataview.getUint8(0))) !== null && _a !== void 0 ? _a : objects_1.SA2Object.DMYOBJ;
        }
        else {
            object.type = (_b = levelObjects.get(dataview.getUint8(1))) !== null && _b !== void 0 ? _b : objects_1.SA2Object.DMYOBJ;
        }
        // Retrieve label to see if values need to be stored as hex or degrees.
        var label = null;
        var objectLabelMap = object_labels_1.SA2_LABELS.get(object.type);
        if (objectLabelMap &&
            (objectLabelMap.has(-1) || objectLabelMap.has(setFile.stage))) {
            label = __assign(__assign({}, objectLabelMap.get(-1)), objectLabelMap.get(setFile.stage));
        }
        // Read x, y, and z rotation, from BAMS and convert to degrees.
        dataview = readDataView(fd, 6);
        if (!dataview) {
            return null;
        }
        var xRot = processRotation(dataview.getUint16(0, enableLittleEndian), label, 'xRot');
        var yRot = processRotation(dataview.getUint16(2, enableLittleEndian), label, 'yRot');
        var zRot = processRotation(dataview.getUint16(4, enableLittleEndian), label, 'zRot');
        object = __assign(__assign(__assign(__assign({}, object), (xRot !== '0' && { xRot: xRot })), (yRot !== '0' && { yRot: yRot })), (zRot !== '0' && { zRot: zRot }));
        // Read x, y, z, var1, var2, var3 from 32bit float.
        dataview = readDataView(fd, 24);
        if (!dataview) {
            return null;
        }
        var x = processFloat(dataview.getFloat32(0, enableLittleEndian), null, 'y');
        var y = processFloat(dataview.getFloat32(4, enableLittleEndian), label, 'y');
        var z = processFloat(dataview.getFloat32(8, enableLittleEndian), null, 'y');
        var var1 = processFloat(dataview.getFloat32(12, enableLittleEndian), label, 'var1');
        var var2 = processFloat(dataview.getFloat32(16, enableLittleEndian), label, 'var2');
        var var3 = processFloat(dataview.getFloat32(20, enableLittleEndian), label, 'var3');
        object = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, object), (x !== '0' && { x: x })), (y !== '0' && { y: y })), (z !== '0' && { z: z })), (var1 !== '0' && { var1: var1 })), (var2 !== '0' && { var2: var2 })), (var3 !== '0' && { var3: var3 }));
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
    var _a;
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
    var fd = fs.openSync(filePath, 'w');
    // Write 32 byte header to file.
    var dataview = new DataView(new ArrayBuffer(4));
    dataview.setUint32(0, setFile.setObjects.length, enableLittleEndian);
    writeDataView(fd, dataview);
    // Single write instead of append to overwrite file.
    // fs.writeFileSync(filePath, new Uint8Array(dataview.buffer));
    dataview = new DataView(new ArrayBuffer(28));
    writeDataView(fd, dataview);
    // Write objects to file. Account for endian differences.
    for (var _i = 0, _b = setFile.setObjects; _i < _b.length; _i++) {
        var setObject = _b[_i];
        // Write clip & id. If littleEndian, id goes first.
        dataview = new DataView(new ArrayBuffer(2));
        if (enableLittleEndian) {
            dataview.setUint8(0, levelObjects.indexOf(setObject.type));
        }
        else {
            dataview.setUint8(1, levelObjects.indexOf(setObject.type));
        }
        writeDataView(fd, dataview);
        // If coordinate style is blender, swap y and z.
        if (setFile.coordinateStyle === 'blender') {
            var temp = setObject.y;
            setObject.y = -((_a = setObject.z) !== null && _a !== void 0 ? _a : 0) + '';
            setObject.z = temp;
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
