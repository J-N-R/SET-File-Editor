"use strict";
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
function writeDataView(filePath, dataview) {
    console.log(new Uint8Array(dataview.buffer));
    fs.appendFileSync(filePath, new Uint8Array(dataview.buffer));
}
electron_1.ipcMain.handle('openFile', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        electron_1.dialog.showOpenDialog({
            filters: [{ name: 'SET File (*.bin)', extensions: ['bin'] }],
            properties: ['openFile']
        });
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.handle('saveFile', function (event, setFile) {
    var _a, _b, _c, _d, _e, _f;
    var filePath = electron_1.dialog.showSaveDialogSync({
        defaultPath: setFile.fileName + '.bin',
        filters: [{ name: 'SET File (*.bin)', extensions: ['bin'] }],
        properties: ['showOverwriteConfirmation', 'createDirectory']
    });
    if (!filePath) {
        console.log('No file path given, cancelling save.');
        return;
    }
    if (!sa2_levels_1.SA2_LEVELS.has(setFile.stage)) {
        console.error('Can\'t save! Stage: "' + setFile.stage + '" not found.');
        return;
    }
    filePath = filePath.replace(/\.bin/gi, '') + '.bin';
    var levelObjects = Array.from(sa2_levels_1.SA2_LEVELS.get(setFile.stage));
    var enableLittleEndian = !setFile.isSA2Format;
    var degreesToBams = 65536.0 / 360.0;
    // Write 32 byte header to file.
    var dataview = new DataView(new ArrayBuffer(4));
    dataview.setUint32(0, setFile.setObjects.length, enableLittleEndian);
    console.log(new Uint8Array(dataview.buffer));
    // Overwrite if file already exists.
    fs.writeFileSync(filePath, new Uint8Array(dataview.buffer));
    dataview = new DataView(new ArrayBuffer(28));
    writeDataView(filePath, dataview);
    // Write objects to file. Account for endian differences.
    for (var _i = 0, _g = setFile.setObjects; _i < _g.length; _i++) {
        var setObject = _g[_i];
        // Write clip & id. If littleEndian, id goes first.
        dataview = new DataView(new ArrayBuffer(2));
        if (enableLittleEndian) {
            dataview.setUint8(0, levelObjects.indexOf(setObject.object));
        }
        else {
            dataview.setUint8(1, levelObjects.indexOf(setObject.object));
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
        dataview.setFloat32(0, (_a = setObject.x) !== null && _a !== void 0 ? _a : 0);
        dataview.setFloat32(4, (_b = setObject.y) !== null && _b !== void 0 ? _b : 0);
        dataview.setFloat32(8, (_c = setObject.z) !== null && _c !== void 0 ? _c : 0);
        dataview.setFloat32(12, (_d = setObject.var1) !== null && _d !== void 0 ? _d : 0);
        dataview.setFloat32(16, (_e = setObject.var2) !== null && _e !== void 0 ? _e : 0);
        dataview.setFloat32(20, (_f = setObject.var3) !== null && _f !== void 0 ? _f : 0);
        writeDataView(filePath, dataview);
    }
});
