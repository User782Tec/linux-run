const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    run: (obj) => {
        ipcRenderer.send("execute", obj);
    },
    close: () => {
        ipcRenderer.send("close", true);
    },
    openFile: () => {
        return ipcRenderer.invoke("open-file");
    },
    getHistory: () => {
        return ipcRenderer.invoke("get-history");
    }
});
