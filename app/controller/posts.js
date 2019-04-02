'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {
  async queryPostsList() {
    const { ctx, service, ctx: { query: listConfig} } = this;
    const postList = await service.posts.queryPostsList(listConfig)
    ctx.body = postList
  }
  async createPosts() {
    const { ctx, service, ctx: { request: { body: postDetail }}} = this
    const token = ctx.cookies.get('token', { signed: false })
    const validateData = ctx.helper.validateToken(token)
    if(!validateData.status) {
      return ctx.body = {
        msg: 'error'
      }
    }
    const publishRes = await service.posts.createPosts({...postDetail, ...validateData.data})
    ctx.body = publishRes
  }
  async queryPostsInfo() {
    const { ctx, service, ctx: { params:{ id } } } = this
    const postsInfo = await service.posts.queryPostsInfo(id) 
    ctx.body = postsInfo
  }
  async search() {
    
  }
  async modifyPostsInfo() {

  }
  async delPosts() {

  }
  async addPostsPv() {

  }
  async addPostsStar() {

  }
}

module.exports = ListController;
