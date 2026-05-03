/* ========================================
   ChineseFlix — Shared UI Components
   Toast, Modal, EmptyState factories
   ======================================== */

// ---------- Toast ----------
function showToast(msg, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ` toast-${type}` : '');
  toast.textContent = msg;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2200);
}

// ---------- Modal (generic) ----------
// Opens a modal in #modalContainer. Returns cleanup function.
function openModal(html, { onClose, overlayId = 'modalOverlay' } = {}) {
  const container = document.getElementById('modalContainer');
  if (!container) return () => {};

  container.innerHTML = html;

  const overlay = document.getElementById(overlayId);

  function close() {
    container.innerHTML = '';
    if (onClose) onClose();
  }

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return close;
}

// ---------- Empty State ----------
function renderEmptyState(icon, title, hint = '') {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <div class="empty-text">${title}</div>
      ${hint ? `<div class="empty-hint">${hint}</div>` : ''}
    </div>`;
}

// ---------- Loading Spinner ----------
function renderSpinner(text = '加载中...') {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;padding:40px;">
      <div class="spinner"></div>
      <div style="margin-top:12px;color:var(--text-secondary);">${text}</div>
    </div>`;
}

// ---------- Badge Icon ----------
function renderBadge(badgeId) {
  const badge = CONFIG.BADGES[badgeId];
  if (!badge) return '';
  return `
    <div class="badge-icon" title="${badge.title}：${badge.desc}">
      <span class="badge-emoji">${badge.icon}</span>
      <span class="badge-label">${badge.title}</span>
    </div>`;
}

// ---------- Confirm Dialog ----------
function showConfirm(msg) {
  return new Promise((resolve) => {
    const html = `
      <div class="modal-overlay" id="confirmOverlay">
        <div class="modal modal-sm">
          <div style="text-align:center;padding:20px 0;">
            <div style="font-size:1.1rem;margin-bottom:20px;">${msg}</div>
            <div style="display:flex;gap:10px;justify-content:center;">
              <button class="btn btn-secondary" id="confirmNo">取消</button>
              <button class="btn btn-danger" id="confirmYes">确认</button>
            </div>
          </div>
        </div>
      </div>`;

    const close = openModal(html, { overlayId: 'confirmOverlay' });

    setTimeout(() => {
      document.getElementById('confirmYes')?.addEventListener('click', () => {
        close();
        resolve(true);
      });
      document.getElementById('confirmNo')?.addEventListener('click', () => {
        close();
        resolve(false);
      });
    }, 50);
  });
}

// ---------- Badge Earned Celebration Modal ----------
function showBadgeEarned(badge) {
  const html = `
    <div class="modal-overlay" id="badgeOverlay">
      <div class="modal modal-sm" style="text-align:center;">
        <div style="font-size:4rem;animation:bounce 0.6s ease;">${badge.icon}</div>
        <div class="modal-title">🏆 获得新徽章！</div>
        <div style="font-size:1.3rem;font-weight:700;margin:8px 0;">${badge.title}</div>
        <div style="color:var(--text-secondary);">${badge.desc}</div>
        <button class="btn btn-primary" id="badgeCloseBtn" style="margin-top:20px;">太棒了！</button>
      </div>
    </div>`;

  const close = openModal(html, { overlayId: 'badgeOverlay' });

  setTimeout(() => {
    document.getElementById('badgeCloseBtn')?.addEventListener('click', close);
  }, 50);
}

// Listen for badge-earned events globally
window.addEventListener('badge-earned', (e) => {
  showBadgeEarned(e.detail);
});
