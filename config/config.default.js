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
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
