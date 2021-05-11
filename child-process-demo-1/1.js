const child_process = require("child_process");
const {spawn} = child_process;
// 允许用户输入命令
const userInput = '.';
const streams = spawn('ls', ['-la', userInput], {cwd: 'C:\\'});
streams.stdout.on('data',chunk => console.log(chunk.toString()))