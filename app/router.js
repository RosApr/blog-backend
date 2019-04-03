'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { apiPath } = app.config;
  const auth = app.middleware.auth()
  router.get('/', controller.home.index);
  /**
   * 文章
   */
  router.get(`${apiPath.posts}`, controller.posts.queryList);
  router.get(`${apiPath.posts}/:id`, controller.posts.queryInfo);
  router.post(`${apiPath.posts}`, auth, controller.posts.create);
  router.put(`${apiPath.posts}/:id`, auth, controller.posts.modifyInfo);
  router.delete(`${apiPath.posts}/:id`, auth, controller.posts.del);
  router.get(`${apiPath.posts}/:id/pv`, auth, controller.posts.pv)
  router.get(`${apiPath.posts}/:id/favorite`, auth, controller.posts.favorite)
  /**
   * 搜索
   */

  router.get(`${apiPath.posts}/search`, controller.posts.search)
  /**
   * 用户
   */
  router.post(`${apiPath.user}/login`, controller.user.login);
  router.post(`${apiPath.user}/logout`, auth, controller.user.logout);
  router.post(`${apiPath.user}/register`, controller.user.register);
  router.put(`${apiPath.user}`, auth, controller.user.modifyInfo);
  /**
   * 分类
   */
  router.get(`${apiPath.categories}`, controller.categories.queryList)
  router.get(`${apiPath.categories}/:id`, auth, controller.categories.queryInfo)
  router.post(`${apiPath.categories}`, auth, controller.categories.create)
  router.put(`${apiPath.categories}/:id`, auth, controller.categories.modifyInfo)
  router.delete(`${apiPath.categories}/:id`, auth, controller.categories.del)
};
