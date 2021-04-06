const app = getApp();
const basePath = 'http://192.168.20.41:8888/jeecg-boot/assess/';
//配置路径
const urlList = {
    hasTest: basePath + 'examHistory/sfcs',                 //判断是否做过当前套题
    getAllExam: basePath + 'examPlan/queryMethodByPlanId', // 获取计划下的所有套题集合
    getOneExam: basePath + 'examPaper/randomOnePaper',     // 获取单套试卷试题
    saveTestPaper: basePath + 'examHistory/add',            // 保存试卷结果
    getAllResult: basePath + 'examHistory/queryHistoryList'// 获取总的测评结果
};
// 封装请求方法
const request = (url, method, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,  //请求地址
            method: method, // GET POSt
            dataType: 'json',
            data: options.data, //数据参数
            header: {
                "Content-Type": "application/json"
            },
            success(request) {
                resolve(request.data);  //成功返回的函数
                wx.hideLoading();       //请求成功后 loading隐藏
            },
            fail(error) {
                reject(error.data);  //失败返回的函数
                wx.hideLoading();   //请求成功后 loading隐藏
            }
        })
    });
};

const get = (url, method, options = {}) => { //创建get请求方法
    return request(url, 'GET', { data: options })
};

const post = (url, method, options = {}) => { //创建post请求方法
    return request(url, 'POST', { data: options })
};

module.exports = {
    get,
    post,
    urlList,
};