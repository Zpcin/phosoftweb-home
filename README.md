# PhosoftWeb 个人主页

## 项目介绍

这是一个基于纯HTML、CSS和JavaScript构建的个人网站项目，包含主页、关于页等内容。项目支持响应式布局，适配不同设备屏幕大小。

## 目录结构

```
phosoftweb-home/
├── public/              # 网站主要文件
│   ├── css/             # 样式表文件
│   ├── js/              # JavaScript文件
│   ├── img/             # 图片资源
│   ├── fonts/           # 字体文件
│   ├── video/           # 视频资源
│   ├── index.html       # 网站首页
│   ├── about.html       # 关于页面
│   └── IE303.html       # IE浏览器不兼容提示页
├── set/                 # 内容管理系统
│   ├── public/          # 管理系统前端
│   └── server.js        # 管理系统后端
└── README.md            # 项目说明文档
```

## 技术栈

- 前端：HTML5、CSS3、JavaScript
- 字体：HarmonyOS Sans
- 管理系统：Express.js、Cheerio

## 功能特点

- 响应式设计，适配桌面和移动设备
- 动画过渡效果增强用户体验
- 灰度模式支持
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
