/* ========================================
   ChineseFlix — Audio Recording & Playback
   Extracted and generalized from watch.js
   ======================================== */

const AudioRecorder = {
  mediaRecorder: null,
  audioChunks: [],
  recordedBlob: null,
  audioUrl: null,
  stream: null,

  /**
   * Start recording from microphone.
   * @returns {Promise<void>}
   */
  async start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('您的浏览器不支持录音功能');
    }

    this.cleanup();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.stream = stream;

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';

    this.mediaRecorder = new MediaRecorder(stream, { mimeType });
    this.audioChunks = [];
    this.recordedBlob = null;

    return new Promise((resolve) => {
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstart = () => resolve();

      this.mediaRecorder.start();
    });
  },

  /**
   * Stop recording.
   * @returns {Promise<Blob>} The recorded audio blob.
   */
  stop() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        this.recordedBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        // Create URL for playback
        if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
        this.audioUrl = URL.createObjectURL(this.recordedBlob);
        // Stop the mic stream
        if (this.stream) {
          this.stream.getTracks().forEach(t => t.stop());
          this.stream = null;
        }
        resolve(this.recordedBlob);
      };

      this.mediaRecorder.stop();
    });
  },

  /**
   * Get the blob URL for playback.
   */
  getPlaybackUrl() {
    return this.audioUrl;
  },

  /**
   * Get the recorded blob (for uploading).
   */
  getBlob() {
    return this.recordedBlob;
  },

  /**
   * Check if currently recording.
   */
  isRecording() {
    return this.mediaRecorder && this.mediaRecorder.state === 'recording';
  },

  /**
   * Reset all state and release resources.
   */
  cleanup() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recordedBlob = null;
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
  },
};

/**
 * Play a short audio clip from the video player (for "play original").
 * Seeks the player to start time and pauses at end time.
 */
function playClip(player, start, end) {
  if (!player) return;
  player.currentTime = start;
  player.play();

  const checkEnd = setInterval(() => {
    if (player.currentTime >= end) {
      player.pause();
      clearInterval(checkEnd);
    }
  }, 100);

  // Safety cleanup
  setTimeout(() => clearInterval(checkEnd), (end - start + 2) * 1000);
}
