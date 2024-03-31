const { app, BrowserWindow, ipcMain, globalShortcut, Tray, Menu, screen } = require("electron");
const { exec } = require("child_process");
const path = require("path");
const DEVELOPMENT = !app.isPackaged;

let root = null;

function loadApp() {
    const icon = path.join(__dirname, "logo.png");
    const tray = new Tray(icon);
    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                id: 1,
                type: "normal",
                label: "退出",
                click: () => {
                    app.exit();
                }
            },
            { id: 2, type: "normal", label: "关于" },
            { id: 3, type: "normal", label: "配置" }
        ])
    );
    globalShortcut.register("Meta+R", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
    globalShortcut.register("Esc", () => {
        if (BrowserWindow.getAllWindows().length != 0) {
            closeWindow();
        }
    });
}

function createWindow() {
    const { height } = screen.getPrimaryDisplay().workAreaSize;
    root = new BrowserWindow({
        width: 400,
        height: 200,
        resizable: DEVELOPMENT || false,
        maximizable: DEVELOPMENT || false,
        minimizable: DEVELOPMENT || false,
        y: height - 230,
        x: 30,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js")
        },
        title: "运行",
        icon: path.join(__dirname, "./logo.png")
    });
    if (DEVELOPMENT) {
        root.loadURL("http://localhost:3000/");
    } else {
        root.removeMenu();
        root.loadFile(path.join(__dirname, "../../app.asar/build/index.html"));
    }
    root.show();
}

function closeWindow() {
    root.close();
}

app.on("ready", () => {
    loadApp();
});

app.on("before-quit", (event) => {
    event.preventDefault();
});

ipcMain.on("execute", (_, data) => {
    exec(`nohup ${data} > /dev/null 2>&1 &`);
    closeWindow();
});

ipcMain.on("close", (_, data) => {
    if (data === true) {
        closeWindow();
    }
});
