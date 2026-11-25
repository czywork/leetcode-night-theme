/* ============================================================================
   深夜护眼 · 力扣夜间主题 — 内容脚本
   ----------------------------------------------------------------------------
   站点有两个会影响我们的机制，必须同时照顾：

   1) 配色来自 CSS 变量（--layer-01 / --text-primary / --sd-* …）。
      我们在 html 上打 data-lc-night="on"，theme.css 用该属性接管全部变量。
      之所以不用 class 挂载：站点会执行 el.className = 'light' 整体重置，
      class 上的自定义标记会被连带清掉，而 data 属性不受影响。

   2) 大量文字用 Tailwind 的 dark: 变体（dark:text-dark-label-1 …）。
      这类变体只在 html.dark 存在时才生效。若只挂 data 属性而丢掉 dark，
      变量虽暖、文字却仍是浅色主题的深灰，出现「深灰压暖黑」看不清的问题。
      所以必须同时保证 html.dark 在位。

   本脚本职责：维护 data 属性 + dark 类、管遮罩、同步设置、快捷键。
   ========================================================================== */
(function () {
  'use strict';

  if (window.__lcNightBooted) return;
  window.__lcNightBooted = true;

  const ROOT = document.documentElement;
  const DEFAULTS = { enabled: true, warm: 12, dim: 0, theme: 'amber' };
  const ATTR = 'data-lc-night';

  let state = { ...DEFAULTS };
  let observer = null;
  let guardBusy = false;
  let veilWarm = null;
  let veilDim = null;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* --------------------------------------------------------------- 存储 */
  async function loadState() {
    try {
      const r = await chrome.storage.local.get(DEFAULTS);
      state = { ...DEFAULTS, ...r };
    } catch {
      state = { ...DEFAULTS };
    }
  }

  async function saveState() {
    try {
      await chrome.storage.local.set(state);
    } catch {}
  }

  /* ------------------------------------------------------------- 遮罩层 */
  function ensureVeils() {
    if (veilWarm && veilDim && veilWarm.isConnected && veilDim.isConnected) return;

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
      (document.body || ROOT).appendChild(host);
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
    // 暖色层最浓 12%、压暗层最浓 30%：再高就糊内容了
    veilWarm.style.opacity = String((state.warm / 100) * 0.12);
    veilDim.style.opacity = String((state.dim / 100) * 0.3);
  }

  /* ----------------------------------------------- 挂载/卸载主题标记 */
  // 记录接管前的原始 class，关闭主题时原样还原（用户原本若是亮色，就回到亮色）
  let originalClass = null;

  function rememberOriginal() {
    if (originalClass !== null) return;
    // 排除我们可能已加入的 dark/lc-night，保留站点自身状态
    const kept = [...ROOT.classList].filter(
      (c) => c !== 'dark' && c !== 'lc-night'
    );
    originalClass = kept.join(' ');
  }

  function mount() {
    rememberOriginal();
    ROOT.setAttribute(ATTR, 'on');
    ROOT.setAttribute('data-lcn-theme', state.theme || 'amber');
    // dark 类供 Tailwind dark: 变体使用；light 与之冲突，优先摘掉
    if (ROOT.classList.contains('light')) ROOT.classList.remove('light');
    if (!ROOT.classList.contains('dark')) ROOT.classList.add('dark');
    ensureVeils();
  }

  function unmount() {
    ROOT.removeAttribute(ATTR);
    ROOT.removeAttribute('data-lcn-theme');
    // 还原到接管前的状态，避免留下站点的冷灰暗色
    if (originalClass !== null) {
      ROOT.className = originalClass;
      originalClass = null;
    }
    applyVeils();
  }

  /* ---------------------------------------------------------------- 渲染 */
  function render() {
    if (state.enabled) mount();
    else unmount();
    applyVeils();
    try {
      window.dispatchEvent(
        new CustomEvent('lc-night:changed', { detail: { ...state } })
      );
    } catch {}
  }

  /* ------------------------------------------------- 守护标记不被冲掉
     站点（含 hydration / 路由切换）可能整体重写 className。
     这里只监听 class 与 data 属性，发现丢失就补回。
     用 guardBusy 防止自己的写入再次触发回调造成递归。                */
  function startGuard() {
    stopGuard();
    guardBusy = false;
    observer = new MutationObserver(() => {
      // 关闭状态绝不能补 dark，否则用户没法回到原本的亮色
      if (!state.enabled || guardBusy) return;
      const lostAttr = ROOT.getAttribute(ATTR) !== 'on';
      const lostDark = !ROOT.classList.contains('dark');
      if (!lostAttr && !lostDark) return;

      guardBusy = true;
      if (lostAttr) ROOT.setAttribute(ATTR, 'on');
      if (lostDark) {
        if (ROOT.classList.contains('light')) ROOT.classList.remove('light');
        ROOT.classList.add('dark');
      }
      // 让本次写入的 mutation 走完再恢复监听
      requestAnimationFrame(() => {
        guardBusy = false;
      });
    });
    observer.observe(ROOT, {
      attributes: true,
      attributeFilter: ['class', ATTR],
    });
  }

  function stopGuard() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    guardBusy = false;
  }

  /* ---------------------------------------------------------- 对外接口 */
  const api = {
    get: () => ({ ...state }),
    async set(patch = {}, persist = true) {
      state = {
        ...state,
        enabled: patch.enabled === undefined ? state.enabled : !!patch.enabled,
        warm: clamp(patch.warm === undefined ? state.warm : Number(patch.warm), 0, 100),
        dim: clamp(patch.dim === undefined ? state.dim : Number(patch.dim), 0, 60),
        theme: patch.theme === undefined ? state.theme : String(patch.theme),
      };
      render();
      if (state.enabled) startGuard();
      else stopGuard();
      if (persist) await saveState();
      return { ...state };
    },
    async toggle() {
      state.enabled = !state.enabled;
      render();
      if (state.enabled) startGuard();
      else stopGuard();
      await saveState();
      return { ...state };
    },
    refresh: render,
  };

  /* ------------------------------------------------------------ 快捷键 */
  // Alt+Shift+N 开关 ｜ ↑↓ 暖色 ｜ ←→ 压暗
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
      saveState();
    }
  }

  /* -------------------------------------------------------------- 初始化 */
  async function init() {
    await loadState();

    // document_start 阶段就先挂上，尽量缩短白屏闪烁
    if (state.enabled) {
      ROOT.setAttribute(ATTR, 'on');
      ROOT.classList.add('dark');
      ROOT.classList.remove('light');
    }

    const boot = () => {
      render();
      if (state.enabled) startGuard();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
      boot();
    }

    // 多标签页 / 弹窗改动同步
    try {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local') return;
        let dirty = false;
        for (const k of Object.keys(DEFAULTS)) {
          if (changes[k] && changes[k].newValue !== state[k]) {
            state[k] = changes[k].newValue;
            dirty = true;
          }
        }
        if (!dirty) return;
        render();
        if (state.enabled) startGuard();
        else stopGuard();
      });
    } catch {}

    // 响应扩展弹窗的指令
    try {
      chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
        if (!msg || typeof msg !== 'object') return;
        if (msg.type === 'lc-night:get') {
          reply(api.get());
        } else if (msg.type === 'lc-night:set') {
          api.set(msg.patch || {}).then(reply);
          return true;
        } else if (msg.type === 'lc-night:toggle') {
          api.toggle().then(reply);
          return true;
        }
      });
    } catch {}

    document.addEventListener('keydown', onKey, true);

    // SPA 切题时 body 可能被整体替换，遮罩会一起消失，需要重新挂
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
  }

  init();
})();