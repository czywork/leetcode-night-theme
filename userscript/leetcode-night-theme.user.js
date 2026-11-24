// ==UserScript==
// @name         深夜护眼 · 力扣夜间主题
// @name:en      LeetCode Night Eye-Care Theme
// @namespace    https://github.com/czywork/leetcode-night-theme
// @version      1.0.0
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

/* 深夜护眼 · 力扣夜间主题 — 油猴脚本外壳
   ----------------------------------------------------------------------------
   本文件是模板，构建时会把 src/theme.css 的内容注入到下方 CSS 常量的占位处，
   生成最终可安装的 userscript。请勿直接安装本文件。
   ============================================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------------- 主题样式 */
  const CSS = `/* ============================================================================
   深夜护眼 · 力扣夜间主题  v1.0
   ----------------------------------------------------------------------------
   实现思路（不靠逐元素打补丁）：
   1. 力扣用一套语义化 CSS 变量（--layer-01 / --text-primary / --sd-* …）驱动
      全站配色。本站是「亮色 :root + 暗色 html.dark」双套映射。
      本主题直接在 html[data-lc-night="on"] 上把这些语义变量全部重映射到暖色系，
      因此所有组件（面板、弹窗、下拉、表格、标签…）自动继承，无需逐个覆盖。
   2. 选择器使用 html[data-lc-night="on"]（特指度 0,1,1），高于站点的 :root（0,1,0），
      即使站点把 dark 类抢回去，配色依然成立 —— 不依赖站点自身状态。
   3. 代码编辑器 Monaco 的主题被硬编码为浅色 vs，令牌色写死在 .mtk1~.mtk32，
      无法通过变量覆盖，必须单独改色；这也是插件存在的最大价值。
   4. 最后一层可调暖色/压暗遮罩，做「护眼」的软性调节。
   ========================================================================== */

html[data-lc-night="on"] {
  color-scheme: dark;

  /* ---------------- 原始色阶（本主题自有，--lcn- 前缀避免冲突） ------------- */
  --lcn-bg-deep: #100d0c;      /* 最底：页面背板 */
  --lcn-bg: #16120f;           /* 主背景 */
  --lcn-surface-1: #1b1714;    /* 代码编辑器 / 深一层卡片 */
  --lcn-surface-2: #221d19;    /* 主面板 */
  --lcn-surface-3: #2b2521;    /* 悬浮层 / 输入框 */
  --lcn-surface-4: #37302a;    /* 更深一档的强调底 */

  --lcn-text-1: #ede4d8;       /* 正文主字 */
  --lcn-text-2: rgba(243, 232, 218, 0.8);
  --lcn-text-3: rgba(240, 228, 212, 0.62);
  --lcn-text-4: rgba(236, 224, 206, 0.44);

  --lcn-amber: #e9a94f;        /* 品牌强调 */
  --lcn-amber-dim: #c08f4a;
  --lcn-line: rgba(255, 226, 190, 0.1);
  --lcn-line-strong: rgba(255, 226, 190, 0.16);

  /* ---------------- 中性灰阶：暖炭黑 → 象牙白 ---------------- */
  --pure-white: #f2e7da;
  --pure-black: #14100e;

  --dark-gray-black: var(--lcn-bg-deep);
  --dark-gray-10: var(--lcn-surface-1);
  --dark-gray-20: var(--lcn-surface-2);
  --dark-gray-30: var(--lcn-surface-3);
  --dark-gray-40: var(--lcn-surface-4);
  --dark-gray-50: #514640;
  --dark-gray-60: #6e6158;
  --dark-gray-70: #93867b;
  --dark-gray-80: #bcae9f;
  --dark-gray-90: #d9c9b7;
  --dark-gray-100: #f0e4d5;

  --gray-10: var(--lcn-surface-1);
  --gray-20: var(--lcn-surface-2);
  --gray-40: var(--lcn-surface-4);
  --gray-60: #6e6158;
  --gray-80: #bcae9f;
  --gray-100: #f0e4d5;

  /* 亮色阶也一并压暖，避免站点亮色代码路径串出冷白 */
  --light-gray-10: #1a1614;
  --light-gray-20: #221d19;
  --light-gray-30: #2b2521;
  --light-gray-40: #514640;
  --light-gray-50: #93867b;
  --light-gray-60: #bcae9f;
  --light-gray-70: #d9c9b7;
  --light-gray-80: #e6d8c8;
  --light-gray-90: #ede1d4;
  --light-gray-100: #f0e4d5;
  --light-gray-white: var(--lcn-bg);

  /* ---------------- 半透明层：暖白，杜绝发蓝的冷灰 ---------------- */
  --opacity-white-10: rgba(255, 226, 190, 0.055);
  --opacity-white-20: rgba(255, 226, 190, 0.085);
  --opacity-white-30: rgba(255, 226, 190, 0.115);
  --opacity-white-40: rgba(255, 226, 190, 0.155);
  --opacity-white-50: rgba(255, 226, 190, 0.215);
  --opacity-white-60: rgba(255, 230, 200, 0.32);
  --opacity-white-70: rgba(245, 232, 216, 0.58);
  --opacity-white-80: rgba(245, 234, 220, 0.8);
  --opacity-white-90: rgba(248, 239, 228, 0.93);
  --opacity-white-100: #f2e7da;

  --opacity-black-10: rgba(0, 0, 0, 0.2);
  --opacity-black-20: rgba(0, 0, 0, 0.3);
  --opacity-black-30: rgba(0, 0, 0, 0.4);
  --opacity-black-40: rgba(0, 0, 0, 0.5);
  --opacity-black-50: rgba(0, 0, 0, 0.6);
  --opacity-black-60: rgba(0, 0, 0, 0.7);
  --opacity-black-70: rgba(0, 0, 0, 0.8);
  --opacity-black-80: rgba(0, 0, 0, 0.88);
  --opacity-black-90: rgba(0, 0, 0, 0.94);
  --opacity-black-100: #000;

  /* ---------------- 语义映射：等价于站点 .dark 块，但不依赖它 ---------------- */
  --layer-01: var(--lcn-surface-2);
  --layer-02: var(--lcn-surface-3);
  --layer-03: var(--lcn-surface-4);
  --layer-bg-pure: var(--lcn-bg);
  --layer-bg-gray: var(--lcn-bg);

  --text-primary: var(--lcn-text-1);
  --text-secondary: var(--lcn-text-2);
  --text-tertiary: var(--lcn-text-3);
  --text-quaternary: var(--lcn-text-4);
  --text-reverse: #14100e;

  --fill-primary: var(--opacity-white-40);
  --fill-secondary: var(--opacity-white-30);
  --fill-tertiary: var(--opacity-white-20);
  --fill-quaternary: var(--opacity-white-10);
  --fill-pure: #14100e;

  --border-primary: var(--opacity-white-60);
  --border-secondary: var(--opacity-white-50);
  --border-tertiary: var(--opacity-white-40);
  --border-quaternary: var(--opacity-white-30);

  /* 品牌 */
  --brand-orange: var(--lcn-amber);
  --brand-gray: #a1928a;
  --brand-logo: #f2e7da;
  --dark-brand-orange: var(--lcn-amber);
  --dark-brand-gray: #a1928a;
  --dark-brand-white: #f2e7da;
  --dark-brand-black: #000;

  /* 难度：色相保留，饱和度压低，夜里不刺眼 */
  --dark-teal-60: #6faa9c;
  --dark-teal-10: #17302c;
  --dark-teal-20: #1e3f39;
  --dark-yellow-60: #d9a846;
  --dark-yellow-10: #33280f;
  --dark-yellow-20: #473713;
  --dark-red-60: #cf7f72;
  --dark-red-10: #331712;
  --dark-red-20: #47201a;

  --teal-10: #17302c;
  --teal-20: #1e3f39;
  --teal-40: #2f5c55;
  --teal-60: #6faa9c;
  --teal-80: #8fc4b7;
  --teal-100: #c8e6de;

  --yellow-10: #33280f;
  --yellow-20: #473713;
  --yellow-40: #8a6a24;
  --yellow-60: #d9a846;
  --yellow-80: #e8bf6a;
  --yellow-100: #f6e4b8;
  --dark-opacity-yellow-60: rgba(233, 169, 79, 0.16);
  --light-opacity-yellow-60: rgba(233, 169, 79, 0.16);
  --opacity-yellow-60: rgba(233, 169, 79, 0.16);

  --red-10: #331712;
  --red-20: #47201a;
  --red-40: #8f4a40;
  --red-60: #cf7f72;
  --red-80: #dda093;
  --red-100: #f2cdc6;

  --green-10: #172a1a;
  --green-20: #1f3a23;
  --green-40: #3f6b47;
  --green-60: #79ad82;
  --green-80: #96c29c;
  --green-100: #d8efdb;

  --dark-green-60: #79ad82;
  --dark-green-10: #172a1a;
  --dark-green-20: #1f3a23;

  --blue-10: #142235;
  --blue-20: #1b2f49;
  --blue-40: #2c4a6e;
  --blue-60: #6f9fd0;
  --blue-80: #8fb3dd;
  --blue-100: #dcebff;

  --dark-blue-60: #6f9fd0;
  --dark-blue-10: #142235;
  --dark-blue-20: #1b2f49;

  --purple-10: #22182a;
  --purple-20: #2f2139;
  --purple-40: #56406b;
  --purple-60: #b18cc4;
  --purple-80: #c4a6d3;
  --purple-100: #eadcf2;

  --dark-purple-60: #b18cc4;
  --dark-purple-10: #22182a;
  --dark-purple-20: #2f2139;

  --magenta-10: #2c1720;
  --magenta-20: #3d1f2c;
  --magenta-40: #7a4056;
  --magenta-60: #c78ba5;
  --magenta-80: #d8a8bc;
  --magenta-100: #f2dde6;

  --dark-magenta-60: #c78ba5;
  --dark-magenta-10: #2c1720;
  --dark-magenta-20: #3d1f2c;

  --difficulty-easy: #6faa9c;
  --difficulty-medium: #d9a846;
  --difficulty-hard: #cf7f72;

  --message-danger: #cf7f72;
  --message-warning: #d9a846;
  --message-primary: #6f9fd0;
  --message-success: #79ad82;

  --special-rose: #cf7f72;
  --special-sunny: #d9a846;
  --special-kiwi: #79ad82;
  --special-skyler: #6f9fd0;
  --special-lavender: #b18cc4;
  --dark-special-rose: #cf7f72;
  --dark-special-sunny: #d9a846;
  --dark-special-kiwi: #79ad82;
  --dark-special-skyler: #6f9fd0;
  --dark-special-lavender: #b18cc4;

  --fixed-black: var(--pure-black);
  --fixed-white: var(--pure-white);

  /* 第二套设计系统（HSL 三元组） */
  --sd-background: 20 12% 8%;
  --sd-background-gray: 20 12% 6%;
  --sd-foreground: 34 40% 89%;
  --sd-card: 22 12% 12%;
  --sd-card-foreground: 34 40% 89%;
  --sd-popover: 22 12% 15%;
  --sd-popover-foreground: 34 40% 92%;
  --sd-primary: 34 40% 89%;
  --sd-primary-foreground: 22 14% 9%;
  --sd-secondary: 22 11% 17%;
  --sd-secondary-foreground: 34 40% 92%;
  --sd-muted: 22 11% 17%;
  --sd-muted-foreground: 30 18% 62%;
  --sd-accent: 30 40% 88% / 0.09;
  --sd-accent-foreground: 34 40% 92%;
  --sd-border: 30 40% 88% / 0.11;
  --sd-input: 30 40% 88% / 0.14;
  --sd-ring: 30 30% 70%;
  --sd-gray-50: 22 12% 14%;
  --sd-gray-100: 22 12% 18%;
  --sd-gray-200: 22 12% 22%;
  --sd-gray-300: 26 12% 30%;
  --sd-gray-400: 28 12% 42%;
  --sd-gray-500: 30 14% 55%;
  --sd-gray-600: 32 18% 68%;
  --sd-gray-700: 34 24% 80%;
  --sd-gray-800: 34 30% 86%;
  --sd-gray-900: 34 34% 90%;
  --sd-gray-950: 34 40% 94%;

  /* 阴影：暖黑，不用冷灰 */
  --light-shadow-layer-1: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 0.5px 5px 0 rgba(0, 0, 0, 0.4);
  --light-shadow-layer-1-hover: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 4px 8px 0 rgba(0, 0, 0, 0.55);
  --light-shadow-layer-2: 0 0 1px 0 rgba(0, 0, 0, 0.6), 0 0 1px 0 rgba(0, 0, 0, 0.4), 0 7px 22px 0 rgba(0, 0, 0, 0.6);
  --light-shadow-layer-3: 0 0 2px 0 rgba(0, 0, 0, 0.6), 0 38px 90px 0 rgba(0, 0, 0, 0.7);
  --dark-shadow-layer-1: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 0.5px 5px 0 rgba(0, 0, 0, 0.4);
  --dark-shadow-layer-1-hover: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 4px 8px 0 rgba(0, 0, 0, 0.55);
  --dark-shadow-layer-2: 0 0 1px 0 rgba(0, 0, 0, 0.6), 0 0 1px 0 rgba(0, 0, 0, 0.4), 0 7px 22px 0 rgba(0, 0, 0, 0.6);
  --dark-shadow-layer-3: 0 0 2px 0 rgba(0, 0, 0, 0.6), 0 38px 90px 0 rgba(0, 0, 0, 0.7);
  --shadow-layer-1: var(--dark-shadow-layer-1);
  --shadow-layer-1-hover: var(--dark-shadow-layer-1-hover);
  --shadow-layer-2: var(--dark-shadow-layer-2);
  --shadow-layer-3: var(--dark-shadow-layer-3);
}

/* ============================ 兜底：写死的底色 ============================ */
html[data-lc-night="on"] body {
  background-color: var(--lcn-bg) !important;
  color: var(--lcn-text-1);
}

html[data-lc-night="on"] .bg-layer-1,
html[data-lc-night="on"] .bg-layer-2,
html[data-lc-night="on"] .bg-layer-3,
html[data-lc-night="on"] .bg-layer-01,
html[data-lc-night="on"] .bg-layer-bg-pure,
html[data-lc-night="on"] .bg-sd-card {
  background-color: var(--lcn-surface-2) !important;
}

html[data-lc-night="on"] .bg-layer-bg-gray,
html[data-lc-night="on"] .bg-sd-background,
html[data-lc-night="on"] .bg-sd-background-gray {
  background-color: var(--lcn-bg) !important;
}

/* 表单控件 */
html[data-lc-night="on"] input:not([type='checkbox']):not([type='radio']),
html[data-lc-night="on"] textarea,
html[data-lc-night="on"] select {
  background-color: var(--lcn-surface-3) !important;
  color: var(--lcn-text-1) !important;
  border-color: var(--lcn-line-strong) !important;
}

/* 站点早期命名空间：bg-paper / bg-lc-layer-01 等写死成 rgb(255 255 255)，
   只能按类名收口（抽屉、题库侧边栏、工具按钮都用这套） */
html[data-lc-night="on"] .bg-paper,
html[data-lc-night="on"] .bg-lc-layer-01,
html[data-lc-night="on"] .bg-lc-layer-02,
html[data-lc-night="on"] .bg-lc-fill-01,
html[data-lc-night="on"] .bg-lc-background-index,
html[data-lc-night="on"] [class*='bg-lc-layer-'],
html[data-lc-night="on"] [class*='bg-lc-background'] {
  background-color: var(--lcn-surface-2) !important;
}

html[data-lc-night="on"] [class*='dark:bg-dark-lc-background-index'],
html[data-lc-night="on"] [class*='bg-dark-lc-background-index'] {
  background-color: var(--lcn-bg) !important;
}

/* 工具栏小按钮（题号切换、设置等） */
html[data-lc-night="on"] [class*='dark:bg-dark-gray-5'][class*='bg-paper'],
html[data-lc-night="on"] [class*='dark:bg-dark-fill-3'][class*='bg-fill'] {
  background-color: var(--lcn-surface-3) !important;
}

html[data-lc-night="on"] input::placeholder,
html[data-lc-night="on"] textarea::placeholder {
  color: #8b7d70 !important;
}

/* 题面里的代码块 / 表格 / 引用 */
html[data-lc-night="on"] pre,
html[data-lc-night="on"] pre code {
  background-color: var(--lcn-surface-1) !important;
  color: #ddd0c0 !important;
}

html[data-lc-night="on"] table th {
  background-color: var(--lcn-surface-3) !important;
  color: #e2d5c4 !important;
}

html[data-lc-night="on"] table td {
  border-color: var(--lcn-line) !important;
}

html[data-lc-night="on"] blockquote {
  background-color: var(--lcn-surface-2) !important;
  border-left-color: #514640 !important;
  color: #c9bba9 !important;
}

/* ============================ 强调色降饱和 ================================ */
/* 站点把部分语义色写成 rgb 固值，只能按类名收口 */
html[data-lc-night="on"] [class*='text-blue-s'],
html[data-lc-night="on"] [class*='text-dark-blue-s'] {
  color: #8fb3dd !important;
}

html[data-lc-night="on"] [class*='bg-blue-0'],
html[data-lc-night="on"] [class*='bg-dark-blue-0'] {
  background-color: rgba(233, 169, 79, 0.1) !important;
}

html[data-lc-night="on"] [class*='bg-green-s'],
html[data-lc-night="on"] [class*='bg-dark-green-s'] {
  background-color: #4f7a58 !important;
  color: #f3f7f2 !important;
}

/* ============================ Monaco 代码编辑器 =========================== */
/* 站点把它锁死在浅色 vs 主题，令牌色硬编码在 .mtk*，只能强制改写 */
html[data-lc-night="on"] .monaco-editor,
html[data-lc-night="on"] .monaco-editor .monaco-editor-background,
html[data-lc-night="on"] .monaco-editor .margin,
html[data-lc-night="on"] .monaco-editor .scroll-decoration,
html[data-lc-night="on"] .monaco-editor .lines-content,
html[data-lc-night="on"] .monaco-editor .view-overlays,
html[data-lc-night="on"] .monaco-editor .overflow-guard,
html[data-lc-night="on"] .monaco-editor .decorationsOverviewRuler {
  background-color: var(--lcn-surface-1) !important;
}

html[data-lc-night="on"] .monaco-editor .line-numbers {
  color: #6b5f55 !important;
}

html[data-lc-night="on"] .monaco-editor .line-numbers.active-line-number {
  color: #d9c9b7 !important;
}

html[data-lc-night="on"] .monaco-editor .current-line {
  border-color: rgba(255, 226, 190, 0.07) !important;
  background-color: rgba(255, 226, 190, 0.035) !important;
}

html[data-lc-night="on"] .monaco-editor .selected-text {
  background-color: rgba(233, 169, 79, 0.22) !important;
}

html[data-lc-night="on"] .monaco-editor .cursors-layer .cursor {
  background-color: var(--lcn-amber) !important;
  border-color: var(--lcn-amber) !important;
}

html[data-lc-night="on"] .monaco-editor .bracket-match {
  background-color: rgba(233, 169, 79, 0.16) !important;
  border-color: var(--lcn-amber-dim) !important;
}

html[data-lc-night="on"] .monaco-editor .indent-guide {
  border-left-color: rgba(255, 226, 190, 0.09) !important;
}

html[data-lc-night="on"] .monaco-editor .suggest-widget,
html[data-lc-night="on"] .monaco-editor .monaco-hover,
html[data-lc-night="on"] .monaco-editor .parameter-hints-widget {
  background-color: var(--lcn-surface-3) !important;
  border-color: var(--lcn-surface-4) !important;
  color: #e2d5c4 !important;
}

/* ---- 语义令牌：原 32 色逐一映射到暖色系 ---- */
html[data-lc-night="on"] .monaco-editor .mtk1 { color: #ded1c1 !important; }
html[data-lc-night="on"] .monaco-editor .mtk2 { color: var(--lcn-surface-1) !important; }
html[data-lc-night="on"] .monaco-editor .mtk3 { color: #8fb87a !important; }
html[data-lc-night="on"] .monaco-editor .mtk4 { color: #7fa8d6 !important; }
html[data-lc-night="on"] .monaco-editor .mtk5 { color: #c98fa8 !important; }
html[data-lc-night="on"] .monaco-editor .mtk6 { color: #d9776a !important; }
html[data-lc-night="on"] .monaco-editor .mtk7 { color: #8ab89b !important; }
html[data-lc-night="on"] .monaco-editor .mtk8 { color: #8fadd6 !important; }
html[data-lc-night="on"] .monaco-editor .mtk9 { color: #6fb3ab !important; }
html[data-lc-night="on"] .monaco-editor .mtk10 { color: #d8b07a !important; }
html[data-lc-night="on"] .monaco-editor .mtk11 { color: #c79bdd !important; }
html[data-lc-night="on"] .monaco-editor .mtk12 { color: #c69090 !important; }
html[data-lc-night="on"] .monaco-editor .mtk13 { color: #a8b8e0 !important; }
html[data-lc-night="on"] .monaco-editor .mtk14 { color: #e07a6c !important; }
html[data-lc-night="on"] .monaco-editor .mtk15 { color: #e08a7c !important; }
html[data-lc-night="on"] .monaco-editor .mtk16 { color: #dd9689 !important; }
html[data-lc-night="on"] .monaco-editor .mtk17 { color: #9aa6d8 !important; }
html[data-lc-night="on"] .monaco-editor .mtk18 { color: #cf8a7a !important; }
html[data-lc-night="on"] .monaco-editor .mtk19 { color: #79aede !important; }
html[data-lc-night="on"] .monaco-editor .mtk20 { color: #96897c !important; }
html[data-lc-night="on"] .monaco-editor .mtk21 { color: #d4735f !important; }
html[data-lc-night="on"] .monaco-editor .mtk22 { color: #b3a495 !important; }
html[data-lc-night="on"] .monaco-editor .mtk23 { color: #cd9a6a !important; }
html[data-lc-night="on"] .monaco-editor .mtk24 { color: #d97d67 !important; }
html[data-lc-night="on"] .monaco-editor .mtk25 { color: #97a3d4 !important; }
html[data-lc-night="on"] .monaco-editor .mtk26 { color: #9a8d80 !important; }
html[data-lc-night="on"] .monaco-editor .mtk27 { color: #8f9bae !important; }
html[data-lc-night="on"] .monaco-editor .mtk28 { color: #cb95cb !important; }
html[data-lc-night="on"] .monaco-editor .mtk29 { color: #8ba3c9 !important; }
html[data-lc-night="on"] .monaco-editor .mtk30 { color: #6facac !important; }
html[data-lc-night="on"] .monaco-editor .mtk31 { color: #93a2dd !important; }
html[data-lc-night="on"] .monaco-editor .mtk32 { color: #8f9fd4 !important; }

/* ============================ CodeMirror（笔记 / Markdown） ================ */
html[data-lc-night="on"] .cm-editor,
html[data-lc-night="on"] .cm-scroller,
html[data-lc-night="on"] .cm-gutters,
html[data-lc-night="on"] .cm-panels,
html[data-lc-night="on"] .cm-activeLine,
html[data-lc-night="on"] .cm-activeLineGutter {
  background-color: var(--lcn-surface-1) !important;
  color: #ded1c1 !important;
}

html[data-lc-night="on"] .cm-gutters {
  border-right-color: rgba(255, 226, 190, 0.08) !important;
  color: #6b5f55 !important;
}

html[data-lc-night="on"] .cm-content,
html[data-lc-night="on"] .cm-line {
  color: #ded1c1 !important;
  caret-color: var(--lcn-amber) !important;
}

html[data-lc-night="on"] .cm-cursor {
  border-left-color: var(--lcn-amber) !important;
}

html[data-lc-night="on"] .cm-selectionBackground,
html[data-lc-night="on"] .cm-content ::selection {
  background-color: rgba(233, 169, 79, 0.25) !important;
}

/* ============================ 滚动条 ==================================== */
html[data-lc-night="on"] ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

html[data-lc-night="on"] ::-webkit-scrollbar-track {
  background: #171310;
}

html[data-lc-night="on"] ::-webkit-scrollbar-thumb {
  background: #3a332d;
  border-radius: 6px;
}

html[data-lc-night="on"] ::-webkit-scrollbar-thumb:hover {
  background: #4d443c;
}

/* ==================== 文字色兜底（关键：避免深灰压暖黑） ================== */
/* 站点有一批 .text-label-1~4 是硬编码的浅色主题深灰（rgb(38,38,38) 等），
   部分元素只带 text-label-* 而没有 dark:text-dark-label-* 对应变体，
   在暖黑底上几乎不可读。这里统一改成暖浅色。                        */
html[data-lc-night='on'] .text-label-1,
html[data-lc-night='on'] [class~='text-label-1'] {
  color: #ede4d8 !important;
}

html[data-lc-night='on'] .text-label-2,
html[data-lc-night='on'] [class~='text-label-2'] {
  color: rgba(243, 232, 218, 0.82) !important;
}

html[data-lc-night='on'] .text-label-3,
html[data-lc-night='on'] [class~='text-label-3'] {
  color: rgba(240, 228, 212, 0.66) !important;
}

html[data-lc-night='on'] .text-label-4,
html[data-lc-night='on'] [class~='text-label-4'] {
  color: rgba(236, 224, 206, 0.48) !important;
}

/* sd 设计系统的文字色 */
html[data-lc-night='on'] .text-sd-foreground {
  color: hsl(var(--sd-foreground)) !important;
}

html[data-lc-night='on'] .text-sd-muted-foreground {
  color: hsl(var(--sd-muted-foreground)) !important;
}

/* ==================== 题面代码块语法高亮（Prism） ========================
   Prism 把颜色写成行内 style="color: rgb(...)"，只能靠 !important 强压。
   原始配色是浅色主题的（青色/深洋红压在暖黑上对比度仅 2~3.6），
   这里按语法角色重映射到一组暖色高亮。                                */
html[data-lc-night='on'] pre code,
html[data-lc-night='on'] code[class*='language-'] {
  color: #ddd0c0 !important;
  text-shadow: none !important;
  background: none !important;
}

/* 关键字 / 控制流 / 运算符（原青色 rgb(0,119,170)） */
html[data-lc-night='on'] pre code .token.keyword,
html[data-lc-night='on'] pre code .token.control-flow,
html[data-lc-night='on'] pre code .token.boolean,
html[data-lc-night='on'] pre code .token.operator,
html[data-lc-night='on'] pre code .token.atrule,
html[data-lc-night='on'] pre code .token.rule {
  color: #7fb3d5 !important;
}

/* 数字 / 常量 / 字符串里的数值（原深洋红 rgb(153,0,85)） */
html[data-lc-night='on'] pre code .token.number,
html[data-lc-night='on'] pre code .token.constant,
html[data-lc-night='on'] pre code .token.symbol {
  color: #d9a0b5 !important;
}

/* 函数名 / 类名 / 方法（原亮玫红 rgb(221,74,104)） */
html[data-lc-night='on'] pre code .token.function,
html[data-lc-night='on'] pre code .token.function-definition,
html[data-lc-night='on'] pre code .token.function-variable,
html[data-lc-night='on'] pre code .token.known-class-name,
html[data-lc-night='on'] pre code .token.class-name,
html[data-lc-night='on'] pre code .token.method,
html[data-lc-night='on'] pre code .token.builtin {
  color: #e0a878 !important;
}

/* 字符串 */
html[data-lc-night='on'] pre code .token.string,
html[data-lc-night='on'] pre code .token.char,
html[data-lc-night='on'] pre code .token.template-string {
  color: #a8c48f !important;
}

/* 注释（原冷灰 rgb(112,128,144)） */
html[data-lc-night='on'] pre code .token.comment,
html[data-lc-night='on'] pre code .token.prolog,
html[data-lc-night='on'] pre code .token.doctype,
html[data-lc-night='on'] pre code .token.cdata {
  color: #9a8c7c !important;
}

/* 变量 / 参数 / 属性访问（原半透明深灰，几乎不可见） */
html[data-lc-night='on'] pre code .token.parameter,
html[data-lc-night='on'] pre code .token.property-access,
html[data-lc-night='on'] pre code .token.variable,
html[data-lc-night='on'] pre code .token.property,
html[data-lc-night='on'] pre code .token.plain-text {
  color: #d8cbbc !important;
}

/* 标点 / 括号（原浅灰 rgb(153,153,153)） */
html[data-lc-night='on'] pre code .token.punctuation,
html[data-lc-night='on'] pre code .token.bracket {
  color: #9d9083 !important;
}

/* 兜底：任何仍写成深色的 token 一律提亮 */
html[data-lc-night='on'] pre code .token[style*='rgb(38, 38, 38)'] {
  color: #d8cbbc !important;
}

/* ---- 兜底：Prism 的 token class 常为空，真正颜色写在行内样式里 ----
   用属性选择器精确命中原始那几组颜色，逐个提亮。
   这比依赖 .token.xxx 更可靠，因为站点的 token 往往没有语义 class。 */
html[data-lc-night='on'] pre code span.token[style*='rgb(0, 119, 170)'] {
  color: #7fb3d5 !important; /* 关键字：青 → 雾蓝 */
}

html[data-lc-night='on'] pre code span.token[style*='rgb(153, 0, 85)'] {
  color: #d9a0b5 !important; /* 数字：深洋红 → 灰粉 */
}

html[data-lc-night='on'] pre code span.token[style*='rgb(221, 74, 104)'] {
  color: #e0a878 !important; /* 函数/类名：玫红 → 暖橙 */
}

html[data-lc-night='on'] pre code span.token[style*='rgb(166, 38, 164)'] {
  color: #c9a0d8 !important; /* 关键字变体 → 灰紫 */
}

html[data-lc-night='on'] pre code span.token[style*='rgb(154, 110, 58)'] {
  color: #c9a882 !important; /* 运算符：棕 → 暖沙 */
}

html[data-lc-night='on'] pre code span.token[style*='rgb(112, 128, 144)'] {
  color: #9a8c7c !important; /* 注释：冷灰蓝 → 暖灰 */
}

/* 注释实际写的是颜色名 slategray（不是 rgb()），需要单独命中 */
html[data-lc-night='on'] pre code span.token[style*='slategray'] {
  color: #9a8c7c !important;
}

html[data-lc-night='on'] pre code span.token[style*='rgb(153, 153, 153)'] {
  color: #9d9083 !important; /* 标点：中灰 → 暖灰 */
}

html[data-lc-night='on'] pre code span.token[style*='rgb(153, 153, 153)'] {
  color: #9d9083 !important;
}

html[data-lc-night='on'] pre code span.token[style*='rgb(0, 0, 0)'] {
  color: #ded1c1 !important; /* 纯黑 → 暖白 */
}

html[data-lc-night='on'] pre code span.token[style*='rgb(255, 0, 0)'],
html[data-lc-night='on'] pre code span.token[style*='rgb(238, 0, 0)'] {
  color: #d9776a !important;
}

html[data-lc-night='on'] pre code span.token[style*='rgb(0, 128, 0)'] {
  color: #8fb87a !important;
}

html[data-lc-night='on'] pre code span.token[style*='rgb(0, 0, 255)'] {
  color: #7fa8d6 !important;
}

/* ============================ 护眼遮罩 ================================== */
#lc-night-veils {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
}

#lc-night-veils > div {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

#lc-night-veil-warm {
  background-color: #ff9a3c;
  opacity: 0;
  transition: opacity 0.25s ease;
}

#lc-night-veil-dim {
  background-color: #000;
  opacity: 0;
  transition: opacity 0.25s ease;
}

@media print {
  #lc-night-veils {
    display: none !important;
  }
}`;

  /* ------------------------------------------------------------------ 常量 */
  // 不能在脚本顶层缓存 documentElement：@run-at document-start 时它可能还没生成
  const getRoot = () => document.documentElement;
  const ATTR = 'data-lc-night';
  const DEFAULTS = { enabled: true, warm: 12, dim: 0, btn: true };

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* ------------------------------------------------------------ 设置读写 */
  // 优先 GM 存储，没有就退到 localStorage
  const hasGM = typeof GM_getValue === 'function' && typeof GM_setValue === 'function';

  const store = {
    get(key, fallback) {
      try {
        if (hasGM) {
          const v = GM_getValue(key, undefined);
          return v === undefined ? fallback : v;
        }
        const raw = localStorage.getItem('lcn.' + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        if (hasGM) GM_setValue(key, value);
        else localStorage.setItem('lcn.' + key, JSON.stringify(value));
      } catch {}
    },
  };

  let state = {
    enabled: store.get('enabled', DEFAULTS.enabled),
    warm: clamp(Number(store.get('warm', DEFAULTS.warm)) || 0, 0, 100),
    dim: clamp(Number(store.get('dim', DEFAULTS.dim)) || 0, 0, 60),
    btn: store.get('btn', DEFAULTS.btn),
  };

  function persist() {
    store.set('enabled', state.enabled);
    store.set('warm', state.warm);
    store.set('dim', state.dim);
    store.set('btn', state.btn);
  }

  /* ------------------------------------------------------------- 样式注入 */
  // @run-at document-start 时 <head> 可能尚未解析出来，
  // 按 head → documentElement → 等节点出现 的顺序兜底，确保样式一定注入。
  function injectCSS() {
    if (document.getElementById('lc-night-style')) return true;
    const parent = document.head || document.documentElement;
    if (!parent) return false;
    const el = document.createElement('style');
    el.id = 'lc-night-style';
    el.textContent = CSS;
    parent.appendChild(el);
    return true;
  }

  function injectCSSWithRetry() {
    if (injectCSS()) return;
    // 还没解析出根节点：用 MutationObserver 等 <html> 出现
    const mo = new MutationObserver(() => {
      if (injectCSS()) mo.disconnect();
    });
    mo.observe(document, { childList: true, subtree: true });
    // 兜底：最多等 3 秒
    setTimeout(() => mo.disconnect(), 3000);
  }

  // 挂节点到 body；body 还没生成时退到 documentElement
  function mountPoint() {
    return document.body || document.documentElement;
  }

  // body 就绪后执行（document-start 时 body 一定还没有）
  function whenBodyReady(fn) {
    if (document.body) {
      fn();
      return;
    }
    const mo = new MutationObserver(() => {
      if (document.body) {
        mo.disconnect();
        fn();
      }
    });
    mo.observe(document, { childList: true, subtree: true });
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        mo.disconnect();
        fn();
      },
      { once: true }
    );
  }

  /* --------------------------------------------------------------- 遮罩层 */
  let veilWarm = null;
  let veilDim = null;

  function ensureVeils() {
    if (veilWarm && veilDim && veilWarm.isConnected && veilDim.isConnected) return;
    // body 未就绪时先不建，等 DOMContentLoaded 后由 boot 统一补
    if (!document.body) return;
    let host = document.getElementById('lc-night-veils');
    if (!host) {
      host = document.createElement('div');
      host.id = 'lc-night-veils';
      host.setAttribute('aria-hidden', 'true');
      const w = document.createElement('div');
      w.id = 'lc-night-veil-warm';
      const d = document.createElement('div');
      d.id = 'lc-night-veil-dim';
      host.append(w, d);
      mountPoint().appendChild(host);
    }
    veilWarm = document.getElementById('lc-night-veil-warm');
    veilDim = document.getElementById('lc-night-veil-dim');
  }

  function applyVeils() {
    if (!veilWarm || !veilDim) return;
    if (!state.enabled) {
      veilWarm.style.opacity = '0';
      veilDim.style.opacity = '0';
      return;
    }
    veilWarm.style.opacity = String((state.warm / 100) * 0.12);
    veilDim.style.opacity = String((state.dim / 100) * 0.3);
  }

  /* --------------------------------------------------------- 挂载 / 卸载 */
  let originalClass = null;

  function mount() {
    if (originalClass === null) {
      const root = getRoot();
      originalClass = [...root.classList].filter((c) => c !== 'dark').join(' ');
    }
    const root = getRoot();
    if (!root) return;
    root.setAttribute(ATTR, 'on');
    // dark 类供站点 Tailwind 的 dark: 变体生效，否则文字仍是浅色主题的深灰
    if (root.classList.contains('light')) root.classList.remove('light');
    if (!root.classList.contains('dark')) root.classList.add('dark');
    ensureVeils();
  }

  function unmount() {
    const root = getRoot();
    if (root) {
      root.removeAttribute(ATTR);
      if (originalClass !== null) {
        root.className = originalClass;
        originalClass = null;
      }
    }
    applyVeils();
  }

  function render() {
    if (state.enabled) mount();
    else unmount();
    applyVeils();
  }

  /* ------------------------------------------------- 守护标记不被站点冲掉 */
  let observer = null;
  let guardBusy = false;

  function startGuard() {
    stopGuard();
    guardBusy = false;
    observer = new MutationObserver(() => {
      if (!state.enabled || guardBusy) return;
      const root = getRoot();
      if (!root) return;
      const lostAttr = root.getAttribute(ATTR) !== 'on';
      const lostDark = !root.classList.contains('dark');
      if (!lostAttr && !lostDark) return;
      guardBusy = true;
      if (lostAttr) root.setAttribute(ATTR, 'on');
      if (lostDark) {
        if (root.classList.contains('light')) root.classList.remove('light');
        root.classList.add('dark');
      }
      requestAnimationFrame(() => {
        guardBusy = false;
      });
    });
    const root = getRoot();
    if (!root) return;
    observer.observe(root, { attributes: true, attributeFilter: ['class', ATTR] });
  }

  function stopGuard() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    guardBusy = false;
  }

  /* ---------------------------------------------------------------- 设置面板 */
  // 用 Shadow DOM 隔离，避免被力扣自己的 CSS 污染
  let shadowHost = null;
  let shadowRoot = null;
  let panelOpen = false;

  const PANEL_CSS = `
    :host { all: initial; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; }
    .wrap {
      position: fixed; right: 20px; bottom: 124px; z-index: 2147483646;
      width: 268px; border-radius: 12px; overflow: hidden;
      background: #17120f; color: #ede1d2; font-size: 13px;
      border: 1px solid rgba(255,226,190,.14);
      box-shadow: 0 12px 40px rgba(0,0,0,.62);
      transform-origin: bottom right;
      transition: opacity .18s ease, transform .18s cubic-bezier(.2,.9,.3,1.2);
      opacity: 0; transform: scale(.94) translateY(6px); pointer-events: none;
    }
    .wrap.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
    .head { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; background:linear-gradient(160deg,#241d17,#1a1512); border-bottom:1px solid rgba(255,226,190,.1); }
    .brand { display:flex; align-items:center; gap:9px; }
    .moon { width:28px;height:28px;display:grid;place-items:center;border-radius:8px;background:rgba(233,169,79,.16);color:#e9a94f;flex:none; }
    .ttl { font-size:13px;font-weight:600;letter-spacing:.02em;color:#ede1d2; }
    .sub { font-size:10.5px;color:#7d7164;margin-top:1px; }
    .x { background:none;border:none;color:#7d7164;cursor:pointer;font-size:16px;line-height:1;padding:4px 6px;border-radius:6px; }
    .x:hover { color:#e9a94f;background:rgba(233,169,79,.1); }
    .body { padding:12px 14px 6px;display:flex;flex-direction:column;gap:12px; }
    .row { display:flex;flex-direction:column;gap:6px;transition:opacity .2s; }
    .row.off { opacity:.36;pointer-events:none; }
    .rh { display:flex;align-items:baseline;justify-content:space-between; }
    .rh label { font-size:12px;color:#a89a8b; }
    .val { font-size:11px;color:#e9a94f;font-variant-numeric:tabular-nums;font-weight:500; }
    input[type=range] { -webkit-appearance:none;appearance:none;display:block;width:100%;height:5px;margin:4px 0;border:none;border-radius:999px;background:#2b2521;outline:none;cursor:pointer; }
    input[type=range]::-webkit-slider-runnable-track { height:5px;border-radius:999px;background:transparent; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:#e9a94f;border:2px solid #241d17;box-shadow:0 0 0 1px rgba(233,169,79,.4);cursor:grab; }
    .hint { display:flex;justify-content:space-between;font-size:10px;color:#7d7164; }
    .presets { display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:2px; }
    .preset { padding:7px 4px;font-size:11.5px;color:#a89a8b;background:#221d19;border:1px solid rgba(255,226,190,.1);border-radius:8px;cursor:pointer;transition:all .16s; }
    .preset:hover { background:#2b2521;color:#ede1d2;border-color:rgba(233,169,79,.32); }
    .preset.on { background:rgba(233,169,79,.16);border-color:rgba(233,169,79,.55);color:#e9a94f; }
    .sw { position:relative;width:40px;height:23px;border:none;border-radius:999px;background:#3a332d;cursor:pointer;transition:background .22s;flex:none;padding:0; }
    .sw[aria-checked=true] { background:#e9a94f; }
    .sw i { position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:50%;background:#f6ece0;transition:transform .22s cubic-bezier(.34,1.4,.6,1);box-shadow:0 1px 3px rgba(0,0,0,.4); }
    .sw[aria-checked=true] i { transform:translateX(17px); }
    .foot { display:flex;align-items:center;justify-content:space-between;padding:9px 14px;border-top:1px solid rgba(255,226,190,.1);font-size:11px; }
    .foot a { color:#7d7164;text-decoration:none; }
    .foot a:hover { color:#e9a94f; }
    .keys { color:#7d7164;font-size:10px; }
    kbd { display:inline-block;min-width:16px;padding:1px 4px;font-size:9.5px;font-family:ui-monospace,monospace;color:#a89a8b;background:#2b2521;border:1px solid rgba(255,226,190,.1);border-bottom-width:2px;border-radius:3px; }
    .toggle-bar { display:flex;align-items:center;justify-content:space-between;padding-bottom:2px; }
    .toggle-lbl { font-size:12.5px;color:#a89a8b; }
  `;

  const MOON_SVG =
    '<svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" fill="currentColor" opacity=".95"/></svg>';

  // 右下角的悬浮入口按钮
  let fab = null;

  function buildPanel() {
    if (shadowHost) return;
    if (!document.body) return;

    shadowHost = document.createElement('div');
    shadowHost.id = 'lc-night-ui';
    shadowHost.style.cssText =
      'position:fixed;inset:0;z-index:2147483646;pointer-events:none;';

    shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    const styleEl = document.createElement('style');
    styleEl.textContent = PANEL_CSS;

    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.innerHTML = `
      <div class="head">
        <div class="brand">
          <span class="moon">${MOON_SVG}</span>
          <div>
            <div class="ttl">深夜护眼</div>
            <div class="sub">力扣夜间主题</div>
          </div>
        </div>
        <button class="x" title="关闭">×</button>
      </div>
      <div class="body">
        <div class="toggle-bar">
          <span class="toggle-lbl">主题开关</span>
          <button class="sw" role="switch" aria-checked="true" title="开关"><i></i></button>
        </div>
        <div class="row" data-row="warm">
          <div class="rh"><label>暖色强度</label><span class="val" data-val="warm">12%</span></div>
          <input type="range" min="0" max="100" step="1" value="12" data-range="warm" />
          <div class="hint"><span>冷</span><span>暖</span></div>
        </div>
        <div class="row" data-row="dim">
          <div class="rh"><label>再压暗一点</label><span class="val" data-val="dim">0%</span></div>
          <input type="range" min="0" max="60" step="1" value="0" data-range="dim" />
          <div class="hint"><span>亮</span><span>暗</span></div>
        </div>
        <div class="presets">
          <button class="preset" data-warm="0" data-dim="0">标准夜</button>
          <button class="preset" data-warm="20" data-dim="10">柔和</button>
          <button class="preset" data-warm="40" data-dim="25">极护眼</button>
        </div>
      </div>
      <div class="foot">
        <a href="https://github.com/czywork/leetcode-night-theme" target="_blank" rel="noopener">GitHub</a>
        <span class="keys"><kbd>Alt</kbd><kbd>⇧</kbd><kbd>N</kbd></span>
      </div>
    `;

    // 悬浮入口
    fab = document.createElement('button');
    fab.id = 'lc-night-fab';
    fab.title = '深夜护眼主题（Alt+Shift+N 开关）';
    fab.innerHTML = MOON_SVG;
    fab.style.cssText = `
      position: fixed; right: 20px; bottom: 76px; z-index: 2147483645;
      width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,226,190,.16);
      background: #221d19; color: #e9a94f; cursor: pointer; pointer-events: auto;
      display: grid; place-items: center; box-shadow: 0 4px 16px rgba(0,0,0,.5);
      opacity: .82; transition: opacity .2s, transform .2s;
    `;
    fab.addEventListener('mouseenter', () => {
      fab.style.opacity = '1';
      fab.style.transform = 'scale(1.08)';
    });
    fab.addEventListener('mouseleave', () => {
      fab.style.opacity = '.82';
      fab.style.transform = 'scale(1)';
    });
    fab.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanel();
    });

    shadowRoot.append(styleEl, wrap, fab);
    mountPoint().appendChild(shadowHost);

    bindPanel(wrap);
    syncPanel();
  }

  function bindPanel(wrap) {
    const q = (s) => wrap.querySelector(s);

    q('.x').addEventListener('click', togglePanel);

    q('.sw').addEventListener('click', () => {
      state.enabled = !state.enabled;
      render();
      persist();
      if (state.enabled) startGuard();
      else stopGuard();
      syncPanel();
    });

    ['warm', 'dim'].forEach((key) => {
      const range = q(`[data-range="${key}"]`);
      range.addEventListener('input', () => {
        state[key] = Number(range.value);
        render();
        syncPanel();
      });
      range.addEventListener('change', persist);
    });

    wrap.querySelectorAll('.preset').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.warm = Number(btn.dataset.warm);
        state.dim = Number(btn.dataset.dim);
        state.enabled = true;
        render();
        persist();
        startGuard();
        syncPanel();
      });
    });
  }

  function syncPanel() {
    if (!shadowRoot) return;
    const wrap = shadowRoot.querySelector('.wrap');
    if (!wrap) return;
    const sw = wrap.querySelector('.sw');
    sw.setAttribute('aria-checked', String(!!state.enabled));

    ['warm', 'dim'].forEach((key) => {
      const range = wrap.querySelector(`[data-range="${key}"]`);
      const val = wrap.querySelector(`[data-val="${key}"]`);
      const row = wrap.querySelector(`[data-row="${key}"]`);
      if (range) range.value = state[key];
      if (val) val.textContent = `${state[key]}%`;
      if (row) row.classList.toggle('off', !state.enabled);
    });

    wrap.querySelectorAll('.preset').forEach((btn) => {
      const on =
        Number(btn.dataset.warm) === state.warm &&
        Number(btn.dataset.dim) === state.dim;
      btn.classList.toggle('on', on);
    });

    if (fab) fab.style.display = panelOpen ? 'none' : state.btn ? 'grid' : 'none';
  }

  function togglePanel(force) {
    buildPanel();
    if (!shadowRoot) return;
    panelOpen = force === undefined ? !panelOpen : !!force;
    shadowRoot.querySelector('.wrap').classList.toggle('open', panelOpen);
    // 面板展开时藏起悬浮按钮，避免两层叠在一起
    if (fab) fab.style.display = panelOpen ? 'none' : state.btn ? 'grid' : 'none';
    syncPanel();
  }

  // 点击页面空白处收起面板
  document.addEventListener(
    'click',
    (e) => {
      if (!panelOpen) return;
      if (shadowHost && e.composedPath && e.composedPath().includes(shadowHost)) return;
      togglePanel(false);
    },
    true
  );

  /* ---------------------------------------------------------------- 快捷键 */
  function onKey(e) {
    if (!e.altKey || !e.shiftKey) return;
    const k = (e.key || '').toLowerCase();
    let hit = true;
    if (k === 'n') {
      state.enabled = !state.enabled;
      render();
      if (state.enabled) startGuard();
      else stopGuard();
    } else if (e.key === 'ArrowUp') {
      state.warm = clamp(state.warm + 5, 0, 100);
      render();
    } else if (e.key === 'ArrowDown') {
      state.warm = clamp(state.warm - 5, 0, 100);
      render();
    } else if (e.key === 'ArrowRight') {
      state.dim = clamp(state.dim + 5, 0, 60);
      render();
    } else if (e.key === 'ArrowLeft') {
      state.dim = clamp(state.dim - 5, 0, 60);
      render();
    } else {
      hit = false;
    }
    if (hit) {
      e.preventDefault();
      e.stopPropagation();
      persist();
      syncPanel();
    }
  }

  /* ---------------------------------------------------------------- 初始化 */
  function boot() {
    // 尽早注入样式并挂载，减少白屏闪烁
    const root = getRoot();
    if (state.enabled && root) {
      root.setAttribute(ATTR, 'on');
      root.classList.add('dark');
      root.classList.remove('light');
    }

    const start = () => {
      render();
      if (state.enabled) startGuard();
      document.addEventListener('keydown', onKey, true);

      // UI 与遮罩依赖 body，等它就绪后再建
      whenBodyReady(() => {
        render();
        if (state.btn) buildPanel();
      });

      // SPA 切题后 body 可能被替换，遮罩会一起消失
      let lastUrl = location.href;
      setInterval(() => {
        if (!state.enabled) return;
        if (location.href !== lastUrl) {
          lastUrl = location.href;
          render();
          startGuard();
        } else if (!veilWarm || !veilWarm.isConnected) {
          ensureVeils();
          applyVeils();
        }
      }, 1500);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }
  }

  injectCSSWithRetry();

  // 油猴菜单
  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('⚙️ 设置面板', () => togglePanel(true));
    GM_registerMenuCommand('🌙 开关主题', () => {
      state.enabled = !state.enabled;
      render();
      persist();
      if (state.enabled) startGuard();
      else stopGuard();
      syncPanel();
    });
    GM_registerMenuCommand('🫥 隐藏悬浮按钮', () => {
      state.btn = !state.btn;
      persist();
      buildPanel();
      syncPanel();
    });
    GM_registerMenuCommand('↩️ 恢复默认设置', () => {
      state = { ...DEFAULTS };
      render();
      persist();
      startGuard();
      syncPanel();
    });
  }

  boot();
})();