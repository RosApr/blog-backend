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
    async logout() {
        const { ctx } = this
        ctx.body = {
            msg: ''
        }
    }
    async modifyUserInfo() {
        const { ctx } = this
        ctx.body = {
            msg: ''
        }
    }
}

module.exports = LoginController