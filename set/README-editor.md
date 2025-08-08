# About-lang.js 编辑工具

这是一个用于编辑 `about-lang.js` 文件的命令行工具，支持多语言内容管理和 Markdown 转 HTML 功能。

## 功能特性

- ✅ 查看和编辑多语言内容
- ✅ 支持 Markdown 格式输入，自动转换为 HTML
- ✅ 添加/删除语言支持
- ✅ 从 Markdown 文件导入内容
- ✅ 导出内容为 Markdown 格式
- ✅ 自动备份功能
- ✅ 备份管理和恢复
- ✅ 使用指定的 Node.js 版本

## 文件说明

- `about-lang-editor.js` - 主编辑器脚本
- `start-editor.bat` - Windows 批处理启动脚本
- `start-editor.ps1` - PowerShell 启动脚本
- `example-about.md` - 示例 Markdown 文件
- `backups/` - 自动备份目录（会自动创建）

## 使用方法

### 启动编辑器

**方法1：使用批处理文件（推荐）**
```cmd
start-editor.bat
```

**方法2：使用 PowerShell 脚本**
```powershell
.\start-editor.ps1
```

**方法3：直接使用 Node.js**
```cmd
"C:\Users\11694\AppData\Roaming\JetBrains\WebStorm2025.1\node\versions\22.16.0\node.exe" about-lang-editor.js
```

### 菜单功能

1. **查看所有语言** - 显示当前支持的所有语言及条目数
2. **编辑指定语言** - 编辑特定语言的内容
3. **添加新语言** - 添加新的语言支持
4. **删除语言** - 删除指定语言
5. **从 Markdown 导入内容** - 从 Markdown 文件导入内容
6. **导出为 Markdown** - 将指定语言导出为 Markdown 文件
7. **查看备份列表** - 查看所有备份文件
8. **恢复备份** - 从备份恢复文件

## Markdown 支持

工具支持以下 Markdown 语法，会自动转换为 HTML：

- **粗体**: `**文本**` 或 `__文本__` → `<strong>文本</strong>`
- *斜体*: `*文本*` 或 `_文本_` → `<em>文本</em>`
- 链接: `[文本](URL)` → `<a href="URL">文本</a>`
- 换行: 单个换行 → `<br>`
- 段落: 双换行 → `<br><br>`

## 导入 Markdown 文件格式

Markdown 文件应该使用 `## 标题` 格式来分隔不同的内容块，例如：

```markdown
## 网站介绍
这是一个**个人网站**，弄着玩的。

## 我的名字
我是溪夏坡Zpcin...
```

## 备份机制

- 每次保存文件时会自动创建备份
- 备份文件保存在 `backups/` 目录
- 备份文件名格式：`about-lang-YYYY-MM-DDTHH-mm-ss-sssZ.js`
- 可以通过菜单查看和恢复备份

## 注意事项

1. 编辑过程中请不要直接关闭控制台窗口，使用菜单选项 "0. 退出" 来安全退出
2. 退出时如果有修改，工具会提示是否保存
3. 所有操作都会自动备份原文件，确保数据安全
4. 导入 Markdown 时会覆盖指定语言的所有内容，请谨慎操作

## 支持的语言代码

当前支持的语言代码：
- `zh-cn` - 简体中文
- `zh-tw` - 繁体中文
- `zh-hk` - 香港繁体
- `en` - 英语
- `ja` - 日语

可以通过 "添加新语言" 功能添加更多语言支持。

## 故障排除

如果遇到问题：

1. 确认 Node.js 路径是否正确
2. 确认 `about-lang.js` 文件是否存在且格式正确
3. 检查文件权限，确保有读写权限
4. 查看备份目录是否有最近的备份文件可以恢复

## 技术信息

- Node.js 版本：22.16.0
- 目标文件：`../public/js/about-lang.js`
- 备份目录：`./backups/`
- 支持的输入编码：UTF-8
