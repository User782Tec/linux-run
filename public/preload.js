const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    run: (command) => {
        ipcRenderer.send("execute", command);
    },
    close: () => {
        ipcRenderer.send("close", true);
    }
});
