/* ========================================
   ChineseFlix — App Initialization
   ======================================== */

// Global Alpine.js initialization and shared state
document.addEventListener('alpine:init', () => {
  // ---------- i18n helper ----------
  Alpine.magic('t', () => (key) => t(key));

  // ---------- Global user state (available on all pages) ----------
  Alpine.store('user', {
    loggedIn: false,
    username: '',
    avatarUrl: '',
    streak: { count: 0, lastDate: null },
    xp: 0,
    level: CONFIG.LEVELS[0],

    init() {
      this.streak = Storage.getStreak();
      this.xp = Storage.getXP();
      this.level = Storage.getLevel(this.xp);

      SupabaseAuth.getUser().then(user => {
        if (user) {
          this.loggedIn = true;
          this.username = user.user_metadata?.username || '';
        }
      });
    },

    get nextLevel() {
      return Storage.getNextLevel(this.xp);
    },

    get xpProgress() {
      if (!this.nextLevel) return 100;
      const currentFloor = this.level.xp;
      const nextFloor = this.nextLevel.xp;
      return Math.round(((this.xp - currentFloor) / (nextFloor - currentFloor)) * 100);
    },

    async checkIn() {
      const streak = Storage.updateStreak();
      this.streak = streak;

      const user = await SupabaseAuth.getUser();
      if (user) {
        await SupabaseDB.updateProfile(user.id, {
          streak_count: streak.count,
          last_active_date: streak.lastDate,
          total_xp: this.xp,
        });
      }
    },

    addXP(amount) {
      this.xp = Storage.addXP(amount);
      this.level = Storage.getLevel(this.xp);
    },

    earnBadge(badgeId) {
      const earned = Storage.earnBadge(badgeId);
      if (earned) {
        const badge = CONFIG.BADGES[badgeId];
        if (badge) {
          window.dispatchEvent(new CustomEvent('badge-earned', {
            detail: { id: badgeId, ...badge },
          }));
        }
      }
      return earned;
    },

    getBadges() {
      return Storage.getBadges();
    },
  });
});

// Shared utility: navigate between pages
function goTo(page) {
  window.location.href = page;
}

// Shared utility: format date
function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

// Shared utility: time ago
function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return '刚刚';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} 分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} 小时前`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} 天前`;
  return fmtDate(dateStr);
}
