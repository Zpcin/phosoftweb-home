# About-lang.js Web GUI 编辑器启动脚本 (PowerShell)

$NodePath = "C:\Users\11694\AppData\Roaming\JetBrains\WebStorm2025.1\node\versions\22.16.0\node.exe"
$ServerScript = Join-Path $PSScriptRoot "gui-server.js"

Write-Host ""
Write-Host "========================================"
Write-Host " About-lang.js Web GUI 编辑器"
Write-Host "========================================"
Write-Host ""
Write-Host "启动 Web 服务器..." -ForegroundColor Green
Write-Host "Node.js 路径: $NodePath" -ForegroundColor Yellow
Write-Host ""

# 检查 Node.js 是否存在
if (-not (Test-Path $NodePath)) {
    Write-Host "错误: 找不到指定的 Node.js 可执行文件" -ForegroundColor Red
    Write-Host "路径: $NodePath" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

# 检查服务器脚本是否存在
if (-not (Test-Path $ServerScript)) {
    Write-Host "错误: 找不到服务器脚本文件" -ForegroundColor Red
    Write-Host "路径: $ServerScript" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host "正在启动服务器，请稍候..." -ForegroundColor Cyan
Write-Host ""

try {
    # 启动服务器
    & $NodePath $ServerScript
}
catch {
    Write-Host "启动服务器时发生错误: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "服务器已停止" -ForegroundColor Gray
Read-Host "按回车键退出"
