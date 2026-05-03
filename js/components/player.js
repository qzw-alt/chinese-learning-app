/* ========================================
   ChineseFlix — Video Player Factory
   Supports: YouTube (Plyr), MP4 (Plyr/HTML5), Bilibili (iframe)
   ======================================== */

/**
 * Initialize a video player based on source type.
 * @param {string} containerId — DOM element ID for the player
 * @param {Object} video — video metadata object from videos.json
 * @param {Object} callbacks — { onPlay, onPause, onSeeked, onEnded, onTimeUpdate }
 * @returns {Object} player controller { play, pause, seek, getCurrentTime, destroy }
 */
function createPlayer(containerId, video, callbacks = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  switch (video.source) {
    case 'mp4':
      return createMP4Player(container, video, callbacks);
    case 'bilibili':
      return createBilibiliPlayer(container, video, callbacks);
    case 'youtube':
    default:
      return createYouTubePlayer(container, video, callbacks);
  }
}

// ---------- YouTube (via Plyr) ----------
function createYouTubePlayer(container, video, callbacks) {
  container.dataset.plyrEmbedId = video.sourceId;

  const player = new Plyr(container, {
    controls: [
      'play-large', 'play', 'progress', 'current-time',
      'duration', 'mute', 'volume', 'settings', 'fullscreen',
    ],
    youtube: { noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3 },
  });

  if (callbacks.onPlay) player.on('play', callbacks.onPlay);
  if (callbacks.onPause) player.on('pause', callbacks.onPause);
  if (callbacks.onSeeked) player.on('seeked', callbacks.onSeeked);
  if (callbacks.onEnded) player.on('ended', callbacks.onEnded);
  if (callbacks.onTimeUpdate) {
    player.on('timeupdate', () => callbacks.onTimeUpdate(player.currentTime));
  }

  return {
    type: 'youtube',
    instance: player,
    play: () => player.play(),
    pause: () => player.pause(),
    seek: (t) => { player.currentTime = t; },
    getCurrentTime: () => player.currentTime || 0,
    setSpeed: (r) => { player.speed = r; },
    destroy: () => player.destroy(),
  };
}

// ---------- MP4 (via Plyr) ----------
function createMP4Player(container, video, callbacks) {
  // Insert a <video> element
  container.innerHTML = `<video id="${container.id}_video" controls crossorigin>
    <source src="${video.sourceUrl}" type="video/mp4">
  </video>`;

  const videoEl = container.querySelector('video');

  const player = new Plyr(videoEl, {
    controls: [
      'play-large', 'play', 'progress', 'current-time',
      'duration', 'mute', 'volume', 'settings', 'fullscreen',
    ],
  });

  if (callbacks.onPlay) player.on('play', callbacks.onPlay);
  if (callbacks.onPause) player.on('pause', callbacks.onPause);
  if (callbacks.onSeeked) player.on('seeked', callbacks.onSeeked);
  if (callbacks.onEnded) player.on('ended', callbacks.onEnded);
  if (callbacks.onTimeUpdate) {
    player.on('timeupdate', () => callbacks.onTimeUpdate(player.currentTime));
  }

  return {
    type: 'mp4',
    instance: player,
    play: () => player.play(),
    pause: () => player.pause(),
    seek: (t) => { player.currentTime = t; },
    getCurrentTime: () => player.currentTime || 0,
    setSpeed: (r) => { player.speed = r; },
    destroy: () => player.destroy(),
  };
}

// ---------- Bilibili (iframe embed) ----------
function createBilibiliPlayer(container, video, callbacks) {
  const bvid = video.sourceId;
  const embedUrl = `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1`;

  container.innerHTML = `
    <div style="position:relative;padding-top:56.25%;">
      <iframe
        src="${embedUrl}"
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
        scrolling="no"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>`;

  // Bilibili iframe has limited JS control
  return {
    type: 'bilibili',
    instance: null,
    play: () => {},
    pause: () => {},
    seek: (t) => {},
    getCurrentTime: () => 0,
    setSpeed: (r) => {},
    destroy: () => { container.innerHTML = ''; },
  };
}
