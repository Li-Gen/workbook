const {Sequelize, Model, DataTypes} = require('sequelize');
// 使用sequelize操作叫reagen的数据库
const sequelize = new Sequelize('reagen', 'root', '123456', {
    dialect: 'mysql',
    host: '192.168.99.100',
    port: 3306
});

// 创建User模型
class User extends Model {
}

// 初始化User
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, {sequelize, modelName: 'user'});
// 删除记录
User.destroy({
    where: {
        id: 1
    }
}).then(() => {
    console.log("Done");
});
async function queryDatabase() {
    const users = await User.findAll();
    console.log(JSON.stringify(users) );
    sequelize.close()
}

queryDatabase();

// 同步到数据库
// sequelize.sync()
//     // 创建一条记录
//     .then(() => User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     }))
//     // 打印这条记录
//     .then(jane => {
//         console.log(jane.toJSON());
//     });