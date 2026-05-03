/* ========================================
   ChineseFlix — Content Data
   Hardcoded fallback data + JSON content loader
   ======================================== */

// ---------- Video List (updated model) ----------
const videos = [
  {
    id: 'buy-flowers',
    source: 'youtube',
    sourceId: 'SGS8sfH11yg',
    sourceUrl: null,
    title: '买花 — Real Chinese Conversation',
    subtitle: '实用中文：买花场景',
    duration: '5:33',
    difficulty: 'beginner',
    language: 'mandarin',
    description: '在花店买花的日常对话，适合初学者。',
    thumbnail: null,
  },
];

// ---------- Subtitles (keyed by video id, updated with pinyin + jyutping) ----------
const subtitlesData = {
  'buy-flowers': [
    { id: 1,  start: 2.0,  end: 5.5,  text: '你好，欢迎光临。',         pinyin: 'nǐ hǎo, huān yíng guāng lín.',                          jyutping: 'nei5 hou2, fun1 jing4 gwong1 lam4',                 translation: 'Hello, welcome.' },
    { id: 2,  start: 6.0,  end: 9.0,  text: '你好，我想买一束花。',       pinyin: 'nǐ hǎo, wǒ xiǎng mǎi yī shù huā.',                      jyutping: 'nei5 hou2, ngo5 soeng2 maai5 jat1 cuk1 faa1',        translation: 'Hello, I want to buy a bouquet of flowers.' },
    { id: 3,  start: 10.0, end: 14.0, text: '好的，你想要什么颜色的？',     pinyin: 'hǎo de, nǐ yào shén me yán sè de?',                     jyutping: 'hou2 ge3, nei5 jiu3 sam6 mo1 ngaan4 sik1 ge3',      translation: 'Sure, what color do you want?' },
    { id: 4,  start: 15.0, end: 18.5, text: '我想要红色的，谢谢。',        pinyin: 'wǒ xiǎng yào hóng sè de, xiè xiè.',                      jyutping: 'ngo5 soeng2 jiu3 hung4 sik1 ge3, do1 ze6',           translation: "I'd like red ones, thank you." },
    { id: 5,  start: 19.5, end: 23.0, text: '红色很适合送人。',           pinyin: 'hóng sè hěn shì hé sòng rén.',                           jyutping: 'hung4 sik1 han2 sik1 hap6 sung3 jan4',               translation: 'Red is great for gifting.' },
    { id: 6,  start: 24.0, end: 28.0, text: '对，我要送给我的女朋友。',     pinyin: 'duì, wǒ yào sòng gěi wǒ de nǚ péng yǒu.',               jyutping: 'deoi3, ngo5 jiu3 sung3 bei2 ngo5 ge3 neoi5 pang4 jau5', translation: "Yes, I'm giving them to my girlfriend." },
    { id: 7,  start: 29.0, end: 33.0, text: '真浪漫！玫瑰怎么样？',        pinyin: 'zhēn làng màn! méi guī zěn me yàng?',                    jyutping: 'zan1 long6 maan6! mui4 gwai3 zam2 mo1 joeng2',      translation: 'How romantic! How about roses?' },
    { id: 8,  start: 34.0, end: 38.0, text: '玫瑰很好，我喜欢玫瑰。',       pinyin: 'méi guī hěn hǎo, wǒ xǐ huān méi guī.',                   jyutping: 'mui4 gwai3 han2 hou2, ngo5 hei2 fun1 mui4 gwai3',   translation: 'Roses are great, I like roses.' },
    { id: 9,  start: 39.0, end: 43.5, text: '你要几朵玫瑰呢？',           pinyin: 'nǐ yào jǐ duǒ méi guī ne?',                              jyutping: 'nei5 jiu3 gei2 do2 mui4 gwai3 ne1',                  translation: 'How many roses do you want?' },
    { id: 10, start: 44.5, end: 48.5, text: '我要十朵，十全十美。',        pinyin: 'wǒ yào shí duǒ, shí quán shí měi.',                      jyutping: 'ngo5 jiu3 sap6 do2, sap6 cyun4 sap6 mei5',           translation: 'I want ten, for perfection.' },
    { id: 11, start: 49.5, end: 53.5, text: '好的，我帮你包起来。',        pinyin: 'hǎo de, wǒ bāng nǐ bāo qǐ lái.',                         jyutping: 'hou2 ge3, ngo5 bong1 nei5 baau1 hei2 loi4',          translation: 'OK, let me wrap them up for you.' },
    { id: 12, start: 54.5, end: 58.5, text: '这些花很漂亮。',            pinyin: 'zhè xiē huā hěn piào liàng.',                              jyutping: 'ze2 se1 faa1 han2 piu3 loeng3',                      translation: 'These flowers are very beautiful.' },
    { id: 13, start: 59.5, end: 63.0, text: '谢谢。一共多少钱？',          pinyin: 'xiè xiè. yī gòng duō shǎo qián?',                         jyutping: 'do1 ze6. jat1 gung6 do1 siu2 cin2',                  translation: 'Thank you. How much in total?' },
    { id: 14, start: 64.0, end: 68.0, text: '一共一百五十块。',            pinyin: 'yī gòng yī bǎi wǔ shí kuài.',                             jyutping: 'jat1 gung6 jat1 baak3 ng5 sap6 faai3',               translation: '150 yuan in total.' },
    { id: 15, start: 69.0, end: 72.5, text: '好的，给你两百块。',          pinyin: 'hǎo de, gěi nǐ liǎng bǎi kuài.',                           jyutping: 'hou2 ge3, bei2 nei5 loeng5 baak3 faai3',              translation: "OK, here's 200 yuan." },
    { id: 16, start: 73.5, end: 77.5, text: '找你五十块。谢谢你！',        pinyin: 'zhǎo nǐ wǔ shí kuài. xiè xiè nǐ!',                        jyutping: 'zaau2 nei5 ng5 sap6 faai3. do1 ze6 nei5',             translation: "Here's 50 yuan change. Thank you!" },
    { id: 17, start: 78.5, end: 82.5, text: '谢谢，再见！',              pinyin: 'xiè xiè, zài jiàn!',                                       jyutping: 'do1 ze6, zoi3 gin3',                                   translation: 'Thank you, goodbye!' },
    { id: 18, start: 83.5, end: 87.0, text: '再见，欢迎下次再来！',        pinyin: 'zài jiàn, huān yíng xià cì zài lái!',                      jyutping: 'zoi3 gin3, fun1 jing4 haa6 ci3 zoi3 loi4',             translation: 'Goodbye, welcome back next time!' },
  ],
};

