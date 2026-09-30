# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指引。

## 项目简介

`dsh-client-ui-cat` —— 一个 DeepSeek Harness 客户端插件（在 Web UI 里游荡的小猫）。npm 包位于 `cat-plugin/`；仓库根目录存放 README 和预览素材。纯 JS，无框架、无打包器、无测试、无 linter、无 CI。

## 常用命令

在 `cat-plugin/` 目录下执行：

```bash
npm run check      # 对 lib/client.js + lib/index.js 做 node --check 语法检查（prepack 时也会自动跑）
npm run gen:skins  # 从 assets/cats/*.svg 重新生成 skins.txt
npm run splice     # 把 svg.css + markup.txt + skins.txt 拼接进 lib/client.js
```

## 关键坑

- **`lib/client.js` 既是入库的 bundle，也被直接手改。** 它的 CSS 存在两份：`svg.css`（源文件）和 `client.js` 内的 `CAT_CSS` 模板字符串；`markup.txt` 同样与 `root.innerHTML` 表达式重复。每次修改必须**两边同步**，否则会悄悄分叉。
- **`surgery.cjs` 不幂等** —— 它把 `skins.txt` 插到 `function apply(ctx) {` 之前，对已拼接过的 `client.js` 再跑一遍会复制整个 SKINS 块（它的 `CAT_W = 67` 修正也只匹配未拼接的原始文件）。只能在干净的副本上运行。
- **两个构建脚本都硬编码了绝对路径** `/Users/wuyadong/src/dsh-cat/cat-plugin`，只在这台机器的这个 checkout 下可用。
- **发布必须指定官方 registry**：本机默认是 `registry.npmmirror.com`（镜像源，拒绝 publish）。使用 `npm publish --registry=https://registry.npmjs.org`。`files` 白名单只发布 `lib/`、`cat.svg` 和两个 README。
- **翻转/渲染架构**：朝向变换作用在 `.dsh-cat-flip` 上（`scaleX(-1)`），但 overlay 元素（`.dsh-cat-fx`、`.dsh-cat-star`、`.dsh-cat-bump`）是 `root` 的直接子元素，**不会**跟着镜像 —— 每个都需要自己的 `--face-left` 规则或 JS 定位，否则会跑到猫屁股那边。
- `client.js` 里的 `DEBUG_POOP_EVERY_10S` 是调试开关（固定 10 秒拉一次粑粑、不睡觉）；提交的代码中保持 `false`。

## 工作流约定

- **提交**：agent 可自由 commit；`npm publish` / `git push` 仅在明确要求时执行。
- **验证渲染/动画改动**：把 `cat-plugin/lib/client.js` 复制到 DSH profile 的 `node_modules/dsh-client-ui-cat/lib/client.js`，然后刷新 harness UI（服务器直接提供该文件，无需重新构建）。
- **README 有两对副本** —— 根目录（`README.md` / `README.zh-CN.md`，GitHub 用）和 `cat-plugin/`（随 npm 发布）。所有面向用户的改动需在四份中同步。
- Commit message：描述性句子、祈使语气，不使用 conventional-commit 前缀。
