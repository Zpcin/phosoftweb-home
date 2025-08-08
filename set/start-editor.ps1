# About-lang.js 编辑工具启动脚本 (PowerShell)
# 使用指定的 Node.js 版本

$NodePath = "C:\Users\11694\AppData\Roaming\JetBrains\WebStorm2025.1\node\versions\22.16.0\node.exe"
$ScriptPath = Join-Path $PSScriptRoot "about-lang-editor.js"

Write-Host "启动 About-lang.js 编辑工具..." -ForegroundColor Green
Write-Host "Node.js 路径: $NodePath" -ForegroundColor Yellow
Write-Host "脚本路径: $ScriptPath" -ForegroundColor Yellow
Write-Host ""

# 检查 Node.js 是否存在
if (-not (Test-Path $NodePath)) {
    Write-Host "错误: 找不到指定的 Node.js 可执行文件" -ForegroundColor Red
    Write-Host "路径: $NodePath" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

# 检查编辑器脚本是否存在
if (-not (Test-Path $ScriptPath)) {
    Write-Host "错误: 找不到编辑器脚本文件" -ForegroundColor Red
    Write-Host "路径: $ScriptPath" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

try {
    # 启动编辑器
    & $NodePath $ScriptPath
}
catch {
    Write-Host "启动编辑器时发生错误: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "程序结束，按回车键退出..." -ForegroundColor Gray
Read-Host
