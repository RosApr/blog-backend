'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {
  async index() {
    const { ctx, service, ctx: { query: listConfig} } = this;
    const postList = service.post.queryPostList(listConfig)
    ctx.body = postList
  }
}

module.exports = ListController;
