const {Readable} = require("stream");
const producer = new Readable();
producer.push("ABCDEFGHIJKLM");
producer.push("NOPQRSTUVWXYZ");
producer.push(null);

producer.on('data', (chunk) => {
    process.stdout.write(chunk);
    console.log('写数据了')
});