/* 深夜护眼 — 弹窗逻辑 */
'use strict';

const DEFAULTS = { enabled: true, warm: 12, dim: 0 };

const $ = (id) => document.getElementById(id);
const els = {
  switch: $('switch'),
  warm: $('warm'),
  dim: $('dim'),
  warmVal: $('warmVal'),
  dimVal: $('dimVal'),
  rowWarm: $('rowWarm'),
  rowDim: $('rowDim'),
  reset: $('reset'),
};

let saveTimer = null;

/* ------------------------------------------------------------------ 读写 */
async function loadState() {
  const s = await chrome.storage.local.get(DEFAULTS);
  return { ...DEFAULTS, ...s };
}

function persist(patch) {
  // 拖动滑块时防抖，避免频繁写盘
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => chrome.storage.local.set(patch), 60);
}

/* -------------------------------------------------------------- 渲染 UI */
function render(state) {
  els.switch.setAttribute('aria-checked', String(!!state.enabled));
  els.warm.value = state.warm;
  els.dim.value = state.dim;
  els.warmVal.textContent = `${state.warm}%`;
  els.dimVal.textContent = `${state.dim}%`;

  const off = !state.enabled;
  els.rowWarm.classList.toggle('disabled', off);
  els.rowDim.classList.toggle('disabled', off);

  // 预设高亮
  document.querySelectorAll('.preset').forEach((btn) => {
    const w = Number(btn.dataset.warm);
    const d = Number(btn.dataset.dim);
    btn.classList.toggle('active', w === state.warm && d === state.dim);
  });
}

/* ------------------------------------------------------------ 应用到页面 */
async function pushToTab(state) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    if (!/^https:\/\/([a-z0-9-]+\.)?leetcode\.cn\//i.test(tab.url || '')) return;
    await chrome.tabs.sendMessage(tab.id, { type: 'lc-night:set', patch: state });
  } catch {
    /* 内容脚本未注入（比如页面未刷新）时静默忽略 */
  }
}

/* ------------------------------------------------------------------ 初始化 */
(async function init() {
  let state = await loadState();
  render(state);

  els.switch.addEventListener('click', async () => {
    state.enabled = !state.enabled;
    render(state);
    await chrome.storage.local.set({ enabled: state.enabled });
    pushToTab(state);
  });

  els.warm.addEventListener('input', () => {
    state.warm = Number(els.warm.value);
    els.warmVal.textContent = `${state.warm}%`;
    render({ ...state, warm: state.warm });
    persist({ warm: state.warm });
    pushToTab({ warm: state.warm });
  });

  els.dim.addEventListener('input', () => {
    state.dim = Number(els.dim.value);
    els.dimVal.textContent = `${state.dim}%`;
    render({ ...state, dim: state.dim });
    persist({ dim: state.dim });
    pushToTab({ dim: state.dim });
  });

  document.querySelectorAll('.preset').forEach((btn) => {
    btn.addEventListener('click', async () => {
      state.warm = Number(btn.dataset.warm);
      state.dim = Number(btn.dataset.dim);
      state.enabled = true;
      render(state);
      await chrome.storage.local.set({ warm: state.warm, dim: state.dim, enabled: true });
      pushToTab(state);
    });
  });

  els.reset.addEventListener('click', async () => {
    state = { ...DEFAULTS };
    render(state);
    await chrome.storage.local.set(DEFAULTS);
    pushToTab(state);
  });
})();