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
            return this.success({...data, msg}, 200)
        }         
        this.success({msg}, 400)
    }
    async register() {
        const { ctx, service } = this
        const rule = {
            account: 'string',
            password: 'password',
            nickname: 'string'
        }
        ctx.validate(rule)
        const {msg, ...data} = await service.user.register(ctx.request.body)
        if(!msg) {
            ctx.createToken(data)
            return this.success({...data, msg}, 200)
        }
        this.success({msg}, 400)
    }
    async modifyInfo() {
        const { ctx, service } = this
        const rule = {
            account: 'string',
            nickname: 'string',
            password: 'password'
        }
        ctx.validate(rule)
        console.log('modifyInfo controller',ctx.request.body)
        const {msg, ...data} = await service.user.modifyInfo(ctx.request.body)
        console.log(data)
        if(!msg) {
            ctx.createToken(data)
            this.success(data)
        } else {
            this.success({msg}, 404)
        }
        
    }
    logout() {
        const { ctx } = this
        const { status } = ctx.verifyTokenResult
        
        if(status) {
            ctx.delToken()
            return this.success()
        }
        this.success({msg: '权限不足'}, 401)
        
    }
}

module.exports = LoginController