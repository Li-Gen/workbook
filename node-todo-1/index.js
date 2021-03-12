// 获取用户home目录
const homedir = require('os').homedir();
// 获取用户home变量
const home = process.env.HOME || homedir;
// 文件模块
const fs = require('fs')
// 路径模块
const p = require('path')
// 数据库的路径
const dbPath = p.join(home, '.todo')

module.exports.add = function (tasks) {
    // 读文件 如果发现文件内容是空的就创建一个空数组作为内容并穿件文件
    fs.readFile(dbPath, {flag: 'a+'}, (err1, data) => {
        if (err1) {
            console.log(err1)
        } else {
            let dataContent;
            try {
                dataContent = JSON.parse(data.toString());                     // data为buffer对象需要转成平时的对象才能push
            } catch (err2) {
                dataContent = [];
            }
            let taskArr = tasks.split(" ");
            // 将todo的任务包装成对象塞到数组中作为文件内容
            taskArr.forEach((item) => {
                let taskObj = {};
                taskObj.name = item;
                taskObj.done = false;
                dataContent.push(taskObj);
            });
            let stringDataList = JSON.stringify(dataContent);
            console.log("stringDataList",stringDataList)
            // 将内容写入到文件
            fs.writeFile(dbPath, stringDataList, (err3) => {
                if (err3) {
                    console.log(err3)
                }
            })
        }
    })
}