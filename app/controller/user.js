'use strict';

const baseController = require('../core/base_controller');

class LoginController extends baseController {
    async login() {
        const { ctx, service } = this
        const rule = {
            account: {
                type: 'string',
                required: true
            },
            password: 'password'
        }
        const {msg, ...data} = await service.user.login(ctx.request.body)
        if(!msg) {
            ctx.createToken(data)
            return this.success(200, {...data, msg})
        }         
        this.success(400, {...data, msg})
    }
    async register() {
        const { ctx, service } = this
        const rule = {
            account: 'string',
            password: 'password',
            nickname: 'string'
        }
        ctx.validate(rule)
        const res = await service.user.register(ctx.request.body)
        this.success()
    }
    async logout() {
        const { ctx } = this
        
    }
    async modifyInfo() {
        const { ctx } = this
        
    }
}

module.exports = LoginController