'use strict';

const baseController = require('../core/base_controller');

class LoginController extends baseController {
    async login() {
        const { ctx, service } = this
        const rule = {
            account: 'string',
            password: 'password'
        }
        ctx.validate(rule)
        const res = await service.user.login(ctx.request.body)
        ctx.body = res
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
        ctx.body = res
    }
    async logout() {
        const { ctx } = this
        ctx.body = {
            msg: ''
        }
    }
    async modifyInfo() {
        const { ctx } = this
        ctx.body = {
            msg: ''
        }
    }
}

module.exports = LoginController