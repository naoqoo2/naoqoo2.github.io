---
layout: app
title: "ルレッタ | 無料のWebルーレット（抽選・当番決め・順番決め）"
app_name: "ルレッタ"
description: "入力した項目からランダムに即決定できる無料のオンラインルーレット「ルレッタ」。複数ルーレット管理、重み付け、プレゼン表示、スマホ対応。イベントの抽選や当番決めに最適。"
custom_head: |
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&display=swap" rel="stylesheet">
  <link rel="manifest" href="/app/roulette/manifest.webmanifest">
  <meta name="theme-color" content="#FAF6F0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="ルレッタ">
  <link rel="apple-touch-icon" href="/app/roulette/icon-180.png">
custom_css: |
  html, body.layout--app { background: #FAF6F0; }
  .app-header { display: none; }

  .roulette-app,
  .roulette-app *,
  .roulette-app *::before,
  .roulette-app *::after {
      box-sizing: border-box;
  }

  .roulette-app {
      --ink: #4A4238;
      --muted: #A79E92;
      --line: #EEE5D9;
      --cream: #FAF6F0;
      --accent: #7C6FDD;
      --accent-dark: #6355C9;
      --accent-soft: #EFEDFA;
      --coral: #F1745C;
      position: relative;
      width: 100%;
      margin: 0 auto;
      padding: 0 12px 110px;
      --rl-dock-h: 90px;
      font-family: 'M PLUS Rounded 1c', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif;
      color: var(--ink);
      --roulette-card-min-width: 320px;
      --roulette-viewport-offset: 140px;
  }

  @media (min-width: 768px) {
      .roulette-app { padding: 0 24px 110px; }
  }

  @media (min-width: 1024px) {
      .roulette-app { padding: 0 40px 110px; }
  }

  .roulette-app button { -webkit-tap-highlight-color: transparent; }

  /* ---- top bar (non-sticky) ---- */

  .rl-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.9rem 0 0.3rem;
  }

  .rl-h1 {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      font-size: 21px;
      font-weight: 800;
      letter-spacing: 0.03em;
      color: var(--ink);
  }

  .rl-logo-img {
      width: 36px;
      height: 36px;
      border-radius: 11px;
      box-shadow: 0 3px 8px rgba(124, 111, 221, 0.35);
      display: block;
  }

  .rl-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 0.5rem;
  }

  #addRoulette {
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: #fff;
      color: var(--muted);
      border: 1.5px solid var(--line);
      border-radius: 999px;
      font: inherit;
      font-size: 15px;
      cursor: pointer;
      transition: color 0.15s ease, border-color 0.15s ease;
  }

  #addRoulette:hover {
      color: var(--accent);
      border-color: var(--accent);
  }

  #addRoulette .add-text {
      display: none;
  }

  .mode-toggle-btn {
      border: none;
      background: transparent;
      color: var(--muted);
      padding: 0.25rem;
      font-size: 1.25rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: color 0.2s ease;
  }

  .mode-toggle-btn:hover {
      color: var(--ink);
  }

  .roulette-app.present-mode .mode-toggle-btn {
      color: rgba(74, 66, 56, 0.35);
  }

  .roulette-app.present-mode .mode-toggle-btn:hover {
      color: rgba(74, 66, 56, 0.6);
  }

  /* ---- bottom dock ---- */

  .rl-dock {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: calc(14px + env(safe-area-inset-bottom));
      width: min(calc(100% - 28px), 440px);
      background: #fff;
      border: 1.5px solid var(--line);
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px;
      box-shadow: 0 10px 30px rgba(74, 66, 56, 0.15);
      z-index: 50;
  }

  .spin-wrapper {
      flex: 1;
      display: flex;
  }

  #spinAll {
      position: relative;
      overflow: hidden;
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: var(--accent);
      color: #fff;
      border: none;
      padding: 0.8rem 2.2rem;
      border-radius: 999px;
      font: inherit;
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(124, 111, 221, 0.4);
      transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      touch-action: manipulation;
  }

  #spinAll > * {
      position: relative;
      z-index: 1;
  }

  #spinAll::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: rgba(255, 255, 255, 0.28);
      z-index: 0;
  }

  #spinAll:hover {
      background: var(--accent-dark);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(124, 111, 221, 0.45);
  }

  #spinAll.long-press-lv1,
  #spinAll.long-press-lv2,
  #spinAll.long-press-lv3 {
      transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.15s ease !important;
  }

  #spinAll.long-press-lv1::after,
  #spinAll.long-press-lv2::after,
  #spinAll.long-press-lv3::after {
      animation: rl-charge 1.2s linear forwards;
  }

  @keyframes rl-charge {
      from { width: 0; }
      to { width: 100%; }
  }

  #spinAll.long-press-lv1 {
      transform: translateY(1px) !important;
      box-shadow: 0 2px 8px rgba(124, 111, 221, 0.3) !important;
  }

  #spinAll.long-press-lv2 {
      transform: translateY(2px) !important;
      box-shadow: 0 2px 6px rgba(124, 111, 221, 0.25) !important;
      background: var(--accent-dark);
  }

  #spinAll.long-press-lv3 {
      transform: translateY(3px) !important;
      background: var(--coral);
      box-shadow: 0 2px 10px rgba(241, 116, 92, 0.45) !important;
  }

  .rl-sub {
      margin: 0 0 12px;
      padding-left: 2px;
      font-size: 12px;
      font-weight: 500;
      color: var(--muted);
  }

  /* ---- grid ---- */

  .roulette-grid {
      display: grid;
      gap: 1rem;
      width: 100%;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, minmax(var(--roulette-card-min-width), 1fr));
      align-content: flex-start;
      justify-items: stretch;
      justify-content: center;
  }

  .roulette-grid > .roulette-card {
      width: 100%;
  }

  .roulette-app.edit-mode .roulette-grid {
      grid-template-columns: repeat(auto-fit, minmax(var(--roulette-card-edit-width, var(--roulette-card-min-width)), var(--roulette-card-edit-width, var(--roulette-card-min-width))));
      justify-items: center;
  }

  .roulette-app.edit-mode .roulette-grid > .roulette-card {
      max-width: var(--roulette-card-edit-width, var(--roulette-card-min-width));
  }

  .roulette-grid.single-row,
  .roulette-grid.double-row {
      /* 画面の高さを基本にしつつ、中身が収まらないときは伸ばす（フッターとの重なり防止） */
      min-height: calc(100vh - var(--roulette-viewport-offset, 0px) - var(--rl-dock-h, 0px));
      grid-auto-rows: minmax(min-content, 1fr);
  }

  .roulette-grid.single-row .roulette-card,
  .roulette-grid.double-row .roulette-card {
      height: 100%;
  }

  .roulette-grid.double-row {
      grid-auto-rows: minmax(0, 1fr);
  }

  .roulette-app.present-mode .roulette-grid {
      grid-template-columns: repeat(auto-fit, minmax(var(--roulette-card-min-width), 1fr));
      justify-content: center;
      justify-items: center;
  }

  .roulette-app.present-mode .roulette-grid.double-row {
      min-height: auto;
      height: auto;
      grid-auto-rows: auto;
      row-gap: 2.5rem;
  }

  .roulette-app.present-mode .roulette-grid.single-roulette {
      grid-template-columns: minmax(var(--roulette-card-min-width), min(100%, clamp(420px, 80vw, 960px)));
  }

  .roulette-app.present-mode .roulette-grid.single-roulette .roulette-card {
      width: 100%;
      max-width: min(100%, clamp(420px, 80vw, 960px));
  }

  /* ---- card ---- */

  .roulette-card {
      --roulette-scale: 1;
      height: 100%;
  }

  .roulette-card .card-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: 20px;
      padding: 0;
      transition: background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .roulette-app.edit-mode .card-inner {
      background: #fff;
      border: 1.5px solid var(--line);
      box-shadow: none;
  }

  .roulette-app.present-mode .card-inner {
      background: transparent;
      border: none;
      box-shadow: none;
  }

  .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.25rem;
      padding: 0.65rem 0.75rem 0;
  }

  .roulette-card .roulette-title {
      flex: 1;
      min-width: 0;
      border: 1.5px solid transparent;
      background: transparent;
      font-family: inherit;
      font-weight: 800;
      color: var(--ink);
      border-radius: 10px;
      padding: 0.35rem 0.6rem;
      font-size: clamp(1rem, var(--roulette-font-size, 1.1rem), 1.4rem);
      transition: font-size 0.2s ease, background 0.15s ease, border-color 0.15s ease;
  }

  .roulette-card .roulette-title:hover:not(:focus) {
      background: #FBF7F1;
  }

  .roulette-card .roulette-title:focus {
      outline: none;
      background: #fff;
      border-color: var(--accent);
  }

  .roulette-card .roulette-title[readonly] {
      color: #6E6558;
  }

  .delete-btn {
      flex: none;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: #D3C9BB;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, color 0.15s ease;
  }

  .delete-btn:hover {
      color: #fff;
      background: var(--coral);
  }

  .roulette-card .card-body {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem;
  }

  .roulette-card .card-body[data-roulette-layout] {
      gap: 1.75rem;
  }

  /* ---- wheel ---- */

  .roulette-visual {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
  }

  .rl-stage {
      display: flex;
      justify-content: center;
  }

  .roulette-wrap {
      line-height: 0;
      position: relative;
      display: inline-block;
  }

  .roulette-canvas {
      transition: transform 5s cubic-bezier(0.6, 0, 0, 1);
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      touch-action: manipulation;
      cursor: pointer;
      border-radius: 9999px;
      border: 6px solid #fff;
      box-shadow: 0 6px 20px rgba(74, 66, 56, 0.15);
  }

  .roulette-pin {
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      font-size: clamp(1.1rem, calc(var(--roulette-scale, 1) * 1.2rem), 1.6rem);
      line-height: 1;
      color: var(--ink);
      text-shadow: 0 2px 0 #fff, 0 3px 6px rgba(74, 66, 56, 0.3);
      transition: font-size 0.2s ease;
      z-index: 10;
  }

  .roulette-app.present-mode .roulette-pin {
      top: -8px;
      font-size: clamp(1.6rem, calc(var(--roulette-scale, 1) * 1.9rem), 2.8rem);
  }

  .btn-fab-spin {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 46px;
      height: 46px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--accent);
      color: #fff;
      border: 3px solid #fff;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 5px 14px rgba(124, 111, 221, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      z-index: 12;
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      touch-action: manipulation;
  }

  .btn-fab-spin:hover {
      background: var(--accent-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(124, 111, 221, 0.5);
  }

  .btn-fab-spin.long-press-lv1,
  .btn-fab-spin.long-press-lv2,
  .btn-fab-spin.long-press-lv3 {
      transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.15s ease !important;
  }

  .btn-fab-spin.long-press-lv1 {
      transform: translateY(1px) !important;
      box-shadow: 0 3px 8px rgba(124, 111, 221, 0.3) !important;
  }

  .btn-fab-spin.long-press-lv2 {
      transform: translateY(2px) !important;
      box-shadow: 0 2px 6px rgba(124, 111, 221, 0.25) !important;
      background: var(--accent-dark);
  }

  .btn-fab-spin.long-press-lv3 {
      transform: translateY(3px) !important;
      background: var(--coral);
      box-shadow: 0 2px 10px rgba(241, 116, 92, 0.45) !important;
  }

  .result-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--accent);
      color: #fff;
      padding: 0.8rem 1.3rem;
      border-radius: 16px;
      font-weight: 800;
      font-size: var(--roulette-font-size, 1.1rem);
      line-height: 1.4;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 15;
      max-width: 80%;
      text-align: center;
      word-break: break-word;
      box-shadow: 0 10px 30px rgba(124, 111, 221, 0.45);
      border: 3px solid #fff;
      cursor: text;
      user-select: text;
      pointer-events: none;
  }

  .result-overlay.show {
      opacity: 1;
      pointer-events: auto;
  }

  /* ---- editor ---- */

  .roulette-editor {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
      width: 100%;
  }

  .items-textarea {
      width: 100%;
      min-height: 180px;
      border: 1.5px solid var(--line);
      border-radius: 14px;
      padding: 0.7rem 0.85rem;
      font-size: 16px; /* iOSの自動ズーム回避（16px以上で発動しない） */
      font-family: inherit;
      font-weight: 500;
      color: var(--ink);
      resize: vertical;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      background: #fff;
  }

  .items-textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(124, 111, 221, 0.15);
  }

  .roulette-app.present-mode .roulette-editor,
  .roulette-app.present-mode .delete-btn {
      display: none !important;
  }

  /* ---- footer ---- */

  .rl-foot {
      text-align: center;
      font-size: 11px;
      font-weight: 700;
      color: #C4BBAD;
      padding: 28px 0 20px;
  }

  .rl-foot a {
      color: inherit;
      text-decoration: none;
      border-bottom: 1.5px dotted #D8CFC2;
      padding-bottom: 1px;
  }

  .rl-foot a:hover {
      color: var(--coral);
      border-color: var(--coral);
      text-decoration: none;
  }

  .rl-foot .fa-heart {
      color: var(--coral);
      font-size: 10px;
  }

  /* ---- present mode ---- */

  body.roulette-present-mode .app-header {
      display: none;
  }

  body.roulette-present-mode main.page__content {
      padding-top: 0;
      padding-bottom: 0;
  }

  .roulette-app.present-mode {
      --roulette-card-min-width: 380px;
      --roulette-viewport-offset: 16px;
  }

  .roulette-app.present-mode .rl-sub,
  .roulette-app.present-mode #addRoulette {
      display: none !important;
  }

  .roulette-app.present-mode #rouletteSets {
      margin-bottom: 0;
  }
