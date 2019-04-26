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
    const { ctx, service, ctx: { params:{ id } } } = this
    const postsInfo = await service.posts.queryInfo(id) 
    ctx.body = postsInfo
  }
  async search() {
    
  }
  async modifyInfo() {

  }
  async del() {

  }
  async pv() {

  }
  async favorite() {

  }
}

module.exports = PostsController;
