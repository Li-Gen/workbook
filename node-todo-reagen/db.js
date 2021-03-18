// 获取用户home目录
const homedir = require('os').homedir();
// 获取用户home变量
const home = process.env.HOME || homedir;
// 文件模块
const fs = require('fs');
// 路径模块
const p = require('path');
// 数据库的路径
const dbPath = p.join(home, '.todo');

const db = {
    // 如果不给path传路径默认就是dbPath
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (err1, data) => {
                if (err1) {
                    return reject(err1)
                }
                let dataContent;
                try {
                    dataContent = JSON.parse(data.toString());                     // data为buffer对象需要转成平时的对象才能push
                } catch (err2) {
                    dataContent = [];
                }
                resolve(dataContent)
            })
        })
    },
    write(taskArr, path = dbPath) {
        return new Promise((resolve, reject) => {
                let stringDataList = JSON.stringify(taskArr);
                fs.writeFile(path, stringDataList, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve()
                })
            }
        )
    }
};

module.exports = db;