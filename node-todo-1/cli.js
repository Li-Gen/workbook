const {program} = require("commander");
const api = require('./index.js');

// 添加option
program.option("-x, --xxx", "this is new option");

// 添加add子命令
program
    .command("add <tasks...>")
    .description("add a task")
    .action(function (tasks) {
        api.add(tasks).then(() => {
            console.log("添加成功")
        }, () => {
            console.log("添加失败")
        })
    });

// 添加clear子命令
program
    .command("clear")
    .description("clear all tasks")
    .action(() => {
        api.clear().then(() => {
            console.log("清除成功")
        }, () => {
            console.log("清除失败")
        })
    });

if (process.argv.length === 2) {
    console.log("我进来了")
    void api.showAll()
    console.log("66666")
}

program.parse(process.argv);


