import * as https from "https";
import * as querystring from "querystring";
import {appId, appidSecret} from "./private";
import md5 = require("md5");

const errorMap = {
    52003: "用戶认证失败",
    52004: "错误1",
    52005: "错误2",
    52006: "错误3",
    other: "服务器繁忙"
};

export const translate = (word) => {
    const salt = Math.random();
    const sign = md5(appId + word + salt + appidSecret);

    const query: string = querystring.stringify({
        q: word,
        from: 'en',
        to: 'zh',
        appid: appId,
        salt: salt,
        sign: sign
    });

    // https://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4
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
                console.log(object.trans_result[0].dst);
                process.exit(0)
            }
        })
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
};  