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
  const config = exports = {};

  config.elasticsearch = {
    host: 'localhost:9200',
    apiVersion: '5.6',
  };

  config.security = {
    csrf: {
      // 关闭csrf 验证机制
      enable: false,
    },
    // eslint-disable-next-line comma-dangle
    domainWhiteList: [ '*' ]
  };
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601970799891_5149';

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
