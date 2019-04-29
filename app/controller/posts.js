'use strict';

const baseController = require('../core/base_controller');

class PostsController extends baseController {
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
    const postList = await service.posts.queryList(formatParams)
    this.success(postList)
  }
  async create() {
    const { ctx, service, ctx: { request: { body: postDetail }}} = this
    const { status } = ctx.verifyTokenResult
    if(!status) {
      return ctx.body = {
        msg: 'error'
      }
    }
    const publishRes = await service.posts.create({...postDetail, ...validateData.data})
    ctx.body = publishRes
  }
  async queryInfo() {
    const { service, ctx: { params: { id } } } = this
    const { msg, ...data } = await service.posts.queryInfo(id) 
    if(msg) {
      this.success({msg}, 404)
    } else {
      this.success({msg, ...data})
    }
  }
  async search() {
    
  }
  async modifyInfo() {

  }
  async del() {
    const { service, ctx: {params: { id }} } = this
    const { msg } = await service.posts.del(id)
    this.success({msg})
  }
  async pv() {
    const { service, ctx: {params: { id }} } = this
    const { msg } = service.posts.pv(id)
    this.success({msg})
  }
  async favorite() {

  }
}

module.exports = PostsController;
