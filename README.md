# PhosoftWeb 个人主页

## 项目介绍

这是一个基于纯HTML、CSS和JavaScript构建的个人网站项目，包含主页、关于页等内容。项目支持响应式布局，适配不同设备屏幕大小。

## 本地化与多语言支持

本项目支持多语言自动切换，已内置以下语言：
- 简体中文（zh-cn）
- 繁体中文（zh-tw, zh-hk）
- 英语（en, en-sg）
- 日语（ja）
- 文言文（wenyan）

### 语言切换方式
- 默认根据浏览器语言自动切换。
- 某些地区会根据IP自动切换对应语言。
- 可通过 URL 参数 `?lang=xx` 强制指定语言，例如 `?lang=en`。
- 控制台可用 `setLang('xx')` 动态切换语言。

### 相关文件
- `public/js/lang.js`：主站首页多语言脚本，负责语言检测与内容切换。
- `public/css/lang-responsive.css`：多语言下的响应式样式优化。
- `set/public/lang.js`：后台管理系统的多语言包。

## 目录结构

```
phosoftweb-home/
├── public/              # 网站主要文件
│   ├── css/             # 样式表文件
│   │   ├── 404.css      # 404错误页面样式
│   │   ├── about.css    # 关于页面样式
│   │   ├── lang-responsive.css # 多语言响应式样式
│   │   └── wu.css       # 公共样式
│   ├── js/              # JavaScript文件
│   │   ├── about.js     # 关于页面脚本
│   │   ├── grayscale.js # 灰度滤镜脚本
│   │   └── lang.js      # 多语言切换脚本
│   ├── img/             # 图片资源
│   │   ├── A-logo.svg   # Phosoft图标
│   │   └── bilibili.svg # 哔哩哔哩图标
│   ├── fonts/           # 字体文件
│   │   └── HarmonyOS_Sans_Medium.ttf
│   ├── video/           # 视频资源
│   │   └── video.mp4    # 视频
│   ├── index.html       # 网站首页
│   ├── about.html       # 关于页面
│   ├── IE303.html       # IE浏览器不兼容提示页
│   ├── 404.html         # 404错误页面
│   ├── robots.txt       # 爬虫协议
│   ├── sitemap.xml      # 网站地图
│   └── config.yaml      # 站点配置
├── set/                 # 内容管理系统
│   ├── public/          # 管理系统前端
│   │   ├── index.html   # 管理系统首页
│   │   ├── styles.css   # 管理系统样式
│   │   ├── script.js    # 管理系统脚本
│   │   └── lang.js      # 管理系统多语言包
│   ├── package.json     # 管理系统依赖
│   └── server.js        # 管理系统后端
├── README.md            # 项目说明文档
```


## 技术栈

- 前端：HTML5、CSS3、JavaScript
- 字体：HarmonyOS Sans
- 管理系统：Express.js、Cheerio

## 功能特点

- 响应式设计，适配桌面和移动设备
- 动画过渡效果增强用户体验
- 特定纪念日自动应用灰度滤镜
- 触摸屏滑动操作支持
- 内置内容管理系统，便于维护关于页内容

## 部署方式

1. 静态部署：将`public`目录部署到任意静态网站托管服务
2. 使用GitLab Pages或Vercel等平台自动部署

## 使用内容管理系统

1. 安装依赖：`npm install`
2. 启动管理服务：`node set/server.js`
3. 访问：`http://localhost:3000`
4. 通过界面编辑关于页内容，点击保存即可更新网站

## 开发与扩展

- 添加新页面：在`public`目录创建HTML文件
- 修改样式：编辑`css`目录下的样式文件
- 增加功能：在`js`目录添加脚本文件

## 兼容性

网站支持现代浏览器，对不兼容的浏览器（如IE）会显示特殊提示页面。

## 版权与免责声明

本网站由原罪_超凡开发，GitHub Copilot 优化，部分内容可能含有作者不知情被用于模型训练的代码，仅供交流学习，不可商用。
