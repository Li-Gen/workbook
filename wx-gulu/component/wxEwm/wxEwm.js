const QR = require('../../utils/qrcode');
const fun_aes = require("../../utils/aes.js");

Page({
    data:{
        canvasId:"sdsdfsfsf"
    },
    onReady() {
        let stringArg = this.Encrypt("dsadasdasdasdasdasdasasdasd");
        QR.api.draw();
        this.createQrCode(stringArg,this.data.canvasId,300,300)
    },
    // 画二维码
    createQrCode(content, canvasId, cavW, cavH) {
        QR.api.draw(content, canvasId, cavW, cavH);
    },
    /**
     * 加密： @return {string}
     */
    Encrypt(word) {
        const srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
        const key = fun_aes.CryptoJS.enc.Utf8.parse("5b9c2ed3e19c40e5");
        const encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
            mode: fun_aes.CryptoJS.mode.ECB,
            padding: fun_aes.CryptoJS.pad.Pkcs7,
        });
        //返回大写十六进制加密结果
        return encrypted.toString();
    },
    /**
     * 解密：@return {string}
     */
    Decrypt(word) {
        const key = fun_aes.CryptoJS.enc.Utf8.parse("5b9c2ed3e19c40e5");
        //mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7
        const decrypt = fun_aes.CryptoJS.AES.decrypt(word, key, {
            mode: fun_aes.CryptoJS.mode.ECB,
            padding: fun_aes.CryptoJS.pad.Pkcs7,
        });
        const decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },
})