const child_process = require("child_process");
const {execFile} = child_process;
// 允许用户输入命令
const userInput = '.';
execFile('ls', ['-la', userInput], {cwd: 'C:\\'}, (error, stdout) => {
    console.log(error);
    console.log(stdout)
});
