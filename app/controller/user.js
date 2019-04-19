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
        ctx.validate(rule)
        const {msg, ...data} = await service.user.login(ctx.request.body)
        if(!msg) {
            console.log(data)
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
    logout() {
        const { ctx } = this
        const { status } = ctx.verifyToken()
        
        if(status) {
            ctx.delToken()
            return this.success(200, {})
        }
        this.success(401, {msg: '权限不足'})
        
    }
    modifyInfo() {
        const { ctx, service } = this
        const rule = {
            account: 'string',
            nickname: 'string',
            password: 'password'
        }
        ctx.validate(rule)
        console.log('modifyInfo controller',ctx.request.body)
        // const res = await service.user.modifyInfo(ctx.request.body)
        // console.log(res)
        this.success()
    }
}

module.exports = LoginController