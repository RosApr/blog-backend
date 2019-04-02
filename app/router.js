'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 文章
  router.get('/api/posts', controller.posts.queryPostsList);
  router.get('/api/posts/:id', controller.posts.queryPostsInfo);
  router.post('/api/posts', controller.posts.createPosts);
  router.put('/api/posts/:id', controller.posts.modifyPostsInfo);
  router.delete('/api/posts/:id', controller.posts.delPosts);
  router.get('/api/posts/:id/pv', controller.posts.addPostsPv)
  router.get('/api/posts/:id/star', controller.posts.addPostsStar)
  // 搜索
  router.get('/api/posts/search', controller.posts.search)
  // 用户
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/register', controller.user.register);
  router.put('/api/user', controller.user.modifyUserInfo);
  // 分类
  router.get('/api/categories', controller.categories.queryCategoriesList)
  router.get('/api/categories/:id', controller.categories.queryCategoriesInfo)
  router.post('/api/categories', controller.categories.createCategories)
  router.put('/api/categories/:id', controller.categories.modifyCategoriesInfo)
  router.delete('/api/categories/:id', controller.categories.delCategories)
};
