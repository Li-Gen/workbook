const { program } = require("commander");
const api = require('./index.js');

// 添加option
program.option("-x, --xxx", "this is new option");

// 添加add子命令
program
  .command("add <tasks...>")
  .description("add a task")
  .action(function (tasks) {
    api.add(tasks).then()
  });

// 添加clear子命令
program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
    console.log("clear all tasks")
  });

program.parse(process.argv);
