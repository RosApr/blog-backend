const Service = require('egg').Service
const md5 = require('md5')

class LoginService extends Service {
    async validateLogin(loginConfig = { username: '', password: ''}) {
        const { app } = this
        const sql = `
            SELECT name, pwd FROM user WHERE name = '${loginConfig.username}' AND pwd = '${md5(loginConfig.password)}';
        `
        const res = await app.mysql.query(sql)
        console.log(res)
        return 200
    }
}

module.exports = LoginService