---

<div class="roulette-app" style="visibility:hidden;">
    <!-- Top bar: title + mode toggle (non-sticky) -->
    <div class="rl-topbar">
        <h1 class="rl-h1"><img class="rl-logo-img" src="/app/roulette/icon.svg" alt="ルレッタ">ルレッタ</h1>
        <div class="rl-actions">
            <button id="soundToggle" type="button" class="mode-toggle-btn" aria-label="効果音のオン・オフ">
                <i class="fas fa-volume-high"></i>
            </button>
            <button id="modeToggle" type="button" class="mode-toggle-btn" aria-label="プレゼン表示に切り替え">
                <i class="fas fa-expand"></i>
            </button>
        </div>
    </div>
    <p class="rl-sub">ルーレットをふやして、ぜんぶ同時にスピン！</p>

    <!-- 初期クラスは最小限。JSでモード別にクラスを付与 -->
    <div id="rouletteSets" class="roulette-grid">
        <!-- ルーレットが動的に追加されます -->
    </div>

    <!-- Template: ルーレットカード（複製用） -->
    <template id="roulette-template">
        <div class="roulette-card">
            <div class="card-inner">
                <div class="card-head">
                    <input type="text" class="roulette-title" value="" maxlength="30" placeholder="ルーレット名">
                    <button class="delete-btn" title="削除">×</button>
                </div>
                <div class="card-body" data-roulette-layout>
                    <div class="roulette-visual">
                        <div class="rl-stage">
                            <div class="roulette-wrap">
                                <div class="roulette-pin">▼</div>
                                <canvas class="roulette-canvas" width="260" height="260"></canvas>
                                <div class="result-overlay"></div>
                                <button class="btn-fab-spin" type="button" title="スピン"><i class="fas fa-sync-alt"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="roulette-editor">
                        <textarea class="items-textarea" placeholder="項目（1行につき1つ）" rows="8"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <footer class="rl-foot">made with <i class="fa-solid fa-heart"></i> by <a href="/apps/">naoqoo2</a></footer>

    <!-- Bottom dock: spin + add (follows scroll) -->
    <nav class="rl-dock">
        <div class="spin-wrapper">
            <button id="spinAll">
                <i class="fas fa-sync-alt"></i>
                <span class="spin-text">スピン！</span>
            </button>
        </div>
        <button id="addRoulette" title="ルーレットを追加" aria-label="ルーレットを追加">
            <i class="fas fa-plus"></i>
            <span class="add-text">ルーレットを追加</span>
        </button>
    </nav>

