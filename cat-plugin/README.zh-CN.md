# dsh-client-ui-cat · 在 DeepSeek Harness 里游荡的小橘猫

一只会在 **DeepSeek Harness** Web 界面里到处逛的小猫：沿着文字和组件的上边缘行走、跳上台阶、嗅探、冲刺、从边缘掉下去摔伤再爬起来、大部分时间趴着睡觉，还会让你撸。

![小猫预览](cat.svg)

## 功能特性

- 🐾 沿着页面元素（段落、标题、卡片、按钮……）的上边缘行走
- 🪜 跳上台阶、奔跑、嗅嗅、舔毛，**大部分时间在睡觉**（每次 12–24 秒，休息时约 75% 概率直接睡）
- 🏔️ 走到边缘尽头会掉下去——头晕、冒星星、头上起包，然后自己恢复
- ❤️ 点击撸猫：粉色小心心 + 呼噜声；摔伤后点一下还能立刻恢复
- 🎨 右键切换 **6 种皮肤**（橘猫 / 白猫 / 奶牛猫 / 黑猫 / 灰猫 / 暹罗猫）
- 💾 **记住上次的颜色**：刷新页面或重启插件后自动恢复（存于 `localStorage["dsh-cat-skin"]`）
- 🚶 滚动页面或调整窗口大小时会自动发现新的可走边缘
- ♿ 尊重系统的「减少动态效果」设置

## 安装

已发布到 **npm**：[`dsh-client-ui-cat`](https://www.npmjs.com/package/dsh-client-ui-cat)。一条命令装进你的 DeepSeek Harness profile：

```bash
dsh plugin --profile web add dsh-client-ui-cat
```

然后在 profile 的 `cordis.patch.yml` 里加一条 loader 条目（文件不存在就新建）：

```yaml
- insert:
    - id: ui-cat
      name: 'dsh-client-ui-cat'
```

重启 harness 并刷新页面——小猫会出现在页面底部，开始四处探险。

> **无需构建、无需复制粘贴。** 包声明了 `dsh.client`，client-modules 会在启动时自动加载。如果不使用 `dsh plugin`，在 profile 目录里执行 `npm install dsh-client-ui-cat` 同样有效。

### 手动安装（用本仓库源码）

把 `cat-plugin/` 目录复制到 profile 的 `web/node_modules` 下，命名为 `dsh-client-ui-cat`，再按上面的方式在 `cordis.patch.yml` 里注册即可。

## 使用方法

| 操作 | 效果 |
| --- | --- |
| 左键点击 | 撸猫（爱心 + 呼噜声）；摔伤后点击可立即恢复 |
| 按住拖动 | 把猫拎起来，松开放下 |
| 右键点击 | 切换下一种皮肤（橘猫 / 白猫 / 奶牛猫 / 黑猫 / 灰猫 / 暹罗猫） |

## 开发

浏览器端 bundle（`lib/client.js`）由 `surgery.cjs` 从三份源文件拼装而成：

```text
svg.css       →  猫的样式与关键帧动画（内联为 CAT_CSS）
markup.txt    →  根节点 innerHTML 模板
skins.txt     →  生成的皮肤数据 + renderSkin()
```

工作流：

```bash
# 1. 修改 assets/cats/ 下的皮肤 SVG 后，重新生成 skins.txt
node gen-skins.cjs

# 2. 修改 svg.css / markup.txt 后，把它们拼进 lib/client.js
node surgery.cjs
```

> 注意：`surgery.cjs` 是**原地拼接进** `lib/client.js` 的——对已经包含 skins 块的 bundle 再跑一遍会重复插入。请保持三份源文件与 `client.js` 同步，或从干净的副本重新拼接。

## 发布

本包是纯源码、无构建步骤：`lib/client.js` 是可直接加载的 ES module，CSS 已内联，因此任意分发渠道都可用：

```bash
# 发布到 npm（files 白名单：lib/、cat.svg、README）
npm publish

# 或分发 tarball
npm pack          # → dsh-client-ui-cat-0.1.0.tgz
dsh plugin --profile web add ./dsh-client-ui-cat-0.1.0.tgz

# 或直接从 git 安装（本包无需构建）
dsh plugin --profile web add github:you/dsh-client-ui-cat
```

`npm pack` 会先跑 `prepack` → `npm run check`（对两个 lib 文件做语法检查）再打包。

### 项目结构

```text
cat-plugin/
├── lib/
│   ├── index.js        # 宿主端（空实现）
│   └── client.js       # 浏览器端——小猫的完整运行时
├── assets/cats/        # 6 种行走皮肤 + 剪影
├── svg.css             # 猫的样式与动画
├── markup.txt          # innerHTML 模板片段
├── skins.txt           # 生成的皮肤数据（gen-skins.cjs 的输出）
├── gen-skins.cjs       # 皮肤生成器
├── surgery.cjs         # bundle 拼装脚本
├── cordis.patch.yml    # profile loader patch 示例
└── package.json
cat.svg                 # 默认行走皮肤（cat-orange.svg，即 README 预览图）
cat-preview.html        # 独立预览页（直接加载 lib/client.js）
```

## License

MIT
