"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 610,
        backgroundColor: '#fff',
        minWidth: 650,
        minHeight: 370,
        icon: "file://".concat(__dirname, "/dist/assets/logo.png")
    });
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
