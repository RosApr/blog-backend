const Service = require('egg').Service
const crypto = require('crypto')

class LoginService extends Service {
    async validateLogin(loginConfig = { username: '', password: ''}) {
        const { app } = this
        const hash = crypto.createHash('sha1')
        hash.update(loginConfig.password)
        const needExecPwd = hash.digest('hex')
        const sql = `
            SELECT name, pwd FROM user WHERE name = '${loginConfig.username}' AND pwd = '${needExecPwd}';
        `
        const res = await app.mysql.query(sql)
        return 200
    }
    async regiser(registerConfig = { username: '', password: ''}) {
        const { app } = this
        const hash = crypto.createHash('sha1')
        hash.update(registerConfig.password)
        const isUserNameUniqueSql = `
            SELECT name FROM user WHERE name = '${registerConfig.username}'
        `
        const insertNewUserSql = `
            INSERT INTO user(name, pwd) VALUES('${registerConfig.username}', '${hash.digest("hex")}')
        `
        const isUserNameExisted = await app.mysql.query(isUserNameUniqueSql)
        if(!isUserNameExisted[0]) {
            let res = await app.mysql.query(insertNewUserSql)
            return 200
        }
        return 401
    }
}

module.exports = LoginService