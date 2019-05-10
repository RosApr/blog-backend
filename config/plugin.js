'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  }
};
