/* ========================================
   ChineseFlix — SM-2 Spaced Repetition Algorithm
   Based on SuperMemo 2, adapted for vocabulary cards
   ======================================== */

const SRS = {
  // Quality scores and their meanings
  QUALITY: {
    AGAIN: 0,   // complete blackout
    HARD: 1,    // remembered but with significant difficulty
    GOOD: 2,    // recalled with some effort
    EASY: 3,    // perfect recall, effortless
  },

  /**
   * Calculate next review parameters.
   * @param {Object} card — { easeFactor, intervalHours, repetitions }
   * @param {number} quality — 0-3, how well the user recalled
   * @returns {Object} updated card parameters
   */
  calculate(card, quality) {
    const { easeFactor, intervalHours, repetitions } = card;

    if (quality < this.QUALITY.HARD) {
      // Failed: reset
      return {
        easeFactor: Math.max(CONFIG.SRS.MIN_EASE, easeFactor - 0.2),
        intervalHours: CONFIG.SRS.DEFAULT_INTERVAL_HOURS,
        repetitions: 0,
        nextReview: new Date().toISOString(),
      };
    }

    // Passed: calculate new interval
    const newEase = easeFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
    const clampedEase = Math.max(CONFIG.SRS.MIN_EASE, newEase);

    let newInterval;
    if (repetitions === 0) {
      newInterval = CONFIG.SRS.INTERVALS[1]; // 4 hours
    } else if (repetitions === 1) {
      newInterval = CONFIG.SRS.INTERVALS[2]; // 24 hours
    } else {
      newInterval = Math.round((intervalHours || CONFIG.SRS.INTERVALS[2]) * clampedEase);
    }

    const nextReview = new Date(Date.now() + newInterval * 3600000).toISOString();

    return {
      easeFactor: clampedEase,
      intervalHours: newInterval,
      repetitions: repetitions + 1,
      nextReview,
    };
  },

  /**
   * Check if card is due for review.
   */
  isDue(card) {
    if (!card.nextReview) return true;
    return new Date(card.nextReview) <= new Date();
  },

  /**
   * Get cards that are due for review.
   */
  getDueCards(allCards) {
    return allCards.filter(c => this.isDue(c));
  },

  /**
   * Create a new card with defaults.
   */
  createCard(char, data) {
    return {
      char,
      romanization: data.romanization || data.pinyin || '',
      pos: data.pos || '',
      meaning: data.meaning || '',
      language: data.language || 'mandarin',
      easeFactor: CONFIG.SRS.DEFAULT_EASE,
      intervalHours: CONFIG.SRS.DEFAULT_INTERVAL_HOURS,
      repetitions: 0,
      nextReview: new Date().toISOString(),
    };
  },
};
