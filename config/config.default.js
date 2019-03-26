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
    session: {
      key: 'user',
      maxAge: .5 * 3600 * 1000, // 半小时
      httpOnly: true,
      encrypt: true
    },
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

  // add your middleware config here
  config.middleware = ['storeAuth', 'formatResponse'];
  config.storeAuth = {
    match: [
      '/api/login',
      '/api/logout',
      '/api/register'
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
