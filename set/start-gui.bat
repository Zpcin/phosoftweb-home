@echo off
REM About-lang.js Web GUI 编辑器启动脚本

set NODE_PATH="C:\Users\11694\AppData\Roaming\JetBrains\WebStorm2025.1\node\versions\22.16.0\node.exe"

echo.
echo ========================================
echo  About-lang.js Web GUI 编辑器
echo ========================================
echo.
echo 启动 Web 服务器...
echo Node.js 路径: %NODE_PATH%
echo.

if not exist %NODE_PATH% (
    echo 错误: 找不到指定的 Node.js 可执行文件
    echo 路径: %NODE_PATH%
    pause
    exit /b 1
)

echo 正在启动服务器，请稍候...
echo.

%NODE_PATH% gui-server.js

echo.
echo 服务器已停止
pause
