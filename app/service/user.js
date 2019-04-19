const Service = require('egg').Service
class LoginService extends Service {
    async login({account, password}) {
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const sql = `
            SELECT id, account, nickname, role, pwd FROM user WHERE account = '${account}' AND pwd = '${_password}';
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
            msg: '账号或密码错误'
        }
    }
    modifyInfo({ account, nickname, password}) {
        // const sql = `
        //     SELECT * FROM user WHERE account = '${account}'
        // `
        // const res = await app.mysql.query(sql)
        console.log(res)
        return {}
    }
    async register({account, password, nickname}) {
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const isAccountUniqueSql = `
            SELECT account FROM user WHERE account = '${account}';
        `
        const insertNewUserSql = `
            INSERT INTO user(account, pwd, nickname, role) VALUES('${account}', '${_password}', '${nickname}', '${app.config.ROLE.user}');
        `
        const isUserNameExisted = await app.mysql.query(isAccountUniqueSql)
        let data = {}
        if(!isUserNameExisted[0]) {
            let res = await app.mysql.query(insertNewUserSql)
            data = {
                id: res.insertId,
                name: nickname,
                role: app.config.ROLE.user,
                msg: ''
            }
        }
        data = {
            msg: '账号已存在!'
        }
        return data
    }
    logout() {
        const { ctx } = this
        console.log(ctx)
        return ctx.verifyToken()
    }
}

module.exports = LoginService