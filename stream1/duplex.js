const {Duplex} = require('stream');
const inOutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback()
    },
    read(size) {
        const str = String.fromCharCode(this.currentCharCode++);
        this.push(str);
        console.log(`推了${str}`);
        if (this.currentCharCode > 90) {
            this.push(null)
        }
    }
});
inOutStream.currentCharCode = 65;
process.stdin.pipe(inOutStream).pipe(process.stdout);