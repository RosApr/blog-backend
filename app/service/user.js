const baseService = require('../core/base_service');
class LoginService extends baseService {
    async login({account, password}) {
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const sql = `
            SELECT id, account, nickname, role FROM user WHERE account = '${account}' AND pwd = '${_password}';
        `
        const res = await this.db.query(sql)
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
        const isRegisteredUser = await this.db.query(isRegisteredUserSql)
        if(isRegisteredUser.length > 0) {
            // 存在匹配用户
            await this.db.query(modifyInfoSql)
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
        const isUserNameExisted = await this.db.query(isAccountUniqueSql)
        console.log('isUserNameExisted', isUserNameExisted)
        if(isUserNameExisted.length === 0) {
            let res = await this.db.query(insertNewUserSql)
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
    async queryUserList({current, pageSize} = {}) {
        const itemsSql = `
            SELECT user.id,
            user.nickname,
            user.date,
            count(post.id) as count
            FROM user LEFT JOIN post ON user.id = post.owner_id GROUP BY user.id ORDER BY count DESC LIMIT ${pageSize} OFFSET ${(current - 1) * pageSize} 
        `
        const totalSql = `
            SELECT COUNT(*) as total FROM user;
        `
        const items = await this.db.query(itemsSql)
        const total = await this.db.query(totalSql)
        return {
            items: JSON.parse(JSON.stringify(items)),
            total: total[0].total,
            msg: ''
        }
    }
    async resetPwd({ id }) {
        const { app } = this
        const _password = app.translatePwdBySha1('111111')

        const isExistedUserSql = `
            SELECT * FROM user WHERE id='${id}';
        `
        const resetPwdSql = `
            UPDATE user SET pwd='${_password}' WHERE id='${id}';
        `
        const isExistedUser = await this.db.query(isExistedUserSql)
        if(isExistedUser.length > 0) {
            await this.db.query(resetPwdSql)
            return {
                msg: ''
            }
        } else {
            return {
                msg: '用户不存在'
            }
        }
    }
}

module.exports = LoginService