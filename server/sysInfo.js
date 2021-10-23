const os = require('os');
const osUtils = require("os-utils");


let timer = -1;
let cpuUsage = 0;

function openSysInfo(socket) {
    if (timer < 0) {
        timer = setInterval(() => {
            osUtils.cpuUsage(value => cpuUsage = value)
            let freeMem = os.freemem() / 1024 / 1024 / 1024;
            let totalMem = os.totalmem() / 1024 / 1024 / 1024;
            let data = {
                cpuUsage: (cpuUsage * 100.0).toFixed(2),
                freeMem: freeMem.toFixed(2) + "G",
                totalMem: totalMem.toFixed(2) + "G",
                usedMem: (totalMem - freeMem).toFixed(2) + "G",
                memUsage: ((totalMem - freeMem) / totalMem * 100.0).toFixed(2),
            };
            socket.emit("system info", data)
        }, 1500)
    }
}


function closeSysInfo() {
    clearInterval(timer)
    timer = -1;
}

module.exports = {
    openSysInfo,
    closeSysInfo
}