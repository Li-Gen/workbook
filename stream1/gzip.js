const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];
const crypto = require("crypto");

const {Transform} = require("stream");
// 转换流-每压缩一次就输出点（进度）并将数据原封不动的返回给callback
const reportProgress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write(".");
        callback(chunk)
    }
});

fs.createReadStream(file)
    // 加密
    .pipe(crypto.createCipher("aes192","123456"))
    // gzip压缩
    .pipe(zlib.createGzip())
    // 进度
    .pipe(reportProgress)
    // 写文件
    .pipe(fs.createWriteStream(file + ".gz"))
    // 压缩完成提示
    .on("finish", () => {
        process.stdout.write("压缩完成")
    });