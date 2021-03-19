// 测试程序
const db = require('../db');
// 一定要注意这里require的fs不是真正的fs，而是jest接管的假的fs
const fs = require('fs');
// jest造的一个假的fs专门用来做测试用的,之后的fs都是自己造的假的fs
jest.mock('fs');

describe('db',() => {
    it('can read', async function () {
        const data = [{"title": 'Hi node.js',"done":false}];
        // 只要读取这个路径就返回error为空，读取的内容为data
        fs.setMock("/xxx",null,JSON.stringify(data));
        // read方法调用的是假的fs.readFile()
        const list = await db.read('/xxx');
        expect(list).toStrictEqual(data)
    });
});