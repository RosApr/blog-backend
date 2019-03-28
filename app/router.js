'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/api/list', controller.post.index);
  router.post('/api/publish', controller.post.publishPost);
  router.get('/api/detail/:id', controller.post.detail);
  router.post('/api/login', controller.user.login);
  router.post('/api/register', controller.user.register);
  router.post('/api/logout', controller.user.logout);
};
