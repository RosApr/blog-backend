'use strict';

const baseController = require('../core/base_controller');

class PostsController extends baseController {
  async queryList() {
    const { ctx, service, ctx: { query: listConfig} } = this;
    const formatParams = ctx.helper.formatRequestQueryToNumber(listConfig)
    const rule = {
      current: 'number',
      pageSize: 'number',
      isOwn: {
        type: 'number',
        required: false
      },
      categoryId: {
        type: 'number',
        required: false
      },
      star: {
        type: 'number',
        required: false
      }
    }
    ctx.validate(rule, formatParams)
    const postList = await service.posts.queryList(formatParams)
    if(postList.msg) {
      return this.success({msg: postList.msg}, 401)
    }
    return this.success(postList)
  }
  async create() {
    const { ctx, service, ctx: { request: { body: postDetail }}} = this
    const rule = {
      title: 'string',
      content: 'string',
      categoryId: 'number'
    }
    ctx.validate(rule)
    console.log('ctx.verifyTokenResult', ctx.verifyTokenResult)
    await service.posts.create({...postDetail, id: ctx.verifyTokenResult.id})
    return this.success({msg: ''})
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
    const { service, ctx, ctx: {request: { body }}} = this
    const rule = {
      id: 'number',
      title: 'string',
      content: 'string'
    }
    ctx.validate(rule)
    const res = await service.posts.modifyInfo(body)
    this.success(res)
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
}

module.exports = PostsController;
