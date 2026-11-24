/* 深夜护眼 · 力扣夜间主题 — 后台服务 */
'use strict';

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    const defaults = { enabled: true, warm: 12, dim: 0 };
    const cur = await chrome.storage.local.get(defaults);
    await chrome.storage.local.set(cur);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'toggle-theme') return;
  const { enabled = true } = await chrome.storage.local.get({ enabled: true });
  await chrome.storage.local.set({ enabled: !enabled });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'lc-night:toggle' });
  } catch {}
});