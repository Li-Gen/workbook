const fs = jest.createMockFromModule('fs'); //  假的fs模块
const _fs = jest.requireActual('fs');       // 真正的fs模块

Object.assign(fs, _fs);                                  // 假的fs拷贝真的fs模块中的所有API

const mocks = {};
fs.setMock = (path, error, data) => {
    mocks[path] = [error, data];
};
// 对拷贝过来的fs中的readFile进行覆盖
fs.readFile = (path, option, callback) => {
    // 用户有可能不传option fs.readFile('/xxx',fn)
    if (callback === undefined) {
        callback = option
    }
    // 说明调用了fs.setMock
    if (path in mocks) {
        callback(mocks[path][0], mocks[path][1])
    } else {
        _fs.readFile(path, option, callback)
    }
};
module.exports = fs;