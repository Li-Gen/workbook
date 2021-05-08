const fs = require('fs');
const stream = fs.createWriteStream('./big_file.txt');
for (let i = 0; i < 10000; i++) {
    stream.write(`这是第${i + 1}行数据，我们还需要很多数据回车\n`)
}
stream.end();
console.log('done');
