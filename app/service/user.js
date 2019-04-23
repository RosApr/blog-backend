const Service = require('egg').Service
class LoginService extends Service {
    async login({account, password}) {
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const sql = `
            SELECT id, account, nickname, role FROM user WHERE account = '${account}' AND pwd = '${_password}';
        `
        const res = await app.mysql.query(sql)
        if(res[0]) {
            return {
                ...res[0],
                msg: ''
            }
        }
        return {
            msg: '账号或密码错误'
        }
    }
    async modifyInfo({ account, nickname, password}) {
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const isRegisteredUserSql = `
            SELECT * FROM user WHERE account = '${account}';
        `
        const modifyInfoSql = `
            UPDATE user SET nickname='${nickname}', pwd='${_password}' WHERE account='${account}';
        `
        const isRegisteredUser = await app.mysql.query(isRegisteredUserSql)
        if(isRegisteredUser.length > 0) {
            // 存在匹配用户
            await app.mysql.query(modifyInfoSql)
            return {
                id: isRegisteredUser[0]['id'],
                nickname,
                account,
                role: isRegisteredUser[0]['role'],
                msg: ''
            }
        } else {
            // 不存在匹配用户
            return {
                msg: '该用户不存在'
            }
        }
        
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
        console.log('isUserNameExisted', isUserNameExisted)
        if(isUserNameExisted.length === 0) {
            let res = await app.mysql.query(insertNewUserSql)
            console.log('insertNewUserSql', res)
            return {
                id: res['insertId'],
                account,
                nickname,
                role: app.config.ROLE.user,
                msg: ''
            }
        }
        return {
            msg: '账号已存在!'
        }
    }
    logout() {
        const { ctx } = this
        console.log(ctx)
        return ctx.verifyTokenResult
    }
}

module.exports = LoginService