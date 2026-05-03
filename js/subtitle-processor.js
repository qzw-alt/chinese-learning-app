/* ========================================
   ChineseFlix — Subtitle Processor
   Parse SRT/VTT and auto-generate pinyin
   ======================================== */

/**
 * Parse SRT subtitle content into array of {id, start, end, text}
 */
function parseSrt(content) {
  const blocks = content.trim().split(/\n\s*\n/);
  const subtitles = [];

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;

    const timeLine = lines.find(l => l.includes('-->'));
    if (!timeLine) continue;

    const [startStr, endStr] = timeLine.split('-->').map(s => s.trim());
    const text = lines.slice(lines.indexOf(timeLine) + 1).join('\n').trim();

    const start = srtTimeToSeconds(startStr);
    const end = srtTimeToSeconds(endStr);

    if (!isNaN(start) && !isNaN(end) && text) {
      subtitles.push({
        id: subtitles.length + 1,
        start,
        end,
        text,
      });
    }
  }
  return subtitles;
}

/**
 * Parse VTT subtitle content into array of {id, start, end, text}
 */
function parseVtt(content) {
  const lines = content.trim().split('\n');
  const subtitles = [];
  let i = 0;

  // Skip header
  while (i < lines.length && !lines[i].includes('-->')) i++;

  while (i < lines.length) {
    const timeLine = lines[i];
    if (!timeLine.includes('-->')) { i++; continue; }

    const [startStr, endStr] = timeLine.split('-->').map(s => s.trim().split(/\s/)[0]);
    i++;

    const textLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].includes('-->')) {
      textLines.push(lines[i].trim());
      i++;
    }

    const start = vttTimeToSeconds(startStr);
    const end = vttTimeToSeconds(endStr);
    const text = textLines.join('\n').replace(/<[^>]+>/g, ''); // strip HTML tags

    if (!isNaN(start) && !isNaN(end) && text) {
      subtitles.push({
        id: subtitles.length + 1,
        start,
        end,
        text,
      });
    }
    while (i < lines.length && lines[i].trim() === '') i++;
  }
  return subtitles;
}

function srtTimeToSeconds(timeStr) {
  const m = timeStr.match(/(\d+):(\d+):(\d+)[,\.](\d+)/);
  if (!m) return NaN;
  const [, h, min, s, ms] = m;
  return parseInt(h) * 3600 + parseInt(min) * 60 + parseInt(s) + parseInt(ms.padEnd(3, '0')) / 1000;
}

function vttTimeToSeconds(timeStr) {
  const m = timeStr.match(/(\d+):(\d+):(\d+)[\.\,]?(\d*)/);
  if (!m) {
    // Try MM:SS.mmm format
    const m2 = timeStr.match(/(\d+):(\d+)[\.\,]?(\d*)/);
    if (!m2) return NaN;
    const [, min, s, ms] = m2;
    return parseInt(min) * 60 + parseInt(s) + (ms ? parseInt(ms.padEnd(3, '0')) : 0) / 1000;
  }
  const [, h, min, s, ms] = m;
  return parseInt(h) * 3600 + parseInt(min) * 60 + parseInt(s) + (ms ? parseInt(ms.padEnd(3, '0')) : 0) / 1000;
}

/**
 * Auto-generate pinyin for Chinese text using pinyin-pro
 * Requires pinyin-pro to be loaded (CDN)
 */
function autoGeneratePinyin(text, language = 'mandarin') {
  if (language === 'cantonese') {
    // pinyin-pro doesn't support jyutping; return empty for now
    return '';
  }
  if (typeof pinyinPro === 'undefined' && typeof pinyin === 'undefined') {
    console.warn('pinyin-pro not loaded');
    return '';
  }
  try {
    const pinyinLib = typeof pinyinPro !== 'undefined' ? pinyinPro.pinyin : pinyin;
    return pinyinLib(text, { toneType: 'symbol', type: 'array' }).join(' ');
  } catch (e) {
    console.warn('pinyin generation failed:', e);
    return '';
  }
}

/**
 * Process raw subtitles into project format with auto-generated pinyin
 */
function processSubtitles(rawSubtitles, language = 'mandarin') {
  return rawSubtitles.map(sub => {
    const pinyinKey = language === 'cantonese' ? 'jyutping' : 'pinyin';
    const processed = {
      id: sub.id,
      start: sub.start,
      end: sub.end,
      text: sub.text,
      [pinyinKey]: autoGeneratePinyin(sub.text, language),
      translation: '', // leave empty for manual fill or translation API
    };
    if (language === 'cantonese') {
      processed.cantonese = sub.text;
      processed.mandarin = '';
      processed.english = '';
    }
    return processed;
  });
}

/**
 * Parse subtitle file content based on extension
 */
function parseSubtitleFile(content, fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'vtt') return parseVtt(content);
  if (ext === 'srt') return parseSrt(content);
  // Auto-detect: VTT starts with "WEBVTT"
  if (content.trim().startsWith('WEBVTT')) return parseVtt(content);
  return parseSrt(content);
}
