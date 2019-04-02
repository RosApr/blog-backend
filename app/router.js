'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const { path: apiPath } = require('./config')

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  /**
   * 文章
   */
  router.get(`${apiPath.posts}`, controller.posts.queryList);
  router.get(`${apiPath.posts}/:id`, controller.posts.queryInfo);
  router.post(`${apiPath.posts}`, controller.posts.create);
  router.put(`${apiPath.posts}/:id`, controller.posts.modifyInfo);
  router.delete(`${apiPath.posts}/:id`, controller.posts.del);
  router.get(`${apiPath.posts}/:id/pv`, controller.posts.pv)
  router.get(`${apiPath.posts}/:id/favorite`, controller.posts.favorite)
  /**
   * 搜索
   */

  router.get(`${apiPath.posts}/search`, controller.posts.search)
  /**
   * 用户
   */
  router.post(`${apiPath.user}/login`, controller.user.login);
  router.post(`${apiPath.user}/logout`, controller.user.logout);
  router.post(`${apiPath.user}/register`, controller.user.register);
  router.put(`${apiPath.user}`, controller.user.modifyInfo);
  /**
   * 分类
   */
  router.get(`${apiPath.categories}`, controller.categories.queryList)
  router.get(`${apiPath.categories}/:id`, controller.categories.queryInfo)
  router.post(`${apiPath.categories}`, controller.categories.create)
  router.put(`${apiPath.categories}/:id`, controller.categories.modifyInfo)
  router.delete(`${apiPath.categories}/:id`, controller.categories.del)
};
