// 子进程给父进程发送数据
setTimeout(() => {
    process.send({foo: 'bar'})
}, 2000);
// 子进程拿到了父进程传过来的数据
process.on('message', (data) => {
    console.log('子进程拿到了数据');
    console.log(data)
});