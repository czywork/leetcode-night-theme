/* 深夜护眼 · 力扣夜间主题 — 油猴脚本外壳
   ----------------------------------------------------------------------------
   本文件是模板，构建时会把 src/theme.css 的内容注入到下方 CSS 常量的占位处，
   生成最终可安装的 userscript。请勿直接安装本文件。
   ============================================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------------- 主题样式 */
  const CSS = `@@LCN_THEME_CSS@@`;

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