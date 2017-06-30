const path = require('path')

module.exports = (function (settings) {
      return settings;
})(require('./nightwatch.json'))

/*
 *  Nightwatch 会从 nightwatch.json 中读取配置。
 *  不过如果存在 nightwatch.conf.js，将会变为首先从后者中读取配置。
 *  nightwatch.conf.js 存在的意义是使用 JavaScript 动态生成配置信息。
 *  如果配置信息是不需要代码修改的，直接使用 nightwatch.json 就可以啦。
 */