const db = require('./db.js');
// 添加todo
module.exports.add = async(tasks)=> {
    // 1. 读取之前的任务
    const list = await db.read();
    // 2. 往里面添加tasks任务
    tasks.forEach((item)=>{
        list.push({name:item,done:false});
    });
    // 3. 存储任务到文件
    await db.write(list);
};
// 清除全部todo
module.exports.clear = async()=>{
    await db.write([])
}
// 展示全部todo
module.exports.showAll = async()=>{
    console.log(db.read().then((result)=>{
        console.log(result);},(err)=>{
        console.log(err);}));
    console.log("888");
    // 1. 读取之前的todo
    const list = await db.read();
    console.log(list)
    console.log("7777");
    // 2. 打印之前的todo
    list.forEach((task,index)=>{
        console.log(`${index + 1}-${task}`)
    })
}