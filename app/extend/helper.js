const jwt = require('jsonwebtoken')
const secret = '123'

module.exports = {
    createToken(data) {
        const token = jwt.sign(data, secret)
        return this.ctx.cookies.set('token', token, {
            httpOnly: true, // 客户端不可读
            encrypt: false, // 不加密
            signed: false, // 不签名
            maxAge: 1 * 60 * 60 * 1000,
            overwrite: true
        })
    },
    delToken() {
        return this.ctx.cookies.set('token', null)
    },
    validateToken(token) {
        try {
            let data = jwt.verify(token, secret)
            return {
                status: true,
                data
            }
        } catch (e) {
            return {
                status: false
            }
        }
    }
}