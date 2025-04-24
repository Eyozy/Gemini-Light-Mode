# Gemini 亮色模式强制脚本

[English Version](README_EN.md)

一个 Tampermonkey 用户脚本，用于强制 [Google Gemini](https://gemini.google.com/) 始终使用亮色主题。

## 简介

Google Gemini 通常会跟随系统主题偏好或用户之前的选择。本脚本将覆盖此行为，强制在以下界面使用亮色主题：

- 主聊天界面
- 侧边栏和导航栏
- 所有 UI 元素

## ✨ 功能特性

### 核心功能

- 通过管理 body 类强制亮色模式
- 注入自定义 CSS 覆盖暗色主题变量
- 在页面导航和刷新时保持亮色主题

### 技术实现

- 使用 `MutationObserver` 监控主题变化
- 在 `document-start` 运行防止主题闪烁
- 应用 `!important` CSS 规则确保优先级
- 兼容最新 Gemini UI（截至 2025 年 4 月）

### 用户体验

- 无需配置
- 安装后立即生效
- 轻量级（小于 5KB)

## 🚀 安装指南

1. **安装 Tampermonkey**:

   - Chrome: [Tampermonkey 应用商店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Tampermonkey 扩展](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - Edge: [Tampermonkey 微软商店](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iinmkddhdlojikpfnpnppnbhicjjldce)

2. **安装脚本**:

   - 打开 Tampermonkey 控制面板
   - 点击"创建新脚本"
   - 复制 `gemini_light_mode.user.js` 的全部内容
   - 粘贴到编辑器中（覆盖默认内容）
   - 保存 (Ctrl+S 或 文件 → 保存）

3. **验证安装**:
   - 访问 [Gemini](https://gemini.google.com/)
   - 页面现在应始终以亮色模式加载
   - 检查 Tampermonkey 控制面板确认脚本已启用

## ⚙️ 技术细节

### CSS 注入

脚本使用 `GM_addStyle` 注入关键 CSS 规则：

- 覆盖 Gemini 的暗色主题变量
- 强制背景、文本和 UI 元素使用亮色
- 确保所有组件风格一致

### 类管理

脚本通过以下方式维持亮色主题：

1. 移除现有的 `dark-theme` 类
2. 添加 `light-theme` 类（如果不存在）
3. 通过 `MutationObserver` 监控变化

### 性能

- 资源占用极低
- 仅在 gemini.google.com 激活
- 高效的 DOM 观察机制

## ⚠️ 注意事项与故障排除

### 兼容性

- 测试版本：Gemini UI 2025 年 4 月版
- 如果 Google 更新前端代码可能需要相应更新

### 常见问题

1. **主题闪烁**:

   - 确保脚本在 `document-start` 运行
   - 检查与其他用户脚本的冲突

2. **脚本不工作**:

   - 确认 Tampermonkey 已启用
   - 检查脚本在 gemini.google.com 是否激活
   - 清除缓存并强制刷新 (Ctrl+F5)

3. **部分样式未生效**:
   - 可能是 Google 更改了 CSS 变量
   - 检查控制台是否有错误

## 📜 更新日志

### v1.0 (2025-04-25)

- 初始版本
- 基础亮色主题强制功能
- 侧边栏样式修复

## 👤 作者

[您的名字]

## 📄 许可证

MIT 许可证 - 详情见 [LICENSE](LICENSE)
