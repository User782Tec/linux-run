const { app, BrowserWindow, ipcMain, globalShortcut, dialog, Tray, Menu, screen } = require("electron");
const { exec } = require("child_process");
const path = require("path");
const os = require("os");
const { getHistory, setHistory, checkCommand } = require("./utils");

const DEVELOPMENT = !app.isPackaged;
const lock = app.requestSingleInstanceLock();
if (!lock) {
    app.exit();
}

let root;
function loadApp() {
    const icon = path.join(__dirname, "logo.png");
    const menu = Menu.buildFromTemplate([
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
    ]);
    const tray = new Tray(icon);
    tray.setContextMenu(menu);
    globalShortcut.register("Meta+R", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
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
    if (BrowserWindow.getAllWindows().length != 0) {
        globalShortcut.register("Esc", () => {
            if (BrowserWindow.getAllWindows().length != 0) {
                closeWindow();
            }
        });
    }
}

function closeWindow() {
    root.close();
    globalShortcut.unregister("Esc");
}

app.on("ready", () => {
    if (lock) {
        loadApp();
    }
});

app.on("before-quit", (event) => {
    event.preventDefault();
});

ipcMain.on("execute", (_, data) => {
    const history = getHistory();
    if (data.command != getHistory().pop() && data.command != "") {
        history.push(data.command);
        setHistory(history);
    }
    const checkResult = checkCommand(data.command);
    console.log(checkResult);
    if (data.root === true) {
        exec(`/usr/bin/pkexec env DISPLAY=:0 XAUTHORITY=${path.join(os.homedir(), ".Xauthority")} nohup ${checkResult ? "" : "xdg-open "}${data.command} > /dev/null 2>&1 &`);
    } else if (data.root === false) {
        exec(`nohup ${checkResult ? "" : "xdg-open "}${data.command} > /dev/null 2>&1 &`);
    }
    closeWindow();
});

ipcMain.on("close", (_, data) => {
    if (data === true) {
        closeWindow();
    }
});

ipcMain.handle("open-file", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openFile", "showHiddenFiles"]
    });
    if (!canceled) {
        return filePaths[0];
    }
});

ipcMain.handle("get-history", () => {
    return getHistory();
});
