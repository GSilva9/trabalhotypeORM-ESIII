const os = require('os');
const { exec } = require('child_process');

const execute = (code, announcer=os.platform()) => {
    console.time(`[${announcer}]`);
    let resp = exec(code, (error, stdout, stderr) => {
        if (error) {
            console.timeLog(`[${announcer}]`, `:> error: ${error.message}`);
            return
        }
        if (stderr) {
            console.timeLog(`[${announcer}]`, `:> stderr: ${stderr}`);
        }
        if (stdout) {
            console.timeLog(`[${announcer}]`, `:> stdout: ${stdout}`);
        };
    });
    console.timeLog(`[${announcer}]`, `:> ${code}`);
    return resp;
};

(() => {
    console.clear();
    if (['linux'].indexOf(os.platform()) !== -1) {
        return execute(`sudo docker-compose up`);
    } else if (['win32'].indexOf(os.platform()) !== -1) {
        return execute(`docker-compose up`);
    };
})();