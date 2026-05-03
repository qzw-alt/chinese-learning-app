/* ========================================
   ChineseFlix — Supabase Client & Auth
   ======================================== */

// Initialize Supabase client (lazy, after config loads)
let supabase = null;

function getSupabase() {
  if (!supabase) {
    const { createClient } = supabaseJs;
    supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  }
  return supabase;
}

const SupabaseAuth = {
  /** Get current session */
  async getSession() {
    try {
      const { data } = await getSupabase().auth.getSession();
      return data.session;
    } catch (e) {
      console.warn('Supabase not available, using offline mode');
      return null;
    }
  },

  /** Get current user */
  async getUser() {
    const session = await this.getSession();
    return session?.user || null;
  },

  /** Sign up with email + password */
  async signUp(email, password, username) {
    const { data, error } = await getSupabase().auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) throw error;
    return data;
  },

  /** Sign in with email + password */
  async signIn(email, password) {
    const { data, error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /** Sign out */
  async signOut() {
    const { error } = await getSupabase().auth.signOut();
    if (error) throw error;
  },

  /** Check if user is logged in (convenience) */
  async isLoggedIn() {
    const user = await this.getUser();
    return !!user;
  },

  /** Listen for auth state changes */
  onAuthChange(callback) {
    getSupabase().auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },
};

// ---------- Database helpers ----------

const SupabaseDB = {
  /** Get today's daily sentences */
  async getDailySentences(date, language) {
    const { data, error } = await getSupabase()
      .from('daily_sentences')
      .select('*')
      .eq('date', date)
      .eq('language', language)
      .single();
    if (error && error.code !== 'PGRST116') console.warn(error);
    return data;
  },

  /** Get recordings for a sentence */
  async getRecordings(sentenceId) {
    const { data, error } = await getSupabase()
      .from('recordings')
      .select('*, profiles(username, avatar_url)')
      .eq('sentence_id', sentenceId)
      .order('created_at', { ascending: false });
    if (error) console.warn(error);
    return data || [];
  },

  /** Upload a recording */
  async uploadRecording(userId, sentenceId, blob) {
    const fileName = `${userId}/${sentenceId}_${Date.now()}.webm`;
    const { data: uploadData, error: uploadError } = await getSupabase()
      .storage.from('recordings')
      .upload(fileName, blob, { contentType: 'audio/webm' });
    if (uploadError) throw uploadError;

    const { data: urlData } = getSupabase()
      .storage.from('recordings')
      .getPublicUrl(fileName);

    const { data, error } = await getSupabase()
      .from('recordings')
      .insert({
        user_id: userId,
        sentence_id: sentenceId,
        audio_url: urlData.publicUrl,
        duration: 0,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Toggle like on a recording */
  async toggleLike(userId, recordingId, currentlyLiked) {
    if (currentlyLiked) {
      await getSupabase()
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('recording_id', recordingId);
    } else {
      await getSupabase()
        .from('likes')
        .insert({ user_id: userId, recording_id: recordingId });
    }
  },

  /** Get likes count for a recording */
  async getLikesCount(recordingId) {
    const { count, error } = await getSupabase()
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('recording_id', recordingId);
    if (error) return 0;
    return count || 0;
  },

  /** Add a comment */
  async addComment(userId, recordingId, content) {
    const { data, error } = await getSupabase()
      .from('comments')
      .insert({ user_id: userId, recording_id: recordingId, content })
      .select('*, profiles(username, avatar_url)')
      .single();
    if (error) throw error;
    return data;
  },

  /** Get comments for a recording */
  async getComments(recordingId) {
    const { data, error } = await getSupabase()
      .from('comments')
      .select('*, profiles(username, avatar_url)')
      .eq('recording_id', recordingId)
      .order('created_at', { ascending: true });
    if (error) console.warn(error);
    return data || [];
  },

  /** Save SRS review */
  async saveSRSReview(userId, char, srsData, reviewQuality) {
    const { data, error } = await getSupabase()
      .from('srs_reviews')
      .upsert({
        user_id: userId,
        vocab_char: char,
        ease_factor: srsData.easeFactor,
        interval_hours: srsData.intervalHours,
        repetitions: srsData.repetitions,
        next_review: srsData.nextReview,
        last_review: new Date().toISOString(),
        last_quality: reviewQuality,
      });
    if (error) console.warn(error);
    return data;
  },

  /** Get due SRS cards */
  async getDueSRSReviews(userId) {
    const { data, error } = await getSupabase()
      .from('srs_reviews')
      .select('*')
      .eq('user_id', userId)
      .lte('next_review', new Date().toISOString());
    if (error) console.warn(error);
    return data || [];
  },

  /** Update user profile */
  async updateProfile(userId, updates) {
    const { data, error } = await getSupabase()
      .from('profiles')
      .upsert({ id: userId, ...updates });
    if (error) console.warn(error);
    return data;
  },

  /** Get user profile */
  async getProfile(userId) {
    const { data, error } = await getSupabase()
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error && error.code !== 'PGRST116') console.warn(error);
    return data;
  },

  /** Get all videos */
  async getVideos() {
    const { data, error } = await getSupabase()
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('getVideos error:', error);
      return null;
    }
    return data;
  },

  /** Get video by id */
  async getVideoById(id) {
    const { data, error } = await getSupabase()
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') console.warn(error);
    return data;
  },

  /** Save or update a video */
  async saveVideo(video) {
    const { data, error } = await getSupabase()
      .from('videos')
      .upsert(video)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Delete a video */
  async deleteVideo(id) {
    const { error } = await getSupabase()
      .from('videos')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  /** Get subtitles for a video */
  async getSubtitles(videoId) {
    const { data, error } = await getSupabase()
      .from('subtitles')
      .select('data')
      .eq('video_id', videoId)
      .single();
    if (error && error.code !== 'PGRST116') console.warn(error);
    return data?.data || null;
  },

  /** Save or update subtitles */
  async saveSubtitles(videoId, subtitleData) {
    const { data, error } = await getSupabase()
      .from('subtitles')
      .upsert({ video_id: videoId, data: subtitleData })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** Realtime subscription helper */
  subscribe(table, filter, callback) {
    let query = getSupabase()
      .channel('realtime')
      .postgresChanges({ event: '*', schema: 'public', table });

    return query.subscribe(callback);
  },
};

// ---------- Offline mode detection ----------

let _offline = null;
async function isSupabaseAvailable() {
  if (_offline !== null) return !_offline;
  try {
    await getSupabase().auth.getSession();
    _offline = false;
  } catch (e) {
    _offline = true;
    console.info('Running in offline mode — community features unavailable');
  }
  return !_offline;
}
