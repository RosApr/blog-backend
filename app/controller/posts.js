'use strict';

const baseController = require('../core/base_controller');

class PostsController extends baseController {
  async queryList() {
    const { ctx, service, ctx: { query: listConfig} } = this;
    const postList = await service.posts.queryList(listConfig)
    ctx.body = postList
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
