/* ========================================
   ChineseFlix — Storage (localStorage wrapper)
   ======================================== */

const Storage = {
  // ---------- Generic ----------
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(`cflix_${key}`);
      return val !== null ? JSON.parse(val) : fallback;
    } catch (e) {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`cflix_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
  },

  remove(key) {
    localStorage.removeItem(`cflix_${key}`);
  },

  // ---------- Vocab Book ----------
  getVocabBook() {
    return this.get('vocab_book', []);
  },

  saveVocabBook(book) {
    this.set('vocab_book', book);
  },

  addVocabWord(char, vocab, source) {
    const book = this.getVocabBook();
    if (book.find(w => w.char === char)) return false;
    book.push({
      char,
      romanization: vocab.romanization || vocab.pinyin || '',
      pos: vocab.pos || '',
      meaning: vocab.meaning || '',
      language: vocab.language || 'mandarin',
      source,
      savedAt: new Date().toISOString(),
    });
    this.saveVocabBook(book);
    return true;
  },

  removeVocabWord(char) {
    const book = this.getVocabBook().filter(w => w.char !== char);
    this.saveVocabBook(book);
  },

  hasVocabWord(char) {
    return this.getVocabBook().some(w => w.char === char);
  },

  // ---------- Streak ----------
  getStreak() {
    const data = this.get('streak', { count: 0, lastDate: null });
    return data;
  },

  updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const streak = this.getStreak();

    if (streak.lastDate === today) return streak; // already checked in

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (streak.lastDate === yesterday) {
      streak.count += 1;
    } else if (streak.lastDate !== today) {
      streak.count = 1;
    }
    streak.lastDate = today;
    this.set('streak', streak);
    return streak;
  },

  // ---------- XP & Level ----------
  getXP() {
    return this.get('xp', 0);
  },

  addXP(amount) {
    const xp = this.getXP() + amount;
    this.set('xp', xp);
    return xp;
  },

  getLevel(xp) {
    let lvl = CONFIG.LEVELS[0];
    for (const level of CONFIG.LEVELS) {
      if (xp >= level.xp) lvl = level;
    }
    return lvl;
  },

  getNextLevel(xp) {
    for (const level of CONFIG.LEVELS) {
      if (xp < level.xp) return level;
    }
    return null;
  },

  // ---------- Badges ----------
  getBadges() {
    return this.get('badges', []);
  },

  earnBadge(badgeId) {
    const badges = this.getBadges();
    if (badges.includes(badgeId)) return false;
    badges.push(badgeId);
    this.set('badges', badges);
    return true;
  },

  // ---------- Review Stats ----------
  getReviewStats() {
    return this.get('review_stats', { totalReviews: 0, todayReviews: 0, date: '' });
  },

  recordReview() {
    const today = new Date().toISOString().slice(0, 10);
    const stats = this.getReviewStats();
    if (stats.date !== today) {
      stats.todayReviews = 0;
      stats.date = today;
    }
    stats.totalReviews += 1;
    stats.todayReviews += 1;
    this.set('review_stats', stats);
    return stats;
  },

  // ---------- Settings ----------
  getSettings() {
    return this.get('settings', {
      preferredLanguage: 'mandarin',
      autoPlayAudio: true,
    });
  },

  saveSettings(settings) {
    this.set('settings', { ...this.getSettings(), ...settings });
  },
};
