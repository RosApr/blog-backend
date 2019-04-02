const Service = require('egg').Service
class LoginService extends Service {
    async login(loginConfig = { account: '', password: ''}) {
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const sql = `
            SELECT id, account, nickname, pwd FROM user WHERE account = '${loginConfig.account}' AND pwd = '${_password}';
        `
        const res = await app.mysql.query(sql)
        if(res[0]) {
            delete res[0]['pwd']
            return {
                ...res[0],
                msg: ''
            }
        }
        return {
            msg: 'error'
        }
    }
    async register(registerConfig = { username: '', password: ''}) {
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const isUserNameUniqueSql = `
            SELECT name FROM user WHERE name = '${registerConfig.username}'
        `
        const insertNewUserSql = `
            INSERT INTO user(name, pwd) VALUES('${registerConfig.username}', '${_password}')
        `
        const isUserNameExisted = await app.mysql.query(isUserNameUniqueSql)
        if(!isUserNameExisted[0]) {
            let res = await app.mysql.query(insertNewUserSql)
            return {
                ...{
                    id: res.insertId,
                    name: registerConfig.username
                },
                msg: ''
            }
        }
        return {
            msg: 'error'
        }
    }
}

module.exports = LoginService