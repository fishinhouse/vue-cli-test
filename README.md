### 安装总结

```
> vue init webpack vue-todaytop

? Project name vue-todaytop
? Project description A Vue.js project
? Author fishinhouse
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes

   vue-cli · Generated "vue-todaytop".

   To get started:

     cd vue-todaytop
     npm install
     npm run dev

   Documentation can be found at https://vuejs-templates.github.io/webpack
```
执行安装包指令
```
npm install
```
安装成功
```
√ Installed 65 packages
√ Linked 0 latest versions
√ Run 0 scripts
√ All packages installed (used 71ms, speed 0B/s, json 0(0B), tarball 0B)
```

### 安装工具
然后我们将安装 Selenium 与 Nightwatch。

* 安装 selenium-standalone：
```
npm install selenium-standalone --save-dev
```
* 安装 Nightwatch:
```
npm install nightwatch --save-dev
```

### 项目配置
我们先开始配置 Nightwatch，之前提到这是一款 Test Runner 来着，它负责读取我们的测试脚本，为我们提供 API 来操作浏览器，帮我们控制 Selenium。

一. 配置 Nightwatch
1. 首先，在项目根目录建立文件 "nightwatch.json"，这个文件用来存放 Nightwatch 的配置信息。创建完毕之后，在文件内写入以下内容：
```
{
     "src_folders": ["tests"],
     "output_folder": "reports",
     "custom_commands_path": "",
     "custom_assertions_path": "",
     "page_objects_path": "",
     "globals_path": "",

     "selenium": {
       "start_process": true,
       "server_path": "",
       "log_path": "",
       "host": "127.0.0.1",
       "port": 4444,
       "cli_args": {
         "webdriver.chrome.driver": ""
       }
     },

     "test_settings": {
       "default": {
         "launch_url": "http://localhost",
         "selenium_port": 4444,
         "selenium_host": "localhost",
         "silent": true,
         "screenshots": {
           "enabled": false,
           "path": ""
         },
         "desiredCapabilities": {
           "browserName": "firefox",
           "javascriptEnabled": true,
           "acceptSslCerts": true
         }
       },

       "chrome" : {
         "desiredCapabilities": {
           "browserName": "chrome",
           "javascriptEnabled": true,
           "acceptSslCerts": true
         }
       }
     }
}
```
nightwatch.json 的文件名是 不可以 修改的，因为 Nightwatch 每次启动的时候都是从它读取配置喔！这里的配置项很多，不过先不管它，我们接着创建文件。如果您希望查看 Nightwatch 的详细配置，请点 (这里)[http://nightwatchjs.org/guide/#settings-file]。

2. 接着在项目根目录下创建文件 "nightwatch.conf.js" ，同样此文件名也是不可以修改的，因为 Nightwatch 每次启动也会从它这里读取配置。
创建完毕后，打开文件，并写入如下内容：
```
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
 ```
 3. 再次在项目根目录建立文件 "startup.js"，然后在文件内部写入：
```
require('nightwatch/bin/runner.js')
```
这个文件就是我们测试的入口文件，以后我们要执行测试就要运行这个文件，命令为 node ./startup。入口文件的名字是可以按照喜好更改的，只要运行它就好啦。不过每次输入 node ./startup 太麻烦了，所以我们将这条命令写入 npm scripts 中,打开 "package.json"，在 JSON 对象中建立 "script" 属性，并写入内容：
```
{
    ...
    "scripts": {
        "start": "node ./startup.js"
    },
    ...
}
```
以后每次运行测试只要在项目根目录中执行 npm start 就好了！
Nightwatch 的配置暂时告一段落（其实马上就会回来………），接下来我们来处理 Selenium.




### vue-cli脚手架引入Element UI
1. 安装 loader 模块
```
cnpm install style-loader -D
cnpm install css-loader -D
cnpm install file-loader -D
```
2. 安装 Element-UI 模块
```
cnpm install element-ui -S
```
3. 在 main.js 中引入
```
import ElementUI from ‘element-ui‘
import ‘element-ui/lib/theme-default/index.css‘
Vue.use(ElementUI)
```
