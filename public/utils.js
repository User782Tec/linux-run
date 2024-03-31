const Storage = require("electron-store");
const child_process = require("child_process");
const storage = new Storage();

function getHistory() {
    if (!storage.has("history")) {
        storage.set("history", []);
    }
    return storage.get("history");
}

function setHistory(value) {
    storage.set("history", value);
}

function checkCommand(value) {
    // 测试命令
    try {
        child_process.execSync(`compgen -c | grep ${value.split(" ")[0]}`, { shell: "/bin/bash", encoding: "utf-8" });
        return true;
    } catch {
        return false;
    }
}

module.exports.getHistory = getHistory;
module.exports.setHistory = setHistory;
module.exports.checkCommand = checkCommand;
