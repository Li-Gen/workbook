const db = require('./db.js');
const inquirer = require('inquirer');

module.exports.add = async (tasks) => {
    const list = await db.read();
    tasks.forEach((item) => {
        list.push({name: item, done: false});
    });
    await db.write(list);
};
module.exports.clear = async () => {
    await db.write([])
};
module.exports.showAll = async () => {
    const list = await db.read();
    printTasks(list)
};
function markAsDone(list,index) {
    list[index].done = true;
    db.write(list);
}
function markAsUnDone(list,index) {
    list[index].done = false;
    db.write(list);
}
function remove(list,index) {
    list.splice(index,1);
    db.write(list);
}
function changeTitle(list,index) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: "新的标题",
        default: list[index].name
    }).then((answer) => {
        list[index].name = answer.title;
        db.write(list)
    });
}
function askNextAction(list,index) {
    const  actions = {
        markAsDone,
        markAsUnDone,
        remove,
        changeTitle
    };
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
        ).then((answer2) => {
        const action = actions[answer2.action];
        action && action(list,index)
    })
}
function  inquiryCreateTasks(list) {
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
function printTasks(list){
    // 打印.todo数据库中的的任务  printTasks
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
        // 询问接下来的操作 askNextAction
        .then((answer2) => {
            const index = answer2.index;
            if (index >= 0) {
                askNextAction(list,index)
            }else if (index === -2) {
                // 询问用户创建任务 inquiryCreateTasks
                inquiryCreateTasks(list)
            }
        });
}

