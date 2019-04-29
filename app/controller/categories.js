'use strict';

const baseController = require('../core/base_controller');

class Categories extends baseController {
    async queryList() {
        const { ctx, service, ctx: { query: listConfig} } = this;
        let formatParams = {}
        for (let [key, value] of Object.entries(listConfig)) {
            formatParams[key] = Number(value)
        }
        const rule = {
            current: 'number',
            pageSize: 'number'
        }
        ctx.validate(rule, formatParams)
        const categoryList = await service.categories.queryList(formatParams)
        this.success(categoryList)
    }
    async queryInfo() {
        const { service, ctx: { params: { id }}} = this
        const { msg, ...data } = await service.categories.queryInfo(id)
        if(msg) {
            this.success({msg}, 404)
        } else {
            this.success({msg, ...data})
        }
    }
    async modifyInfo() {
        const { service, ctx, ctx: { request: { body }}} = this
        const rule = {
            id: 'number',
            name: 'string'
        }
        ctx.validate(rule)
        console.log('category modifyInfo', body)
        const res = await service.categories.modifyInfo(body)
        this.success(res)
    }
    async create() {
        const { service, ctx, ctx: { request: { body }} } = this
        const rule = {
            name: 'string'
        }
        ctx.validate(rule)
        const { msg } = await service.categories.create(body)
        if(msg) {
            this.success({msg}, 400)
        } else {
            this.success()
        }
    }
    async del() {
        const { service, ctx: { params: { id }}} = this
        const { msg } = service.categories.del(id)
        this.success({msg})
    }
}

module.exports = Categories