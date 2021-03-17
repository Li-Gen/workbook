#!/usr/bin/env node
const program= require("commander");
const api = require('./index.js');
const pkg = require("./package");

// 添加版本号
program.version(pkg.version);

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

// 无子命令时默认执行
program
    .command("show",{ isDefault: true })
    .description("show all tasks")
    .action(() => {
        void api.showAll()
    });

program.parse(process.argv);


