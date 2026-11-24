@echo off
chcp 65001 >nul
REM ============================================================
REM  深夜护眼 · 力扣夜间主题  一键推送到 GitHub
REM ------------------------------------------------------------
REM  使用前提：
REM    已在 https://github.com/new 建好空仓库 leetcode-night-theme
REM    （不要勾选 Add a README / .gitignore / license，保持全空）
REM  然后双击本脚本即可。
REM ============================================================

cd /d "%~dp0"

set GH_USER=czywork
set REPO=leetcode-night-theme

echo.
echo === 推送到 github.com/%GH_USER%/%REPO% ===
echo.

git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GH_USER%/%REPO%.git
git branch -M main

echo 正在推送，若弹出登录窗口请按提示授权...
echo.
git push -u origin main

if %errorlevel% equ 0 (
  echo.
  echo [成功] 已推送：https://github.com/%GH_USER%/%REPO%
) else (
  echo.
  echo [失败] 请检查：
  echo   1. 仓库 %REPO% 是否已在 GitHub 上创建
  echo   2. 登录账号是否为 %GH_USER%
)
echo.
pause