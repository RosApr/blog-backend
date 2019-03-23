'use strict';

const Controller = require('egg').Controller

class LoginController extends Controller {
    async index() {
        const { ctx, service } = this
        const res = await service.login.validateLogin(ctx.request.body)
        ctx.body = res
    }
}

module.exports = LoginController