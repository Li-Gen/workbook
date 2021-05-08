const {Readable} = require('stream');

const produce = new Readable({
    read(size) {
        const str = String.fromCharCode(this.currentCharCode++);
        this.push(str);
        console.log(`推了${str}`);
        if (this.currentCharCode > 90) {
            this.push(null)
        }
    }
});
produce.currentCharCode = 65;

produce.pipe(process.stdout);
