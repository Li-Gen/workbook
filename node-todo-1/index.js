const db = require('./db.js');
const inquirer = require('inquirer');

// 添加todo
module.exports.add = async (tasks) => {
    // 1. 读取之前的任务
    const list = await db.read();
    // 2. 往里面添加tasks任务
    tasks.forEach((item) => {
        list.push({name: item, done: false});
    });
    // 3. 存储任务到文件
    await db.write(list);
};
// 清除全部todo
module.exports.clear = async () => {
    await db.write([])
};
// 展示全部todo并询问用户
module.exports.showAll = async () => {
    // 读取之前的todo
    const list = await db.read();
    // 提供给用户的选项 1.退出 2. 添加新任务 3. 选择任意的todo
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: '请选择你要操作的任务',
                choices: [...list.map((mask, index) => {
                    return {name: `${mask.done === false ? '[×]' : '[√]'} ${index + 1}.${mask.name}`, value: index}
                }), {name: '✚ 添加新任务', value: -2}, {name: '✈ 退出', value: -1}]
            }
        )
        .then((answer2) => {
            const index = answer2.index;
            if (index >= 0) {
                // 说明选中了todo中的某一项 继续询问对选择项做出如下标记 1.退出 2.已完成 3.未完成 3.删除 4.修改标题
                inquirer
                    .prompt(
                        {
                            type: 'list',
                            name: 'action',
                            message: '请选择接下来的操作',
                            choices: [
                                {name:'退出',value:'quit'},
                                {name:'已完成',value:'markAsDone'},
                                {name:'未完成',value:'markAsUnDone'},
                                {name:'删除',value:'remove'},
                                {name:'修改标题',value:'changeTitle'},
                            ]
                        }
                    ).then((answer2) => {         // 对用户的选择做出响应(Promise)
                        switch (answer2.action) {
                            case 'markAsDone':
                                list[index].done = true;
                                db.write(list);
                                console.log(answer2.action)
                                break;
                            case 'markAsUnDone':
                                list[index].done = false;
                                db.write(list);
                            break;
                            case 'remove':
                                list.splice(index,1);
                                db.write(list);
                            break;
                            case 'changeTitle':
                                // 继续询问要把选中的todo的名字改为什么
                                inquirer.prompt({
                                    type: 'input',
                                    name: 'title',
                                    message: "新的标题",
                                    default: list[index].name
                                }).then((answer) => {
                                    list[index].name = answer.title;
                                    db.write(list)
                                });
                            break;
                        }
                })
            }else if (index === -2) {
                // 用户要添加新任务
                inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: "输入任务标题"
                }).then((answer) => {
                   list.push({
                       name: answer.title,
                       done: false
                   });
                    db.write(list)
                });
            }
        });
};
