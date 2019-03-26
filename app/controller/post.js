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
    console.log(postDetail)
    
    ctx.body = 200
  }
}

module.exports = ListController;
