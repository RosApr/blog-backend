'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {
  async index() {
    const { ctx, service, ctx: { query: listConfig} } = this;
    const postList = await service.post.queryPostList(listConfig)
    ctx.body = postList
  }
  async publishPost() {
    const { ctx, service, ctx: { request: { body: postDetail }}} = this
    const token = ctx.cookies.get('token', { signed: false })
    const validateData = ctx.helper.validateToken(token)
    if(!validateData.status) {
      return ctx.body = {
        msg: 'error'
      }
    }
    const publishRes = await service.post.publishPost({...postDetail, ...validateData.data})
    ctx.body = publishRes
  }
  async detail() {
    const { ctx, service, ctx: { params:{ id } } } = this
    const postDetail = await service.post.queryDetail(id) 
    ctx.body = postDetail
  }
}

module.exports = ListController;
