@echo off
REM About-lang.js 编辑工具启动脚本
REM 使用指定的 Node.js 版本

set NODE_PATH="C:\Users\11694\AppData\Roaming\JetBrains\WebStorm2025.1\node\versions\22.16.0\node.exe"

echo 启动 About-lang.js 编辑工具...
echo Node.js 路径: %NODE_PATH%
echo.

if not exist %NODE_PATH% (
    echo 错误: 找不到指定的 Node.js 可执行文件
    echo 路径: %NODE_PATH%
    pause
    exit /b 1
)

%NODE_PATH% about-lang-editor.js

echo.
echo 程序结束，按任意键退出...
pause > nul