// ---------- Vocabulary Dictionary (dual language) ----------
const vocabDict = {
  '你': { mandarin: { pinyin: 'nǐ', pos: '代词', meaning: 'you' },          cantonese: { jyutping: 'nei5', pos: '代词', meaning: 'you' } },
  '好': { mandarin: { pinyin: 'hǎo', pos: '形容词', meaning: 'good, well' }, cantonese: { jyutping: 'hou2', pos: '形容词', meaning: 'good, well' } },
  '欢': { mandarin: { pinyin: 'huān', pos: '形容词', meaning: 'joyful, happy' }, cantonese: { jyutping: 'fun1', pos: '形容词', meaning: 'joyful, happy' } },
  '迎': { mandarin: { pinyin: 'yíng', pos: '动词', meaning: 'to welcome' }, cantonese: { jyutping: 'jing4', pos: '动词', meaning: 'to welcome' } },
  '光': { mandarin: { pinyin: 'guāng', pos: '名词', meaning: 'light' },     cantonese: { jyutping: 'gwong1', pos: '名词', meaning: 'light' } },
  '临': { mandarin: { pinyin: 'lín', pos: '动词', meaning: 'to arrive' },   cantonese: { jyutping: 'lam4', pos: '动词', meaning: 'to arrive' } },
  '我': { mandarin: { pinyin: 'wǒ', pos: '代词', meaning: 'I, me' },        cantonese: { jyutping: 'ngo5', pos: '代词', meaning: 'I, me' } },
  '想': { mandarin: { pinyin: 'xiǎng', pos: '动词', meaning: 'to want' },   cantonese: { jyutping: 'soeng2', pos: '动词', meaning: 'to want' } },
  '买': { mandarin: { pinyin: 'mǎi', pos: '动词', meaning: 'to buy' },      cantonese: { jyutping: 'maai5', pos: '动词', meaning: 'to buy' } },
  '一': { mandarin: { pinyin: 'yī', pos: '数词', meaning: 'one' },           cantonese: { jyutping: 'jat1', pos: '数词', meaning: 'one' } },
  '束': { mandarin: { pinyin: 'shù', pos: '量词', meaning: 'bunch' },        cantonese: { jyutping: 'cuk1', pos: '量词', meaning: 'bunch' } },
  '花': { mandarin: { pinyin: 'huā', pos: '名词', meaning: 'flower' },       cantonese: { jyutping: 'faa1', pos: '名词', meaning: 'flower' } },
  '的': { mandarin: { pinyin: 'de', pos: '助词', meaning: 'possessive particle' }, cantonese: { jyutping: 'ge3', pos: '助词', meaning: 'possessive particle' } },
  '要': { mandarin: { pinyin: 'yào', pos: '动词', meaning: 'to want' },     cantonese: { jyutping: 'jiu3', pos: '动词', meaning: 'to want' } },
  '什': { mandarin: { pinyin: 'shén', pos: '代词', meaning: 'what' },        cantonese: { jyutping: 'sam6', pos: '代词', meaning: 'what' } },
  '么': { mandarin: { pinyin: 'me', pos: '助词', meaning: 'interrogative suffix' }, cantonese: { jyutping: 'mo1', pos: '助词', meaning: 'interrogative suffix' } },
  '颜': { mandarin: { pinyin: 'yán', pos: '名词', meaning: 'color' },        cantonese: { jyutping: 'ngaan4', pos: '名词', meaning: 'color' } },
  '色': { mandarin: { pinyin: 'sè', pos: '名词', meaning: 'color' },         cantonese: { jyutping: 'sik1', pos: '名词', meaning: 'color' } },
  '红': { mandarin: { pinyin: 'hóng', pos: '形容词', meaning: 'red' },       cantonese: { jyutping: 'hung4', pos: '形容词', meaning: 'red' } },
  '谢': { mandarin: { pinyin: 'xiè', pos: '动词', meaning: 'to thank' },     cantonese: { jyutping: 'ze6', pos: '动词', meaning: 'to thank' } },
  '很': { mandarin: { pinyin: 'hěn', pos: '副词', meaning: 'very' },         cantonese: { jyutping: 'han2', pos: '副词', meaning: 'very' } },
  '适': { mandarin: { pinyin: 'shì', pos: '形容词', meaning: 'suitable' },    cantonese: { jyutping: 'sik1', pos: '形容词', meaning: 'suitable' } },
  '合': { mandarin: { pinyin: 'hé', pos: '动词', meaning: 'to suit' },       cantonese: { jyutping: 'hap6', pos: '动词', meaning: 'to suit' } },
  '送': { mandarin: { pinyin: 'sòng', pos: '动词', meaning: 'to gift' },     cantonese: { jyutping: 'sung3', pos: '动词', meaning: 'to gift' } },
  '人': { mandarin: { pinyin: 'rén', pos: '名词', meaning: 'person' },       cantonese: { jyutping: 'jan4', pos: '名词', meaning: 'person' } },
  '对': { mandarin: { pinyin: 'duì', pos: '形容词', meaning: 'correct' },     cantonese: { jyutping: 'deoi3', pos: '形容词', meaning: 'correct' } },
  '给': { mandarin: { pinyin: 'gěi', pos: '介词', meaning: 'to, for' },      cantonese: { jyutping: 'bei2', pos: '介词', meaning: 'to, for' } },
  '女': { mandarin: { pinyin: 'nǚ', pos: '名词', meaning: 'female' },         cantonese: { jyutping: 'neoi5', pos: '名词', meaning: 'female' } },
  '朋': { mandarin: { pinyin: 'péng', pos: '名词', meaning: 'friend' },       cantonese: { jyutping: 'pang4', pos: '名词', meaning: 'friend' } },
  '友': { mandarin: { pinyin: 'yǒu', pos: '名词', meaning: 'friend' },        cantonese: { jyutping: 'jau5', pos: '名词', meaning: 'friend' } },
  '真': { mandarin: { pinyin: 'zhēn', pos: '副词', meaning: 'really' },       cantonese: { jyutping: 'zan1', pos: '副词', meaning: 'really' } },
  '浪': { mandarin: { pinyin: 'làng', pos: '名词', meaning: 'wave' },         cantonese: { jyutping: 'long6', pos: '名词', meaning: 'wave' } },
  '漫': { mandarin: { pinyin: 'màn', pos: '形容词', meaning: 'overflowing' }, cantonese: { jyutping: 'maan6', pos: '形容词', meaning: 'overflowing' } },
  '玫': { mandarin: { pinyin: 'méi', pos: '名词', meaning: 'rose (part)' },   cantonese: { jyutping: 'mui4', pos: '名词', meaning: 'rose (part)' } },
  '瑰': { mandarin: { pinyin: 'guī', pos: '名词', meaning: 'rose (part)' },   cantonese: { jyutping: 'gwai3', pos: '名词', meaning: 'rose (part)' } },
  '怎': { mandarin: { pinyin: 'zěn', pos: '代词', meaning: 'how' },           cantonese: { jyutping: 'zam2', pos: '代词', meaning: 'how' } },
  '喜': { mandarin: { pinyin: 'xǐ', pos: '动词', meaning: 'to like' },        cantonese: { jyutping: 'hei2', pos: '动词', meaning: 'to like' } },
  '几': { mandarin: { pinyin: 'jǐ', pos: '数词', meaning: 'how many' },       cantonese: { jyutping: 'gei2', pos: '数词', meaning: 'how many' } },
  '朵': { mandarin: { pinyin: 'duǒ', pos: '量词', meaning: 'MW for flowers' }, cantonese: { jyutping: 'do2', pos: '量词', meaning: 'MW for flowers' } },
  '呢': { mandarin: { pinyin: 'ne', pos: '助词', meaning: 'question particle' }, cantonese: { jyutping: 'ne1', pos: '助词', meaning: 'question particle' } },
  '十': { mandarin: { pinyin: 'shí', pos: '数词', meaning: 'ten' },            cantonese: { jyutping: 'sap6', pos: '数词', meaning: 'ten' } },
  '全': { mandarin: { pinyin: 'quán', pos: '形容词', meaning: 'complete' },    cantonese: { jyutping: 'cyun4', pos: '形容词', meaning: 'complete' } },
  '美': { mandarin: { pinyin: 'měi', pos: '形容词', meaning: 'beautiful' },    cantonese: { jyutping: 'mei5', pos: '形容词', meaning: 'beautiful' } },
  '帮': { mandarin: { pinyin: 'bāng', pos: '动词', meaning: 'to help' },       cantonese: { jyutping: 'bong1', pos: '动词', meaning: 'to help' } },
  '包': { mandarin: { pinyin: 'bāo', pos: '动词', meaning: 'to wrap' },        cantonese: { jyutping: 'baau1', pos: '动词', meaning: 'to wrap' } },
  '起': { mandarin: { pinyin: 'qǐ', pos: '动词', meaning: 'to rise' },         cantonese: { jyutping: 'hei2', pos: '动词', meaning: 'to rise' } },
  '来': { mandarin: { pinyin: 'lái', pos: '动词', meaning: 'to come' },        cantonese: { jyutping: 'loi4', pos: '动词', meaning: 'to come' } },
  '这': { mandarin: { pinyin: 'zhè', pos: '代词', meaning: 'this' },           cantonese: { jyutping: 'ze2', pos: '代词', meaning: 'this' } },
  '些': { mandarin: { pinyin: 'xiē', pos: '量词', meaning: 'some' },           cantonese: { jyutping: 'se1', pos: '量词', meaning: 'some' } },
  '漂': { mandarin: { pinyin: 'piào', pos: '形容词', meaning: 'pretty' },      cantonese: { jyutping: 'piu3', pos: '形容词', meaning: 'pretty' } },
  '亮': { mandarin: { pinyin: 'liàng', pos: '形容词', meaning: 'bright' },     cantonese: { jyutping: 'loeng3', pos: '形容词', meaning: 'bright' } },
  '共': { mandarin: { pinyin: 'gòng', pos: '副词', meaning: 'in total' },      cantonese: { jyutping: 'gung6', pos: '副词', meaning: 'in total' } },
  '多': { mandarin: { pinyin: 'duō', pos: '形容词', meaning: 'many' },         cantonese: { jyutping: 'do1', pos: '形容词', meaning: 'many' } },
  '少': { mandarin: { pinyin: 'shǎo', pos: '形容词', meaning: 'few' },         cantonese: { jyutping: 'siu2', pos: '形容词', meaning: 'few' } },
  '钱': { mandarin: { pinyin: 'qián', pos: '名词', meaning: 'money' },         cantonese: { jyutping: 'cin2', pos: '名词', meaning: 'money' } },
  '百': { mandarin: { pinyin: 'bǎi', pos: '数词', meaning: 'hundred' },        cantonese: { jyutping: 'baak3', pos: '数词', meaning: 'hundred' } },
  '五': { mandarin: { pinyin: 'wǔ', pos: '数词', meaning: 'five' },            cantonese: { jyutping: 'ng5', pos: '数词', meaning: 'five' } },
  '块': { mandarin: { pinyin: 'kuài', pos: '量词', meaning: 'yuan (colloquial)' }, cantonese: { jyutping: 'faai3', pos: '量词', meaning: 'dollar (colloquial)' } },
  '两': { mandarin: { pinyin: 'liǎng', pos: '数词', meaning: 'two (before MW)' }, cantonese: { jyutping: 'loeng5', pos: '数词', meaning: 'two (before MW)' } },
  '找': { mandarin: { pinyin: 'zhǎo', pos: '动词', meaning: 'to give change' }, cantonese: { jyutping: 'zaau2', pos: '动词', meaning: 'to give change' } },
  '再': { mandarin: { pinyin: 'zài', pos: '副词', meaning: 'again' },          cantonese: { jyutping: 'zoi3', pos: '副词', meaning: 'again' } },
  '见': { mandarin: { pinyin: 'jiàn', pos: '动词', meaning: 'to see' },        cantonese: { jyutping: 'gin3', pos: '动词', meaning: 'to see' } },
  '下': { mandarin: { pinyin: 'xià', pos: '名词', meaning: 'next, down' },     cantonese: { jyutping: 'haa6', pos: '名词', meaning: 'next, down' } },
  '次': { mandarin: { pinyin: 'cì', pos: '量词', meaning: 'time, occurrence' }, cantonese: { jyutping: 'ci3', pos: '量词', meaning: 'time, occurrence' } },
};

