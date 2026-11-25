// ==UserScript==
// @name         深夜护眼 · 力扣夜间主题
// @name:en      LeetCode Night Eye-Care Theme
// @namespace    https://github.com/czywork/leetcode-night-theme
// @version      1.1.0
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

(function () {
  'use strict';

  /* --------------------------------------------------------------- 主题样式 */
  const CSS = `/* ============================================================================
   深夜护眼 · 力扣夜间主题 — 调色板定义
   ----------------------------------------------------------------------------
   每套主题只定义约 30 个核心 token，其余（力扣语义变量、sd 系统、透明层、
   Monaco 令牌）全部在 theme.css 里由这些 token 派生。

   新增一套主题 = 复制一个 40 行左右的块，改颜色即可。
   ========================================================================== */

/* ==========================================================================
   1. 暖夜琥珀（默认）—— 暖炭黑 + 象牙白 + 琥珀，蓝光最少
   ========================================================================== */
html[data-lc-night='on'][data-lcn-theme='amber'] {
  /* 底色层次：从最底到最亮一档 */
  --lcn-bg-deep: #100d0c;
  --lcn-bg: #16120f;
  --lcn-surface-1: #1b1714;
  --lcn-surface-2: #221d19;
  --lcn-surface-3: #2b2521;
  --lcn-surface-4: #37302a;

  /* 文字：四级层次 */
  --lcn-text-1: #ede4d8;
  --lcn-text-2: rgba(243, 232, 218, 0.8);
  --lcn-text-3: rgba(240, 228, 212, 0.62);
  --lcn-text-4: rgba(236, 224, 206, 0.44);

  /* 强调色与描边 */
  --lcn-accent: #e9a94f;
  --lcn-accent-dim: #c08f4a;
  --lcn-accent-soft: rgba(233, 169, 79, 0.16);
  --lcn-line: rgba(255, 226, 190, 0.1);
  --lcn-line-strong: rgba(255, 226, 190, 0.16);

  /* 透明层的暖白基色 */
  --lcn-tint-rgb: 255, 226, 190;

  /* 语法高亮 */
  --lcn-syn-fg: #ded1c1;
  --lcn-syn-fg-dim: #d8cbbc;
  --lcn-syn-inverse: #1b1714;
  --lcn-syn-green: #8fb87a;
  --lcn-syn-blue: #7fa8d6;
  --lcn-syn-red: #d9776a;
  --lcn-syn-orange: #e0a878;
  --lcn-syn-cyan: #7fb3d5;
  --lcn-syn-purple: #c79bdd;
  --lcn-syn-magenta: #d9a0b5;
  --lcn-syn-yellow: #d8b07a;
  --lcn-syn-gray: #9a8c7c;

  /* 语义色（难度标签 / 提示） */
  --lcn-ok: #79ad82;
  --lcn-warn: #d9a846;
  --lcn-err: #cf7f72;
  --lcn-info: #6f9fd0;

  /* sd 设计系统用的色相与饱和度 */
  --lcn-hue: 28;
  --lcn-sat: 14%;
}

/* ==========================================================================
   2. 护眼墨绿 —— 绿灰底，压蓝光但不让画面发绿失真
   ========================================================================== */
html[data-lc-night='on'][data-lcn-theme='green'] {
  --lcn-bg-deep: #0a100d;
  --lcn-bg: #0f1613;
  --lcn-surface-1: #131b17;
  --lcn-surface-2: #18211c;
  --lcn-surface-3: #1f2a23;
  --lcn-surface-4: #28352c;

  --lcn-text-1: #d6e4da;
  --lcn-text-2: rgba(214, 228, 218, 0.82);
  --lcn-text-3: rgba(205, 222, 210, 0.64);
  --lcn-text-4: rgba(196, 214, 202, 0.46);

  --lcn-accent: #7fbf9a;
  --lcn-accent-dim: #5f9578;
  --lcn-accent-soft: rgba(127, 191, 154, 0.16);
  --lcn-line: rgba(200, 255, 222, 0.1);
  --lcn-line-strong: rgba(200, 255, 222, 0.16);

  --lcn-tint-rgb: 200, 255, 222;

  --lcn-syn-fg: #cfe0d4;
  --lcn-syn-fg-dim: #b8ccc0;
  --lcn-syn-inverse: #131b17;
  --lcn-syn-green: #9ccfa6;
  --lcn-syn-blue: #7db8c4;
  --lcn-syn-red: #d89098;
  --lcn-syn-orange: #d4b878;
  --lcn-syn-cyan: #7fbfb4;
  --lcn-syn-purple: #b8a0cf;
  --lcn-syn-magenta: #cf9db8;
  --lcn-syn-yellow: #cdc078;
  --lcn-syn-gray: #6f897b;

  --lcn-ok: #7fbf9a;
  --lcn-warn: #c9b878;
  --lcn-err: #d89098;
  --lcn-info: #7db8c4;

  --lcn-hue: 145;
  --lcn-sat: 16%;
}

/* ==========================================================================
   3. Solarized 深色 —— Ethan Schoonover 的经典护眼配色
   ========================================================================== */
html[data-lc-night='on'][data-lcn-theme='solarized'] {
  --lcn-bg-deep: #00212b;
  --lcn-bg: #002b36;
  --lcn-surface-1: #00252e;
  --lcn-surface-2: #073642;
  --lcn-surface-3: #0d404e;
  --lcn-surface-4: #164b5b;

  --lcn-text-1: #cdd5d5;
  --lcn-text-2: rgba(198, 205, 205, 0.92);
  --lcn-text-3: rgba(198, 206, 207, 0.72);
  --lcn-text-4: rgba(182, 192, 193, 0.55);

  --lcn-accent: #b58900;
  --lcn-accent-dim: #8a6800;
  --lcn-accent-soft: rgba(181, 137, 0, 0.18);
  --lcn-line: rgba(147, 161, 161, 0.13);
  --lcn-line-strong: rgba(147, 161, 161, 0.22);

  --lcn-tint-rgb: 147, 161, 161;

  --lcn-syn-fg: #93a1a1;
  --lcn-syn-fg-dim: #879799;
  --lcn-syn-inverse: #002b36;
  --lcn-syn-green: #889d00;
  --lcn-syn-blue: #6fa8c8;
  --lcn-syn-red: #e76f6d;
  --lcn-syn-orange: #ea703e;
  --lcn-syn-cyan: #2ba69d;
  --lcn-syn-purple: #8b8fd0;
  --lcn-syn-magenta: #df6ea5;
  --lcn-syn-yellow: #bc8e00;
  --lcn-syn-gray: #80989f;

  --lcn-ok: #2ba39a;
  --lcn-warn: #b88b00;
  --lcn-err: #e66d6b;
  --lcn-info: #3a99db;

  --lcn-hue: 192;
  --lcn-sat: 42%;
}

/* ==========================================================================
   4. Gruvbox 复古 —— 暖调高对比，语法色区分度强，写代码很舒服
   ========================================================================== */
html[data-lc-night='on'][data-lcn-theme='gruvbox'] {
  --lcn-bg-deep: #1d2021;
  --lcn-bg: #282828;
  --lcn-surface-1: #242220;
  --lcn-surface-2: #3c3836;
  --lcn-surface-3: #504945;
  --lcn-surface-4: #665c54;

  --lcn-text-1: #ebdbb2;
  --lcn-text-2: rgba(238, 224, 188, 0.82);
  --lcn-text-3: rgba(229, 218, 197, 0.66);
  --lcn-text-4: rgba(211, 202, 184, 0.5);

  --lcn-accent: #fabd2f;
  --lcn-accent-dim: #d79921;
  --lcn-accent-soft: rgba(250, 189, 47, 0.16);
  --lcn-line: rgba(235, 219, 178, 0.12);
  --lcn-line-strong: rgba(235, 219, 178, 0.2);

  --lcn-tint-rgb: 235, 219, 178;

  --lcn-syn-fg: #ebdbb2;
  --lcn-syn-fg-dim: #d5c4a1;
  --lcn-syn-inverse: #282828;
  --lcn-syn-green: #b8bb26;
  --lcn-syn-blue: #83a598;
  --lcn-syn-red: #fc614e;
  --lcn-syn-orange: #fe8019;
  --lcn-syn-cyan: #8ec07c;
  --lcn-syn-purple: #d3869b;
  --lcn-syn-magenta: #d3869b;
  --lcn-syn-yellow: #fabd2f;
  --lcn-syn-gray: #9f9285;

  --lcn-ok: #b8bb26;
  --lcn-warn: #fabd2f;
  --lcn-err: #fb5f4c;
  --lcn-info: #83a598;

  --lcn-hue: 30;
  --lcn-sat: 7%;
}

/* ============================================================================
   深夜护眼 · 力扣夜间主题 — 结构层
   ----------------------------------------------------------------------------
   本文件不含具体颜色，全部由 themes.css 里每套主题定义的 ~30 个 token 派生。
   换主题 = 换 html 上的 data-lcn-theme 值。

   派生关系：
     --lcn-bg/surface/text/accent  →  力扣语义变量（--layer-* / --text-* / --fill-* / --border-*）
     --lcn-hue/sat                 →  sd 设计系统（HSL 三元组）
     --lcn-syn-*                   →  Monaco .mtk1~32 与 Prism 行内色

   为什么必须用 html[data-lc-night='on'] 双属性：
   1. data 属性不会被站点 el.className = 'light' 整体重写冲掉
   2. 特指度 (0,2,1) 高于站点 :root (0,1,0)，变量覆盖稳
   ========================================================================== */

/* ============================ 力扣语义变量映射 ============================ */
html[data-lc-night='on'] {
  color-scheme: dark;

  /* ---- 中性灰阶 ---- */
  --pure-white: var(--lcn-text-1);
  --pure-black: var(--lcn-bg-deep);

  --dark-gray-black: var(--lcn-bg-deep);
  --dark-gray-10: var(--lcn-surface-1);
  --dark-gray-20: var(--lcn-surface-2);
  --dark-gray-30: var(--lcn-surface-3);
  --dark-gray-40: var(--lcn-surface-4);
  --dark-gray-50: color-mix(in srgb, var(--lcn-surface-4) 70%, var(--lcn-text-1));
  --dark-gray-60: color-mix(in srgb, var(--lcn-text-4) 80%, var(--lcn-text-1));
  --dark-gray-70: var(--lcn-text-4);
  --dark-gray-80: var(--lcn-text-3);
  --dark-gray-90: var(--lcn-text-2);
  --dark-gray-100: var(--lcn-text-1);

  --gray-10: var(--lcn-surface-1);
  --gray-20: var(--lcn-surface-2);
  --gray-40: var(--lcn-surface-4);
  --gray-60: var(--lcn-text-4);
  --gray-80: var(--lcn-text-3);
  --gray-100: var(--lcn-text-1);

  /* 亮色阶也压过来，避免站点的亮色代码路径串出冷白 */
  --light-gray-10: var(--lcn-surface-1);
  --light-gray-20: var(--lcn-surface-2);
  --light-gray-30: var(--lcn-surface-3);
  --light-gray-40: var(--lcn-surface-4);
  --light-gray-50: var(--lcn-text-4);
  --light-gray-60: var(--lcn-text-3);
  --light-gray-70: var(--lcn-text-2);
  --light-gray-80: var(--lcn-text-1);
  --light-gray-90: var(--lcn-text-1);
  --light-gray-100: var(--lcn-text-1);
  --light-gray-white: var(--lcn-bg);

  /* ---- 半透明层：基色来自主题的暖调 tint ---- */
  --opacity-white-10: rgba(var(--lcn-tint-rgb), 0.055);
  --opacity-white-20: rgba(var(--lcn-tint-rgb), 0.085);
  --opacity-white-30: rgba(var(--lcn-tint-rgb), 0.115);
  --opacity-white-40: rgba(var(--lcn-tint-rgb), 0.155);
  --opacity-white-50: rgba(var(--lcn-tint-rgb), 0.215);
  --opacity-white-60: rgba(var(--lcn-tint-rgb), 0.32);
  --opacity-white-70: rgba(var(--lcn-tint-rgb), 0.58);
  --opacity-white-80: rgba(var(--lcn-tint-rgb), 0.8);
  --opacity-white-90: rgba(var(--lcn-tint-rgb), 0.93);
  --opacity-white-100: var(--lcn-text-1);

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

  /* ---- 语义映射 ---- */
  --layer-01: var(--lcn-surface-2);
  --layer-02: var(--lcn-surface-3);
  --layer-03: var(--lcn-surface-4);
  --layer-bg-pure: var(--lcn-bg);
  --layer-bg-gray: var(--lcn-bg);

  --text-primary: var(--lcn-text-1);
  --text-secondary: var(--lcn-text-2);
  --text-tertiary: var(--lcn-text-3);
  --text-quaternary: var(--lcn-text-4);
  --text-reverse: var(--lcn-bg-deep);

  --fill-primary: var(--opacity-white-40);
  --fill-secondary: var(--opacity-white-30);
  --fill-tertiary: var(--opacity-white-20);
  --fill-quaternary: var(--opacity-white-10);
  --fill-pure: var(--lcn-bg-deep);

  --border-primary: var(--opacity-white-60);
  --border-secondary: var(--opacity-white-50);
  --border-tertiary: var(--opacity-white-40);
  --border-quaternary: var(--opacity-white-30);

  /* ---- 品牌 ---- */
  --brand-orange: var(--lcn-accent);
  --brand-gray: var(--lcn-text-3);
  --brand-logo: var(--lcn-text-1);
  --dark-brand-orange: var(--lcn-accent);
  --dark-brand-gray: var(--lcn-text-3);
  --dark-brand-white: var(--lcn-text-1);
  --dark-brand-black: #000;

  /* ---- 色板：全部由语法色派生，保证与代码高亮同一套语言 ---- */
  --dark-teal-60: var(--lcn-syn-cyan);
  --dark-teal-10: color-mix(in srgb, var(--lcn-syn-cyan) 18%, var(--lcn-bg));
  --dark-teal-20: color-mix(in srgb, var(--lcn-syn-cyan) 26%, var(--lcn-bg));
  --dark-yellow-60: var(--lcn-syn-yellow);
  --dark-yellow-10: color-mix(in srgb, var(--lcn-syn-yellow) 18%, var(--lcn-bg));
  --dark-yellow-20: color-mix(in srgb, var(--lcn-syn-yellow) 26%, var(--lcn-bg));
  --dark-red-60: var(--lcn-syn-red);
  --dark-red-10: color-mix(in srgb, var(--lcn-syn-red) 18%, var(--lcn-bg));
  --dark-red-20: color-mix(in srgb, var(--lcn-syn-red) 26%, var(--lcn-bg));
  --dark-green-60: var(--lcn-syn-green);
  --dark-green-10: color-mix(in srgb, var(--lcn-syn-green) 18%, var(--lcn-bg));
  --dark-green-20: color-mix(in srgb, var(--lcn-syn-green) 26%, var(--lcn-bg));
  --dark-blue-60: var(--lcn-syn-blue);
  --dark-blue-10: color-mix(in srgb, var(--lcn-syn-blue) 18%, var(--lcn-bg));
  --dark-blue-20: color-mix(in srgb, var(--lcn-syn-blue) 26%, var(--lcn-bg));
  --dark-blue-40: color-mix(in srgb, var(--lcn-syn-blue) 55%, var(--lcn-bg));
  --dark-blue-70: color-mix(in srgb, var(--lcn-syn-blue) 80%, var(--lcn-text-1));
  --dark-blue-80: color-mix(in srgb, var(--lcn-syn-blue) 60%, var(--lcn-text-1));
  --dark-blue-90: color-mix(in srgb, var(--lcn-syn-blue) 40%, var(--lcn-text-1));
  --dark-blue-100: color-mix(in srgb, var(--lcn-syn-blue) 22%, var(--lcn-text-1));
  --dark-green-40: color-mix(in srgb, var(--lcn-syn-green) 55%, var(--lcn-bg));
  --dark-green-70: color-mix(in srgb, var(--lcn-syn-green) 80%, var(--lcn-text-1));
  --dark-green-80: color-mix(in srgb, var(--lcn-syn-green) 60%, var(--lcn-text-1));
  --dark-green-90: color-mix(in srgb, var(--lcn-syn-green) 40%, var(--lcn-text-1));
  --dark-green-100: color-mix(in srgb, var(--lcn-syn-green) 22%, var(--lcn-text-1));
  --dark-purple-60: var(--lcn-syn-purple);
  --dark-purple-10: color-mix(in srgb, var(--lcn-syn-purple) 18%, var(--lcn-bg));
  --dark-purple-20: color-mix(in srgb, var(--lcn-syn-purple) 26%, var(--lcn-bg));
  --dark-magenta-60: var(--lcn-syn-magenta);
  --dark-magenta-10: color-mix(in srgb, var(--lcn-syn-magenta) 18%, var(--lcn-bg));
  --dark-magenta-20: color-mix(in srgb, var(--lcn-syn-magenta) 26%, var(--lcn-bg));

  --teal-10: var(--dark-teal-10);
  --teal-20: var(--dark-teal-20);
  --teal-40: color-mix(in srgb, var(--lcn-syn-cyan) 55%, var(--lcn-bg));
  --teal-60: var(--lcn-syn-cyan);
  --teal-80: color-mix(in srgb, var(--lcn-syn-cyan) 75%, var(--lcn-text-1));
  --teal-100: color-mix(in srgb, var(--lcn-syn-cyan) 25%, var(--lcn-text-1));

  --yellow-10: var(--dark-yellow-10);
  --yellow-20: var(--dark-yellow-20);
  --yellow-40: color-mix(in srgb, var(--lcn-syn-yellow) 55%, var(--lcn-bg));
  --yellow-60: var(--lcn-syn-yellow);
  --yellow-80: color-mix(in srgb, var(--lcn-syn-yellow) 75%, var(--lcn-text-1));
  --yellow-100: color-mix(in srgb, var(--lcn-syn-yellow) 25%, var(--lcn-text-1));
  --dark-opacity-yellow-60: color-mix(in srgb, var(--lcn-syn-yellow) 16%, transparent);
  --light-opacity-yellow-60: color-mix(in srgb, var(--lcn-syn-yellow) 16%, transparent);
  --opacity-yellow-60: color-mix(in srgb, var(--lcn-syn-yellow) 16%, transparent);

  --red-10: var(--dark-red-10);
  --red-20: var(--dark-red-20);
  --red-40: color-mix(in srgb, var(--lcn-syn-red) 55%, var(--lcn-bg));
  --red-60: var(--lcn-syn-red);
  --red-80: color-mix(in srgb, var(--lcn-syn-red) 75%, var(--lcn-text-1));
  --red-100: color-mix(in srgb, var(--lcn-syn-red) 25%, var(--lcn-text-1));

  --green-10: var(--dark-green-10);
  --green-20: var(--dark-green-20);
  --green-40: var(--dark-green-40);
  --green-60: var(--lcn-syn-green);
  --green-80: var(--dark-green-70);
  --green-100: var(--dark-green-90);

  --blue-10: var(--dark-blue-10);
  --blue-20: var(--dark-blue-20);
  --blue-40: var(--dark-blue-40);
  --blue-60: var(--lcn-syn-blue);
  --blue-80: var(--dark-blue-70);
  --blue-100: var(--dark-blue-90);

  --purple-10: var(--dark-purple-10);
  --purple-20: var(--dark-purple-20);
  --purple-40: color-mix(in srgb, var(--lcn-syn-purple) 55%, var(--lcn-bg));
  --purple-60: var(--lcn-syn-purple);
  --purple-80: color-mix(in srgb, var(--lcn-syn-purple) 75%, var(--lcn-text-1));
  --purple-100: color-mix(in srgb, var(--lcn-syn-purple) 25%, var(--lcn-text-1));

  --magenta-10: var(--dark-magenta-10);
  --magenta-20: var(--dark-magenta-20);
  --magenta-40: color-mix(in srgb, var(--lcn-syn-magenta) 55%, var(--lcn-bg));
  --magenta-60: var(--lcn-syn-magenta);
  --magenta-80: color-mix(in srgb, var(--lcn-syn-magenta) 75%, var(--lcn-text-1));
  --magenta-100: color-mix(in srgb, var(--lcn-syn-magenta) 25%, var(--lcn-text-1));

  --difficulty-easy: var(--lcn-ok);
  --difficulty-medium: var(--lcn-warn);
  --difficulty-hard: var(--lcn-err);

  --message-danger: var(--lcn-err);
  --message-warning: var(--lcn-warn);
  --message-primary: var(--lcn-info);
  --message-success: var(--lcn-ok);

  --special-rose: var(--lcn-syn-red);
  --special-sunny: var(--lcn-syn-yellow);
  --special-kiwi: var(--lcn-syn-green);
  --special-skyler: var(--lcn-syn-blue);
  --special-lavender: var(--lcn-syn-purple);
  --dark-special-rose: var(--lcn-syn-red);
  --dark-special-sunny: var(--lcn-syn-yellow);
  --dark-special-kiwi: var(--lcn-syn-green);
  --dark-special-skyler: var(--lcn-syn-blue);
  --dark-special-lavender: var(--lcn-syn-purple);

  --fixed-black: #000;
  --fixed-white: #fff;

  /* ---- 第二套设计系统（HSL 三元组）---- */
  --sd-background: var(--lcn-hue) var(--lcn-sat) 7%;
  --sd-background-gray: var(--lcn-hue) var(--lcn-sat) 5%;
  --sd-foreground: var(--lcn-hue) 20% 88%;
  --sd-card: var(--lcn-hue) var(--lcn-sat) 11%;
  --sd-card-foreground: var(--lcn-hue) 20% 88%;
  --sd-popover: var(--lcn-hue) var(--lcn-sat) 14%;
  --sd-popover-foreground: var(--lcn-hue) 20% 91%;
  --sd-primary: var(--lcn-hue) 20% 88%;
  --sd-primary-foreground: var(--lcn-hue) var(--lcn-sat) 9%;
  --sd-secondary: var(--lcn-hue) var(--lcn-sat) 16%;
  --sd-secondary-foreground: var(--lcn-hue) 20% 91%;
  --sd-muted: var(--lcn-hue) var(--lcn-sat) 16%;
  --sd-muted-foreground: var(--lcn-hue) 14% 60%;
  --sd-accent: var(--lcn-hue) 30% 88% / 0.09;
  --sd-accent-foreground: var(--lcn-hue) 20% 91%;
  --sd-border: var(--lcn-hue) 30% 88% / 0.11;
  --sd-input: var(--lcn-hue) 30% 88% / 0.14;
  --sd-ring: var(--lcn-hue) 20% 70%;
  --sd-gray-50: var(--lcn-hue) var(--lcn-sat) 13%;
  --sd-gray-100: var(--lcn-hue) var(--lcn-sat) 17%;
  --sd-gray-200: var(--lcn-hue) var(--lcn-sat) 21%;
  --sd-gray-300: var(--lcn-hue) var(--lcn-sat) 29%;
  --sd-gray-400: var(--lcn-hue) 12% 58%;
  --sd-gray-500: var(--lcn-hue) 14% 66%;
  --sd-gray-600: var(--lcn-hue) 16% 67%;
  --sd-gray-700: var(--lcn-hue) 20% 79%;
  --sd-gray-800: var(--lcn-hue) 24% 85%;
  --sd-gray-900: var(--lcn-hue) 28% 89%;
  --sd-gray-950: var(--lcn-hue) 20% 93%;

  /* ---- 阴影 ---- */
  --light-shadow-layer-1: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 0.5px 5px 0 rgba(0, 0, 0, 0.4);
  --light-shadow-layer-1-hover: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 4px 8px 0 rgba(0, 0, 0, 0.55);
  --light-shadow-layer-2: 0 0 1px 0 rgba(0, 0, 0, 0.6), 0 0 1px 0 rgba(0, 0, 0, 0.4), 0 7px 22px 0 rgba(0, 0, 0, 0.6);
  --light-shadow-layer-3: 0 0 2px 0 rgba(0, 0, 0, 0.6), 0 38px 90px 0 rgba(0, 0, 0, 0.7);
  --dark-shadow-layer-1: var(--light-shadow-layer-1);
  --dark-shadow-layer-1-hover: var(--light-shadow-layer-1-hover);
  --dark-shadow-layer-2: var(--light-shadow-layer-2);
  --dark-shadow-layer-3: var(--light-shadow-layer-3);
  --shadow-layer-1: var(--dark-shadow-layer-1);
  --shadow-layer-1-hover: var(--dark-shadow-layer-1-hover);
  --shadow-layer-2: var(--dark-shadow-layer-2);
  --shadow-layer-3: var(--dark-shadow-layer-3);
}

/* ============================ 兜底：写死的底色 ============================ */
html[data-lc-night='on'] body {
  background-color: var(--lcn-bg) !important;
  color: var(--lcn-text-1);
}

html[data-lc-night='on'] .bg-layer-1,
html[data-lc-night='on'] .bg-layer-2,
html[data-lc-night='on'] .bg-layer-3,
html[data-lc-night='on'] .bg-layer-01,
html[data-lc-night='on'] .bg-layer-bg-pure,
html[data-lc-night='on'] .bg-sd-card {
  background-color: var(--lcn-surface-2) !important;
}

html[data-lc-night='on'] .bg-layer-bg-gray,
html[data-lc-night='on'] .bg-sd-background,
html[data-lc-night='on'] .bg-sd-background-gray {
  background-color: var(--lcn-bg) !important;
}

/* 表单控件 */
html[data-lc-night='on'] input:not([type='checkbox']):not([type='radio']),
html[data-lc-night='on'] textarea,
html[data-lc-night='on'] select {
  background-color: var(--lcn-surface-3) !important;
  color: var(--lcn-text-1) !important;
  border-color: var(--lcn-line-strong) !important;
}

/* 站点早期命名空间：bg-paper / bg-lc-layer-01 等写死成 rgb(255 255 255) */
html[data-lc-night='on'] .bg-paper,
html[data-lc-night='on'] .bg-lc-layer-01,
html[data-lc-night='on'] .bg-lc-layer-02,
html[data-lc-night='on'] .bg-lc-fill-01,
html[data-lc-night='on'] .bg-lc-background-index,
html[data-lc-night='on'] [class*='bg-lc-layer-'],
html[data-lc-night='on'] [class*='bg-lc-background'] {
  background-color: var(--lcn-surface-2) !important;
}

html[data-lc-night='on'] [class*='dark:bg-dark-lc-background-index'],
html[data-lc-night='on'] [class*='bg-dark-lc-background-index'] {
  background-color: var(--lcn-bg) !important;
}

html[data-lc-night='on'] [class*='dark:bg-dark-gray-5'][class*='bg-paper'],
html[data-lc-night='on'] [class*='dark:bg-dark-fill-3'][class*='bg-fill'] {
  background-color: var(--lcn-surface-3) !important;
}

html[data-lc-night='on'] input::placeholder,
html[data-lc-night='on'] textarea::placeholder {
  color: var(--lcn-text-4) !important;
}

/* 题面里的代码块 / 表格 / 引用 */
html[data-lc-night='on'] pre,
html[data-lc-night='on'] pre code {
  background-color: var(--lcn-surface-1) !important;
  color: var(--lcn-syn-fg-dim) !important;
}

html[data-lc-night='on'] table th {
  background-color: var(--lcn-surface-3) !important;
  color: var(--lcn-text-1) !important;
}

html[data-lc-night='on'] table td {
  border-color: var(--lcn-line) !important;
}

html[data-lc-night='on'] blockquote {
  background-color: var(--lcn-surface-2) !important;
  border-left-color: var(--lcn-surface-4) !important;
  color: var(--lcn-text-2) !important;
}

/* ============================ 强调色 ====================================== */


html[data-lc-night='on'] [class*='bg-blue-0'],
html[data-lc-night='on'] [class*='bg-dark-blue-0'] {
  background-color: var(--lcn-accent-soft) !important;
}

html[data-lc-night='on'] [class*='bg-green-s'],
html[data-lc-night='on'] [class*='bg-dark-green-s'] {
  background-color: color-mix(in srgb, var(--lcn-ok) 62%, #000) !important;
  color: var(--lcn-text-1) !important;
}

/* 难度标签「困难」等用 text-pink / text-red 写死高饱和色，
   在暖底上刺眼且对比不足，统一映射到主题语义色 */
html[data-lc-night='on'] [class*='text-pink'],
html[data-lc-night='on'] [class*='text-dark-pink'] {
  color: var(--lcn-err) !important;
}

html[data-lc-night='on'] [class*='text-red-s'],
html[data-lc-night='on'] [class*='text-dark-red-s'] {
  color: var(--lcn-err) !important;
}

html[data-lc-night='on'] [class*='text-teal-s'],
html[data-lc-night='on'] [class*='text-dark-teal-s'] {
  color: var(--lcn-ok) !important;
}

html[data-lc-night='on'] [class*='text-yellow-s'],
html[data-lc-night='on'] [class*='text-dark-yellow-s'] {
  color: var(--lcn-warn) !important;
}

/* 难度标签「困难」等用 text-pink / text-red 写死高饱和色，
   在暖底上刺眼且对比不足，统一映射到主题语义色 */
html[data-lc-night='on'] [class*='text-pink'],
html[data-lc-night='on'] [class*='text-dark-pink'] {
  color: var(--lcn-err) !important;
}

html[data-lc-night='on'] [class*='text-red-s'],
html[data-lc-night='on'] [class*='text-dark-red-s'] {
  color: var(--lcn-err) !important;
}

html[data-lc-night='on'] [class*='text-teal-s'],
html[data-lc-night='on'] [class*='text-dark-teal-s'] {
  color: var(--lcn-ok) !important;
}

html[data-lc-night='on'] [class*='text-yellow-s'],
html[data-lc-night='on'] [class*='text-dark-yellow-s'] {
  color: var(--lcn-warn) !important;
}

/* ============================ Monaco 代码编辑器 =========================== */
/* Monaco 内部用 --vscode-editor-background 覆盖背景，优先级高于普通类选择器，
   必须直接改这套变量，否则背景会退回站点自己的值 */
html[data-lc-night='on'] .monaco-editor {
  --vscode-editor-background: var(--lcn-surface-1);
  --vscode-editor-foreground: var(--lcn-syn-fg);
  --vscode-editor-lineHighlightBorder: var(--lcn-line);
  --vscode-editorCursor-foreground: var(--lcn-accent);
  --vscode-editor-selectionBackground: color-mix(in srgb, var(--lcn-accent) 24%, transparent);
  --vscode-editor-inactiveSelectionBackground: color-mix(in srgb, var(--lcn-accent) 14%, transparent);
  --vscode-editor-line-number-foreground: var(--lcn-text-4);
  --vscode-editorGutter-background: var(--lcn-surface-1);
  --vscode-editorIndentGuide-background1: var(--lcn-line);
  --vscode-editorIndentGuide-background2: var(--lcn-line);
  --vscode-editorIndentGuide-activeBackground1: var(--lcn-surface-4);
  --vscode-editorIndentGuide-activeBackground2: var(--lcn-surface-4);
  --vscode-editorBracketMatch-background: color-mix(in srgb, var(--lcn-accent) 16%, transparent);
  --vscode-editorBracketMatch-border: var(--lcn-accent-dim);
  --vscode-scrollbarSlider-background: var(--lcn-surface-4);
  --vscode-scrollbarSlider-hoverBackground: color-mix(in srgb, var(--lcn-surface-4) 70%, var(--lcn-text-2));
  --vscode-editorWidget-background: var(--lcn-surface-3);
  --vscode-editorWidget-border: var(--lcn-surface-4);
  --vscode-editorHoverWidget-background: var(--lcn-surface-3);
  --vscode-editorHoverWidget-foreground: var(--lcn-text-1);
  --vscode-editorHoverWidget-border: var(--lcn-surface-4);
  --vscode-editorSuggestWidget-background: var(--lcn-surface-3);
  --vscode-editorSuggestWidget-foreground: var(--lcn-text-1);
  --vscode-editorSuggestWidget-border: var(--lcn-surface-4);
  --vscode-editorSuggestWidget-selectedBackground: color-mix(in srgb, var(--lcn-accent) 20%, transparent);
  --vscode-editor-lineHighlightBackground: rgba(var(--lcn-tint-rgb), 0.035);
  --vscode-list-hoverBackground: rgba(var(--lcn-tint-rgb), 0.07);
  --vscode-list-activeSelectionBackground: color-mix(in srgb, var(--lcn-accent) 22%, transparent);
  --vscode-focusBorder: var(--lcn-accent);
}

/* Monaco 的 .monaco-editor-background 用 var(--vscode-editor-background)，
   而其自身 class 选择器特指度高于继承，必须直接点名这个元素 */
html[data-lc-night='on'] .monaco-editor .monaco-editor-background,
html[data-lc-night='on'] .monaco-editor .lines-content.monaco-editor-background,
html[data-lc-night='on'] .monaco-editor .view-lines.monaco-mouse-cursor-text {
  background-color: var(--lcn-surface-1) !important;
}

/* Monaco 的 .monaco-editor-background 用 var(--vscode-editor-background)，
   而其自身 class 选择器特指度高于继承，必须直接点名这个元素 */
html[data-lc-night='on'] .monaco-editor .monaco-editor-background,
html[data-lc-night='on'] .monaco-editor .lines-content.monaco-editor-background,
html[data-lc-night='on'] .monaco-editor .view-lines.monaco-mouse-cursor-text {
  background-color: var(--lcn-surface-1) !important;
}

html[data-lc-night='on'] .monaco-editor,
html[data-lc-night='on'] .monaco-editor .monaco-editor-background,
html[data-lc-night='on'] .monaco-editor .margin,
html[data-lc-night='on'] .monaco-editor .scroll-decoration,
html[data-lc-night='on'] .monaco-editor .lines-content,
html[data-lc-night='on'] .monaco-editor .view-overlays,
html[data-lc-night='on'] .monaco-editor .overflow-guard,
html[data-lc-night='on'] .monaco-editor .decorationsOverviewRuler {
  background-color: var(--lcn-surface-1) !important;
}

html[data-lc-night='on'] .monaco-editor .line-numbers {
  color: color-mix(in srgb, var(--lcn-text-4) 75%, var(--lcn-bg)) !important;
}

html[data-lc-night='on'] .monaco-editor .line-numbers.active-line-number {
  color: var(--lcn-text-2) !important;
}

html[data-lc-night='on'] .monaco-editor .current-line {
  border-color: var(--lcn-line) !important;
  background-color: rgba(var(--lcn-tint-rgb), 0.035) !important;
}

html[data-lc-night='on'] .monaco-editor .selected-text {
  background-color: color-mix(in srgb, var(--lcn-accent) 22%, transparent) !important;
}

html[data-lc-night='on'] .monaco-editor .cursors-layer .cursor {
  background-color: var(--lcn-accent) !important;
  border-color: var(--lcn-accent) !important;
}

html[data-lc-night='on'] .monaco-editor .bracket-match {
  background-color: color-mix(in srgb, var(--lcn-accent) 16%, transparent) !important;
  border-color: var(--lcn-accent-dim) !important;
}

html[data-lc-night='on'] .monaco-editor .indent-guide {
  border-left-color: var(--lcn-line) !important;
}

html[data-lc-night='on'] .monaco-editor .suggest-widget,
html[data-lc-night='on'] .monaco-editor .monaco-hover,
html[data-lc-night='on'] .monaco-editor .parameter-hints-widget {
  background-color: var(--lcn-surface-3) !important;
  border-color: var(--lcn-surface-4) !important;
  color: var(--lcn-text-1) !important;
}

/* ---- Monaco 令牌：映射到主题语法色 ---- */
html[data-lc-night='on'] .monaco-editor .mtk1 { color: var(--lcn-syn-fg) !important; }
html[data-lc-night='on'] .monaco-editor .mtk2 { color: var(--lcn-syn-inverse) !important; }
html[data-lc-night='on'] .monaco-editor .mtk3 { color: var(--lcn-syn-green) !important; }
html[data-lc-night='on'] .monaco-editor .mtk4 { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] .monaco-editor .mtk5 { color: var(--lcn-syn-magenta) !important; }
html[data-lc-night='on'] .monaco-editor .mtk6 { color: var(--lcn-syn-red) !important; }
html[data-lc-night='on'] .monaco-editor .mtk7 { color: var(--lcn-syn-cyan) !important; }
html[data-lc-night='on'] .monaco-editor .mtk8 { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] .monaco-editor .mtk9 { color: var(--lcn-syn-cyan) !important; }
html[data-lc-night='on'] .monaco-editor .mtk10 { color: var(--lcn-syn-yellow) !important; }
html[data-lc-night='on'] .monaco-editor .mtk11 { color: var(--lcn-syn-purple) !important; }
html[data-lc-night='on'] .monaco-editor .mtk12 { color: var(--lcn-syn-red) !important; }
html[data-lc-night='on'] .monaco-editor .mtk13 { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] .monaco-editor .mtk14 { color: var(--lcn-syn-red) !important; }
html[data-lc-night='on'] .monaco-editor .mtk15 { color: var(--lcn-syn-red) !important; }
html[data-lc-night='on'] .monaco-editor .mtk16 { color: var(--lcn-syn-magenta) !important; }
html[data-lc-night='on'] .monaco-editor .mtk17 { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] .monaco-editor .mtk18 { color: var(--lcn-syn-orange) !important; }
html[data-lc-night='on'] .monaco-editor .mtk19 { color: var(--lcn-syn-cyan) !important; }
html[data-lc-night='on'] .monaco-editor .mtk20 { color: var(--lcn-syn-gray) !important; }
html[data-lc-night='on'] .monaco-editor .mtk21 { color: var(--lcn-syn-red) !important; }
html[data-lc-night='on'] .monaco-editor .mtk22 { color: var(--lcn-syn-fg-dim) !important; }
html[data-lc-night='on'] .monaco-editor .mtk23 { color: var(--lcn-syn-orange) !important; }
html[data-lc-night='on'] .monaco-editor .mtk24 { color: var(--lcn-syn-red) !important; }
html[data-lc-night='on'] .monaco-editor .mtk25 { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] .monaco-editor .mtk26 { color: var(--lcn-syn-gray) !important; }
html[data-lc-night='on'] .monaco-editor .mtk27 { color: var(--lcn-syn-gray) !important; }
html[data-lc-night='on'] .monaco-editor .mtk28 { color: var(--lcn-syn-purple) !important; }
html[data-lc-night='on'] .monaco-editor .mtk29 { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] .monaco-editor .mtk30 { color: var(--lcn-syn-cyan) !important; }
html[data-lc-night='on'] .monaco-editor .mtk31 { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] .monaco-editor .mtk32 { color: var(--lcn-syn-blue) !important; }

/* ============================ CodeMirror ================================= */
html[data-lc-night='on'] .cm-editor,
html[data-lc-night='on'] .cm-scroller,
html[data-lc-night='on'] .cm-gutters,
html[data-lc-night='on'] .cm-panels,
html[data-lc-night='on'] .cm-activeLine,
html[data-lc-night='on'] .cm-activeLineGutter {
  background-color: var(--lcn-surface-1) !important;
  color: var(--lcn-syn-fg) !important;
}

html[data-lc-night='on'] .cm-gutters {
  border-right-color: var(--lcn-line) !important;
  color: var(--lcn-text-4) !important;
}

html[data-lc-night='on'] .cm-content,
html[data-lc-night='on'] .cm-line {
  color: var(--lcn-syn-fg) !important;
  caret-color: var(--lcn-accent) !important;
}

html[data-lc-night='on'] .cm-cursor {
  border-left-color: var(--lcn-accent) !important;
}

html[data-lc-night='on'] .cm-selectionBackground,
html[data-lc-night='on'] .cm-content ::selection {
  background-color: color-mix(in srgb, var(--lcn-accent) 25%, transparent) !important;
}

/* ============================ 滚动条 ==================================== */
html[data-lc-night='on'] ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

html[data-lc-night='on'] ::-webkit-scrollbar-track {
  background: var(--lcn-bg-deep);
}

html[data-lc-night='on'] ::-webkit-scrollbar-thumb {
  background: var(--lcn-surface-4);
  border-radius: 6px;
}

html[data-lc-night='on'] ::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--lcn-surface-4) 70%, var(--lcn-text-2));
}

/* ==================== 文字色兜底（避免深灰压深底） ==================== */
html[data-lc-night='on'] .text-label-1,
html[data-lc-night='on'] [class~='text-label-1'] {
  color: var(--lcn-text-1) !important;
}

html[data-lc-night='on'] .text-label-2,
html[data-lc-night='on'] [class~='text-label-2'] {
  color: var(--lcn-text-2) !important;
}

html[data-lc-night='on'] .text-label-3,
html[data-lc-night='on'] [class~='text-label-3'] {
  color: var(--lcn-text-3) !important;
}

html[data-lc-night='on'] .text-label-4,
html[data-lc-night='on'] [class~='text-label-4'] {
  color: var(--lcn-text-4) !important;
}

html[data-lc-night='on'] .text-sd-foreground {
  color: hsl(var(--sd-foreground)) !important;
}

html[data-lc-night='on'] .text-sd-muted-foreground {
  color: hsl(var(--sd-muted-foreground)) !important;
}

/* ==================== 题面代码块语法高亮（Prism） ====================
   Prism 把颜色写成行内 style，只能靠 !important + 属性选择器命中。 */
html[data-lc-night='on'] pre code,
html[data-lc-night='on'] code[class*='language-'] {
  color: var(--lcn-syn-fg-dim) !important;
  text-shadow: none !important;
  background: none !important;
}

html[data-lc-night='on'] pre code .token.keyword,
html[data-lc-night='on'] pre code .token.control-flow,
html[data-lc-night='on'] pre code .token.boolean,
html[data-lc-night='on'] pre code .token.operator,
html[data-lc-night='on'] pre code .token.atrule,
html[data-lc-night='on'] pre code .token.rule {
  color: var(--lcn-syn-cyan) !important;
}

html[data-lc-night='on'] pre code .token.number,
html[data-lc-night='on'] pre code .token.constant,
html[data-lc-night='on'] pre code .token.symbol {
  color: var(--lcn-syn-magenta) !important;
}

html[data-lc-night='on'] pre code .token.function,
html[data-lc-night='on'] pre code .token.function-definition,
html[data-lc-night='on'] pre code .token.function-variable,
html[data-lc-night='on'] pre code .token.known-class-name,
html[data-lc-night='on'] pre code .token.class-name,
html[data-lc-night='on'] pre code .token.method,
html[data-lc-night='on'] pre code .token.builtin {
  color: var(--lcn-syn-orange) !important;
}

html[data-lc-night='on'] pre code .token.string,
html[data-lc-night='on'] pre code .token.char,
html[data-lc-night='on'] pre code .token.template-string {
  color: var(--lcn-syn-green) !important;
}

html[data-lc-night='on'] pre code .token.comment,
html[data-lc-night='on'] pre code .token.prolog,
html[data-lc-night='on'] pre code .token.doctype,
html[data-lc-night='on'] pre code .token.cdata {
  color: var(--lcn-syn-gray) !important;
}

html[data-lc-night='on'] pre code .token.parameter,
html[data-lc-night='on'] pre code .token.property-access,
html[data-lc-night='on'] pre code .token.variable,
html[data-lc-night='on'] pre code .token.property,
html[data-lc-night='on'] pre code .token.plain-text {
  color: var(--lcn-syn-fg-dim) !important;
}

html[data-lc-night='on'] pre code .token.punctuation,
html[data-lc-night='on'] pre code .token.bracket {
  color: color-mix(in srgb, var(--lcn-syn-gray) 70%, var(--lcn-text-1)) !important;
}

/* 行内写死色的兜底：Prism 的 token class 常为空，颜色在 style 里 */
html[data-lc-night='on'] pre code span.token[style*='rgb(0, 119, 170)'] { color: var(--lcn-syn-cyan) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(153, 0, 85)'] { color: var(--lcn-syn-magenta) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(221, 74, 104)'] { color: var(--lcn-syn-orange) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(166, 38, 164)'] { color: var(--lcn-syn-purple) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(154, 110, 58)'] { color: var(--lcn-syn-yellow) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(112, 128, 144)'] { color: var(--lcn-syn-gray) !important; }
html[data-lc-night='on'] pre code span.token[style*='slategray'] { color: var(--lcn-syn-gray) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(153, 153, 153)'] { color: color-mix(in srgb, var(--lcn-syn-gray) 80%, var(--lcn-bg)) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(0, 0, 0)'] { color: var(--lcn-syn-fg) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(255, 0, 0)'],
html[data-lc-night='on'] pre code span.token[style*='rgb(238, 0, 0)'] { color: var(--lcn-syn-red) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(0, 128, 0)'] { color: var(--lcn-syn-green) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(0, 0, 255)'] { color: var(--lcn-syn-blue) !important; }
html[data-lc-night='on'] pre code span.token[style*='rgb(38, 38, 38)'] { color: var(--lcn-syn-fg-dim) !important; }

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
}

/* 站点把 dark: 变体写成更长的类名（dark:text-dark-pink），
   单靠 [class*='text-pink'] 会被它压过去，这里补上精确匹配 */
html[data-lc-night='on'] .text-pink,
html[data-lc-night='on'] [class~='text-pink'],
html[data-lc-night='on'] [class~='dark:text-dark-pink'] {
  color: var(--lcn-err) !important;
}

/* 这类链接常出现在比正文底更亮的浮层上（surface-3），
   用 --lcn-info 仍不够，混入主文字色提亮 */
html[data-lc-night='on'] [class~='text-blue-s'],
html[data-lc-night='on'] [class~='dark:text-dark-blue-s'],
html[data-lc-night='on'] [class~='dark:text-dark-blue-60'],
html[data-lc-night='on'] [class*='text-blue-s'],
html[data-lc-night='on'] [class*='text-dark-blue-s'] {
  color: color-mix(in srgb, var(--lcn-info) 60%, var(--lcn-text-1)) !important;
}
`;

  /* ------------------------------------------------------------------ 常量 */
  // 不能在脚本顶层缓存 documentElement：@run-at document-start 时它可能还没生成
  const getRoot = () => document.documentElement;
  const ATTR = 'data-lc-night';
  const DEFAULTS = { enabled: true, warm: 12, dim: 0, btn: true, theme: 'amber' };

  // 可选配色主题（与 themes.css 中的 data-lcn-theme 值一一对应）
  const THEMES = {
    amber: '暖夜琥珀',
    green: '护眼墨绿',
    solarized: 'Solarized',
    gruvbox: 'Gruvbox',
  };

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
    theme: store.get('theme', DEFAULTS.theme),
  };

  function persist() {
    store.set('enabled', state.enabled);
    store.set('warm', state.warm);
    store.set('dim', state.dim);
    store.set('btn', state.btn);
    store.set('theme', state.theme);
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
    root.setAttribute('data-lcn-theme', state.theme || 'amber');
    // dark 类供站点 Tailwind 的 dark: 变体生效，否则文字仍是浅色主题的深灰
    if (root.classList.contains('light')) root.classList.remove('light');
    if (!root.classList.contains('dark')) root.classList.add('dark');
    ensureVeils();
  }

  function unmount() {
    const root = getRoot();
    if (root) {
      root.removeAttribute(ATTR);
      root.removeAttribute('data-lcn-theme');
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
    .themes { display:grid;grid-template-columns:repeat(4,1fr);gap:6px; }
    .theme-btn {
      display:flex;flex-direction:column;align-items:center;gap:4px;
      padding:6px 2px 5px;border-radius:8px;cursor:pointer;
      background:#221d19;border:1px solid rgba(255,226,190,.1);
      transition:all .16s;
    }
    .theme-btn:hover { background:#2b2521;border-color:rgba(255,226,190,.22); }
    .theme-btn.on { border-color:#e9a94f;background:rgba(233,169,79,.12); }
    .sw-dots { display:flex;gap:2px; }
    .sw-dots i { width:9px;height:9px;border-radius:2px;display:block; }
    .theme-nm { font-size:9.5px;color:#a89a8b;line-height:1;white-space:nowrap; }
    .theme-btn.on .theme-nm { color:#e9a94f; }
    .sec-lbl { font-size:11px;color:#7d7164;letter-spacing:.02em; }
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
        <div class="sec-lbl">配色主题</div>
        <div class="themes">
          <button class="theme-btn" data-theme="amber" title="暖夜琥珀">
            <span class="sw-dots"><i style="background:#16120f"></i><i style="background:#e9a94f"></i><i style="background:#7fb3d5"></i></span>
            <span class="theme-nm">琥珀</span>
          </button>
          <button class="theme-btn" data-theme="green" title="护眼墨绿">
            <span class="sw-dots"><i style="background:#0f1613"></i><i style="background:#7fbf9a"></i><i style="background:#7db8c4"></i></span>
            <span class="theme-nm">墨绿</span>
          </button>
          <button class="theme-btn" data-theme="solarized" title="Solarized 深色">
            <span class="sw-dots"><i style="background:#002b36"></i><i style="background:#b58900"></i><i style="background:#268bd2"></i></span>
            <span class="theme-nm">Solar</span>
          </button>
          <button class="theme-btn" data-theme="gruvbox" title="Gruvbox 复古">
            <span class="sw-dots"><i style="background:#282828"></i><i style="background:#fabd2f"></i><i style="background:#fb4934"></i></span>
            <span class="theme-nm">Gruv</span>
          </button>
        </div>
        <div class="presets">
          <button class="preset" data-warm="0" data-dim="0">标准夜</button>
          <button class="preset" data-warm="20" data-dim="10">柔和</button>
          <button class="preset" data-warm="40" data-dim="25">极护眼</button>
        </div>
      </div>
      <div class="foot">
        <a href="https://github.com/czywork/leetcode-night-theme" target="_blank" rel="noopener">GitHub</a>
        <span class="keys" title="N 开关 · T 换主题"><kbd>Alt</kbd><kbd>⇧</kbd><kbd>N</kbd><span style="margin:0 3px;color:#4d443c">/</span><kbd>T</kbd></span>
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

    // 配色主题切换
    wrap.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.theme = btn.dataset.theme;
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

    // 主题按钮高亮
    wrap.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.classList.toggle('on', btn.dataset.theme === (state.theme || 'amber'));
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
    } else if (k === 't') {
      // 循环切换主题
      const list = Object.keys(THEMES);
      const i = list.indexOf(state.theme || 'amber');
      state.theme = list[(i + 1) % list.length];
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
      root.setAttribute('data-lcn-theme', state.theme || 'amber');
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
    GM_registerMenuCommand('🎨 切换配色主题', () => {
      const list = Object.keys(THEMES);
      const i = list.indexOf(state.theme || 'amber');
      state.theme = list[(i + 1) % list.length];
      render();
      persist();
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