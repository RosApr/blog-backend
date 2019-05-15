const baseService = require('../core/base_service');
class LoginService extends baseService {
    async login({account, password}) {
        // const sql = `
        //     SELECT id, account, nickname, role FROM user WHERE account = '${account}' AND pwd = '${_password}';
        // `
        const { app } = this
        const _password = app.translatePwdBySha1(password)
        const res = await this.db.select('user', {
            where: {
                account,
                pwd: _password
            },
            columns: ['id', 'account', 'nickname', 'role']
        })
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
        // const isRegisteredUserSql = `
        //     SELECT * FROM user WHERE account = '${account}';
        // `
        // const modifyInfoSql = `
        //     UPDATE user SET nickname='${nickname}', pwd='${_password}' WHERE account='${account}';
        // `
        const isRegisteredUser = await this.db.get('user', {
            account
        })
        if(isRegisteredUser) {
            // 存在匹配用户
            await this.db.update('user', {
                nickname,
                pwd: _password
            }, {
                where: {
                    account
                }
            })
            return {
                id: isRegisteredUser['id'],
                nickname,
                account,
                role: isRegisteredUser['role'],
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
       
        // const isAccountUniqueSql = `
        //     SELECT account FROM user WHERE account = '${account}';
        // `
        // const insertNewUserSql = `
        //     INSERT INTO user(account, pwd, nickname, role) VALUES('${account}', '${_password}', '${nickname}', '${app.config.ROLE.user}');
        // `

        const isUserNameExisted = await this.db.get('user', {
            account
        })
        console.log('isUserNameExisted', isUserNameExisted)
        if(!isUserNameExisted) {
            let res = await this.db.insert('user', {
                account,
                pwd: _password,
                nickname,
                role: app.config.ROLE.user
            })
            if(res.affectedRows === 1) {
                return {
                    // id: res['insertId'],
                    account,
                    nickname,
                    role: app.config.ROLE.user,
                    msg: ''
                }
            } else {
                return {
                    msg: 'insert data error'
                }
            }
            
        }
        return {
            msg: '账号已存在!'
        }
    }
    logout() {
        const { ctx } = this
        ctx.delToken()
        return {msg: ''}
    }
    async queryUserList({current, pageSize} = {}) {
        const { app } = this
        const itemsSql = `
            SELECT u.id,
            u.nickname,
            u.created_at,
            u.account,
            COUNT(p.id) as count
            FROM user u LEFT JOIN post p ON u.id = p.user_id WHERE u.role !='${app.config.ROLE.root}' GROUP BY u.id ORDER BY count DESC LIMIT ${pageSize} OFFSET ${(current - 1) * pageSize} 
        `
        const totalSql = `
            SELECT COUNT(*) as total FROM user WHERE role !='${app.config.ROLE.root}';
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
        const isExistedUser = await this.db.get('user', {
            id
        })
        if(isExistedUser) {
            await this.db.update('user', {
                pwd: _password
            }, {
                where: {
                    id
                }
            })
            return {
                msg: ''
            }
        } else {
            return {
                msg: '用户不存在'
            }
        }
    }
    async queryStarConfig() {
        const userId = this.ctx.verifyTokenResult.id

        // const starTotalSql = `
        //     SELECT COUNT(f.post_id) AS total FROM favorite f WHERE f.user_id = '${userId}'
        // `
        // const starListSql = `
        //     SELECT f.post_id AS id FROM favorite f WHERE f.user_id = '${userId}'
        // `
        const total = await this.db.count('favorite', {
            user_id: userId
        })
        const items = await this.db.query(`SELECT f.post_id AS id FROM favorite f WHERE f.user_id =?`, [userId])
        return {
            msg: '',
            total: total,
            items: JSON.parse(JSON.stringify(items)).map(item => item.id)
        }
    }
    async star({postId, status}) {
        const userId = this.ctx.verifyTokenResult.id
        // const addStarSql = `
        //     INSERT INTO favorite(post_id, user_id) VALUES('${postId}', '${userId}');
        // `
        // const delStarSql = `
        //     DELETE FROM favorite WHERE post_id='${postId}' AND user_id='${userId}'
        // `
        const updatePostStarConutSql = `
            UPDATE post SET star=(GREATEST(0, (star ${status === 1 ? '+ 1' : '- 1'}))) WHERE id='${postId}'
        `
        const conn = await this.db.beginTransaction()
        try {
            if(status === 1) {
                let insertRes = await conn.insert('favorite', {
                    post_id: postId,
                    user_id: userId
                })
                console.log('star insertRes', insertRes)
            } else {
                const delRes = await conn.delete('favorite', {
                    user_id: userId,
                    post_id: postId
                })
                console.log('star delete', delRes)
            }
            const updatePostStarRes = await conn.query(updatePostStarConutSql)
            console.log(updatePostStarRes)
            await conn.commit()
            return {
                msg: ''
            }
            
        } catch(e) {
            await conn.rollback();
            return {
                msg: '收藏出错'
            }
        }
        
        
    }
}

module.exports = LoginService