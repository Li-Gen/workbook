const child_process = require('child_process');
// 创建子进程
const n = child_process.fork('./child.js');
// 监听子进程发送过来的数据
n.on('message', function (m) {
    console.log('主进程得到了数据');
    console.log(m)
});
// 父进程发送数据给子进程
n.send({hello: 'world'});