// ---------- Helpers ----------
function getVideoById(id) {
  return videos.find(v => v.id === id);
}

function getSubtitles(videoId) {
  return subtitlesData[videoId] || [];
}

/**
 * Get vocab entry for a character in the given language.
 * @param {string} char
 * @param {string} lang — 'mandarin' or 'cantonese'
 */
function getVocab(char, lang = 'mandarin') {
  const entry = vocabDict[char];
  if (!entry) return null;
  const info = entry[lang] || entry.mandarin;
  return { ...info, language: lang };
}

// ---------- Content Loaders (from JSON files) ----------

/** Load videos from content JSON (falls back to hardcoded) */
async function loadVideos() {
  try {
    const res = await fetch('/content/videos.json');
    if (res.ok) return await res.json();
  } catch (e) { /* fallback */ }
  return videos;
}

/** Load subtitles from content JSON (falls back to hardcoded) */
async function loadSubtitles(videoId) {
  try {
    const res = await fetch(`/content/subtitles/${videoId}.json`);
    if (res.ok) return await res.json();
  } catch (e) { /* fallback */ }
  return getSubtitles(videoId);
}

/** Load daily sentences from content JSON */
async function loadDailySentences() {
  try {
    const res = await fetch('/content/daily-sentences.json');
    if (res.ok) return await res.json();
  } catch (e) { /* fallback */ }
  return [];
}
