// 假的fs其实和真的fs一模一样只是假的fs操作的不是真的文件而是在jest提供给我们的空间里玩耍
const fs = jest.createMockFromModule('fs'); //  假的fs模块
const _fs = jest.requireActual('fs');       // 真正的fs模块

Object.assign(fs, _fs);                                  // 假的fs拷贝真的fs模块中的所有API

const mocks = {};
// 返回的是error和data的数组
fs.setMock = (path, error, data) => {
    mocks[path] = [error, data];
};
// 对拷贝过来的fs中的readFile进行覆盖
fs.readFile = (path, option, callback) => {
    // 用户有可能不传option fs.readFile('/xxx',fn)
    if (callback === undefined) {
        callback = option
    }
    // 说明用户想要进行mock
    if (path in mocks) {
    // 返回函数返回的参数
        callback(mocks[path][0], mocks[path][1])
    // 否则就调用真正的读文件
    } else {
        _fs.readFile(path, option, callback)
    }
};
module.exports = fs;