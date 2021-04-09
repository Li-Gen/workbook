import * as https from "https";
import * as querystring from "querystring";
import {appId, appidSecret} from "./private";
import md5 = require("md5");

const errorMap = {
    52000: "成功",
    52001: "请求超时",
    52002: "系统错误",
    52003: "未授权用户",
    54000: "必填参数为空",
    54001: "签名错误",
    54003: "访问频率受限",
    54004: "账户余额不足",
    54005: "长query请求频繁",
    58000: "客户端IP非法",
    58001: "译文语言方向不支持",
    58002: "服务当前已关闭",
    90107: "认证未通过或未生效"
};

export const translate = (word) => {
    const salt = Math.random();
    const sign = md5(appId + word + salt + appidSecret);
    let from,to;
    if (/[a-zA-Z]/.test(word)) {
        from = 'en';
        to = 'zh'
     // 英译汉
    } else {
     // 汉译英
        from = 'zh';
        to = 'en'
    }
    // 请求的查询参数
    const query: string = querystring.stringify({q: word,  appid: appId,from,to,salt,sign});
    // https://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4
    // 请求地址
    const options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    const request = https.request(options, (response) => {
        let chunks = [];
        response.on('data', (chunk) => {
            chunks.push(chunk)
        });
        response.on('end', () => {
            const string = Buffer.concat(chunks).toString();
            type BaiduResult = {
                error_code?: string;
                error_msg?: string;
                from: string;
                to: string;
                trans_result: {
                    src: string;
                    dst: string;
                }[];
            }
            const object: BaiduResult = JSON.parse(string);
            if (object.error_code) {
                console.error(errorMap[object.error_code] || object.error_msg);
                process.exit(2)
            } else {
                object.trans_result.map( obj =>{
                    console.log(obj.dst)
                });
                process.exit(0)
            }
        })
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
};  