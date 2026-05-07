/* ========================================
   ChineseFlix — App Configuration
   ======================================== */

const CONFIG = {
  // Supabase (replace with your project credentials)
  SUPABASE_URL: 'https://tctwubsxomkcnulpahmj.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_TZ70a5XtYVRUw1fH4oZWgw_gegpXi0b',

  // App
  APP_NAME: 'ChineseFlix',
  TAGLINE: 'Learn Chinese Through Movies',

  // XP rewards
  XP: {
    WATCH_VIDEO: 10,
    COMPLETE_SPEAK: 5,
    REVIEW_CARD: 3,
    DAILY_SENTENCE: 15,
    STREAK_BONUS: 2, // per consecutive day
  },

  // Levels (cumulative XP thresholds)
  LEVELS: [
    { level: 1, title: '新手', xp: 0 },
    { level: 2, title: '入门', xp: 50 },
    { level: 3, title: '学徒', xp: 150 },
    { level: 4, title: '进阶', xp: 350 },
    { level: 5, title: '熟练', xp: 700 },
    { level: 6, title: '高手', xp: 1200 },
    { level: 7, title: '达人', xp: 2000 },
    { level: 8, title: '专家', xp: 3500 },
    { level: 9, title: '大师', xp: 5500 },
    { level: 10, title: '传奇', xp: 8000 },
  ],

  // Badge definitions
  BADGES: {
    first_recording: { title: '初次开口', desc: '完成第一次跟读录音', icon: '🎙️' },
    streak_7: { title: '坚持一周', desc: '连续打卡 7 天', icon: '🔥' },
    streak_30: { title: '月度之星', desc: '连续打卡 30 天', icon: '⭐' },
    review_100: { title: '百卡斩', desc: '完成 100 张闪卡复习', icon: '📚' },
    vocab_50: { title: '词汇达人', desc: '收藏 50 个生词', icon: '📝' },
    video_10: { title: '影迷', desc: '学完 10 个视频', icon: '🎬' },
    likes_10: { title: '人气之星', desc: '收到 10 个社区点赞', icon: '❤️' },
    cantonese_first: { title: '粤语初体验', desc: '完成第一句粤语跟读', icon: '🗣️' },
  },

  // SRS defaults
  SRS: {
    DEFAULT_EASE: 2.5,
    DEFAULT_INTERVAL_HOURS: 0,
    MIN_EASE: 1.3,
    INTERVALS: [0, 4, 24, 72, 168, 336, 720, 2160], // hours: now, 4h, 1d, 3d, 7d, 14d, 30d, 90d
  },
};

// ---------- i18n ----------
const I18N = {
  zh: {
    home: '首页', vocab: '生词', daily: '每日', profile: '我的',
    searchPlaceholder: '搜索视频标题、描述...',
    all: '全部', mandarin: '普通话', cantonese: '粤语',
    beginner: '初级', intermediate: '中级', advanced: '高级',
    replay: '重播本句', slow: '慢速', speak: '跟读', save: '收藏整句',
    prev: '上一句', next: '下一句',
    checkIn: '完成学习，今日打卡', checkedIn: '打卡成功！',
    continueLearning: '继续学习', learned: '已学',
    clearFilters: '清除筛选', showComingSoon: '显示筹备中', hideComingSoon: '隐藏筹备中',
    comingSoonLabel: '即将上线', loading: '加载中...',
    back: '返回',
  },
  en: {
    home: 'Home', vocab: 'Vocab', daily: 'Daily', profile: 'Profile',
    searchPlaceholder: 'Search videos...',
    all: 'All', mandarin: 'Mandarin', cantonese: 'Cantonese',
    beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
    replay: 'Replay', slow: 'Slow', speak: 'Speak', save: 'Save',
    prev: 'Prev', next: 'Next',
    checkIn: 'Check In', checkedIn: 'Checked In!',
    continueLearning: 'Continue', learned: 'Learned',
    clearFilters: 'Clear', showComingSoon: 'Show Upcoming', hideComingSoon: 'Hide Upcoming',
    comingSoonLabel: 'Coming Soon', loading: 'Loading...',
    back: 'Back',
  },
};

function getUILanguage() {
  const saved = Storage.getSettings().uiLanguage;
  if (saved) return saved;
  const nav = navigator.language || navigator.userLanguage || 'zh';
  return nav.startsWith('zh') ? 'zh' : 'en';
}

function t(key) {
  const lang = getUILanguage();
  return (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || key;
}

// Freeze to prevent accidental mutation
Object.freeze(CONFIG);
Object.freeze(CONFIG.XP);
Object.freeze(CONFIG.LEVELS);
Object.freeze(CONFIG.BADGES);
Object.freeze(CONFIG.SRS);
