# ChineseFlix — Learn Chinese Through Movies

技术栈: Vanilla HTML/CSS/JS + Alpine.js + Plyr.js(YouTube) + MediaRecorder API + Supabase + localStorage
部署: GitHub Pages (qzw-alt.github.io/chinese-learning-app)
仓库: https://github.com/qzw-alt/chinese-learning-app
分支: main

## 文件结构
- `index.html` — 首页 (Alpine.js 响应式数据绑定, 搜索/筛选)
- `watch.html` — 观看页 (Plyr 播放器, 字幕, 跟读录音)
- `vocabulary.html` — 单词本
- `daily.html` — 每日一句
- `review.html` — SRS 间隔复习
- `admin.html` — 管理后台 (Supabase)
- `login.html` / `profile.html` — 用户系统
- `css/style.css` — 全局样式 (1814 行)
- `js/app.js` — 首页逻辑
- `js/data.js` — 视频+字幕硬数据
- `js/config.js` — Supabase keys, XP/等级/徽章配置
- `js/storage.js` — localStorage 封装
- `js/audio.js` — 录音播放
- `js/srs.js` — 间隔复习系统
- `js/components/` — player.js, subtitles.js, ui.js
- `content/videos.json` — 10 个视频元数据
- `content/subtitles/` — JSON 字幕文件 (6 个已完成)
- `content/daily-sentences.json`
- `supabase/schema.sql` — 数据库结构

## 当前状态
- 6 个视频有字幕并可用, 4 个标记 "Coming Soon"
- 核心功能: 视频播放+字幕+跟读+单词本+SRS复习+游戏化(XP/徽章/打卡)
- 最新提交: "Add subtitles for 4 videos, fix Supabase init bug, add coming-soon UX"
- 已部署到 GitHub Pages

## 已知待办
- 为剩余 4 个 Coming Soon 视频添加字幕
- 补齐剩余视频的 YouTube 链接
- 优化移动端体验
- 考虑添加真实后端替代 localStorage

## 启动方式
本地开发: 用 preview_start 或 Python http.server, 入口 index.html
构建: 无构建步骤, 纯静态文件
