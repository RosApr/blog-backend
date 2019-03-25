'use strict';

const Controller = require('egg').Controller

class LoginController extends Controller {
    async login() {
        const { ctx, service } = this
        const res = await service.user.validateLogin(ctx.request.body)
        ctx.body = res
    }
    async register() {
        const { ctx, service } = this
        const res = await service.user.regiser(ctx.request.body)
        ctx.body = res
    }
}

module.exports = LoginController