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
nightwatch.json 的文件名是 不可以 修改的，因为 Nightwatch 每次启动的时候都是从它读取配置喔！这里的配置项很多，不过先不管它，我们接着创建文件。如果您希望查看 Nightwatch 的详细配置，请点 [这里](http://nightwatchjs.org/guide/#settings-file)。

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

二. 配置 Selenium
Selenium 是自动化测试环境，它提供了测试服务器、启动浏览器、网页自动操作等功能，同时暴露 API 给 Nightwatch 供我们使用。

我们接下来将要告诉 Nightwatch 我们的 Selenium 安装在哪里，启动浏览器的 Driver 程序在哪里，然后建立 Selenium 的安装脚本与手工启动脚本。

> Driver 是让 Selenium 打开系统上已安装的浏览器的程序。

1. 建立 Selenium 的配置信息。
在项目根目录下建立文件夹 "build"，并在其中创建文件 "selenium-conf.js"，并写入如下信息：
```
const process = require('process')

module.exports = {
    // Selenium 的版本配置信息。请在下方链接查询最新版本。升级版本只需修改版本号即可。
    // https://selenium-release.storage.googleapis.com/index.html
    selenium: {
        version: '2.53.1',
        baseURL: 'https://selenium-release.storage.googleapis.com'
    },

    // Driver 用来启动系统中安装的浏览器，Selenium 默认使用 Firefox，如果不需要使用其他浏览器，则不需要额外安装 Driver。
    // 在此我们安装 Chrome 的 driver 以便使用 Chrome 进行测试。
    driver: {
        chrome: {
            // Chrome 浏览器启动 Driver，请在下方链接查询最新版本。
            // https://chromedriver.storage.googleapis.com/index.html
            version: '2.22',
            arch: process.arch,
            baseURL: 'https://chromedriver.storage.googleapis.com'
        }
    }
} 
```
本配置信息包含 Selenium 本体配置与 Driver 配置。我们将在稍后动态载入这些配置。 本文件的目的是为了更好管理 Selenium 的版本。

2. 告诉 Nightwatch，我的 Selenium 与 Driver 在哪里。
再次打开项目根目录下的 "nightwatch.conf.js" 文件，并这样编辑：
```
const seleniumConfig = require('./build/selenium-conf')
const path = require('path')

module.exports = (function (settings) {

    // 告诉 Nightwatch 我的 Selenium 在哪里。
    settings.selenium.server_path = `${path.resolve()}/node_modules/selenium-standalone/.selenium/selenium-server/${seleniumConfig.selenium.version}-server.jar`

    // 设置 Chrome Driver, 让 Selenium 有打开 Chrome 浏览器的能力。
    settings.selenium.cli_args['webdriver.chrome.driver'] = `${path.resolve()}/node_modules/selenium-standalone/.selenium/chromedriver/${seleniumConfig.driver.chrome.version}-${seleniumConfig.driver.chrome.arch}-chromedriver`
    
    return settings;
})(require('./nightwatch.json'))
```

> 我们新加了两行配置，它们的作用如注释所示。
> 同样的，如果您希望查看更多的配置项，请点击[这里](http://nightwatchjs.org/guide/#settings-file)。

3. 建立 Selenium 安装脚本，一键安装 Selenium。
还记得上一章我们提过 selenium-standalone 只是用来安装和管理 Selenium 的工具么？所以现在是时候用它来安装 Selenium 了。我们将通过调取 selenium-standalone 的内置方法来实现自动安装。在 "build" 文件夹中建立文件 "selenium-setup.js"，并写入如下信息：
```
const selenium = require('selenium-standalone')
const seleniumConfig = require('./selenium-conf.js')

selenium.install({
    version: seleniumConfig.selenium.version,
    baseURL: seleniumConfig.selenium.baseURL,
    drivers: seleniumConfig.driver,
    logger: function (message) { console.log(message) },
    progressCb: function (totalLength, progressLength, chunkLength) {}
}, function (err) {
    if (err) throw new Error(`Selenium 安装错误: ${err}`)
    console.log('Selenium 安装完成.')
})
```
同样为了方便，我们将安装命令写入 npm scripts 中：
```
{
    ...
    "scripts": {
        "startup": "node ./startup.js",
        "selenium-setup": "node ./build/selenium-setup.js"
    },
    ...
}
```
然后在项目根目录执行 npm run selenium-setup 安装 Selenium.
当提示安装完成后，一切就绪！
执行结果：
```
> vue-todaytop@1.0.0 selenium-setup C:\Users\wangliang\vue-cli-test\vue-todaytop

> node ./build/selenium-setup.js

----------
selenium-standalone installation starting
----------

---
selenium install:
from: https://selenium-release.storage.googleapis.com/2.53/selenium-server-stand
alone-2.53.1.jar
to: C:\Users\wangliang\vue-cli-test\vue-todaytop\node_modules\_selenium-standalo
ne@6.5.0@selenium-standalone\.selenium\selenium-server\2.53.1-server.jar
---
chrome install:
from: https://chromedriver.storage.googleapis.com/2.22/chromedriver_win32.zip
to: C:\Users\wangliang\vue-cli-test\vue-todaytop\node_modules\_selenium-standalo
ne@6.5.0@selenium-standalone\.selenium\chromedriver\2.22-x64-chromedriver


-----
selenium-standalone installation finished
-----
Selenium 安装完成.
```

> Selenium 与其 Driver 会安装到 "node_modules/selenium-standalone/.selenium" 中。

4. 想要手工启动 Selenium？
默认情况下，Selenium 是由 Nightwatch 启动的，不需要手工干预，不过如果想要手工启动当然是可以的啦。
在 build 文件夹中建立文件 "selenium-start.js"，并写入如下信息：
```
const selenium = require('selenium-standalone')
const seleniumConfig = require('./selenium-conf.js')

selenium.start({
    drivers: seleniumConfig.driver
}, function (err, child) {
    if (err) throw new Error(`Selenium 启动失败: ${err}`)
    console.log(`Selenium 已手工启动，进程 PID: ${child.pid}`)
    console.log('当不再需要运行 Selenium 时可关闭此 PID 进程.')
})
```
然后同样添加启动命令至 npm scripts 中：
```
{
    ...
    "scripts": {
        "start": "node ./startup.js",
        "selenium-setup": "node ./build/selenium-setup.js",
        "selenium-start": "node ./build/selenium-start.js"
    },
    ...
}  
```
以后使用命令 npm run selenium-start 就可以手工启动 Selenium 了。

至此，我们的配置与安装工作已经完成，项目结构应该为：
```
>
| -- build
|      | -- selenium-conf.js        # Selenium 版本信息配置。
|      | -- selenium-setup.js       # Selenium 安装命令脚本。
|      | -- selenium-start.js       # Selenium 启动命令脚本。
|
| -- nightwatch.conf.js             # Nightwatch 动态配置文件。
| -- nightwatch.json                # Nightwatch 配置文件。
| -- package.json                   # 项目信息配置文件。
| -- startup.js                     # 测试启动入口文件。
```

#### nightwatch.json文件注意事项
* 请注意 "desiredCapabilities" 下的 "browserName" 项，这是测试时将使用的浏览器，您可以修改为 chrome、internet explorer、phantomjs，本文在介绍时只安装了 Chrome 的 Driver，如果您需要使用其他浏览器，要安装相应的 Driver 才可以正常使用。
* 默认浏览器为 Firefox，如果您使用 Firefox 的话，不需要额外进行 Driver 的配置。
* 所以，如果您需要使用 Chrome 的话请将 "browserName" 修改为 "chrome" 喔！
```
...
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
...
```





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
