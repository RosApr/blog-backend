module.exports = {
    get token() {
        return this.cookie.get('token', { signed: false })
    },
    createToken(data) {
        const { app } = this
        const token = app.jwt.sign(data, app.config.jwt.secret)
        return this.cookies.set('token', token, {
            // httpOnly: true, // 客户端不可读 默认配置
            // encrypt: false, // 不加密 默认配置
            signed: false, // 不签名
            maxAge: 1 * 60 * 60 * 1000,
            overwrite: true
        })
    },
    delToken() {
        return this.cookies.set('token', null, { signed: false })
    },
    verifyToken() {
        const { app } = this
        try {
            let data = app.jwt.verify(this.token, app.config.jwt.secret)
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