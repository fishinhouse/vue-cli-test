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
