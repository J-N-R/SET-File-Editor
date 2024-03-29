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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var WIKI_URL = 'https://github.com/J-N-R/SET-File-Editor/wiki';
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 900,
        height: 750,
        backgroundColor: '#fff',
        minWidth: 650,
        minHeight: 425,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.setTitle('Modern Set Editor');
    win.maximize();
    win.loadFile('compiled/set-editor/index.html');
    win.on('closed', function () {
        win = null;
    });
    win.webContents.setWindowOpenHandler(function (_a) {
        var url = _a.url;
        electron_1.shell.openExternal(url);
        return { action: 'deny' };
    });
}
var template = [
    {
        label: 'File',
        submenu: [
            {
                role: 'quit'
            },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'test'
            },
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                role: 'zoomIn',
                accelerator: 'CmdOrCtrl+='
            },
            {
                role: 'zoomOut'
            },
            {
                role: 'resetZoom'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            },
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            },
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, electron_1.shell.openExternal(WIKI_URL)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }
            },
        ]
    },
];
var menu = electron_1.Menu.buildFromTemplate(template);
electron_1.Menu.setApplicationMenu(menu);
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
    var _a, _b;
    var _c, _d, _e;
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
    for (var _i = 0, _f = setFile.setObjects; _i < _f.length; _i++) {
        var setObject = _f[_i];
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
            if (((_d = (_c = setObject.displayInfo) === null || _c === void 0 ? void 0 : _c.setLabel) === null || _d === void 0 ? void 0 : _d.y) == undefined) {
                _a = [setObject.z, '-' + setObject.y], setObject.y = _a[0], setObject.z = _a[1];
            }
            _b = [
                setObject.zRot,
                ((_e = setObject.yRot) === null || _e === void 0 ? void 0 : _e.includes('x')) ?
                    setObject.yRot :
                    (65536.0 - Number(setObject.yRot)).toString(),
            ], setObject.yRot = _b[0], setObject.zRot = _b[1];
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
