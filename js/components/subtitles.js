/* ========================================
   ChineseFlix — Subtitle Rendering & Sync
   Extracted and generalized from watch.js
   ======================================== */

/**
 * Create a subtitle manager for a video.
 * @param {Object} options — { containerId, subtitles, playerCtrl, language }
 * @returns {Object} subtitle controller
 */
function createSubtitles(options) {
  const { containerId, subtitles, playerCtrl, language = 'mandarin', onActiveChange } = options;
  const container = document.getElementById(containerId);
  if (!container) return null;

  let currentSubId = null;
  let syncInterval = null;
  let activeEl = null;

  const romanizeKey = language === 'cantonese' ? 'jyutping' : 'pinyin';

  // ---------- Render ----------
  function render() {
    container.innerHTML = subtitles.map(sub => `
      <div class="subtitle-line" data-sub-id="${sub.id}" data-start="${sub.start}" data-end="${sub.end}">
        <span class="sub-num">${sub.id}</span>
        <div class="sub-content">
          <div class="sub-text" data-sub-id="${sub.id}">
            ${makeCharsClickable(sub.cantonese || sub.text, sub.id)}
          </div>
          ${sub[romanizeKey] ? `<div class="sub-romanization">${sub[romanizeKey]}</div>` : ''}
          <div class="sub-translation">${sub.mandarin || sub.translation}</div>
        </div>
        <div class="sub-actions">
          <button class="btn-speak" data-speak-id="${sub.id}">🎤 跟读</button>
        </div>
      </div>
    `).join('');
  }

  // Wrap Chinese chars in clickable spans for vocab lookup
  function makeCharsClickable(text, subId) {
    return text.split('').map(char => {
      if (/[一-鿿]/.test(char)) {
        return `<span class="char-clickable" data-char="${char}" data-source="sub-${subId}">${char}</span>`;
      }
      return char;
    }).join('');
  }

  // ---------- Sync ----------
  function startSync() {
    stopSync();
    syncInterval = setInterval(updateActive, 200);
  }

  function stopSync() {
    if (syncInterval) {
      clearInterval(syncInterval);
      syncInterval = null;
    }
  }

  function updateActive() {
    if (!playerCtrl || !subtitles.length) return;
    const time = playerCtrl.getCurrentTime();
    const found = subtitles.find(sub => time >= sub.start && time <= sub.end);
    const foundId = found ? found.id : null;
    if (foundId === currentSubId) return;

    if (activeEl) activeEl.classList.remove('active');
    if (found) {
      const el = container.querySelector(`[data-sub-id="${found.id}"]`);
      if (el) {
        el.classList.add('active');
        activeEl = el;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    currentSubId = foundId;
    if (onActiveChange) onActiveChange(found || null);
  }

  function getActiveSubtitle() {
    if (!currentSubId) return null;
    return subtitles.find(s => s.id === currentSubId) || null;
  }

  // ---------- Events ----------
  function onContainerClick(handler) {
    container.addEventListener('click', handler);
  }

  // ---------- Cleanup ----------
  function destroy() {
    stopSync();
  }

  // Initial render
  render();

  return {
    render,
    startSync,
    stopSync,
    updateActive,
    getActiveSubtitle,
    onContainerClick,
    destroy,
  };
}
