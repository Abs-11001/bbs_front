# bbs_front

校园论坛前台的前端项目

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### 第三方库说明
1. vue-clipboard3

一款基于vue3的剪贴板库，可以快速将内容复制到系统剪贴板上
> https://www.npmjs.com/package/vue-clipboard3?spm=a2c6h.12873639.article-detail.5.154d57290G5XJJ

2. UndrawUI

基于vue3的UI组件，主要功能有折叠，评论，锚点，搜索，聊天

<block>tip: element-plus低于2.1.8，el-input样式会受影响；vue低于3.2.25不能正常使用</block>
> https://undraw.gitee.io/undraw-ui/


3. wangEditor

一款富文本插件，用于编写文章,开源 Web 富文本编辑器，开箱即用，配置简单
> https://www.wangeditor.com/


4. IconPark

图标库，拥有丰富且可编辑的图标资源

> https://iconpark.oceanengine.com/home


5. wangEditor markdown

在 wangEditor 中使用基本的 markdown 语法。
- 标题
    - `#`
    - `##`
    - `###`
    - `####`
    - `#####`
- 列表 `-` `+` `*`
- 引用 `>`
- 分割线 `---`
- 代码块 ```js

> https://github.com/wangeditor-team/wangEditor-plugin-md

6. js-md5

js端md5加密工具

> https://github.com/emn178/js-md5

7. nanoid

一个小巧、安全、URL友好、唯一的 JavaScript 字符串ID生成器。

> https://github.com/ai/nanoid/blob/HEAD/README.zh-CN.md

8.  pinia-plugin-persist

pinia 数据持久化插件

> https://github.com/Seb-L/pinia-plugin-persist
> https://seb-l.github.io/pinia-plugin-persist/advanced/partial-state.html