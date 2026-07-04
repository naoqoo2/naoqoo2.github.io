---
layout: app
title: "リスタ | リスと一緒にこつこつ作業（ポモドーロ×ローファイ）"
app_name: "リスタ"
description: "リスと一緒に作業できる無料の作業おともアプリ。ポモドーロタイマー、環境音とローファイBGM、どんぐり集め、TODOメモ。ログイン不要・スマホ対応。"
custom_head: |
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&family=DotGothic16&display=swap" rel="stylesheet">
  <link rel="manifest" href="/app/risuta/manifest.webmanifest">
  <meta name="theme-color" content="#3A3160">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="リスタ">
  <link rel="apple-touch-icon" href="/app/risuta/icon-180.png">
custom_css: |
  html, body.layout--app { background: #3A3160; }
  .app-header { display: none; }
  body.layout--app main.page__content { padding: 0; max-width: none; }

  .risuta, .risuta *, .risuta *::before, .risuta *::after { box-sizing: border-box; }

  .risuta {
    --ink: #4A3228;
    --coral: #F1745C;
    --amber: #F2B33D;
    --cream: #FFF9EE;
    position: fixed;
    inset: 0;
    overflow: hidden;
    font-family: 'M PLUS Rounded 1c', -apple-system, sans-serif;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  /* ---- sky ---- */
  .rs-sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, var(--s1, #232042) 0%, var(--s2, #3A3160) 55%, var(--s3, #6E5080) 100%);
    transition: opacity 3s ease;
  }
  #sky2 { opacity: 0; }

  .rs-star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #fff;
    opacity: var(--stars, 0);
    transition: opacity 3s ease;
    animation: rs-twinkle 3.5s ease-in-out infinite;
  }
  @keyframes rs-twinkle { 50% { transform: scale(.4); } }

  .rs-moon {
    position: absolute;
    top: 10%;
    right: 14%;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #FBEED3;
    box-shadow: 0 0 30px 8px rgba(251, 238, 211, .3);
    opacity: var(--stars, 0);
    transition: opacity 3s ease;
  }

  /* ---- ground / branch ---- */
  .rs-hill {
    position: absolute;
    bottom: -6%;
    height: 26%;
    border-radius: 50% 50% 0 0;
    background: #26332B;
  }
  .rs-hill.h1 { left: -12%; width: 55%; }
  .rs-hill.h2 { left: 30%; width: 60%; height: 20%; background: #1F2A24; }
  .rs-hill.h3 { right: -14%; width: 50%; height: 30%; }

  .rs-branch {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 13%;
    height: 12px;
    background: #3E2E26;
    border-top: 4px solid #5A4130;
    border-radius: 6px;
    display: none;
  }
  .risuta.th-umi .rs-branch { display: block; }

  /* そうげん: ゆるやかにカーブした草地（もりとは別の見た目） */
  .rs-ground {
    position: absolute;
    left: -10%;
    right: -10%;
    bottom: 0;
    height: 16%;
    background: #2A3A2B;
    border-radius: 50% 50% 0 0 / 60% 60% 0 0;
  }
  .risuta.th-mori .rs-ground { left: 0; right: 0; height: 14.5%; background: #202B21; border-radius: 0; }
  .risuta.th-yuki .rs-ground { left: 0; right: 0; height: 14.5%; background: #E6EDF4; border-radius: 0; }
  .risuta.th-umi .rs-ground { display: none; }

  /* もりの最前景: 画面の左右端に固定した大木（スマホでも端に出る） */
  .rs-fg { display: none; }
  .risuta.th-mori .rs-fg { display: block; }
  .rs-fg .fg { position: absolute; z-index: 4; pointer-events: none; transform-origin: 50% 100%; }
  .t-fl g { pointer-events: auto; }
  .rs-fg .fg.shake { animation: rs-shake .3s ease; }
  @keyframes rs-shake { 25% { transform: rotate(1.4deg); } 75% { transform: rotate(-1.4deg); } }
  .t-fl { left: -5%; bottom: -30px; height: 460px; }
  .t-nl { left: 6%; bottom: 0; height: 300px; }
  .t-nr { right: 2%; bottom: 0; height: 250px; }
  .t-fr { right: -5%; bottom: -36px; height: 500px; }
  @media (max-width: 640px) {
    .t-nl, .t-nr { display: none; }
    .t-fl { left: -120px; }
    .t-fr { right: -190px; }
  }
  /* ---- campfire ---- */
  .rs-campfire {
    position: absolute;
    left: 15%;
    bottom: 14.1%;
    z-index: 2;
    display: none;
    pointer-events: none;
  }
  .rs-campfire.on { display: block; }
  .rs-campfire svg { display: block; image-rendering: pixelated; }
  .rs-campfire .fa { animation: rs-flickA .5s steps(1) infinite; }
  .rs-campfire .fb { animation: rs-flickB .5s steps(1) infinite; }
  @keyframes rs-flickA { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
  @keyframes rs-flickB { 0%, 49% { opacity: 0; } 50%, 100% { opacity: 1; } }
  .rs-fireglow {
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 140px;
    height: 95px;
    transform: translateX(-50%);
    background: radial-gradient(closest-side, rgba(255, 170, 80, .35), rgba(255, 170, 80, 0));
    animation: rs-glow 1.4s ease-in-out infinite;
  }
  @keyframes rs-glow { 50% { opacity: .6; } }

  /* ---- theme particles ---- */
  .rs-snowp {
    position: absolute;
    top: -10px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .92);
    animation: rs-fall var(--d, 12s) linear forwards;
    z-index: 2;
    pointer-events: none;
  }
  .rs-bub {
    position: absolute;
    bottom: 15%;
    width: 7px;
    height: 7px;
    border: 1.5px solid rgba(255, 255, 255, .55);
    border-radius: 50%;
    animation: rs-rise var(--d, 9s) linear forwards;
    z-index: 2;
    pointer-events: none;
  }
  @keyframes rs-rise { to { transform: translate(var(--drift, 20px), -70vh); opacity: 0; } }

  /* ---- scene decor ---- */
  .rs-trees {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12%;
    height: 60%;
    display: none;
  }
  .rs-mountains {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    height: 62%;
    display: none;
  }

  /* ---- scene themes ---- */
  .risuta.th-mori .rs-trees { display: block; }
  .risuta.th-yuki .rs-mountains { display: block; }
  .risuta.th-yuki .rs-hill { background: #DCE6EE; }
  .risuta.th-yuki .rs-hill.h2 { background: #C9D8E6; }
  .risuta.th-umi .rs-hill.h1 {
    left: 0;
    width: 100%;
    height: 13.5%;
    bottom: 0;
    border-radius: 0;
    background: linear-gradient(180deg, #4A80A2, #2E5878);
  }
  .risuta.th-umi .rs-hill.h2, .risuta.th-umi .rs-hill.h3 { display: none; }

  /* ---- leaves ---- */
  .rs-leaf {
    position: absolute;
    top: -24px;
    pointer-events: none;
    animation: rs-fall var(--d, 11s) linear forwards;
    z-index: 2;
  }
  @keyframes rs-fall {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(var(--drift, 40px), 108vh) rotate(340deg); }
  }

  /* ---- squirrel ---- */
  .rs-sq {
    position: absolute;
    left: var(--sq-x, 72%);
    bottom: var(--sq-y, 14.2%);
    transform: translateX(-50%) scale(var(--sq-s, 1));
    transform-origin: bottom center;
    transition: left 1.8s cubic-bezier(.5, 1.25, .4, 1), bottom 1.8s cubic-bezier(.5, 1.25, .4, 1), transform 1.8s cubic-bezier(.5, 1.25, .4, 1);
    z-index: 3;
    cursor: pointer;
  }
  .rs-sq canvas {
    display: block;
    width: 138px;
    height: auto;
    image-rendering: pixelated;
    animation: rs-bob 3.2s ease-in-out infinite;
  }
  @keyframes rs-bob { 50% { transform: translateY(-2.5px); } }

  .rs-flip { transform: scaleX(var(--flip, 1)); }
  .rs-flip.hop { animation: rs-hop .3s ease-in-out infinite; }
  @keyframes rs-hop {
    0%, 100% { transform: scaleX(var(--flip, 1)) translateY(0); }
    50% { transform: scaleX(var(--flip, 1)) translateY(-9px); }
  }
  .rs-flip.munch { animation: rs-munch .45s ease-in-out 4; }
  @keyframes rs-munch {
    0%, 100% { transform: scaleX(var(--flip, 1)) scaleY(1); }
    50% { transform: scaleX(var(--flip, 1)) scaleY(.92); }
  }

  .rs-ground-acorn {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    transition: opacity .3s;
  }

  .rs-rainfx { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
  .rs-drop {
    position: absolute;
    top: -30px;
    width: 2px;
    height: 16px;
    border-radius: 2px;
    background: rgba(205, 225, 255, .35);
    animation: rs-dropfall var(--d, .9s) linear forwards;
  }
  @keyframes rs-dropfall { to { transform: translateY(112vh); } }

  .rs-zzz {
    position: absolute;
    top: -14px;
    right: -8px;
    font-family: 'DotGothic16', monospace;
    color: #fff;
    font-size: 15px;
    text-shadow: 1px 1px 0 rgba(0,0,0,.3);
    opacity: 0;
    transition: opacity .5s;
    pointer-events: none;
  }
  .rs-zzz.on { opacity: .9; animation: rs-zfloat 2.4s ease-in-out infinite; }
  @keyframes rs-zfloat { 50% { transform: translateY(-6px); } }

  .rs-heart {
    position: absolute;
    z-index: 7;
    pointer-events: none;
    animation: rs-heartup 1.3s ease-out forwards;
  }
  @keyframes rs-heartup {
    0% { transform: translateY(0) scale(.6); opacity: 0; }
    15% { opacity: 1; }
    100% { transform: translateY(-70px) scale(1.1); opacity: 0; }
  }

  .rs-flyacorn {
    position: fixed;
    z-index: 30;
    pointer-events: none;
    transition: left 1s cubic-bezier(.4, -.2, .6, 1), top 1s cubic-bezier(.4, -.2, .6, 1), transform 1s ease;
  }

  /* ---- speech bubble ---- */
  .rs-bubble {
    position: absolute;
    z-index: 8;
    max-width: 230px;
    background: var(--cream);
    color: var(--ink);
    border: 2px solid var(--ink);
    border-radius: 14px;
    padding: 10px 14px;
    box-shadow: 3px 4px 0 rgba(0, 0, 0, .18);
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 6px);
    transition: opacity .3s ease, transform .3s ease;
  }
  .rs-bubble.on { opacity: 1; pointer-events: auto; transform: translate(-50%, 0); }
  .rs-bubble::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -9px;
    width: 12px;
    height: 12px;
    background: var(--cream);
    border-right: 2px solid var(--ink);
    border-bottom: 2px solid var(--ink);
    transform: translateX(-50%) rotate(45deg);
  }
  .rs-bubble p { margin: 0; font-size: 13px; font-weight: 800; line-height: 1.5; }
  .bb-actions { display: flex; gap: 6px; margin-top: 8px; }
  .bb-actions:empty { display: none; }
  .bb-actions button {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 2px solid var(--ink);
    background: #fff;
    color: var(--ink);
    border-radius: 999px;
    padding: 5px 12px;
    font: inherit;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, .15);
  }
  .bb-actions button:active { transform: translate(1px, 1px); box-shadow: none; }
  .bb-actions button.acc { background: var(--coral); color: #fff; }

  /* ---- HUD ---- */
  .glass {
    background: rgba(32, 26, 38, .55);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, .14);
    color: #fff;
  }

  .rs-hud-tl {
    position: absolute;
    top: calc(12px + env(safe-area-inset-top));
    left: 14px;
    display: flex;
    gap: 8px;
    z-index: 6;
    align-items: center;
  }
  .rs-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 800;
  }
  .rs-chip small { font-weight: 700; opacity: .75; font-size: 11px; }
  .rs-chip.bump { animation: rs-bump .4s ease; }
  @keyframes rs-bump { 40% { transform: scale(1.18); } }
  #acornChip { cursor: pointer; transition: background .15s; }
  #acornChip:hover { background: rgba(60, 50, 70, .7); }

  .rs-acorn-menu { left: 14px; right: auto; width: 260px; }
  .rs-spend { display: flex; flex-direction: column; gap: 6px; }
  .rs-spend button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, .25);
    background: rgba(255, 255, 255, .08);
    color: #fff;
    border-radius: 12px;
    padding: 10px 12px;
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: background .15s;
  }
  .rs-spend button:hover:not(:disabled) { background: rgba(255, 255, 255, .16); }
  .rs-spend button:disabled { opacity: .35; cursor: default; }
  .rs-spend .cost { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: #F2C67C; flex: none; }

  .rs-friend {
    position: absolute;
    bottom: 14.2%;
    z-index: 3;
    transition: left 4s linear;
    pointer-events: none;
  }
  .rs-friend canvas {
    display: block;
    width: 122px;
    height: auto;
    image-rendering: pixelated;
    animation: rs-bob 3.4s ease-in-out infinite;
  }

  .rs-hud-tr {
    position: absolute;
    top: calc(12px + env(safe-area-inset-top));
    right: 14px;
    display: flex;
    gap: 8px;
    z-index: 9;
  }
  .rs-hud-tr button {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, .14);
    background: rgba(32, 26, 38, .55);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    color: #fff;
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .15s;
  }
  .rs-hud-tr button:hover { background: rgba(60, 50, 70, .7); }
  .rs-hud-tr button.on { background: var(--coral); border-color: var(--coral); }

  /* ---- center: clock + timer ---- */
  .rs-center {
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 5;
  }
  .rs-clock {
    font-family: 'DotGothic16', monospace;
    font-size: 60px;
    color: #fff;
    text-shadow: 0 3px 14px rgba(0, 0, 0, .35);
    line-height: 1;
    margin-bottom: 14px;
  }
  .rs-card {
    border-radius: 20px;
    padding: 16px 22px 14px;
    min-width: 250px;
  }
  .rs-state { font-size: 12px; font-weight: 800; letter-spacing: .08em; opacity: .8; }
  .rs-state.focus { color: #FFB59E; opacity: 1; }
  .rs-state.break { color: #A8E6B8; opacity: 1; }
  .rs-remain {
    font-family: 'DotGothic16', monospace;
    font-size: 46px;
    line-height: 1.15;
  }
  .rs-controls { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 6px; }
  .rs-controls button {
    border: 1px solid rgba(255, 255, 255, .25);
    background: rgba(255, 255, 255, .1);
    color: #fff;
    border-radius: 999px;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
    transition: background .15s, transform .1s;
  }
  .rs-controls button:hover { background: rgba(255, 255, 255, .2); }
  .rs-controls button:active { transform: scale(.96); }
  .rs-controls .adj { width: 42px; height: 36px; font-size: 12px; }
  .rs-controls .main {
    padding: 10px 26px;
    font-size: 15px;
    background: var(--coral);
    border-color: var(--coral);
    box-shadow: 0 4px 14px rgba(241, 116, 92, .45);
  }
  .rs-controls .main:hover { background: #E05A40; }
  .rs-mini {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    gap: 12px;
    font-size: 11px;
    font-weight: 700;
    opacity: .75;
  }
  .rs-mini button {
    border: none;
    background: none;
    color: #fff;
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline dotted;
    opacity: .9;
  }
  .rs-today { margin-top: 10px; font-size: 11px; font-weight: 700; color: rgba(255,255,255,.75); }

  /* ---- panels ---- */
  .rs-panel {
    position: absolute;
    top: calc(64px + env(safe-area-inset-top));
    right: 14px;
    width: 280px;
    max-height: calc(100% - 150px);
    overflow-y: auto;
    border-radius: 18px;
    padding: 14px;
    z-index: 10;
    display: none;
  }
  .rs-panel.open { display: block; }
  .rs-panel h3 {
    margin: 0 0 10px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .05em;
  }
  .rs-panel h3 i { margin-right: 6px; }
  .rs-panel .sec { margin-bottom: 14px; }

  .rs-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .rs-chips button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid rgba(255, 255, 255, .25);
    background: rgba(255, 255, 255, .08);
    color: rgba(255, 255, 255, .85);
    border-radius: 999px;
    padding: 7px 13px;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background .15s, border-color .15s;
  }
  .rs-chips button.on { background: var(--coral); border-color: var(--coral); color: #fff; }

  .rs-vol { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
  .rs-vol i { font-size: 13px; opacity: .8; }
  .rs-vol input[type="range"] { flex: 1; accent-color: var(--coral); }

  .rs-todo-add { display: flex; gap: 6px; margin-bottom: 8px; }
  .rs-todo-add input {
    flex: 1;
    min-width: 0;
    height: 38px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, .25);
    background: rgba(255, 255, 255, .1);
    color: #fff;
    padding: 0 10px;
    font: inherit;
    font-size: 16px;
    font-weight: 700;
    -webkit-user-select: text;
    user-select: text;
  }
  .rs-todo-add input::placeholder { color: rgba(255,255,255,.4); }
  .rs-todo-add input:focus { outline: none; border-color: var(--coral); }
  .rs-todo-add button {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: none;
    background: var(--coral);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .rs-todo-list { list-style: none; margin: 0; padding: 0; }
  .rs-todo-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 2px;
    border-bottom: 1px dashed rgba(255, 255, 255, .15);
    font-size: 13px;
    font-weight: 700;
  }
  .rs-todo-list input[type="checkbox"] {
    width: 17px;
    height: 17px;
    accent-color: var(--coral);
    flex: none;
  }
  .rs-todo-list .t { flex: 1; min-width: 0; overflow-wrap: anywhere; }
  .rs-todo-list li.done .t { text-decoration: line-through; opacity: .5; }
  .rs-todo-list .del {
    flex: none;
    border: none;
    background: none;
    color: rgba(255, 255, 255, .45);
    font-size: 15px;
    cursor: pointer;
    padding: 2px 4px;
  }
  .rs-todo-list .del:hover { color: var(--coral); }
  .rs-todo-empty { font-size: 12px; opacity: .55; margin: 4px 0 0; font-weight: 700; }

  .rs-memo {
    width: 100%;
    min-height: 90px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, .25);
    background: rgba(255, 255, 255, .1);
    color: #fff;
    padding: 8px 10px;
    font: inherit;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.6;
    resize: vertical;
    -webkit-user-select: text;
    user-select: text;
  }
  .rs-memo::placeholder { color: rgba(255,255,255,.4); }
  .rs-memo:focus { outline: none; border-color: var(--coral); }

  /* ---- zen mode（とけい・タイマーをかくして リスだけ みる） ---- */
  .rs-center { transition: opacity .6s ease; }
  .risuta.zen .rs-center { opacity: 0; pointer-events: none; }
  .rs-zen-timer {
    position: absolute;
    top: calc(16px + env(safe-area-inset-top));
    left: 50%;
    transform: translateX(-50%);
    border-radius: 999px;
    padding: 6px 16px;
    font-family: 'DotGothic16', monospace;
    font-size: 16px;
    z-index: 5;
    opacity: 0;
    pointer-events: none;
    transition: opacity .6s ease;
  }
  .risuta.zen .rs-zen-timer.show { opacity: .7; }

  /* ---- footer ---- */
  .rs-foot {
    position: absolute;
    bottom: calc(8px + env(safe-area-inset-bottom));
    left: 0;
    right: 0;
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, .5);
    z-index: 4;
  }
  .rs-foot a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1.5px dotted rgba(255, 255, 255, .4);
  }
  .rs-foot a:hover { color: var(--coral); border-color: var(--coral); }
  .rs-foot .fa-heart { color: var(--coral); font-size: 10px; }

  @media (max-width: 640px) {
    .rs-clock { font-size: 44px; margin-bottom: 10px; }
    .rs-remain { font-size: 38px; }
    .rs-card { min-width: 220px; padding: 12px 16px 12px; }
    .rs-center { top: 38%; width: calc(100% - 28px); }
    .rs-panel { left: 14px; right: 14px; width: auto; }
    .rs-sq canvas { width: 108px; }
  }
---
{% raw %}
<div class="risuta" id="rsApp">
  <div class="rs-sky" id="sky1"></div>
  <div class="rs-sky" id="sky2"></div>
  <div id="stars"></div>
  <div class="rs-moon"></div>
  <svg class="rs-mountains" viewBox="0 0 220 60" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <polygon points="-8,60 20,26 46,60" fill="#AFC4D6"/>
    <polygon points="20,26 14.24,33 16.5,31.2 18.5,33.2 20.5,31.4 22.5,33.2 24,31.5 25.35,33" fill="#EDF4FA"/>
    <polygon points="184,60 212,30 236,60" fill="#A9BFD2"/>
    <polygon points="212,30 206.4,36 208.2,34.6 210,36.2 212,34.8 214,36.2 215.5,34.7 216.8,36" fill="#EDF4FA"/>
    <polygon points="26,60 52,8 74,60" fill="#C6D7E7"/>
    <polygon points="52,8 47.5,17 49,15 50.5,17.4 52,15.4 53.5,17.4 54.8,15.6 55.81,17" fill="#F5F9FC"/>
    <polygon points="142,60 168,18 192,60" fill="#BCCFE0"/>
    <polygon points="168,18 163.05,26 164.8,24 166.5,26.4 168,24.4 169.7,26.4 171.2,24.2 172.57,26" fill="#F2F7FB"/>
    <polygon points="78,60 100,14 108,22 122,6 148,60" fill="#D8E5F1"/>
    <polygon points="100,14 97.13,20 98.3,18.6 99.6,20.3 101,18.8 102.8,20.3 104.4,18.9 106,20" fill="#FBFDFF"/>
    <polygon points="122,6 115,14 117,12.2 119,14.4 121,12.4 123,14.4 124.6,12.5 125.85,14" fill="#FBFDFF"/>
  </svg>
  <div class="rs-hill h1"></div>
  <div class="rs-hill h2"></div>
  <div class="rs-hill h3"></div>
  <svg class="rs-trees" viewBox="0 0 480 40" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <g id="rpine">
        <rect x="-1" y="26" width="2" height="5" fill="#3A2B22"/>
        <polygon points="-7,27 0,15 7,27"/>
        <polygon points="-5.5,20 0,10 5.5,20"/>
        <polygon points="-4,14 0,6 4,14"/>
      </g>
      <g id="rtree">
        <rect x="-1" y="24" width="2" height="7" fill="#3A2B22"/>
        <circle cx="0" cy="18" r="7"/>
        <circle cx="-4.5" cy="21" r="4.5"/>
        <circle cx="4.5" cy="21" r="4.5"/>
      </g>
    </defs>
    <g fill="#566A5C">
    <use href="#rpine" transform="translate(13.6 21.5) scale(0.4)"/>
    <use href="#rpine" transform="translate(30.5 19.64) scale(0.46)"/>
    <use href="#rpine" transform="translate(49.4 20.88) scale(0.42)"/>
    <use href="#rtree" transform="translate(61.7 19.02) scale(0.48)"/>
    <use href="#rpine" transform="translate(78.1 20.26) scale(0.44)"/>
    <use href="#rpine" transform="translate(94.7 21.5) scale(0.4)"/>
    <use href="#rpine" transform="translate(107.5 19.64) scale(0.46)"/>
    <use href="#rtree" transform="translate(126.1 20.88) scale(0.42)"/>
    <use href="#rpine" transform="translate(143.0 19.02) scale(0.48)"/>
    <use href="#rpine" transform="translate(160.3 20.26) scale(0.44)"/>
    <use href="#rpine" transform="translate(170.8 21.5) scale(0.4)"/>
    <use href="#rtree" transform="translate(188.4 19.64) scale(0.46)"/>
    <use href="#rpine" transform="translate(202.7 20.88) scale(0.42)"/>
    <use href="#rpine" transform="translate(224.5 19.02) scale(0.48)"/>
    <use href="#rpine" transform="translate(239.5 20.26) scale(0.44)"/>
    <use href="#rtree" transform="translate(250.3 21.5) scale(0.4)"/>
    <use href="#rpine" transform="translate(273.9 19.64) scale(0.46)"/>
    <use href="#rpine" transform="translate(289.7 20.88) scale(0.42)"/>
    <use href="#rpine" transform="translate(303.2 19.02) scale(0.48)"/>
    <use href="#rtree" transform="translate(318.9 20.26) scale(0.44)"/>
    <use href="#rpine" transform="translate(331.3 21.5) scale(0.4)"/>
    <use href="#rpine" transform="translate(346.1 19.64) scale(0.46)"/>
    <use href="#rpine" transform="translate(366.2 20.88) scale(0.42)"/>
    <use href="#rtree" transform="translate(378.5 19.02) scale(0.48)"/>
    <use href="#rpine" transform="translate(395.5 20.26) scale(0.44)"/>
    <use href="#rpine" transform="translate(411.9 21.5) scale(0.4)"/>
    <use href="#rpine" transform="translate(426.2 19.64) scale(0.46)"/>
    <use href="#rtree" transform="translate(445.7 20.88) scale(0.42)"/>
    <use href="#rpine" transform="translate(461.5 19.02) scale(0.48)"/>
    </g>
    <rect x="-5" y="33.7" width="490" height="6.5" fill="#47594D"/>
    <g fill="#33453A">
    <use href="#rpine" transform="translate(23.4 16.36) scale(0.64)"/>
    <use href="#rpine" transform="translate(40.2 12.64) scale(0.76)"/>
    <use href="#rpine" transform="translate(61.4 15.12) scale(0.68)"/>
    <use href="#rtree" transform="translate(80.0 11.4) scale(0.8)"/>
    <use href="#rpine" transform="translate(101.6 13.88) scale(0.72)"/>
    <use href="#rpine" transform="translate(119.6 16.36) scale(0.64)"/>
    <use href="#rpine" transform="translate(137.8 12.64) scale(0.76)"/>
    <use href="#rtree" transform="translate(165.0 15.12) scale(0.68)"/>
    <use href="#rpine" transform="translate(185.0 11.4) scale(0.8)"/>
    <use href="#rpine" transform="translate(203.4 13.88) scale(0.72)"/>
    <use href="#rpine" transform="translate(222.1 16.36) scale(0.64)"/>
    <use href="#rtree" transform="translate(238.2 12.64) scale(0.76)"/>
    <use href="#rpine" transform="translate(257.3 15.12) scale(0.68)"/>
    <use href="#rpine" transform="translate(277.9 11.4) scale(0.8)"/>
    <use href="#rpine" transform="translate(295.7 13.88) scale(0.72)"/>
    <use href="#rtree" transform="translate(322.7 16.36) scale(0.64)"/>
    <use href="#rpine" transform="translate(339.0 12.64) scale(0.76)"/>
    <use href="#rpine" transform="translate(363.5 15.12) scale(0.68)"/>
    <use href="#rpine" transform="translate(378.9 11.4) scale(0.8)"/>
    <use href="#rtree" transform="translate(404.6 13.88) scale(0.72)"/>
    <use href="#rpine" transform="translate(423.5 16.36) scale(0.64)"/>
    <use href="#rpine" transform="translate(435.0 12.64) scale(0.76)"/>
    <use href="#rpine" transform="translate(457.1 15.12) scale(0.68)"/>
    </g>
    <rect x="-5" y="36" width="490" height="4.5" fill="#2E3F33"/>
    <use href="#rpine" transform="translate(20.9 8.74) scale(0.96)" fill="#1C2620"/>
    <use href="#rpine" transform="translate(41.6 1.3) scale(1.2)" fill="#24322A"/>
    <use href="#rpine" transform="translate(73.8 6.26) scale(1.04)" fill="#1C2620"/>
    <use href="#rtree" transform="translate(92.8 -1.18) scale(1.28)" fill="#24322A"/>
    <use href="#rpine" transform="translate(114.9 3.78) scale(1.12)" fill="#1C2620"/>
    <use href="#rpine" transform="translate(147.6 8.74) scale(0.96)" fill="#24322A"/>
    <use href="#rpine" transform="translate(175.3 1.3) scale(1.2)" fill="#1C2620"/>
    <use href="#rtree" transform="translate(195.2 6.26) scale(1.04)" fill="#24322A"/>
    <use href="#rpine" transform="translate(219.0 -1.18) scale(1.28)" fill="#1C2620"/>
    <use href="#rpine" transform="translate(248.0 3.78) scale(1.12)" fill="#24322A"/>
    <use href="#rpine" transform="translate(281.6 8.74) scale(0.96)" fill="#1C2620"/>
    <use href="#rtree" transform="translate(305.1 1.3) scale(1.2)" fill="#24322A"/>
    <use href="#rpine" transform="translate(323.4 6.26) scale(1.04)" fill="#1C2620"/>
    <use href="#rpine" transform="translate(351.0 -1.18) scale(1.28)" fill="#24322A"/>
    <use href="#rpine" transform="translate(375.2 3.78) scale(1.12)" fill="#1C2620"/>
    <use href="#rtree" transform="translate(400.7 8.74) scale(0.96)" fill="#24322A"/>
    <use href="#rpine" transform="translate(435.6 1.3) scale(1.2)" fill="#1C2620"/>
    <use href="#rpine" transform="translate(454.1 6.26) scale(1.04)" fill="#24322A"/>
  </svg>
  <div class="rs-ground"></div>
  <div class="rs-fg" aria-hidden="true">
    <svg class="fg t-nl" viewBox="-8 4 16 28"><g fill="#1B2721"><rect x="-1" y="26" width="2" height="5" fill="#3A2B22"/><polygon points="-7,27 0,15 7,27"/><polygon points="-5.5,20 0,10 5.5,20"/><polygon points="-4,14 0,6 4,14"/></g></svg>
    <svg class="fg t-nr" viewBox="-10 8 20 24"><g fill="#1B2721"><rect x="-1" y="24" width="2" height="7" fill="#3A2B22"/><circle cx="0" cy="18" r="7"/><circle cx="-4.5" cy="21" r="4.5"/><circle cx="4.5" cy="21" r="4.5"/></g></svg>
    <svg class="fg t-fl" viewBox="-8 4 16 28"><g fill="#131C16"><rect x="-1" y="26" width="2" height="5" fill="#3A2B22"/><polygon points="-7,27 0,15 7,27"/><polygon points="-5.5,20 0,10 5.5,20"/><polygon points="-4,14 0,6 4,14"/></g></svg>
    <svg class="fg t-fr" viewBox="-8 4 16 28"><g fill="#16211A"><rect x="-1" y="26" width="2" height="5" fill="#3A2B22"/><polygon points="-7,27 0,15 7,27"/><polygon points="-5.5,20 0,10 5.5,20"/><polygon points="-4,14 0,6 4,14"/></g></svg>
  </div>
  <div class="rs-branch"></div>
  <div class="rs-campfire" id="campfire">
    <div class="rs-fireglow"></div>
    <svg viewBox="0 0 14 12" width="58" height="50" shape-rendering="crispEdges" aria-hidden="true">
      <g class="fa">
        <rect x="5" y="3" width="4" height="6" fill="#F28C4A"/>
        <rect x="4" y="5" width="6" height="4" fill="#F28C4A"/>
        <rect x="6" y="1" width="2" height="2" fill="#F28C4A"/>
        <rect x="6" y="5" width="2" height="3" fill="#FFD25C"/>
      </g>
      <g class="fb">
        <rect x="5" y="4" width="4" height="5" fill="#F28C4A"/>
        <rect x="4" y="6" width="6" height="3" fill="#F28C4A"/>
        <rect x="7" y="2" width="2" height="2" fill="#F28C4A"/>
        <rect x="5" y="6" width="2" height="2" fill="#FFD25C"/>
      </g>
      <rect x="2" y="9" width="10" height="1.5" fill="#6B4A32"/>
      <rect x="3" y="10.5" width="8" height="1.5" fill="#57402F"/>
    </svg>
  </div>
  <div id="leaves"></div>

  <div class="rs-rainfx" id="rainfx"></div>

  <div class="rs-sq" id="sq">
    <div class="rs-flip" id="sqFlip">
      <canvas id="sqCanvas" width="30" height="28"></canvas>
      <div class="rs-zzz" id="zzz">Z z z</div>
    </div>
  </div>
  <div class="rs-bubble" id="bubble">
    <p id="bubbleText"></p>
    <div class="bb-actions" id="bubbleActions"></div>
  </div>

  <div class="rs-hud-tl">
    <div class="rs-chip glass" id="acornChip">
      <svg id="acornIcon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="15" rx="6.5" ry="7.5" fill="#CD9452"/><path d="M4 9 Q12 4 20 9 L19 12 Q12 7 5 12 Z" fill="#7A4A32"/><rect x="11" y="3" width="2.4" height="4" rx="1.2" fill="#7A4A32"/></svg>
      <span id="acornCount">0</span>
    </div>
    <div class="rs-chip glass" id="streakChip" style="display:none;"><i class="fas fa-fire" style="color:#F2B33D;font-size:12px;"></i><span id="streakDays"></span></div>
  </div>

  <div class="rs-zen-timer glass" id="zenTimer">25:00</div>

  <div class="rs-hud-tr">
    <button type="button" id="btnZen" title="とけい・タイマーの表示" aria-label="とけいとタイマーの表示を切り替え"><i class="fas fa-clock"></i></button>
    <button type="button" id="btnSound" title="おと" aria-label="おとの設定"><i class="fas fa-music"></i></button>
    <button type="button" id="btnTodo" title="やること・メモ" aria-label="やることとメモ"><i class="fas fa-list-check"></i></button>
    <button type="button" id="btnFull" title="フルスクリーン" aria-label="フルスクリーン"><i class="fas fa-expand"></i></button>
  </div>

  <div class="rs-center">
    <div class="rs-clock" id="clock">--:--</div>
    <div class="rs-card glass">
      <div class="rs-state" id="stateLabel">きょうも こつこつ</div>
      <div class="rs-remain" id="remain">25:00</div>
      <div class="rs-controls">
        <button type="button" class="adj" id="btnMinus">-5</button>
        <button type="button" class="main" id="btnStart"><i class="fas fa-play"></i> スタート</button>
        <button type="button" class="adj" id="btnPlus">+5</button>
      </div>
      <div class="rs-mini">
        <button type="button" id="btnBreakLen">きゅうけい 5ふん</button>
        <button type="button" id="btnSkip" style="display:none;">スキップ</button>
      </div>
      <div class="rs-today" id="todayLine"></div>
    </div>
  </div>

  <div class="rs-panel glass" id="soundPanel">
    <div class="sec">
      <h3><i class="fas fa-record-vinyl"></i>ローファイBGM</h3>
      <div class="rs-chips" id="bgmChips">
        <button type="button" data-bgm="sitori"><i class="fas fa-mug-hot"></i> しっとり</button>
        <button type="button" data-bgm="akarui"><i class="fas fa-sun"></i> あかるい</button>
        <button type="button" data-bgm="yuttari"><i class="fas fa-moon"></i> ゆったり</button>
      </div>
    </div>
    <div class="sec">
      <h3><i class="fas fa-tree"></i>かんきょうおん</h3>
      <div class="rs-chips">
        <button type="button" id="chipRain"><i class="fas fa-cloud-rain"></i> あめ</button>
        <button type="button" id="chipFire"><i class="fas fa-fire"></i> たきび</button>
        <button type="button" id="chipForest"><i class="fas fa-dove"></i> もり</button>
      </div>
    </div>
    <div class="sec">
      <h3><i class="fas fa-cloud-sun"></i>そらの いろ</h3>
      <div class="rs-chips" id="skyChips">
        <button type="button" data-sky="auto">おまかせ</button>
        <button type="button" data-sky="dawn">あさやけ</button>
        <button type="button" data-sky="day">ひる</button>
        <button type="button" data-sky="dusk">ゆうぐれ</button>
        <button type="button" data-sky="night">よる</button>
      </div>
    </div>
    <div class="sec">
      <h3><i class="fas fa-mountain-sun"></i>はいけい</h3>
      <div class="rs-chips" id="themeChips">
        <button type="button" data-theme="sougen">そうげん</button>
        <button type="button" data-theme="mori">もり</button>
        <button type="button" data-theme="yuki">ゆきやま</button>
        <button type="button" data-theme="umi">うみ</button>
      </div>
    </div>
    <div class="sec">
      <div class="rs-vol">
        <i class="fas fa-volume-low"></i>
        <input type="range" id="vol" min="0" max="100" step="1" value="60">
        <i class="fas fa-volume-high"></i>
      </div>
    </div>
  </div>

  <div class="rs-panel glass" id="todoPanel">
    <div class="sec">
      <h3><i class="fas fa-list-check"></i>きょう やること</h3>
      <div class="rs-todo-add">
        <input type="text" id="todoInput" maxlength="60" placeholder="やることを追加">
        <button type="button" id="todoAdd" aria-label="追加"><i class="fas fa-plus"></i></button>
      </div>
      <ul class="rs-todo-list" id="todoList"></ul>
      <p class="rs-todo-empty" id="todoEmpty">きょうのやることは まだありません</p>
    </div>
    <div class="sec">
      <h3><i class="fas fa-pen"></i>メモ</h3>
      <textarea class="rs-memo" id="memo" placeholder="ちょっとしたメモ（自動保存）"></textarea>
    </div>
  </div>

  <div class="rs-panel rs-acorn-menu glass" id="acornMenu">
    <h3><svg width="14" height="14" viewBox="0 0 24 24" style="vertical-align:-2px;margin-right:6px;" aria-hidden="true"><ellipse cx="12" cy="15" rx="6.5" ry="7.5" fill="#CD9452"/><path d="M4 9 Q12 4 20 9 L19 12 Q12 7 5 12 Z" fill="#7A4A32"/><rect x="11" y="3" width="2.4" height="4" rx="1.2" fill="#7A4A32"/></svg>どんぐりを つかう</h3>
    <div class="rs-spend">
      <button type="button" data-cost="1"><span>おやつを あげる</span><span class="cost">×1</span></button>
      <button type="button" data-cost="3"><span>いっしょに あそぶ</span><span class="cost">×3</span></button>
      <button type="button" data-cost="10"><span>どんぐりシャワー</span><span class="cost">×10</span></button>
      <button type="button" data-cost="30"><span>ともだちを よぶ</span><span class="cost">×30</span></button>
    </div>
  </div>

  <footer class="rs-foot">made with <i class="fa-solid fa-heart"></i> by <a href="/apps/">naoqoo2</a></footer>
</div>
<script>
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var app = $('rsApp');

  /* ---------- state ---------- */
  var KEY = 'risuta-v1';
  var S = {
    acorns: 0, days: {}, todos: [], todosDate: '', memo: '',
    focusMin: 25, breakMin: 5, vol: 60,
    snd: { rain: false, fire: false, forest: false },
    bgm: '', skyMode: 'auto', theme: 'sougen',
    timer: null
  };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) for (var k in S) if (saved[k] !== undefined) S[k] = saved[k];
  } catch (e) {}
  if (S.snd && S.snd.bgm) { S.bgm = S.bgm || 'sitori'; delete S.snd.bgm; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function todayKey() {
    var n = new Date();
    return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
  }
  function dateKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  if (S.todosDate !== todayKey()) { S.todos = []; S.todosDate = todayKey(); }

  /* ---------- squirrel sprite ---------- */
  var PAL = { b: '#C48A60', B: '#D6A076', t: '#9B603E', T: '#D89664', c: '#F5E2C4', e: '#2B1E16', w: '#FFFFFF', p: '#EB9B96', n: '#CD9452', k: '#7A4A32', o: '#4A3228' };
  var BASE = [
    '............o.................',
    '....ooo....obo.....ooo........',
    '...obbboooobbbo...ottto.......',
    '...obbbobbbbbbo..ottttto......',
    '...obpbbbbbbpbo.otttttttoo....',
    '...obbbbbbbbbbo.ottTTTtttto...',
    '...obbbbbbbbbbboottTTTttttto..',
    '...obbbbbbbbbbboottTTTTTtttto.',
    '..obbbbbbbbbbbbbootttTTTTttto.',
    '..obbbbbbbbbbbbbo.ottTTTTttto.',
    '..obbbbbbbbbbbbbo.ottTTTTttto.',
    '.oppbbbceccbbbppo.otttTTtttto.',
    '..oobbbccccbbbbo...ottTTTtttto',
    '....obbcoccbbboo...otTTTTTttto',
    '.....obbccbbbbbbo..otTTTTTttto',
    '.....obbbbkkbbbbbo.otTTTTTttto',
    '....obbbkkkkkkbbbbotttTTTtttto',
    '....obbbckkkkccbbbottttttttto.',
    '...obbbBccnnccBbbbbtttttttto..',
    '...obbbccnnnncccbbbtttttttto..',
    '...obbbccnnnncccbbbtttttttto..',
    '....obbcccnnccccbbottttttto...',
    '....obbbcccccccbbbottttttto...',
    '.....obbcccccccbbo.ootttoo....',
    '......obbbcccbbbo....ooo......',
    '.....oBBBBbbBBBBo.............',
    '......oooooooooo..............',
    '..............................'
  ];
  var EYES = {
    open: [[5, 9, 'e'], [6, 9, 'w'], [5, 10, 'e'], [6, 10, 'e'], [5, 11, 'e'], [6, 11, 'e'], [11, 9, 'w'], [12, 9, 'e'], [11, 10, 'e'], [12, 10, 'e'], [11, 11, 'e'], [12, 11, 'e']],
    closed: [[5, 11, 'e'], [6, 11, 'e'], [11, 11, 'e'], [12, 11, 'e']]
  };
  var sq = $('sq');
  var sqCtx = $('sqCanvas').getContext('2d');
  var eyeState = 'open';
  var eyesLocked = false;
  var napping = false;

  function drawInto(c2, pal, eye) {
    c2.clearRect(0, 0, 30, 28);
    for (var y = 0; y < BASE.length; y++) {
      var row = BASE[y];
      for (var x = 0; x < row.length; x++) {
        var ch = row[x];
        if (ch === '.') continue;
        c2.fillStyle = pal[ch];
        c2.fillRect(x, y, 1, 1);
      }
    }
    EYES[eye].forEach(function (p) {
      c2.fillStyle = pal[p[2]];
      c2.fillRect(p[0], p[1], 1, 1);
    });
  }
  function drawSq() { drawInto(sqCtx, PAL, eyeState); }
  function setEyes(s) { if (eyeState !== s) { eyeState = s; drawSq(); } }
  drawSq();

  (function blinkLoop() {
    setTimeout(function () {
      if (!eyesLocked && !napping) {
        setEyes('closed');
        setTimeout(function () { if (!eyesLocked && !napping) setEyes('open'); }, 140);
      }
      blinkLoop();
    }, 2500 + Math.random() * 4200);
  })();

  /* ---------- sky ---------- */
  var skyEls = [$('sky1'), $('sky2')];
  var skyActive = 0;
  var lastSky = '';
  var SKY_PRESETS = {
    dawn: { c: ['#4A4A78', '#B8789A', '#F0B08C'], st: 0.3 },
    day: { c: ['#8EC5E0', '#BFDDE0', '#F2E4C2'], st: 0 },
    dusk: { c: ['#453A64', '#C96A4A', '#F5A85A'], st: 0.3 },
    night: { c: ['#232042', '#3A3160', '#6E5080'], st: 1 }
  };
  function skyColors(h) {
    if (h >= 5 && h < 8) return SKY_PRESETS.dawn;
    if (h >= 8 && h < 16) return SKY_PRESETS.day;
    if (h >= 16 && h < 19) return SKY_PRESETS.dusk;
    return SKY_PRESETS.night;
  }
  function applySky() {
    var sc = S.skyMode !== 'auto' && SKY_PRESETS[S.skyMode] ? SKY_PRESETS[S.skyMode] : skyColors(new Date().getHours());
    var sig = sc.c.join();
    if (sig === lastSky) return;
    lastSky = sig;
    var next = skyEls[1 - skyActive];
    next.style.setProperty('--s1', sc.c[0]);
    next.style.setProperty('--s2', sc.c[1]);
    next.style.setProperty('--s3', sc.c[2]);
    next.style.opacity = 1;
    skyEls[skyActive].style.opacity = 0;
    skyActive = 1 - skyActive;
    app.style.setProperty('--stars', sc.st);
  }
  (function makeStars() {
    var holder = $('stars');
    for (var i = 0; i < 36; i++) {
      var st = document.createElement('div');
      st.className = 'rs-star';
      st.style.left = (Math.random() * 100) + '%';
      st.style.top = (Math.random() * 55) + '%';
      st.style.animationDelay = (Math.random() * 3.5) + 's';
      holder.appendChild(st);
    }
  })();
  applySky();
  setInterval(applySky, 60000);

  /* ---------- theme & particles ---------- */
  function setTheme() {
    if (['sougen', 'mori', 'yuki', 'umi'].indexOf(S.theme) < 0) S.theme = 'sougen';
    app.classList.remove('th-mori', 'th-yuki', 'th-umi');
    if (S.theme !== 'sougen') app.classList.add('th-' + S.theme);
  }
  function spawnParticle() {
    var el = document.createElement('div');
    if (S.theme === 'yuki') {
      el.className = 'rs-snowp';
      el.style.setProperty('--d', (8 + Math.random() * 7) + 's');
      el.style.setProperty('--drift', (Math.random() * 90 - 45) + 'px');
    } else if (S.theme === 'umi') {
      el.className = 'rs-bub';
      el.style.setProperty('--d', (7 + Math.random() * 6) + 's');
      el.style.setProperty('--drift', (Math.random() * 70 - 35) + 'px');
    } else {
      el.className = 'rs-leaf';
      var col = Math.random() < 0.55 ? ['#8FB56A', '#6E9350'] : ['#E0A05C', '#C07E42'];
      el.innerHTML = '<svg width="13" height="11" viewBox="0 0 6 5" shape-rendering="crispEdges"><rect x="1" y="0" width="3" height="1" fill="' + col[0] + '"/><rect x="0" y="1" width="5" height="1" fill="' + col[0] + '"/><rect x="1" y="2" width="4" height="1" fill="' + col[1] + '"/><rect x="2" y="3" width="2" height="1" fill="' + col[1] + '"/><rect x="5" y="1" width="1" height="2" fill="' + col[1] + '"/></svg>';
      el.style.setProperty('--d', (9 + Math.random() * 9) + 's');
      el.style.setProperty('--drift', (Math.random() * 140 - 70) + 'px');
    }
    el.style.left = (Math.random() * 100) + '%';
    $('leaves').appendChild(el);
    setTimeout(function () { el.remove(); }, 21000);
  }
  setInterval(spawnParticle, 3600);
  spawnParticle();

  /* ---------- clock ---------- */
  function tickClock() {
    var n = new Date();
    $('clock').textContent = String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0');
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ---------- sound ---------- */
  var Snd = {
    ctx: null, master: null, live: {},
    ensure: function () {
      if (!this.ctx) {
        var C = window.AudioContext || window.webkitAudioContext;
        if (!C) return false;
        try { this.ctx = new C(); } catch (e) { return false; }
        this.master = this.ctx.createGain();
        this.master.gain.value = S.vol / 100;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(function () {});
      return true;
    },
    setVol: function (v) { if (this.master) this.master.gain.value = v / 100; },
    buf: {},
    noise: function (type) {
      if (this.buf[type]) return this.buf[type];
      var len = this.ctx.sampleRate * 2;
      var b = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      var d = b.getChannelData(0);
      var last = 0;
      for (var i = 0; i < len; i++) {
        if (type === 'white') d[i] = Math.random() * 2 - 1;
        else if (type === 'brown') { last = (last + (Math.random() * 2 - 1) * 0.04) / 1.02; d[i] = last * 6; }
        else if (type === 'sparse') d[i] = Math.random() < 0.0015 ? (Math.random() * 2 - 1) : 0;
      }
      this.buf[type] = b;
      return b;
    },
    loopNoise: function (type, filterType, freq, gainVal) {
      var src = this.ctx.createBufferSource();
      src.buffer = this.noise(type);
      src.loop = true;
      var f = this.ctx.createBiquadFilter();
      f.type = filterType;
      f.frequency.value = freq;
      var g = this.ctx.createGain();
      g.gain.value = gainVal;
      src.connect(f); f.connect(g); g.connect(this.master);
      src.start();
      return { src: src, nodes: [src, f, g], gain: g, filter: f };
    },
    startRain: function () {
      var n = this.loopNoise('white', 'lowpass', 3800, 0.05);
      return { nodes: n.nodes, ints: [] };
    },
    startFire: function () {
      var base = this.loopNoise('brown', 'lowpass', 700, 0.08);
      var self = this;
      var iv = setInterval(function () {
        var t = self.ctx.currentTime;
        var src = self.ctx.createBufferSource();
        src.buffer = self.noise('white');
        src.loop = false;
        var f = self.ctx.createBiquadFilter();
        f.type = 'bandpass'; f.frequency.value = 1600 + Math.random() * 1200; f.Q.value = 2;
        var g = self.ctx.createGain();
        g.gain.setValueAtTime(0.022 + Math.random() * 0.028, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        src.connect(f); f.connect(g); g.connect(self.master);
        src.start(t, Math.random() * 1.5, 0.06);
      }, 140 + Math.random() * 300);
      return { nodes: base.nodes, ints: [iv] };
    },
    startForest: function () {
      var wind = this.loopNoise('white', 'bandpass', 420, 0.05);
      wind.filter.Q.value = 0.6;
      var lfo = this.ctx.createOscillator();
      var lfoG = this.ctx.createGain();
      lfo.frequency.value = 0.08;
      lfoG.gain.value = 0.028;
      lfo.connect(lfoG); lfoG.connect(wind.gain.gain);
      lfo.start();
      var self = this;
      var iv = setInterval(function () {
        if (Math.random() < 0.55) return;
        var t0 = self.ctx.currentTime + Math.random() * 2;
        var notes = 2 + Math.floor(Math.random() * 3);
        for (var i = 0; i < notes; i++) {
          var t = t0 + i * (0.12 + Math.random() * 0.08);
          var o = self.ctx.createOscillator();
          var g = self.ctx.createGain();
          o.type = 'sine';
          var f0 = 2200 + Math.random() * 1400;
          o.frequency.setValueAtTime(f0, t);
          o.frequency.exponentialRampToValueAtTime(f0 * (0.7 + Math.random() * 0.2), t + 0.09);
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(0.035, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
          o.connect(g); g.connect(self.master);
          o.start(t); o.stop(t + 0.13);
        }
      }, 5000);
      return { nodes: wind.nodes.concat([lfo, lfoG]), ints: [iv] };
    },
    bgmConf: {
      sitori: {
        lp: 950, wave: 'triangle', gain: 0.038, len: 3.8, melodyChance: 0.6, melGain: 0.05,
        chords: [[174.61, 220, 261.63, 329.63], [220, 261.63, 329.63, 392], [146.83, 220, 261.63, 349.23], [130.81, 196, 261.63, 329.63]],
        melody: [523.25, 587.33, 659.26, 783.99, 880]
      },
      akarui: {
        lp: 1500, wave: 'triangle', gain: 0.032, len: 2.4, melodyChance: 0.9, melGain: 0.055,
        chords: [[130.81, 164.81, 196, 261.63], [196, 246.94, 293.66, 392], [220, 261.63, 329.63, 440], [174.61, 220, 261.63, 349.23]],
        melody: [523.25, 587.33, 659.26, 698.46, 783.99, 1046.5]
      },
      yuttari: {
        lp: 600, wave: 'sine', gain: 0.055, len: 7, melodyChance: 0.25, melGain: 0.035,
        chords: [[130.81, 196, 261.63], [146.83, 220, 293.66], [123.47, 185, 246.94], [110, 164.81, 220]],
        melody: [392, 440, 523.25]
      }
    },
    startBgm: function (style) {
      var self = this;
      var cf = this.bgmConf[style] || this.bgmConf.sitori;
      var lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = cf.lp;
      lp.connect(this.master);
      var crackle = this.loopNoise('sparse', 'highpass', 2800, 0.05);
      var step = 0;
      function playChord() {
        var t = self.ctx.currentTime + 0.05;
        var L = cf.len;
        cf.chords[step % cf.chords.length].forEach(function (freq) {
          var o = self.ctx.createOscillator();
          var g = self.ctx.createGain();
          o.type = cf.wave;
          o.frequency.value = freq;
          o.detune.value = (Math.random() * 8 - 4);
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(cf.gain, t + L * 0.18);
          g.gain.setValueAtTime(cf.gain, t + L * 0.68);
          g.gain.exponentialRampToValueAtTime(0.0001, t + L);
          o.connect(g); g.connect(lp);
          o.start(t); o.stop(t + L + 0.2);
        });
        if (Math.random() < cf.melodyChance) {
          var mt = t + L * 0.15 + Math.random() * L * 0.5;
          var mo = self.ctx.createOscillator();
          var mg = self.ctx.createGain();
          mo.type = 'sine';
          mo.frequency.value = cf.melody[Math.floor(Math.random() * cf.melody.length)];
          mg.gain.setValueAtTime(0.0001, mt);
          mg.gain.exponentialRampToValueAtTime(cf.melGain, mt + 0.03);
          mg.gain.exponentialRampToValueAtTime(0.0001, mt + 1);
          mo.connect(mg); mg.connect(lp);
          mo.start(mt); mo.stop(mt + 1.1);
        }
        step++;
      }
      playChord();
      var iv = setInterval(playChord, cf.len * 1000);
      return { nodes: crackle.nodes.concat([lp]), ints: [iv] };
    },
    stopLive: function (name) {
      var cur = this.live[name];
      if (cur) {
        cur.ints.forEach(clearInterval);
        cur.nodes.forEach(function (nd) { try { nd.stop && nd.stop(); } catch (e) {} try { nd.disconnect(); } catch (e) {} });
        delete this.live[name];
      }
    },
    setBgm: function (style) {
      this.stopLive('bgm');
      if (style) {
        if (!this.ensure()) return false;
        this.live.bgm = this.startBgm(style);
      }
      return true;
    },
    toggle: function (name, on) {
      if (on) {
        if (!this.ensure()) return false;
        if (this.live[name]) return true;
        var h = name === 'rain' ? this.startRain() : name === 'fire' ? this.startFire() : this.startForest();
        this.live[name] = h;
        return true;
      }
      this.stopLive(name);
      return true;
    },
    tone: function (freq, t, dur, gainV, type) {
      var o = this.ctx.createOscillator();
      var g = this.ctx.createGain();
      o.type = type || 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gainV, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + dur + 0.05);
    },
    chime: function (kind) {
      if (!this.ensure()) return;
      var t = this.ctx.currentTime;
      var seq = kind === 'done' ? [784, 988, 1319] : kind === 'gift' ? [1046, 1319] : [659, 523];
      var self = this;
      seq.forEach(function (f, i) { self.tone(f, t + i * 0.13, 0.5, 0.07); });
    },
    pet: function () {
      if (!this.ensure()) return;
      var t = this.ctx.currentTime;
      var o = this.ctx.createOscillator();
      var g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(750, t);
      o.frequency.exponentialRampToValueAtTime(1400, t + 0.1);
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
      o.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + 0.16);
    }
  };

  /* ---------- stats ---------- */
  function dayRec(k) {
    if (!S.days[k] || typeof S.days[k] !== 'object') S.days[k] = { s: 0, m: 0 };
    return S.days[k];
  }
  function streak() {
    var n = 0;
    var d = new Date();
    if (!(S.days[dateKey(d)] && S.days[dateKey(d)].s > 0)) d.setDate(d.getDate() - 1);
    while (S.days[dateKey(d)] && S.days[dateKey(d)].s > 0) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function updateStats() {
    $('acornCount').textContent = S.acorns;
    var st = streak();
    if (st >= 2) {
      $('streakChip').style.display = 'inline-flex';
      $('streakDays').textContent = 'れんぞく' + st + '日';
    } else {
      $('streakChip').style.display = 'none';
    }
    var d = S.days[todayKey()];
    var s0 = d ? d.s : 0, m0 = d ? d.m : 0;
    $('todayLine').textContent = 'きょう：どんぐり ' + s0 + 'こ ・ しゅうちゅう ' + m0 + 'ふん';
    renderAcornMenu();
  }
  function bumpAcorn() {
    var chip = $('acornChip');
    chip.classList.remove('bump');
    void chip.offsetWidth;
    chip.classList.add('bump');
  }
  var ACORN_SVG = '<svg width="18" height="18" viewBox="0 0 24 24"><ellipse cx="12" cy="15" rx="6.5" ry="7.5" fill="#CD9452"/><path d="M4 9 Q12 4 20 9 L19 12 Q12 7 5 12 Z" fill="#7A4A32"/><rect x="11" y="3" width="2.4" height="4" rx="1.2" fill="#7A4A32"/></svg>';
  function flyAcorn(fromEl) {
    var from = (fromEl || sq).getBoundingClientRect();
    var to = $('acornChip').getBoundingClientRect();
    var el = document.createElement('div');
    el.className = 'rs-flyacorn';
    el.innerHTML = ACORN_SVG;
    el.style.left = (from.left + from.width / 2) + 'px';
    el.style.top = (from.top + from.height * 0.3) + 'px';
    document.body.appendChild(el);
    void el.offsetWidth;
    el.style.left = (to.left + to.width / 2) + 'px';
    el.style.top = (to.top + 4) + 'px';
    el.style.transform = 'scale(.6)';
    setTimeout(function () { el.remove(); bumpAcorn(); updateStats(); }, 1000);
  }

  /* ---------- bubble ---------- */
  var bubbleTimer = null;
  function showBubble(text, actions) {
    var b = $('bubble');
    $('bubbleText').textContent = text;
    var box = $('bubbleActions');
    box.textContent = '';
    (actions || []).forEach(function (a) {
      var btn = document.createElement('button');
      btn.type = 'button';
      if (a.acc) btn.className = 'acc';
      if (a.icon) {
        var ic = document.createElement('i');
        ic.className = 'fas ' + a.icon;
        btn.appendChild(ic);
      }
      btn.appendChild(document.createTextNode(a.label));
      btn.onclick = function (e) { e.stopPropagation(); a.cb(); };
      box.appendChild(btn);
    });
    var r = sq.getBoundingClientRect();
    var cx = Math.min(Math.max(r.left + r.width / 2, 130), window.innerWidth - 130);
    b.style.left = cx + 'px';
    b.style.bottom = Math.min(window.innerHeight - 90, window.innerHeight - r.top + 14) + 'px';
    b.classList.add('on');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(hideBubble, 22000);
  }
  function hideBubble() {
    clearTimeout(bubbleTimer);
    $('bubble').classList.remove('on');
  }

  /* ---------- squirrel behavior ---------- */
  var POS = {
    home: { x: 72, y: 14.2, s: 1 },
    mid: { x: 55, y: 14.2, s: 1 },
    far: { x: 32, y: 14.6, s: 0.55 },
    near: { x: 80, y: 7, s: 1.85 },
    closeup: { x: 50, s: 6.2, closeup: true }
  };
  var flipEl = $('sqFlip');
  var curPos = { x: 72, y: 14.2, s: 1 };
  var hopT = null;
  function hopFor(ms) {
    flipEl.classList.add('hop');
    clearTimeout(hopT);
    hopT = setTimeout(function () { flipEl.classList.remove('hop'); }, ms);
  }
  function setFacing(targetX) {
    if (Math.abs(targetX - curPos.x) < 0.5) return;
    flipEl.style.setProperty('--flip', targetX > curPos.x ? -1 : 1);
  }
  function moveTo(p) {
    setFacing(p.x);
    app.style.setProperty('--sq-x', p.x + '%');
    app.style.setProperty('--sq-s', p.s);
    if (p.closeup) {
      // 顔が画面中央に来るようにピクセルで計算（ウィンドウの縦横比に依存しない）
      var h = $('sqCanvas').offsetHeight * p.s;
      var b = Math.round(window.innerHeight * 0.5 - h * 0.68);
      app.style.setProperty('--sq-y', b + 'px');
    } else {
      app.style.setProperty('--sq-y', p.y + '%');
      hopFor(1800);
    }
    curPos = p;
  }
  var walkT = null;
  function walkTo(x, cb) {
    var dist = Math.abs(x - curPos.x);
    var dur = Math.max(0.7, dist * 0.11);
    setFacing(x);
    sq.style.transition = 'left ' + dur + 's linear';
    app.style.setProperty('--sq-x', x + '%');
    curPos = { x: x, y: curPos.y, s: curPos.s };
    hopFor(dur * 1000);
    clearTimeout(walkT);
    walkT = setTimeout(function () {
      sq.style.transition = '';
      if (cb) cb();
    }, dur * 1000 + 60);
  }
  var groundAcorn = null;
  function spawnGroundAcorn(x) {
    removeGroundAcorn();
    var el = document.createElement('div');
    el.className = 'rs-ground-acorn';
    el.innerHTML = ACORN_SVG;
    el.style.left = x + '%';
    el.style.bottom = '14.4%';
    app.appendChild(el);
    groundAcorn = el;
  }
  function removeGroundAcorn() {
    if (groundAcorn) { groundAcorn.remove(); groundAcorn = null; }
  }
  function munch() {
    flipEl.classList.remove('munch');
    void flipEl.offsetWidth;
    flipEl.classList.add('munch');
    eyesLocked = true;
    setEyes('closed');
    setTimeout(function () {
      flipEl.classList.remove('munch');
      eyesLocked = false;
      if (!napping) setEyes('open');
    }, 1900);
  }
  function stopNap() {
    if (napping) {
      napping = false;
      $('zzz').classList.remove('on');
      setEyes('open');
    }
  }
  var TALK = ['おつかれさま！', 'きゅうけいも だいじだよ', 'のびび〜っ', 'がんばってるの、みてたよ', 'おちゃでも のむ？', 'ちょっと あそぼ？'];
  var CLOSE = ['じーっ……', 'ちかい？', 'なにしてるの？'];
  var PET = ['えへへ', 'きゅ〜ん', 'もっと！'];
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  var Beh = {
    mode: 'idle', t1: null, t2: null,
    setMode: function (m) {
      this.mode = m;
      clearTimeout(this.t1);
      clearTimeout(this.t2);
      clearTimeout(walkT);
      sq.style.transition = '';
      hideBubble();
      stopNap();
      removeGroundAcorn();
      flipEl.classList.remove('munch');
      if (m === 'focus') {
        moveTo(POS.home);
        this.schedule(8000 + Math.random() * 8000);
      } else {
        this.schedule(4000 + Math.random() * 5000);
      }
    },
    schedule: function (ms) {
      var self = this;
      clearTimeout(this.t1);
      this.t1 = setTimeout(function () { self.act(); }, ms);
    },
    focusAct: function () {
      // 作業中はリスもおしごと: 枝を歩き回り、どんぐりを拾って食べる
      var r = Math.random();
      if (r < 0.55) {
        var fx = 58 + Math.random() * 28;
        spawnGroundAcorn(fx);
        this.t2 = setTimeout(function () {
          walkTo(fx, function () {
            removeGroundAcorn();
            munch();
          });
        }, 700);
      } else {
        walkTo(58 + Math.random() * 28);
      }
      this.schedule(16000 + Math.random() * 20000);
    },
    act: function () {
      stopNap();
      if (this.mode === 'focus') { this.focusAct(); return; }
      var r = Math.random();
      if (r < 0.34) {
        var keys = ['home', 'mid', 'far', 'near'];
        moveTo(POS[rand(keys)]);
        this.schedule(11000 + Math.random() * 15000);
      } else if (r < 0.52) {
        this.talk();
      } else if (r < 0.64) {
        this.closeup();
      } else if (r < 0.8) {
        this.nap();
      } else if (r < 0.9) {
        this.gift();
      } else {
        this.schedule(9000 + Math.random() * 9000);
      }
    },
    talk: function () {
      var self = this;
      this.t2 = setTimeout(function () {
        showBubble(rand(TALK), [{ label: 'なでる', icon: 'fa-hand', cb: pet }]);
      }, 400);
      this.schedule(20000 + Math.random() * 14000);
    },
    closeup: function () {
      var self = this;
      hideBubble();
      moveTo(POS.closeup);
      this.t2 = setTimeout(function () { showBubble(rand(CLOSE)); }, 2000);
      setTimeout(function () {
        if (self.mode !== 'focus') {
          hideBubble();
          moveTo(POS.home);
        }
      }, 7500);
      this.schedule(17000 + Math.random() * 12000);
    },
    nap: function () {
      napping = true;
      setEyes('closed');
      $('zzz').classList.add('on');
      this.t2 = setTimeout(stopNap, 9000 + Math.random() * 7000);
      this.schedule(19000 + Math.random() * 12000);
    },
    gift: function () {
      showBubble('いいもの みつけたの。あげる！', [{ label: 'もらう', acc: true, cb: receiveGift }]);
      this.schedule(26000 + Math.random() * 12000);
    }
  };

  function spawnHearts(count) {
    var r = sq.getBoundingClientRect();
    for (var i = 0; i < count; i++) {
      (function (i) {
        setTimeout(function () {
          var h = document.createElement('div');
          h.className = 'rs-heart';
          h.innerHTML = '<svg width="12" height="11" viewBox="0 0 6 5" shape-rendering="crispEdges"><rect x="1" y="0" width="1" height="1" fill="#F1745C"/><rect x="4" y="0" width="1" height="1" fill="#F1745C"/><rect x="0" y="1" width="6" height="1" fill="#F1745C"/><rect x="1" y="2" width="4" height="1" fill="#F1745C"/><rect x="2" y="3" width="2" height="1" fill="#F1745C"/></svg>';
          h.style.left = (r.left + r.width * (0.25 + Math.random() * 0.5)) + 'px';
          h.style.top = (r.top - 4 + Math.random() * 12) + 'px';
          h.style.position = 'fixed';
          document.body.appendChild(h);
          setTimeout(function () { h.remove(); }, 1400);
        }, i * 140);
      })(i);
    }
  }
  function say(text, ms) {
    showBubble(text);
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(hideBubble, ms || 3500);
  }
  function pet() {
    stopNap();
    Snd.pet();
    eyesLocked = true;
    setEyes('closed');
    setTimeout(function () { eyesLocked = false; setEyes('open'); }, 1300);
    spawnHearts(4);
    if ($('bubble').classList.contains('on')) {
      $('bubbleText').textContent = rand(PET);
      $('bubbleActions').textContent = '';
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(hideBubble, 2200);
    }
  }
  sq.addEventListener('click', pet);

  function receiveGift() {
    S.acorns++;
    save();
    Snd.chime('gift');
    flyAcorn();
    $('bubbleText').textContent = 'えへん！';
    $('bubbleActions').textContent = '';
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(hideBubble, 2200);
  }

  /* ---------- spending acorns ---------- */
  var friendEl = null;
  function fxSnack() {
    munch();
    Snd.pet();
    spawnHearts(3);
    say(rand(['ありがと！もぐもぐ…', 'おいしい！', 'だいすき、どんぐり！']));
  }
  function fxPlay() {
    say('わーい！あそぼあそぼ！');
    var spots = [38, 80, 50, 72];
    var i = 0;
    (function step() {
      if (Beh.mode === 'focus' && i > 1) { spawnHearts(4); return; }
      if (i >= spots.length) {
        spawnHearts(5);
        say('たのしかった！');
        return;
      }
      walkTo(spots[i++], step);
    })();
  }
  function fxShower() {
    say('わあっ、どんぐりの あめ！！', 5000);
    Snd.chime('gift');
    hopFor(3600);
    for (var i = 0; i < 26; i++) {
      (function (i) {
        setTimeout(function () {
          var el = document.createElement('div');
          el.className = 'rs-leaf';
          el.innerHTML = ACORN_SVG;
          el.style.left = (Math.random() * 100) + '%';
          el.style.setProperty('--d', (2.2 + Math.random() * 2.5) + 's');
          el.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
          $('leaves').appendChild(el);
          setTimeout(function () { el.remove(); }, 5500);
        }, i * 130);
      })(i);
    }
  }
  function fxFriend() {
    say('ともだち つれてきた！', 4500);
    var wrap = document.createElement('div');
    wrap.className = 'rs-friend';
    wrap.style.left = '-14%';
    var flip = document.createElement('div');
    flip.className = 'rs-flip';
    flip.style.setProperty('--flip', -1);
    var cv = document.createElement('canvas');
    cv.width = 30; cv.height = 28;
    flip.appendChild(cv);
    wrap.appendChild(flip);
    app.appendChild(wrap);
    friendEl = wrap;
    var fctx = cv.getContext('2d');
    var FPAL = Object.assign({}, PAL, { b: '#ADA69E', B: '#C6BFB6', t: '#7E7870', T: '#B8B1A8', c: '#F1EBE1', p: '#E8A8A0', o: '#48423E' });
    drawInto(fctx, FPAL, 'open');
    var blinkIv = setInterval(function () {
      drawInto(fctx, FPAL, 'closed');
      setTimeout(function () { if (friendEl === wrap) drawInto(fctx, FPAL, 'open'); }, 140);
    }, 3200 + Math.random() * 2600);
    requestAnimationFrame(function () {
      flip.classList.add('hop');
      wrap.style.left = '32%';
      setTimeout(function () {
        flip.classList.remove('hop');
        flip.style.setProperty('--flip', 1);
      }, 4100);
    });
    setTimeout(function () {
      // そろそろ おうちに帰る時間
      flip.style.setProperty('--flip', 1);
      flip.classList.add('hop');
      wrap.style.left = '-16%';
      setTimeout(function () {
        clearInterval(blinkIv);
        wrap.remove();
        if (friendEl === wrap) friendEl = null;
        renderAcornMenu();
      }, 4300);
    }, 180000);
    renderAcornMenu();
  }
  var SPEND = { 1: fxSnack, 3: fxPlay, 10: fxShower, 30: fxFriend };
  function renderAcornMenu() {
    document.querySelectorAll('#acornMenu [data-cost]').forEach(function (b) {
      var c = parseInt(b.dataset.cost, 10);
      b.disabled = S.acorns < c || (c === 30 && !!friendEl);
    });
  }
  document.querySelectorAll('#acornMenu [data-cost]').forEach(function (b) {
    b.onclick = function () {
      var c = parseInt(b.dataset.cost, 10);
      if (S.acorns < c || b.disabled) return;
      S.acorns -= c;
      save();
      updateStats();
      bumpAcorn();
      $('acornMenu').classList.remove('open');
      SPEND[c]();
      renderAcornMenu();
    };
  });

  /* かくしわざ: もりの左の大木を5回タップすると、以後タップごとにどんぐり+1 */
  var secretTaps = 0;
  var flTree = document.querySelector('.t-fl');
  if (flTree) {
    flTree.addEventListener('click', function () {
      secretTaps++;
      // 2回目まではなにも起きない（バレないように）。3回目から木が揺れはじめる
      if (secretTaps >= 3) {
        flTree.classList.remove('shake');
        void flTree.getBoundingClientRect();
        flTree.classList.add('shake');
        if (Snd.ensure()) {
          Snd.tone(180 + Math.random() * 40, Snd.ctx.currentTime, 0.09, 0.05, 'triangle');
        }
      }
      if (secretTaps === 5) {
        say('…みつかっちゃった！それ、どんぐりのき だよ', 4500);
      } else if (secretTaps > 5) {
        S.acorns++;
        save();
        updateStats();
        bumpAcorn();
        flyAcorn(flTree);
      }
    });
  }

  /* ---------- timer ---------- */
  var BREAK_STEPS = [3, 5, 10, 15];
  var T = { mode: 'idle', endAt: 0, pausedRemain: null };

  function persistTimer() {
    S.timer = T.mode === 'idle' ? null : { mode: T.mode, endAt: T.endAt, pausedRemain: T.pausedRemain };
    save();
  }
  function fmt(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  function award() {
    S.acorns++;
    var d = dayRec(todayKey());
    d.s++;
    d.m += S.focusMin;
    save();
    flyAcorn();
  }
  function renderTimer() {
    var label = $('stateLabel');
    var startBtn = $('btnStart');
    var running = T.mode !== 'idle' && T.pausedRemain === null;
    var remainMs = T.mode === 'idle' ? S.focusMin * 60000 : (T.pausedRemain !== null ? T.pausedRemain : T.endAt - Date.now());
    $('remain').textContent = fmt(remainMs);
    label.className = 'rs-state ' + (T.mode === 'focus' ? 'focus' : T.mode === 'break' ? 'break' : '');
    label.textContent = T.mode === 'focus' ? (T.pausedRemain !== null ? 'いったん おやすみ' : 'しゅうちゅうタイム') : T.mode === 'break' ? 'きゅうけいタイム' : 'きょうも こつこつ';
    startBtn.innerHTML = T.mode === 'idle' ? '<i class="fas fa-play"></i> スタート' : (T.pausedRemain !== null ? '<i class="fas fa-play"></i> さいかい' : '<i class="fas fa-pause"></i> いちじていし');
    $('btnMinus').style.visibility = T.mode === 'idle' ? 'visible' : 'hidden';
    $('btnPlus').style.visibility = T.mode === 'idle' ? 'visible' : 'hidden';
    $('btnMinus').textContent = S.focusMin <= 10 ? '-1' : '-5';
    $('btnPlus').textContent = S.focusMin < 10 ? '+1' : '+5';
    $('btnSkip').style.display = T.mode === 'idle' ? 'none' : 'inline';
    $('btnSkip').textContent = T.mode === 'focus' ? 'やめる' : 'スキップ';
    $('btnBreakLen').textContent = 'きゅうけい ' + S.breakMin + 'ふん';
    document.title = T.mode === 'focus' ? ('▶ ' + fmt(remainMs) + ' - リスタ') : T.mode === 'break' ? ('☕ ' + fmt(remainMs) + ' - リスタ') : 'リスタ | リスと一緒にこつこつ作業';
    var zt = $('zenTimer');
    zt.textContent = fmt(remainMs);
    zt.classList.toggle('show', T.mode !== 'idle');
  }
  function completeFocus() {
    award();
    Snd.chime('done');
    T.mode = 'break';
    T.endAt = Date.now() + S.breakMin * 60000;
    T.pausedRemain = null;
    persistTimer();
    Beh.setMode('break');
    setTimeout(function () {
      showBubble('おつかれさま！どんぐり どうぞ');
    }, 800);
    renderTimer();
    updateStats();
  }
  function completeBreak() {
    Snd.chime('break');
    T.mode = 'idle';
    T.pausedRemain = null;
    persistTimer();
    Beh.setMode('idle');
    showBubble('そろそろ やる？');
    renderTimer();
  }
  setInterval(function () {
    if (T.mode !== 'idle' && T.pausedRemain === null) {
      if (T.endAt - Date.now() <= 0) {
        if (T.mode === 'focus') completeFocus();
        else completeBreak();
        return;
      }
      renderTimer();
    }
  }, 400);

  $('btnStart').onclick = function () {
    Snd.ensure();
    if (T.mode === 'idle') {
      T.mode = 'focus';
      T.endAt = Date.now() + S.focusMin * 60000;
      T.pausedRemain = null;
      Beh.setMode('focus');
      showBubble('がんばろ！');
      setTimeout(hideBubble, 2500);
    } else if (T.pausedRemain === null) {
      T.pausedRemain = T.endAt - Date.now();
    } else {
      T.endAt = Date.now() + T.pausedRemain;
      T.pausedRemain = null;
    }
    persistTimer();
    renderTimer();
  };
  $('btnSkip').onclick = function () {
    T.mode = 'idle';
    T.pausedRemain = null;
    persistTimer();
    Beh.setMode('idle');
    renderTimer();
  };
  $('btnMinus').onclick = function () {
    // 10分以下は1分刻みで調整できるようにする
    S.focusMin = Math.max(1, S.focusMin - (S.focusMin <= 10 ? 1 : 5));
    save();
    renderTimer();
  };
  $('btnPlus').onclick = function () {
    S.focusMin = Math.min(90, S.focusMin + (S.focusMin < 10 ? 1 : 5));
    save();
    renderTimer();
  };
  $('btnBreakLen').onclick = function () {
    var i = BREAK_STEPS.indexOf(S.breakMin);
    S.breakMin = BREAK_STEPS[(i + 1) % BREAK_STEPS.length];
    save();
    renderTimer();
  };

  /* ---------- panels ---------- */
  function togglePanel(id, btn) {
    var p = $(id);
    var open = !p.classList.contains('open');
    ['soundPanel', 'todoPanel', 'acornMenu'].forEach(function (pid) { $(pid).classList.remove('open'); });
    ['btnSound', 'btnTodo'].forEach(function (bid) { $(bid).classList.remove('on'); });
    if (open) {
      p.classList.add('open');
      if (btn) btn.classList.add('on');
    }
  }
  $('btnSound').onclick = function () { togglePanel('soundPanel', this); };
  $('btnTodo').onclick = function () { togglePanel('todoPanel', this); };
  $('acornChip').onclick = function () { togglePanel('acornMenu', null); };
  // とけい・タイマー表示トグル（有効=表示、デフォルト有効）
  var clockShown = true;
  $('btnZen').classList.add('on');
  $('btnZen').onclick = function () {
    clockShown = !clockShown;
    app.classList.toggle('zen', !clockShown);
    this.classList.toggle('on', clockShown);
    renderTimer();
  };

  /* ---------- rain visual ---------- */
  var rainFxInt = null;
  function setRainFx(on) {
    if (on && !rainFxInt) {
      rainFxInt = setInterval(function () {
        var d = document.createElement('div');
        d.className = 'rs-drop';
        d.style.left = (Math.random() * 100) + '%';
        d.style.setProperty('--d', (0.7 + Math.random() * 0.5) + 's');
        $('rainfx').appendChild(d);
        setTimeout(function () { d.remove(); }, 1400);
      }, 85);
    } else if (!on && rainFxInt) {
      clearInterval(rainFxInt);
      rainFxInt = null;
    }
  }

  /* ---------- sound & scene UI ---------- */
  var AMB = { rain: 'chipRain', fire: 'chipFire', forest: 'chipForest' };
  function renderChips() {
    for (var name in AMB) $(AMB[name]).classList.toggle('on', !!S.snd[name]);
    document.querySelectorAll('#bgmChips [data-bgm]').forEach(function (b) {
      b.classList.toggle('on', S.bgm === b.dataset.bgm);
    });
    document.querySelectorAll('#skyChips [data-sky]').forEach(function (b) {
      b.classList.toggle('on', S.skyMode === b.dataset.sky);
    });
    document.querySelectorAll('#themeChips [data-theme]').forEach(function (b) {
      b.classList.toggle('on', S.theme === b.dataset.theme);
    });
  }
  document.querySelectorAll('#themeChips [data-theme]').forEach(function (b) {
    b.onclick = function () {
      S.theme = b.dataset.theme;
      setTheme();
      save();
      renderChips();
    };
  });
  function setFireFx(on) {
    $('campfire').classList.toggle('on', on);
  }
  Object.keys(AMB).forEach(function (name) {
    $(AMB[name]).onclick = function () {
      S.snd[name] = !S.snd[name];
      if (!Snd.toggle(name, S.snd[name])) S.snd[name] = false;
      if (name === 'rain') setRainFx(S.snd.rain);
      if (name === 'fire') setFireFx(S.snd.fire);
      save();
      renderChips();
    };
  });
  document.querySelectorAll('#bgmChips [data-bgm]').forEach(function (b) {
    b.onclick = function () {
      S.bgm = S.bgm === b.dataset.bgm ? '' : b.dataset.bgm;
      Snd.setBgm(S.bgm);
      save();
      renderChips();
    };
  });
  document.querySelectorAll('#skyChips [data-sky]').forEach(function (b) {
    b.onclick = function () {
      S.skyMode = b.dataset.sky;
      lastSky = '';
      applySky();
      save();
      renderChips();
    };
  });
  $('vol').value = S.vol;
  $('vol').oninput = function () {
    S.vol = parseInt(this.value, 10);
    Snd.setVol(S.vol);
    save();
  };
  document.addEventListener('pointerdown', function firstGesture() {
    document.removeEventListener('pointerdown', firstGesture);
    var any = S.bgm !== '';
    for (var name in S.snd) if (S.snd[name]) any = true;
    if (any && Snd.ensure()) {
      for (var n2 in S.snd) if (S.snd[n2]) Snd.toggle(n2, true);
      if (S.bgm) Snd.setBgm(S.bgm);
    }
  });

  /* ---------- todo & memo ---------- */
  function renderTodos() {
    var ul = $('todoList');
    ul.textContent = '';
    S.todos.forEach(function (td, i) {
      var li = document.createElement('li');
      if (td.done) li.className = 'done';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = td.done;
      cb.onchange = function () { td.done = cb.checked; save(); renderTodos(); };
      var sp = document.createElement('span');
      sp.className = 't';
      sp.textContent = td.t;
      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'del';
      del.textContent = '×';
      del.onclick = function () { S.todos.splice(i, 1); save(); renderTodos(); };
      li.appendChild(cb); li.appendChild(sp); li.appendChild(del);
      ul.appendChild(li);
    });
    $('todoEmpty').style.display = S.todos.length ? 'none' : 'block';
  }
  function addTodo() {
    var v = $('todoInput').value.trim();
    if (!v) return;
    S.todos.push({ t: v, done: false });
    $('todoInput').value = '';
    save();
    renderTodos();
  }
  $('todoAdd').onclick = addTodo;
  $('todoInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') addTodo(); });
  $('memo').value = S.memo;
  $('memo').addEventListener('input', function () { S.memo = this.value; save(); });

  /* ---------- fullscreen ---------- */
  var fullBtn = $('btnFull');
  if (!document.documentElement.requestFullscreen) {
    fullBtn.style.display = 'none';
  } else {
    fullBtn.onclick = function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    };
    document.addEventListener('fullscreenchange', function () {
      fullBtn.innerHTML = document.fullscreenElement ? '<i class="fas fa-compress"></i>' : '<i class="fas fa-expand"></i>';
    });
  }

  /* ---------- restore & init ---------- */
  (function restore() {
    var t = S.timer;
    if (t && t.mode) {
      if (t.pausedRemain !== null && t.pausedRemain !== undefined) {
        T.mode = t.mode;
        T.pausedRemain = t.pausedRemain;
        T.endAt = 0;
      } else if (t.endAt > Date.now()) {
        T.mode = t.mode;
        T.endAt = t.endAt;
        T.pausedRemain = null;
      } else {
        if (t.mode === 'focus') {
          S.acorns++;
          var d = dayRec(todayKey());
          d.s++;
          d.m += S.focusMin;
        }
        T.mode = 'idle';
        S.timer = null;
        save();
      }
    }
    Beh.setMode(T.mode === 'focus' ? 'focus' : T.mode === 'break' ? 'break' : 'idle');
    setRainFx(S.snd.rain);
    setFireFx(S.snd.fire);
    setTheme();
    renderChips();
    renderTodos();
    updateStats();
    renderTimer();
    window.__risuta = { S: S, T: T, Beh: Beh, Snd: Snd, moveTo: moveTo, POS: POS, pet: pet, showBubble: showBubble, walkTo: walkTo };
  })();
})();
</script>
{% endraw %}
