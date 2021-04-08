import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path"

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');
const cacheTime = 3600 * 24 * 365

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
    console.log(request.method);
    console.log("url", request.url);
    console.log(request.headers);
    // 设置响应头
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    // 处理非GET请求
    if (request.method !== "GET") {
        response.statusCode = 200;
        response.end('这是一个假响应');
        return
    }
    // 使用WHATWG的URL拿到url和查询参数
    const {pathname, search} = new URL(request.url, `http://${request.headers.host}`);
    // 拿到用户输入的任意路径
    let fileName = pathname.substr(1);
    // 如果输入的路径是空的默认打开index.html
    if (fileName === '') {
        fileName = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
        if (error) {
            console.log("error", error);
            if (error.errno === -4058) {
                // 如果404了就读一下404页面并将结果返回
                fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
                    response.statusCode = 404;
                    response.end(data);
                })
            } else if (error.errno === -4068) {
                response.statusCode = 403;
                response.end('不允许访问一个目录');
            } else {
                response.statusCode = 500;
                response.end('服务器不存在，请稍后再试');
            }
        } else {
            // 添加缓存
            response.setHeader('Cache-Control',`public, max-age=${cacheTime}`);
            // 返回文件内容
            response.end(data);
        }
    });
});
server.listen(8888);