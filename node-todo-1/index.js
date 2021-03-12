const db = require('./db.js');

module.exports.add = async function (tasks) {
    // 1. 读取之前的任务
    const list = await db.read();
    // 2. 往里面添加tasks任务
    tasks.forEach((item)=>{
        list.push({name:item,done:false});
    });
    // 3. 存储任务到文件
    await db.write(list);
};