import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path"

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
    console.log(request.method);
    console.log("url", request.url);
    console.log(request.headers);
    // 使用WHATWG的URL拿到url和查询参数
    const {pathname, search} = new URL(request.url, `http://${request.headers.host}`);
    // 拿到用户输入的任意路径
    const fileName = pathname.substr(1);
    fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
        if (error) {
            response.statusCode = 404;
            response.end('你访问的网页搬家了！')
        } else {
            response.end(data.toString());
        }
    });
});
server.listen(8888);