</div>

<script>
class RouletteManager {
    constructor() {
        this.sets = [];
        this.nextId = 1;
        this.isPresentMode = false;
        this.currentGridRows = 1;
        this.viewportOffset = 0;
        this._resizeObservers = new Map();
        this._resizeTimer = null;
        this.spinPressThresholds = { level2: 500, level3: 1200 };
        this.spinLevelMultipliers = { 1: 1, 2: 2, 3: 4 };
        this.spinDurationsMs = { 1: 5000, 2: 6000, 3: 7000 };
        this.spinPressState = { active: false, level: 1, startAt: 0, intervalId: null, keyActive: false };
        this.audioCtx = null;
        this._lastTickAt = 0;
        // 効果音レベル: 2=大, 1=小, 0=ミュート
        this.soundLevel = 2;
        try {
            const saved = localStorage.getItem('rouletteSoundLevel');
            if (saved === '0' || saved === '1' || saved === '2') {
                this.soundLevel = parseInt(saved, 10);
            } else if (localStorage.getItem('rouletteSoundOn') === '0') {
                this.soundLevel = 0;
            }
        } catch (e) {}
        this.init();
    }

    /* ---- sound (Web Audio API) ---- */

    soundGainScale() {
        return this.soundLevel === 2 ? 1 : (this.soundLevel === 1 ? 0.3 : 0);
    }

