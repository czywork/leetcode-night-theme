/**
 * 构建油猴脚本：把 src/theme.css 注入 userscript/shell.js 模板，
 * 生成可直接安装的 leetcode-night-theme.user.js。
 *
 * 用法：node userscript/build.mjs
 *
 * 这样主题样式只有一份来源（src/theme.css），扩展和油猴脚本不会走样。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const jsPath = path.join(root, 'userscript', 'shell.js');
const cssPath = path.join(root, 'src', 'theme.css');
const outPath = path.join(root, 'userscript', 'leetcode-night-theme.user.js');
const manifestPath = path.join(root, 'manifest.json');

const shell = fs.readFileSync(jsPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// 内联进模板字符串前必须确认 CSS 里没有反引号和 ${}
if (css.includes('`')) throw new Error('theme.css 含反引号，无法安全内联');
if (css.includes('${')) throw new Error('theme.css 含 ${}，无法安全内联');

// 用唯一占位符替换，避免误伤注释里出现的同名文字
const PLACEHOLDER = '@@LCN_THEME_CSS@@';

if (!shell.includes(PLACEHOLDER)) {
  throw new Error(`shell.js 缺少占位符 ${PLACEHOLDER}`);
}
if (shell.split(PLACEHOLDER).length !== 2) {
  throw new Error('shell.js 中占位符出现次数不为 1，会导致注入位置错误');
}

const version = manifest.version;

const header = `// ==UserScript==
// @name         深夜护眼 · 力扣夜间主题
// @name:en      LeetCode Night Eye-Care Theme
// @namespace    https://github.com/czywork/leetcode-night-theme
// @version      ${version}
// @description  给力扣加上暖色深夜护眼主题：低蓝光、柔和不刺眼，代码高亮同步换色
// @description:en  Warm, low-blue-light night theme for LeetCode China with recolored code highlighting
// @author       czywork
// @homepageURL  https://github.com/czywork/leetcode-night-theme
// @supportURL   https://github.com/czywork/leetcode-night-theme/issues
// @match        https://leetcode.cn/*
// @match        https://*.leetcode.cn/*
// @icon         https://raw.githubusercontent.com/czywork/leetcode-night-theme/main/icons/icon128.png
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/czywork/leetcode-night-theme/main/userscript/leetcode-night-theme.user.js
// @downloadURL  https://raw.githubusercontent.com/czywork/leetcode-night-theme/main/userscript/leetcode-night-theme.user.js
// @license      MIT
// ==/UserScript==

`;

const body = shell.replace(PLACEHOLDER, () => css);
fs.writeFileSync(outPath, header + body, 'utf8');

const kb = (Buffer.byteLength(header + body, 'utf8') / 1024).toFixed(1);
console.log(`✅ 已生成 ${path.relative(root, outPath)}  (v${version}, ${kb} KB)`);