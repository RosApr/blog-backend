/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    mysql: {
      client: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '871128',
        database: 'blog_study'
      },
      app: true,
      agent: false
    },
    jwt: {
      secret: '123'
    },
    // session: {
    //   key: 'user',
    //   maxAge: .5 * 3600 * 1000, // 半小时
    //   httpOnly: true,
    //   encrypt: true
    // },
    cluster: {
      listen: {
        port: 3000,
      }
    },
    security: {
      csrf: {
        enable: false,
      }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553065144061_4784';
  // global api path
  config.apiPath = {
    posts: '/api/posts',
    user: '/api/user',
    categories: '/api/categories'
  }
  // add your middleware config here
  config.middleware = ['formatResponse'];
  config.ROLE = {
    root: 'root',
    user: 'user',
    anonymous: 'anonymous'
  }
  config.auth = {
    pathsConfig: [
      /**
       * 文章
       */
      {
        match: `${config.apiPath.posts}`,
        type: 'get',
        name: 'posts.queryList',
        role: [config.ROLE.root, config.ROLE.user, config.ROLE.anonymous],
        controller: 'posts.queryList'
      },
      {
        match: `${config.apiPath.posts}/:id`,
        type: 'get',
        name: 'posts.queryInfo',
        role: [config.ROLE.root, config.ROLE.user, config.ROLE.anonymous],
        controller: 'posts.queryInfo'
      },
      {
        match: `${config.apiPath.posts}`,
        type: 'post',
        name: 'posts.create',
        role: [config.ROLE.root, config.ROLE.user],
        controller: 'posts.create'
      },
      {
        match: `${config.apiPath.posts}/:id`,
        type: 'put',
        name: 'posts.modifyInfo',
        role: [config.ROLE.root, config.ROLE.user],
        controller: 'posts.modifyInfo'
      },
      {
        match: `${config.apiPath.posts}/:id`,
        type: 'delete',
        name: 'posts.del',
        role: [config.ROLE.root, config.ROLE.user],
        controller: 'posts.del'
      },
      {
        match: `${config.apiPath.posts}/:id/pv`,
        type: 'get',
        name: 'posts.pv',
        role: [config.ROLE.root, config.ROLE.user, config.ROLE.anonymous],
        controller: 'posts.pv'
      },
      {
        match: `${config.apiPath.posts}/:id/favorite`,
        type: 'get',
        name: 'posts.favorite',
        role: [config.ROLE.root, config.ROLE.user],
        controller: 'posts.favorite'
      },
      {
        match: `${config.apiPath.posts}/search`,
        type: 'get',
        name: 'posts.search',
        role: [config.ROLE.root, config.ROLE.user, config.ROLE.anonymous],
        controller: 'posts.search'
      },
      /**
       * 用户
       */
      {
        match: `${config.apiPath.user}/login`,
        type: 'post',
        role: [config.ROLE.root, config.ROLE.user, config.ROLE.anonymous],
        name: 'user.login',
        controller: 'user.login'
      },
      {
        match: `${config.apiPath.user}/logout`,
        type: 'post',
        role: [config.ROLE.root, config.ROLE.user],
        name: 'user.logout',
        controller: 'user.logout'
      },
      {
        match: `${config.apiPath.user}/register`,
        type: 'post',
        name: 'user.register',
        role: [config.ROLE.root, config.ROLE.user, config.ROLE.anonymous],
        controller: 'user.register'
      },
      {
        match: `${config.apiPath.user}`,
        type: 'put',
        role: [config.ROLE.root, config.ROLE.user],
        name: 'user.modifyInfo',
        controller: 'user.modifyInfo'
      },
      {
        match: `${config.apiPath.user}/list`,
        type: 'get',
        role: [config.ROLE.root],
        name: 'user.queryUserList',
        controller: 'user.queryUserList'
      },
      {
        match: `${config.apiPath.user}/resetPwd`,
        type: 'put',
        role: [config.ROLE.root],
        name: 'user.resetPwd',
        controller: 'user.resetPwd'
      },
      /**
       * 分类
       */
      {
        match: `${config.apiPath.categories}`,
        type: 'get',
        name: 'categories.queryList',
        role: [config.ROLE.root, config.ROLE.user, config.ROLE.anonymous],
        controller: 'categories.queryList'
      },
      {
        match: `${config.apiPath.categories}/:id`,
        type: 'get',
        role: [config.ROLE.root],
        name: 'categories.queryInfo',
        controller: 'categories.queryInfo'
      },
      {
        match: `${config.apiPath.categories}`,
        type: 'post',
        name: 'categories.create',
        role: [config.ROLE.root],
        controller: 'categories.create'
      },
      {
        match: `${config.apiPath.categories}/:id`,
        type: 'put',
        name: 'categories.modifyInfo',
        role: [config.ROLE.root],
        controller: 'categories.modifyInfo'
      },
      {
        match: `${config.apiPath.categories}/:id`,
        type: 'delete',
        name: 'categories.del',
        role: [config.ROLE.root],
        controller: 'categories.del'
      },
    ] 
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