    ensureAudio() {
        if (this.soundLevel === 0) return;
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!this.audioCtx) {
            try { this.audioCtx = new Ctx(); } catch (e) { return; }
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume().catch(() => {});
        }
    }

    playTick() {
        const vol = this.soundGainScale();
        if (vol === 0 || !this.audioCtx || this.audioCtx.state !== 'running') return;
        const now = performance.now();
        if (now - this._lastTickAt < 25) return;
        this._lastTickAt = now;
        // 丸くてかわいい「ポッ」音。連打されると「ポポポポ…」と水玉っぽく聞こえる
        const ctx = this.audioCtx;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(820 + Math.random() * 80, t);
        osc.frequency.exponentialRampToValueAtTime(420, t + 0.05);
        gain.gain.setValueAtTime(0.22 * vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.07);
    }

    playResultChime() {
        const vol = this.soundGainScale();
        if (vol === 0 || !this.audioCtx || this.audioCtx.state !== 'running') return;
        const ctx = this.audioCtx;
        const t0 = ctx.currentTime;
        [[784, 0], [1046.5, 0.09]].forEach(([freq, offset]) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = t0 + offset;
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.09 * vol, t + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.4);
        });
    }

    getCanvasAngleDeg(canvas) {
        const tr = getComputedStyle(canvas).transform;
        if (!tr || tr === 'none') return 0;
        const m = tr.match(/matrix\(([^)]+)\)/);
        if (!m) return 0;
        const p = m[1].split(',').map(parseFloat);
        return Math.atan2(p[1], p[0]) * 180 / Math.PI;
    }

    startSpinTicks(canvas, segmentCount, durationMs) {
        if (this.soundGainScale() === 0 || !this.audioCtx) return;
        const step = Math.min(45, Math.max(12, 360 / Math.max(1, segmentCount)));
        const startAt = performance.now();
        let prev = this.getCanvasAngleDeg(canvas);
        let acc = 0;
        const loop = () => {
            if (!canvas.isConnected || this.soundGainScale() === 0) return;
            const cur = this.getCanvasAngleDeg(canvas);
            let diff = cur - prev;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            prev = cur;
            acc += Math.abs(diff);
            if (acc >= step) {
                acc = acc % step;
                this.playTick();
            }
            if (performance.now() - startAt < durationMs + 120) {
                requestAnimationFrame(loop);
            }
        };
        requestAnimationFrame(loop);
    }

    soundIconSvg() {
        // 3状態でスピーカー本体の位置を揃えるため自前SVG（大=波3, 小=波2, ミュート=×）
        const waves = [
            'M416 199a76 76 0 0 1 0 114',
            'M472 152a148 148 0 0 1 0 208',
            'M526 106a216 216 0 0 1 0 300'
        ];
        let extra;
        if (this.soundLevel === 0) {
            extra = '<path d="M446 200 566 312"/><path d="M566 200 446 312"/>';
        } else {
            extra = waves.slice(0, this.soundLevel === 2 ? 3 : 2).map(d => '<path d="' + d + '"/>').join('');
        }
        return '<svg viewBox="64 80 560 352" width="32" height="20" style="display:block" aria-hidden="true" fill="currentColor">'
            + '<path d="M112 192h74l118-99c14-12 48-7 48 21v284c0 28-34 33-48 21L186 320h-74c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32z"/>'
            + '<g fill="none" stroke="currentColor" stroke-width="44" stroke-linecap="round">' + extra + '</g>'
            + '</svg>';
    }

    updateSoundToggleIcon() {
        const btn = document.getElementById('soundToggle');
        if (!btn) return;
        btn.innerHTML = this.soundIconSvg();
        const label = this.soundLevel === 2 ? '効果音: 大（タップで小）' : (this.soundLevel === 1 ? '効果音: 小（タップでミュート）' : '効果音: ミュート（タップで大）');
        btn.setAttribute('aria-label', label);
        btn.title = label;
    }

    getRandomDefaultText() {
        const patterns = [
            // 通常（均等）
            '1\n2\n3\n4\n5\n6',
            // 改行重み付（空行で直前項目の重み+1）
            'グー👊\n\nチョキ✌️\n\n\nパー✋',
            // 数値重み付（末尾 *N）
            'パジェロ\nたわし*19'
        ];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    init() {
        this.loadFromStorage();
        this.applyPresentModeFromQuery();
        this.setupEventListeners();

        // 可能な限り早くモードを適用（チラつき軽減）
        this.bootstrapPresentMode();

        // 最低1つのルーレットを保証
        if (this.sets.length === 0) {
            this.addFirstSet();
        } else {
            this.renderAllSets();
        }

        // 初期レイアウト調整後に表示
        requestAnimationFrame(() => {
            this.applyLayoutClasses();
            this.resizeAllCanvases();
            const root = document.querySelector('.roulette-app');
            if (root) root.style.visibility = 'visible';
        });
    }

    setupEventListeners() {
        const spinAll = document.getElementById('spinAll');
        if (spinAll) {
            this.setupSpinAllLongPress(spinAll);
        }
        
        const modeToggle = document.getElementById('modeToggle');
        if (modeToggle) {
            modeToggle.addEventListener('click', () => this.togglePresentParam());
        }

        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            this.updateSoundToggleIcon();
            soundToggle.addEventListener('click', () => {
                this.soundLevel = this.soundLevel === 2 ? 1 : (this.soundLevel === 1 ? 0 : 2);
                try { localStorage.setItem('rouletteSoundLevel', String(this.soundLevel)); } catch (e) {}
                if (this.soundLevel > 0) {
                    this.ensureAudio();
                    this.playTick(); // 切り替えた音量のプレビュー
                }
                this.updateSoundToggleIcon();
            });
        }

        const addButton = document.getElementById('addRoulette');
        if (addButton) {
            addButton.addEventListener('click', () => {
                if (this.isPresentMode) {
                    this.updatePresentParamInUrl(false);
                    this.applyPresentModeFromQuery();
                    this.setPresentMode(this.isPresentMode);
                }
                this.addSet();
            });
        }

        this.handleResize = () => {
            clearTimeout(this._resizeTimer);
            this._resizeTimer = setTimeout(() => {
                this.applyLayoutClasses();
                this.resizeAllCanvases();
            }, 120);
        };
        window.addEventListener('resize', this.handleResize);
    }

    setupSpinAllLongPress(button) {
        const startPress = (e) => {
            if (e?.button != null && e.button !== 0) return;
            if (this.spinPressState.active) return;
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.spinPressState.active = true;
            this.spinPressState.startAt = performance.now();
            this.spinPressState.level = 1;
            if (this.spinPressState.intervalId) clearInterval(this.spinPressState.intervalId);
            this.updateSpinButtonPressState(1, true);
            this.spinPressState.intervalId = setInterval(() => {
                if (!this.spinPressState.active) return;
                const elapsed = performance.now() - this.spinPressState.startAt;
                const level = this.getSpinLevelFromElapsed(elapsed);
                if (level !== this.spinPressState.level) {
                    this.spinPressState.level = level;
                    this.updateSpinButtonPressState(level, true);
                }
            }, 40);
            if (e?.pointerId != null && typeof button.setPointerCapture === 'function') {
                button.setPointerCapture(e.pointerId);
            }
        };

        const endPress = (shouldSpin) => {
            if (!this.spinPressState.active) return;
            if (this.spinPressState.intervalId) {
                clearInterval(this.spinPressState.intervalId);
                this.spinPressState.intervalId = null;
            }
            const elapsed = performance.now() - this.spinPressState.startAt;
            const level = this.getSpinLevelFromElapsed(elapsed);
            this.spinPressState.active = false;
            this.spinPressState.level = 1;
            this.updateSpinButtonPressState(level, false);
            if (shouldSpin) {
                this.spinAll(level);
            }
        };

        button.addEventListener('pointerdown', (e) => startPress(e));
        button.addEventListener('pointerup', () => endPress(true));
        button.addEventListener('pointercancel', () => endPress(false));
        button.addEventListener('lostpointercapture', () => endPress(false));
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        button.addEventListener('keydown', (e) => {
            if ((e.code === 'Space' || e.code === 'Enter') && !this.spinPressState.keyActive) {
                this.spinPressState.keyActive = true;
                startPress(e);
            }
        });
        button.addEventListener('keyup', (e) => {
            if ((e.code === 'Space' || e.code === 'Enter') && this.spinPressState.keyActive) {
                this.spinPressState.keyActive = false;
                endPress(true);
            }
        });
        button.addEventListener('blur', () => {
            this.spinPressState.keyActive = false;
            endPress(false);
        });
    }

    getSpinLevelFromElapsed(elapsedMs) {
        if (elapsedMs >= this.spinPressThresholds.level3) return 3;
        if (elapsedMs >= this.spinPressThresholds.level2) return 2;
        return 1;
    }

    getSpinLevelMultiplier(level) {
        return this.spinLevelMultipliers[level] || this.spinLevelMultipliers[1];
    }

    getSpinDurationMs(level) {
        return this.spinDurationsMs[level] || this.spinDurationsMs[1];
    }

    getSpinTimingFunction(level) {
        // Lv3は開始直後の勢いを強くしつつ、終盤はしっかり減速させる
        return level === 3 ? 'cubic-bezier(0.08, 0.95, 0.24, 1)' : 'cubic-bezier(0.6, 0, 0, 1)';
    }

    updateSpinButtonPressState(level, pressing) {
        const button = document.getElementById('spinAll');
        if (!button) return;
        const safeLevel = [1, 2, 3].includes(level) ? level : 1;
        button.classList.remove('long-press-lv1', 'long-press-lv2', 'long-press-lv3');
        if (pressing) {
            button.classList.add(`long-press-lv${safeLevel}`);
        }
    }

    updateElementPressState(target, level, pressing) {
        if (!target || !target.classList) return;
        const safeLevel = [1, 2, 3].includes(level) ? level : 1;
        target.classList.remove('long-press-lv1', 'long-press-lv2', 'long-press-lv3');
        if (pressing) {
            target.classList.add(`long-press-lv${safeLevel}`);
        }
    }

    setupPerSetLongPressSpin(target, setData, canvas, setElement, options = {}) {
        const { stopPropagation = false, enableKeyboard = false } = options;
        const pressState = { active: false, level: 1, startAt: 0, intervalId: null, keyActive: false };

        const startPress = (e) => {
            if (e?.button != null && e.button !== 0) return;
            if (pressState.active) return;
            if (stopPropagation && e) {
                e.preventDefault();
                e.stopPropagation();
            }
            pressState.active = true;
            pressState.startAt = performance.now();
            pressState.level = 1;
            if (pressState.intervalId) clearInterval(pressState.intervalId);
            this.updateElementPressState(target, 1, true);
            pressState.intervalId = setInterval(() => {
                if (!pressState.active) return;
                const elapsed = performance.now() - pressState.startAt;
                const level = this.getSpinLevelFromElapsed(elapsed);
                if (level !== pressState.level) {
                    pressState.level = level;
                    this.updateElementPressState(target, level, true);
                }
            }, 40);
            if (e?.pointerId != null && typeof target.setPointerCapture === 'function') {
                target.setPointerCapture(e.pointerId);
            }
        };

        const endPress = (shouldSpin) => {
            if (!pressState.active) return;
            if (pressState.intervalId) {
                clearInterval(pressState.intervalId);
                pressState.intervalId = null;
            }
            const elapsed = performance.now() - pressState.startAt;
            const level = this.getSpinLevelFromElapsed(elapsed);
            pressState.active = false;
            pressState.level = 1;
            this.updateElementPressState(target, level, false);
            if (shouldSpin) {
                this.spinRoulette(setData, canvas, setElement, level);
            }
        };

        target.addEventListener('pointerdown', (e) => startPress(e));
        target.addEventListener('pointerup', () => endPress(true));
        target.addEventListener('pointercancel', () => endPress(false));
        target.addEventListener('lostpointercapture', () => endPress(false));
        target.addEventListener('click', (e) => {
            e.preventDefault();
            if (stopPropagation) e.stopPropagation();
        });
        target.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (stopPropagation) e.stopPropagation();
        });

        if (enableKeyboard) {
            target.addEventListener('keydown', (e) => {
                if ((e.code === 'Space' || e.code === 'Enter') && !pressState.keyActive) {
                    pressState.keyActive = true;
                    startPress(e);
                }
            });
            target.addEventListener('keyup', (e) => {
                if ((e.code === 'Space' || e.code === 'Enter') && pressState.keyActive) {
                    pressState.keyActive = false;
                    endPress(true);
                }
            });
            target.addEventListener('blur', () => {
                pressState.keyActive = false;
                endPress(false);
            });
        }
    }

    addFirstSet() {
        // 初回のルーレットを追加（重複チェック）
        if (this.sets.length > 0) return;
        
        const setData = {
            id: this.nextId++,
            text: this.getRandomDefaultText(),
            title: 'ルーレット1',
            isSpinning: false,
            result: null,
            itemsVisible: true
        };
        
        this.sets.push(setData);
        this.renderAllSets();
        this.updateDeleteButtonsState();
        this.saveToStorage();
    }

    addSet() {
        const setData = {
            id: this.nextId++,
            text: this.getRandomDefaultText(),
            title: `ルーレット${this.sets.length + 1}`,
            isSpinning: false,
            result: null,
            itemsVisible: true
        };
        
        this.sets.push(setData);
        
        // 新しい要素のみを追加（全体再描画を避ける）
        const container = document.getElementById('rouletteSets');
        const setElement = this.createSetElement(setData);
        container.appendChild(setElement);
        this.applyLayoutClasses();
        
        // Canvas初期化
        const canvas = setElement.querySelector('.roulette-canvas');
        this.updateCanvasSize(canvas);
        this.drawRoulette(canvas, setElement);
        this.observeSet(setElement);
        
        this.saveToStorage();
        this.updateDeleteButtonsState();
        
        // 現在位置からスムーズスクロール
        setTimeout(() => {
            setElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
            
            const textarea = setElement.querySelector('.items-textarea');
            if (textarea) {
                setTimeout(() => {
                    textarea.focus();
                    textarea.select();
                }, 500);
            }
        }, 100);
    }

    renderAllSets() {
        const container = document.getElementById('rouletteSets');
        container.innerHTML = '';
        // レイアウトはモードに応じてTailwindクラスで適用

        this.sets.forEach(setData => { this.renderSet(setData); });
        this.applyLayoutClasses();
        this.observeAll();
        this.resizeAllCanvases();
        this.updateDeleteButtonsState();
        this.updateTitleInputsState();
    }

    renderSet(setData) {
        const container = document.getElementById('rouletteSets');
        const setElement = this.createSetElement(setData);
        container.appendChild(setElement);
        const canvas = setElement.querySelector('.roulette-canvas');
        this.updateCanvasSize(canvas);
        this.drawRoulette(canvas, setElement);
        this.observeSet(setElement);
        this.updateDeleteButtonsState();
        this.updateTitleInputsState();
    }

    updateDeleteButtonsState() {
        const showByCount = this.sets.length > 1;
        const show = showByCount && !this.isPresentMode;
        document.querySelectorAll('.roulette-card .delete-btn').forEach(btn => {
            btn.style.display = show ? 'block' : 'none';
        });
    }

    updateTitleInputsState() {
        document.querySelectorAll('.roulette-title').forEach(input => {
            input.readOnly = false;
            input.tabIndex = 0;
        });
    }

    updatePresentParamInUrl(enable) {
        const params = new URLSearchParams(window.location.search);
        if (enable) {
            params.set('present', '1');
        } else {
            params.delete('present');
        }
        const query = params.toString();
        const newUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', newUrl);
    }

    togglePresentParam() {
        this.updatePresentParamInUrl(!this.isPresentMode);
        this.applyPresentModeFromQuery();
        this.setPresentMode(this.isPresentMode);
    }

    createSetElement(setData) {
        const tpl = document.getElementById('roulette-template');
        const node = tpl.content.firstElementChild.cloneNode(true);
        node.dataset.setId = setData.id;

        // Fill fields
        node.querySelector('.roulette-title').value = setData.title;
        node.querySelector('.items-textarea').value = (typeof setData.text === 'string') ? setData.text : '';
        const ro = node.querySelector('.result-overlay');
        ro.textContent = setData.result || '';

        // 回転状態の表示は結果オーバーレイで管理

        this.setupSetEventListeners(node, setData);
        return node;
    }

    getWeightedItems(setElement) {
        try {
            const ta = setElement?.querySelector?.('.items-textarea');
            const text = (ta && typeof ta.value === 'string') ? ta.value : '';
            const lines = text.split(/\n/);
            // 末尾の空行は無視（ユーザーの意図しない改行を除外）
            while (lines.length > 0 && lines[lines.length - 1].trim().length === 0) {
                lines.pop();
            }
            const result = [];
            let last = null;
            for (const raw of lines) {
                const line = raw.trim();
                if (line.length === 0) {
                    if (last) last.weight += 1; // 空行は直前の項目の重みを増やす
                } else {
                    // 明示重み（末尾 *N）に対応。例: 赤*3 → label=赤, weight=3
                    let label = line;
                    let weight = 1;
                    const m = line.match(/^(.*?)\s*\*\s*(\d+)$/);
                    if (m) {
                        label = m[1].trim();
                        const n = parseInt(m[2], 10);
                        if (!isNaN(n) && n > 0) weight = n;
                    }
                    last = { label, weight };
                    result.push(last);
                }
            }
            return result;
        } catch (_) {
            return [];
        }
    }

    getCanvasSizeLimits() {
        const rows = Math.max(1, this.currentGridRows || 1);
        const viewportHeight = window.innerHeight || document.documentElement?.clientHeight || 900;
        const dock = document.querySelector('.rl-dock');
        const dockAllowance = dock ? dock.offsetHeight + 28 : 0;
        const usableHeight = Math.max(320, viewportHeight - (this.viewportOffset || 0) - 24 - dockAllowance);
        const editorAllowance = (!this.isPresentMode && rows === 1) ? 320 : 0;
        const perRowHeight = Math.max(240, (usableHeight - editorAllowance) / rows);

        if (this.isPresentMode) {
            if (rows <= 1) return { min: 320, max: 820, cap: perRowHeight };
            if (rows === 2) return { min: 320, max: 820, cap: perRowHeight };
            return { min: 260, max: 720, cap: perRowHeight };
        }

        // 編集モードは行数が増えてもホイールサイズを一定に保つ（複数行はスクロール前提のため画面高さで縮めない）
        return { min: 280, max: 720, cap: rows === 1 ? perRowHeight : null };
    }

    updateCanvasSize(canvas) {
        // 表示領域幅に応じて可変
        let col = null;
        if (canvas && typeof canvas.closest === 'function') {
            col = canvas.closest('.roulette-visual');
        }
        if (!col && canvas && canvas.parentElement && canvas.parentElement.parentElement) {
            col = canvas.parentElement.parentElement;
        }
        const available = col ? Math.floor(col.getBoundingClientRect().width) : (canvas.clientWidth || 260);
        const desired = Math.floor(available - 24);
        const limits = this.getCanvasSizeLimits();
        const heightAdjusted = limits.cap ? Math.min(limits.cap, desired) : desired;
        let size = Math.max(limits.min, Math.min(limits.max, heightAdjusted));
        const totalSets = Array.isArray(this.sets) ? this.sets.length : 0;
        const shrinkPreview = this.isPresentMode && (totalSets === 1 || totalSets === 2);
        if (shrinkPreview && size > limits.min) {
            const previewScale = 0.9;
            size = Math.max(limits.min, Math.round(size * previewScale));
        }
        const card = canvas?.closest ? canvas.closest('.roulette-card') : null;
        if (card) {
            const scale = Math.min(1.6, Math.max(0.75, size / 420));
            card.style.setProperty('--roulette-scale', scale.toFixed(3));
        }
        if (canvas.width !== size || canvas.height !== size) {
            canvas.width = size;
            canvas.height = size;
            canvas.style.width = size + 'px';
            canvas.style.height = size + 'px';
        }
    }

    resizeAllCanvases() {
        this.sets.forEach(setData => {
            const el = document.querySelector(`[data-set-id="${setData.id}"]`);
            if (!el) return;
            const canvas = el.querySelector('.roulette-canvas');
            this.updateCanvasSize(canvas);
            this.drawRoulette(canvas, el);
        });
    }

    setupSetEventListeners(setElement, setData) {
        const canvas = setElement.querySelector('.roulette-canvas');
        const textarea = setElement.querySelector('.items-textarea');
        const deleteBtn = setElement.querySelector('.delete-btn');
        const titleInput = setElement.querySelector('.roulette-title');
        const spinBtn = setElement.querySelector('.btn-fab-spin');

        // ルーレット本体とカード内スピンボタンを長押し対応
        this.setupPerSetLongPressSpin(canvas, setData, canvas, setElement);
        if (spinBtn) {
            this.setupPerSetLongPressSpin(spinBtn, setData, canvas, setElement, { stopPropagation: true, enableKeyboard: true });
        }

        // テキストエリア変更
        textarea.addEventListener('input', () => {
            setData.text = textarea.value;
            this.drawRoulette(canvas, setElement);
            this.saveToStorage();
        });

        // 削除ボタンのクリックハンドラ（可視状態は別途一括で制御）
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.deleteSet(setData.id);
            });
        }

        // タイトル変更
        titleInput.addEventListener('input', () => {
            setData.title = titleInput.value;
            this.saveToStorage();
        });

        // 項目は常時表示のためトグルなし
    }

    drawRoulette(canvas, setElement) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const weighted = this.getWeightedItems(setElement);
        if (weighted.length === 0) return;
        const totalWeight = weighted.reduce((s, it) => s + it.weight, 0);
        const colors = [
            '#F1745C', '#9FD3B5', '#93C6E8', '#FBD277',
            '#F5A9BC', '#C4B5E8', '#F5B078', '#A6D9CF',
            '#B9D98F', '#F2A29B', '#A8BEEB', '#EFC3E1'
        ];
        const primaryColor = colors[0]; // 赤は目立つため「当たり」的に1個だけ表示する
        const cycleColors = colors.slice(1); // 2個目以降は赤を除いた11色で循環させる(赤を含んでいると13個で赤が隣り合う不具合も避けている)

        // フォントサイズをキャンバスサイズに応じて可変（テキストエリアと共通化）
        const { dynamicFont, lineHeight } = this.computeFontMetrics(canvas);
        if (setElement && typeof setElement.style?.setProperty === 'function') {
            setElement.style.setProperty('--roulette-font-size', `${dynamicFont}px`);
        }

        let currentAngle = -Math.PI / 2;
        weighted.forEach(({ label, weight }, index) => {
            const angle = (2 * Math.PI) * (weight / totalWeight);
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            // セクション描画
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            const fill = index === 0
                ? primaryColor
                : cycleColors[(index - 1) % cycleColors.length];
            ctx.fillStyle = fill;
            ctx.fill();

            // テキスト描画
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + angle / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#4A4238';
            ctx.font = `bold ${dynamicFont}px 'M PLUS Rounded 1c', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', 'YuGothic', 'Meiryo', sans-serif`;
            
            const textRadius = radius * 0.7;
            const maxWidth = radius * 0.6;
            this.drawTextWithWrap(ctx, label, textRadius, 0, maxWidth, dynamicFont, lineHeight);
            ctx.restore();
            currentAngle = endAngle;
        });
    }

    drawTextWithWrap(ctx, text, x, y, maxWidth, fontSize, lineHeight) {
        // 文字単位で改行しつつ最大幅に収める（最大3行、超過は省略）
        const chars = Array.from(text);
        const lines = [];
        let current = '';

        const fits = (s) => ctx.measureText(s).width <= maxWidth;

        for (const ch of chars) {
            if (current === '') {
                current = ch;
                continue;
            }
            const next = current + ch;
            if (fits(next)) {
                current = next;
            } else {
                lines.push(current);
                current = ch;
                if (lines.length >= 2) { // これ以上増える場合は省略処理に回す
                    break;
                }
            }
        }
        if (current) lines.push(current);

        // 3行を超える場合は3行目を省略付きで調整
        if (lines.length > 3) {
            lines.length = 3;
        }
        if (lines.length === 3) {
            let last = lines[2];
            while (!fits(last + '…') && last.length > 0) {
                last = last.slice(0, -1);
            }
            lines[2] = last + (last ? '…' : '');
        }

        // 垂直中央に配置
        const totalHeight = lineHeight * (lines.length - 1);
        lines.forEach((line, idx) => {
            const yOffset = y - totalHeight / 2 + idx * lineHeight;
            ctx.fillText(line, x, yOffset);
        });
    }

    computeFontMetrics(canvas) {
        // タブレット・PCではより大きく、SPでも見やすい下限に
        const dynamicFont = Math.max(16, Math.min(44, Math.round(canvas.width * 0.065)));
        const lineHeight = Math.round(dynamicFont * 1.25);
        return { dynamicFont, lineHeight };
    }

    // テキストエリアと結果オーバーレイのフォントはCSSに委ねる

    spinRoulette(setData, canvas, setElement, spinLevel = 1) {
        if (setData.isSpinning) return;
        // 事前に重みを確認（空ルーレットなら何もしない）
        const weightedBefore = this.getWeightedItems(setElement);
        if (!weightedBefore || weightedBefore.length === 0) {
            return;
        }

        setData.isSpinning = true;
        setData.result = null;
        
        const resultOverlay = setElement.querySelector('.result-overlay');
        resultOverlay.classList.remove('show');

        // 回転角度計算（Lv1は現状維持、長押しLv2/Lv3は回転数を増やす）
        const safeLevel = [1, 2, 3].includes(spinLevel) ? spinLevel : 1;
        const spinMultiplier = this.getSpinLevelMultiplier(safeLevel);
        const spinDurationMs = this.getSpinDurationMs(safeLevel);
        const spinTimingFunction = this.getSpinTimingFunction(safeLevel);
        const lightSpin = safeLevel === 1 ? (Math.random() < 0.15) : false;
        const minRotationBase = lightSpin ? 720 : 1800;   // 2回転 or 5回転以上
        const maxRotationBase = lightSpin ? 1440 : 3600;  // 4回転 or 10回転未満
        const minRotation = minRotationBase * spinMultiplier;
        const maxRotation = maxRotationBase * spinMultiplier;
        const base = Math.random() * (maxRotation - minRotation) + minRotation;
        const direction = Math.random() < 0.5 ? -1 : 1;
        const deltaRotation = base * direction;
        setData._angleDeg = (setData._angleDeg || 0) + deltaRotation;
        canvas.style.transition = `transform ${spinDurationMs}ms ${spinTimingFunction}`;
        canvas.style.transform = `rotate(${setData._angleDeg}deg)`;

        // 回転に合わせてカチカチ音を鳴らす
        this.ensureAudio();
        this.startSpinTicks(canvas, weightedBefore.length, spinDurationMs);

        setTimeout(() => {
            // 結果計算（重み付き）: 最終的な角度で当たりを決定（累積回転を考慮）
            const finalRotation = setData._angleDeg || 0; // 累積回転角
            const normalizedRotation = ((finalRotation % 360) + 360) % 360; // 0..359
            const weighted = weightedBefore; // スタート時の定義で固定
            const totalWeight = weighted.reduce((s, it) => s + it.weight, 0) || 1;
            // ポインタは常に上(-90deg)。ホイールがRだけ回転したときの元の座標系でのポインタ角は -90 - R
            const pointerAngle = (((-90 - normalizedRotation) % 360) + 360) % 360; // 0..359
            let selectedIndex = 0;
            let startDeg = -90;
            for (let i = 0; i < weighted.length; i++) {
                const angleDeg = 360 * (weighted[i].weight / totalWeight);
                const endDeg = startDeg + angleDeg;
                // 正規化して範囲チェック（エッジでのブレは次の区間に含めない）
                const s = ((startDeg % 360) + 360) % 360;
                const e = ((endDeg % 360) + 360) % 360;
                const inRange = e > s
                  ? (pointerAngle >= s && pointerAngle < e)
                  : (pointerAngle >= s || pointerAngle < e);
                if (inRange) { selectedIndex = i; break; }
                startDeg = endDeg;
            }
            setData.result = weighted[selectedIndex]?.label || '';
            setData.isSpinning = false;
            
            if (setData.result) {
                this.showResult(setElement, setData.result);
            }
            this.saveToStorage();
        }, spinDurationMs);

        this.saveToStorage();
    }

    showResult(setElement, result) {
        const resultOverlay = setElement.querySelector('.result-overlay');
        if (resultOverlay) {
            resultOverlay.textContent = result;
            resultOverlay.classList.add('show');
        }
        this.playResultChime();
    }

    spinAll(spinLevel = 1) {
        this.sets.forEach(setData => {
            const setElement = document.querySelector(`[data-set-id="${setData.id}"]`);
            if (setElement) {
                const canvas = setElement.querySelector('.roulette-canvas');
                this.spinRoulette(setData, canvas, setElement, spinLevel);
            }
        });
    }

    deleteSet(setId) {
        // 最後の1つは削除できない
        if (this.sets.length <= 1) {
            return;
        }
        
        // DOM要素を直接削除
        const elementToDelete = document.querySelector(`[data-set-id="${setId}"]`);
        if (elementToDelete) {
            elementToDelete.remove();
        }
        
        // データからも削除
        this.sets = this.sets.filter(set => set.id !== setId);
        this.saveToStorage();
        this.applyLayoutClasses();
        this.unobserveSet(setId);
        this.updateDeleteButtonsState();
    }

    saveToStorage() {
        // DOMのテキストエリア内容を優先して保存（空行も含めて保持）
        const setsForSave = this.sets.map(set => {
            const copy = { ...set, isSpinning: false };
            const el = document.querySelector(`[data-set-id="${set.id}"]`);
            const ta = el ? el.querySelector('.items-textarea') : null;
            if (ta && typeof ta.value === 'string') {
                copy.text = ta.value;
            } else if (typeof copy.text !== 'string') {
                // textが未設定の古いデータの場合、itemsから生成（今後は保存時にtextが入る）
                copy.text = Array.isArray(copy.items) ? copy.items.join('\n') : '';
            }
            // itemsは保存しない（将来はtextのみをソースオブトゥルースに）
            delete copy.items;
            // 累積回転角は保存しない（初回だけ異常に回る不具合を防ぐ）
            delete copy._angleDeg;
            return copy;
        });
        const saveData = { sets: setsForSave, nextId: this.nextId };
        localStorage.setItem('rouletteData', JSON.stringify(saveData));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('rouletteData');
        if (!saved) return;
        try {
            const data = JSON.parse(saved);
            this.sets = (data.sets || []).map(set => ({
                ...set,
                isSpinning: false,
                _angleDeg: 0
            }));
            this.nextId = data.nextId || 1;
        } catch (e) {
            console.error('Failed to load saved data:', e);
            this.sets = [];
            this.nextId = 1;
        }
    }

    setPresentMode(isPresentMode) {
        this.isPresentMode = isPresentMode;
        this.applyModeClasses();
        this.applyLayoutClasses();
        this.observeAll();
        this.updateDeleteButtonsState();
        this.updateTitleInputsState();
    }

    applyModeClasses() {
        const app = document.querySelector('.roulette-app');
        const body = document.body;
        const modeToggle = document.getElementById('modeToggle');

        if (app) {
            app.classList.toggle('present-mode', this.isPresentMode);
            app.classList.toggle('edit-mode', !this.isPresentMode);
        }
        if (body) {
            body.classList.toggle('roulette-present-mode', this.isPresentMode);
        }
        if (modeToggle) {
            modeToggle.innerHTML = this.isPresentMode ? `<i class="fas fa-times"></i>` : `<i class="fas fa-expand"></i>`;
            modeToggle.setAttribute('aria-label', this.isPresentMode ? '編集モードに戻る' : 'プレゼン表示に切り替え');
        }
    }

    observeSet(setElement) {
        const id = parseInt(setElement.dataset.setId, 10);
        this.unobserveSet(id);
        const visual = setElement.querySelector('.roulette-visual');
        const canvas = setElement.querySelector('.roulette-canvas');
        if (!visual || !canvas) return;
        const ro = new ResizeObserver(() => {
            this.updateCanvasSize(canvas);
            const setData = this.sets.find(s => s.id === id);
            if (setData) this.drawRoulette(canvas, setElement);
        });
        ro.observe(visual);
        this._resizeObservers.set(id, ro);
    }

    observeAll() {
        document.querySelectorAll('[data-set-id]').forEach(node => this.observeSet(node));
    }

    unobserveSet(setId) {
        const ro = this._resizeObservers.get(setId);
        if (ro) {
            try { ro.disconnect(); } catch (e) {}
            this._resizeObservers.delete(setId);
        }
    }

    applyLayoutClasses() {
        const container = document.getElementById('rouletteSets');
        if (!container) return;

        const baseClasses = ['roulette-grid'];
        container.className = baseClasses.join(' ');
        container.classList.remove('single-row', 'double-row', 'single-roulette');

        // ルーレットグリッドが画面上部からどれだけ下にあるかを元に高さを算出
        const gridTop = Math.max(0, Math.round(container.getBoundingClientRect().top));
        const extraPadding = this.isPresentMode ? 8 : 16;
        const viewportOffset = gridTop + extraPadding;
        container.style.setProperty('--roulette-viewport-offset', `${viewportOffset}px`);

        const minWidth = this.isPresentMode ? 380 : 320;
        container.style.setProperty('--roulette-card-min-width', `${minWidth}px`);
        if (!this.isPresentMode) {
            container.style.setProperty('--roulette-card-edit-width', `${minWidth}px`);
        } else {
            container.style.removeProperty('--roulette-card-edit-width');
        }

        const totalSets = this.sets.length;
        const gap = 16;
        const width = container.clientWidth || window.innerWidth;
        const columns = Math.max(1, Math.floor((width + gap) / (minWidth + gap)));
        const rows = Math.max(1, Math.ceil((totalSets || 1) / columns));

        container.dataset.columns = columns;
        container.dataset.rows = rows;

        if (rows === 1) {
            container.classList.add('single-row');
        } else if (this.isPresentMode && rows === 2) {
            container.classList.add('double-row');
        }

        if (this.isPresentMode && totalSets === 1) {
            container.classList.add('single-roulette');
        }

        container.style.marginBottom = rows <= 2 ? '1rem' : '1.5rem';

        this.currentGridRows = rows;
        this.viewportOffset = viewportOffset;

        requestAnimationFrame(() => this.resizeAllCanvases());
    }

    applyPresentModeFromQuery() {
        try {
            const params = new URLSearchParams(window.location.search);
            this.isPresentMode = params.get('present') === '1';
        } catch (_) {
            this.isPresentMode = false;
        }
    }

    // DOM挿入前にモードのクラスだけ適用（レイアウト確定を早める）
    bootstrapPresentMode() {
        this.applyModeClasses();
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    const manager = new RouletteManager();
    window.__rouletteManager = manager;
    // 全リソースロード後にも再計算して初期サイズのぶれを抑制
    window.addEventListener('load', () => manager.resizeAllCanvases());
    // Webフォント読み込み後にホイールの文字を描き直す
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => manager.resizeAllCanvases());
    }
});
</script>
