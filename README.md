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
- `public/js/about-lang.js`：关于页面多语言内容与切换逻辑。
- `set/public/lang.js`：后台管理系统的多语言包。

## 考试倒计时功能

网站集成了考试倒计时功能，会根据用户地理位置显示不同的倒计时信息：

### 功能特点
- 显示中考/高考倒计时
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

## 特殊日期纪念功能

网站会在特定的纪念日自动切换成黑白模式，同时在网页标题和浏览器控制台显示纪念信息，以表达对重大历史事件和人物的纪念。

### 支持的纪念日
- 清明节（4月3日-6日）
- 新冠肺炎哀悼日（4月4日）
- 青海玉树地震纪念日（4月14日）
- 汶川地震纪念日（5月12日）
- 利迪策惨案纪念日（6月10日）
- 七七事变纪念日（7月7日）
- 世界慰安妇纪念日（8月14日）
- 毛主席逝世纪念日（9月9日）
- 九一八事变纪念日（9月18日）
- 烈士纪念日（9月30日）
- 抗美援朝纪念日（10月25日）
- 南京大屠杀死难者国家公祭日（12月13日）

### 功能特点
- 自动检测当前日期并与纪念日比对
- 在纪念日自动将整个网站应用黑白滤镜效果
- 在网页标题前添加相应的纪念日信息
- 在浏览器控制台以黑底白字的方式显示纪念信息

### 相关文件
- `public/js/grayscale.js`：特殊日期检测及黑白滤镜应用

## 目录结构

```
phosoftweb-home/
├── public/              # 网站主要文件
│   ├── css/             # 样式表文件
│   │   ├── 404.css      # 404错误页面样式
│   │   ├── countdown.css # 倒计时功能样式
│   │   ├── lang-responsive.css # 多语言响应式样式
│   │   ├── modal.css    # 关于弹窗样式
│   │   └── wu.css       # 公共样式
│   ├── js/              # JavaScript文件
│   │   ├── about.js     # 关于页面脚本
│   │   ├── countdown.js # 考试倒计时脚本
│   │   ├── grayscale.js # 灰度滤镜脚本
│   │   ├── lang.js      # 多语言切换脚本
│   │   └── about-lang.js # 关于页面多语言脚本
│   ├── img/             # 图片资源
│   │   ├── A-logo.svg   # Phosoft图标
│   │   ├── ISC.svg      # ISC图标
│   │   └── bilibili.svg # 哔哩哔哩图标
│   ├── fonts/           # 字体文件
│   │   └── HarmonyOS_Sans_Medium.ttf
│   ├── video/           # 视频资源
│   │   └── video.mp4    # 视频
│   ├── index.html       # 网站首页
│   ├── IE303.html       # 老旧浏览器不兼容提示页
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
│   ├── update-about.js  # 内容更新工具
│   └── server.js        # 管理系统后端
└── README.md            # 项目说明文档
```


## 技术栈

- 前端：HTML5、CSS3、JavaScript
- 字体：HarmonyOS Sans
- 管理系统：Node.js

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


## 友情链接管理指南

本项目的友情链接由 `set/links.json` 统一管理，支持多语言和排序。

### 操作步骤
1. **提取现有链接配置**（首次使用或手动修改代码后）：
   ```bash
   node set/update-links.js extract
   ```
   这会生成 `set/links.json` 文件。
2. **编辑链接**：直接修改 `set/links.json`，可增删、排序、修改 url 和多语言名称。
3. **应用更改**：
   ```bash
   node set/update-links.js update
   ```
   这会自动同步到 `public/index.html` 和 `public/js/lang.js`。

## 内容更新指南

本项目的“关于”弹窗内容存储在 `set/about-content.md` 中。如需更新内容，请遵循以下步骤：
1. **从网页导出**（可选）：如果你手动修改了 `public/js/about-lang.js`，可以使用以下命令将其同步回 Markdown 文件：
   ```bash
   node set/update-about.js extract
   ```
2. **编辑内容**：直接修改 `set/about-content.md` 文件。
3. **同步生效**：在项目根目录下运行脚本：
   ```bash
   node set/update-about.js update
   ```


## 开发与扩展

- 添加新页面：在`public`目录创建HTML文件
- 修改样式：编辑`css`目录下的样式文件
- 增加功能：在`js`目录添加脚本文件
## 兼容性

网站支持现代浏览器，对不兼容的浏览器（如IE）会显示特殊提示页面。

## 版权与免责声明

本网站由原罪_超凡开发，GitHub Copilot 优化，部分内容可能含有作者不知情被用于模型训练的代码，仅供交流学习，不可商用。

ai生成导致可能含有无用的人类无法理解的代码。