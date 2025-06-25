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
- 拼音（pinyin）
- 注音符号（zhuyin）

### 语言切换方式
- 默认根据浏览器语言自动切换。
- 某些地区会根据IP自动切换对应语言。
- 可通过 URL 参数 `?lang=xx` 强制指定语言，例如 `?lang=en`。
- 控制台可用 `setLang('xx')` 动态切换语言。

### 相关文件
- `public/js/lang.js`：主站首页多语言脚本，负责语言检测与内容切换。
- `public/css/lang-responsive.css`：多语言下的响应式样式优化。
- `set/public/lang.js`：后台管理系统的多语言包。

## 考试倒计时功能

网站集成了考试倒计时功能，会根据用户地理位置显示不同的倒计时信息：

### 功能特点
- 吉林省内用户显示中考/高考倒计时
- 自动根据时间显示2025年中考或2028年高考倒计时
- 移动端和桌面端有不同的显示位置和动画效果
- 短暂显示后会自动消失，避免干扰用户浏览

### 技术实现
- 通过IP地址API检测用户所在地区
- 计算精确到小数点后5位的剩余天数
- 响应式设计，在移动设备上位于页面底部

### 调试命令
- `setRegion('地区名')` - 设置用户地区
- `setJilin()` - 快速设置为吉林省
- `setNonJilin()` - 快速设置为非吉林地区
- `testZhongkaoOver()` - 测试中考后时间场景
- `testBeforeZhongkao()` - 测试中考前时间场景
- `resetTestDate()` - 重置为真实时间
- `resetRegion()` - 重置为自动检测
- `showRegionStatus()` - 显示当前状态

### 相关文件
- `public/js/countdown.js`：倒计时核心逻辑
- `public/css/countdown.css`：倒计时样式表

## 目录结构

```
phosoftweb-home/
├── public/              # 网站主要文件
│   ├── css/             # 样式表文件
│   │   ├── 404.css      # 404错误页面样式
│   │   ├── about.css    # 关于页面样式
│   │   ├── countdown.css # 倒计时功能样式
│   │   ├── lang-responsive.css # 多语言响应式样式
│   │   └── wu.css       # 公共样式
│   ├── js/              # JavaScript文件
│   │   ├── about.js     # 关于页面脚本
│   │   ├── countdown.js # 考试倒计时脚本
│   │   ├── grayscale.js # 灰度滤镜脚本
│   │   ├── lang.js      # 多语言切换脚本
│   │   └── watermark.js # 水印效果脚本
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
- 考试倒计时功能，区域性个性化显示
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
