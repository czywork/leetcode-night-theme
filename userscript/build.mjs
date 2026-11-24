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

// 剥掉模板顶部的构建说明注释——它只对维护者有意义，
// 留在产物里会误导用户以为"不能安装这个文件"
const shellBody = shell.replace(/^\/\*[\s\S]*?\*\/\s*/, '');

// 内联进模板字符串前必须确认 CSS 里没有反引号和 ${}
if (css.includes('`')) throw new Error('theme.css 含反引号，无法安全内联');
if (css.includes('${')) throw new Error('theme.css 含 ${}，无法安全内联');

// 用唯一占位符替换，避免误伤注释里出现的同名文字
const PLACEHOLDER = '@@LCN_THEME_CSS@@';

if (!shellBody.includes(PLACEHOLDER)) {
  throw new Error(`shell.js 缺少占位符 ${PLACEHOLDER}`);
}
if (shellBody.split(PLACEHOLDER).length !== 2) {
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
// @icon         data:image/png;base64,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
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @license      MIT
// ==/UserScript==

`;

const body = shellBody.replace(PLACEHOLDER, () => css);
fs.writeFileSync(outPath, header + body, 'utf8');

const kb = (Buffer.byteLength(header + body, 'utf8') / 1024).toFixed(1);
console.log(`✅ 已生成 ${path.relative(root, outPath)}  (v${version}, ${kb} KB)`);