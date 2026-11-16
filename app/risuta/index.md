---
layout: app
title: "リスタ | リスと一緒にこつこつ作業（ポモドーロ×ローファイ）"
app_name: "リスタ"
description: "リスと一緒に作業できる無料の作業おともアプリ。ポモドーロタイマー、環境音とローファイBGM、どんぐり集め、TODOメモ。ログイン不要・スマホ対応。"
custom_head: |
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&display=swap" rel="stylesheet">
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

  /* ---- scene tint: 時間帯にあわせて風景の色をなじませる ---- */
  .risuta .c {
    fill: var(--c);
    fill: color-mix(in srgb, var(--c), var(--tint, #1D2150) var(--ta, 0%));
    transition: fill 3s ease;
  }
  .risuta .c.k {
    stroke: var(--c);
    stroke: color-mix(in srgb, var(--c), var(--tint, #1D2150) var(--ta, 0%));
    stroke-linejoin: round;
    transition: fill 3s ease, stroke 3s ease;
  }
  .risuta .s {
    stroke: var(--s);
    stroke: color-mix(in srgb, var(--s), var(--tint, #1D2150) var(--ta, 0%));
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: fill 3s ease, stroke 3s ease;
  }
  .risuta .lit { opacity: var(--lit, 0); transition: opacity 3s ease; }

  /* ---- sky ---- */
  .rs-sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, var(--s1, #141A44) 0%, var(--s2, #2A2E6C) 46%, var(--s3, #5E5596) 82%);
    transition: opacity 3s ease;
  }
  #sky2 { opacity: 0; }

  .rs-star {
    position: absolute;
    width: var(--sz, 2px);
    height: var(--sz, 2px);
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 6px 1px rgba(255, 255, 255, .5);
    opacity: var(--stars, 0);
    transition: opacity 3s ease;
    animation: rs-twinkle 3.5s ease-in-out infinite;
  }
  @keyframes rs-twinkle { 50% { transform: scale(.35); } }
  .rs-shoot {
    position: absolute;
    width: 110px;
    height: 2.5px;
    border-radius: 3px;
    background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
    pointer-events: none;
    animation: rs-shoot 1.1s ease-out forwards;
  }
  @keyframes rs-shoot {
    0% { transform: translate(0, 0) rotate(-25deg); opacity: 0; }
    15% { opacity: 1; }
    100% { transform: translate(-300px, 140px) rotate(-25deg); opacity: 0; }
  }

  .rs-sun {
    position: absolute;
    left: var(--sun-x, 78%);
    top: var(--sun-y, 9%);
    width: 72px;
    height: 72px;
    margin-left: -36px;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 38%, #FFFDEA, #FFE27A 72%);
    box-shadow: 0 0 0 14px rgba(255, 238, 160, .22), 0 0 0 32px rgba(255, 238, 160, .11), 0 0 70px 34px rgba(255, 222, 140, .35);
    opacity: var(--sun-o, 0);
    filter: var(--sun-f, none);
    transition: opacity 3s ease, top 3s ease, left 3s ease, filter 3s ease;
  }
  .rs-moon {
    position: absolute;
    top: 9%;
    right: 13%;
    width: 62px;
    height: 62px;
    opacity: var(--stars, 0);
    filter: drop-shadow(0 0 16px rgba(255, 240, 200, .55));
    transition: opacity 3s ease;
    animation: rs-moonbob 9s ease-in-out infinite;
  }
  @keyframes rs-moonbob { 50% { transform: translateY(-5px) rotate(-4deg); } }

  .rs-cloud {
    position: absolute;
    left: -280px;
    top: var(--y, 12%);
    width: var(--w, 200px);
    opacity: var(--cloud-o, .95);
    transition: opacity 3s ease;
    animation: rs-drift var(--d, 140s) linear infinite;
    animation-delay: var(--dl, 0s);
    pointer-events: none;
  }
  .rs-cloud svg { display: block; width: 100%; height: auto; }
  @keyframes rs-drift { to { transform: translateX(calc(100vw + 560px)); } }

  /* ---- backdrops ---- */
  .rs-bg {
    position: absolute;
    left: 0;
    bottom: 13.6%;
    width: 100%;
    height: 64%;
    display: none;
  }
  .risuta.th-sougen .bg-sougen,
  .risuta.th-mori .bg-mori,
  .risuta.th-yuki .bg-yuki,
  .risuta.th-umi .bg-umi { display: block; }

  .rs-bg .smoke { transform-box: fill-box; transform-origin: center; animation: rs-smoke 5s ease-out infinite; opacity: 0; }
  .rs-bg .smoke.s2 { animation-delay: 1.7s; }
  .rs-bg .smoke.s3 { animation-delay: 3.4s; }
  @keyframes rs-smoke {
    0% { transform: translate(0, 0) scale(.5); opacity: 0; }
    20% { opacity: .75; }
    100% { transform: translate(14px, -46px) scale(1.5); opacity: 0; }
  }
  .rs-bg .ray { opacity: calc(var(--sun-o, 0) * .13); transition: opacity 3s ease; }
  .rs-bg .wavesA { animation: rs-wave 6s ease-in-out infinite alternate; }
  .rs-bg .wavesB { animation: rs-wave 8s ease-in-out infinite alternate-reverse; }
  @keyframes rs-wave { from { transform: translateX(-16px); } to { transform: translateX(16px); } }
  .rs-bg .boat { animation: rs-boat 70s ease-in-out infinite alternate; }
  @keyframes rs-boat { from { transform: translateX(-70px); } to { transform: translateX(110px); } }
  .rs-bg .boatbob { transform-origin: 700px 262px; animation: rs-boatbob 3.6s ease-in-out infinite alternate; }
  @keyframes rs-boatbob { from { transform: rotate(-3deg); } to { transform: rotate(3deg) translateY(1.5px); } }
  .rs-bg .glint { animation: rs-glint 2.6s ease-in-out infinite; }
  .rs-bg .glint.g2 { animation-delay: .9s; }
  .rs-bg .glint.g3 { animation-delay: 1.7s; }
  @keyframes rs-glint { 0%, 100% { opacity: 0; } 50% { opacity: .9; } }
  .rs-bg .palm { transform-origin: 520px 250px; animation: rs-palm 5s ease-in-out infinite alternate; }
  @keyframes rs-palm { from { transform: rotate(-1.5deg); } to { transform: rotate(2deg); } }

  /* ---- ground ---- */
  .rs-ground {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 14.5%;
    --c: #7FCB74;
    background-color: var(--c);
    background-color: color-mix(in srgb, var(--c), var(--tint, #1D2150) var(--ta, 0%));
    transition: background-color 3s ease;
  }
  .rs-ground::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -11px;
    height: 12px;
    background: inherit;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 12'%3E%3Cpath d='M0 12V9Q2 2 5 9Q8 0 11 8Q13 5 15 9Q19 3 22 9Q25 1 28 8Q31 4 33 9Q37 2 40 9Q43 0 46 8Q49 4 51 9Q54 3 56 9V12Z'/%3E%3C/svg%3E") repeat-x 0 0 / 56px 12px;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 12'%3E%3Cpath d='M0 12V9Q2 2 5 9Q8 0 11 8Q13 5 15 9Q19 3 22 9Q25 1 28 8Q31 4 33 9Q37 2 40 9Q43 0 46 8Q49 4 51 9Q54 3 56 9V12Z'/%3E%3C/svg%3E") repeat-x 0 0 / 56px 12px;
  }
  .rs-ground::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, .16), rgba(255, 255, 255, 0) 30%, rgba(20, 30, 60, .14));
  }
  .risuta.th-mori .rs-ground { --c: #63B273; }
  .risuta.th-yuki .rs-ground { --c: #F3F8FF; }
  .risuta.th-umi .rs-ground { --c: #F7E3B0; }
  .risuta.th-yuki .rs-ground::before,
  .risuta.th-umi .rs-ground::before {
    top: -9px;
    height: 10px;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 10'%3E%3Cpath d='M0 10V6Q15 0 30 5Q45 9 60 4Q78 -1 96 5Q108 8 120 6V10Z'/%3E%3C/svg%3E") repeat-x 0 0 / 120px 10px;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 10'%3E%3Cpath d='M0 10V6Q15 0 30 5Q45 9 60 4Q78 -1 96 5Q108 8 120 6V10Z'/%3E%3C/svg%3E") repeat-x 0 0 / 120px 10px;
  }

  /* 地面のかざり（花・きのこ・ゆきうさぎ・貝がら など） */
  .rs-decor { position: absolute; left: 0; right: 0; bottom: 14.5%; height: 0; z-index: 2; pointer-events: none; }
  .rs-decor .dc { display: none; }
  .risuta.th-sougen .dc-sougen,
  .risuta.th-mori .dc-mori,
  .risuta.th-yuki .dc-yuki,
  .risuta.th-umi .dc-umi { display: block; }
  .rs-decor svg { position: absolute; bottom: -4px; overflow: visible; transform-origin: 50% 100%; }
  .rs-decor svg.swy { animation: rs-swy 4s ease-in-out infinite alternate; }
  @keyframes rs-swy { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
  .rs-decor svg.crab { animation: rs-crab 16s ease-in-out infinite; }
  @keyframes rs-crab {
    0%, 20% { transform: translateX(0); }
    35%, 55% { transform: translateX(70px); }
    70%, 100% { transform: translateX(0); }
  }

  /* もりの最前景: 画面の左右端の大きな木 */
  .rs-fg { display: none; }
  .risuta.th-mori .rs-fg { display: block; }
  .rs-fg .fg { position: absolute; z-index: 4; pointer-events: none; transform-origin: 50% 100%; overflow: visible; }
  .t-fl g { pointer-events: auto; }
  .rs-fg .fg.shake { animation: rs-shake .3s ease; }
  @keyframes rs-shake { 25% { transform: rotate(1.4deg); } 75% { transform: rotate(-1.4deg); } }
  .t-fl { left: -95px; bottom: -20px; height: min(80vh, 660px); }
  .t-fr { right: -120px; bottom: -26px; height: min(86vh, 710px); transform: scaleX(-1); }
  .rs-fg .fg.t-fr.shake { animation: none; }
  @media (max-width: 640px) {
    .t-fl { left: -125px; height: min(62vh, 520px); }
    .t-fr { display: none; }
  }

  /* ---- campfire ---- */
  .rs-campfire {
    position: absolute;
    left: 15%;
    bottom: 13.9%;
    z-index: 2;
    display: none;
    pointer-events: none;
  }
  .rs-campfire.on { display: block; }
  .rs-campfire svg { display: block; overflow: visible; }
  .rs-campfire .fl { transform-origin: 35px 52px; animation: rs-flame .7s ease-in-out infinite alternate; }
  .rs-campfire .fl.f2 { animation-duration: .5s; animation-direction: alternate-reverse; }
  .rs-campfire .fl.f3 { animation-duration: .38s; }
  @keyframes rs-flame {
    from { transform: scale(1, 1) skewX(-3deg); }
    to { transform: scale(.92, 1.12) skewX(4deg); }
  }
  .rs-campfire .spark { animation: rs-spark 1.8s ease-out infinite; opacity: 0; }
  .rs-campfire .spark.k2 { animation-delay: .6s; }
  .rs-campfire .spark.k3 { animation-delay: 1.2s; }
  @keyframes rs-spark {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translate(var(--sx, 8px), -46px); opacity: 0; }
  }
  .rs-fireglow {
    position: absolute;
    left: 50%;
    bottom: -18px;
    width: 190px;
    height: 130px;
    transform: translateX(-50%);
    background: radial-gradient(closest-side, rgba(255, 176, 90, .42), rgba(255, 176, 90, 0));
    animation: rs-glow 1.4s ease-in-out infinite;
  }
  @keyframes rs-glow { 50% { opacity: .6; } }

  /* ---- particles ---- */
  .rs-snowp {
    position: absolute;
    top: -12px;
    width: var(--sz, 5px);
    height: var(--sz, 5px);
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 6px rgba(255, 255, 255, .8);
    opacity: .92;
    animation: rs-fall var(--d, 12s) linear forwards;
    z-index: 2;
    pointer-events: none;
  }
  .rs-leaf {
    position: absolute;
    top: -24px;
    pointer-events: none;
    animation: rs-fall var(--d, 11s) linear forwards;
    z-index: 2;
  }
  @keyframes rs-fall {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(calc(var(--drift, 40px) * .6), 27vh) rotate(90deg); }
    50% { transform: translate(calc(var(--drift, 40px) * .2), 54vh) rotate(170deg); }
    75% { transform: translate(calc(var(--drift, 40px) * .9), 81vh) rotate(260deg); }
    100% { transform: translate(var(--drift, 40px), 108vh) rotate(340deg); }
  }
  .rs-ffly {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #FFF6A8;
    box-shadow: 0 0 10px 4px rgba(255, 240, 130, .65);
    z-index: 2;
    pointer-events: none;
    animation: rs-ffly var(--d, 12s) ease-in-out forwards;
  }
  @keyframes rs-ffly {
    0% { transform: translate(0, 0); opacity: 0; }
    12% { opacity: 1; }
    30% { transform: translate(calc(var(--drift, 40px) * .5), -22px); opacity: .3; }
    50% { transform: translate(var(--drift, 40px), -8px); opacity: 1; }
    70% { transform: translate(calc(var(--drift, 40px) * 1.4), -40px); opacity: .35; }
    88% { opacity: 1; }
    100% { transform: translate(calc(var(--drift, 40px) * 1.9), -64px); opacity: 0; }
  }
  .rs-gull {
    position: absolute;
    left: -60px;
    z-index: 2;
    pointer-events: none;
    animation: rs-gull var(--d, 22s) linear forwards;
  }
  .rs-gull svg { display: block; animation: rs-gullflap .8s ease-in-out infinite alternate; }
  @keyframes rs-gull { to { transform: translate(calc(100vw + 120px), var(--drift, -40px)); } }
  @keyframes rs-gullflap { from { transform: scaleY(1); } to { transform: scaleY(.45); } }

  .rs-bfly {
    position: absolute;
    z-index: 4;
    pointer-events: none;
    transition: left 1.5s ease-in-out, bottom 1.5s ease-in-out;
  }
  .rs-bfly svg { display: block; overflow: visible; }
  .rs-bfly .wg { transform-origin: 12px 10px; animation: rs-flap .22s ease-in-out infinite alternate; }
  @keyframes rs-flap { from { transform: scaleX(1); } to { transform: scaleX(.25); } }

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
  .rsq {
    --fur: #E6A96E;
    --tail: #DA9154;
    --tail-l: #F0BD88;
    --line: #7B4A30;
    --cream: #FFF4E1;
    --pink: #F8ABA2;
    --eye: #3B2A22;
    display: block;
    width: 152px;
    height: auto;
    overflow: visible;
  }
  .rsq.gray { --fur: #C9C2BA; --tail: #B3ACA4; --tail-l: #DAD4CC; --line: #6A625C; --cream: #FBF7F0; }
  .rsq .ol { stroke: var(--line); stroke-width: 2.4; stroke-linejoin: round; stroke-linecap: round; }
  .rsq .es { fill: none; stroke: var(--eye); stroke-width: 2.8; stroke-linecap: round; stroke-linejoin: round; }
  .rsq .ms { fill: none; stroke: var(--line); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .rsq [data-e], .rsq [data-m], .rsq [data-p] { display: none; }
  .rsq [data-e].on, .rsq [data-m].on, .rsq [data-p].on { display: inline; }

  .rsq .q-all { transform-origin: 70px 150px; animation: rs-breathe 3.4s ease-in-out infinite; }
  @keyframes rs-breathe { 50% { transform: scale(1.014, .98); } }
  .rsq .q-tail { transform-origin: 96px 136px; animation: rs-tail 3s ease-in-out infinite; }
  @keyframes rs-tail { 0%, 100% { transform: rotate(-2.5deg); } 50% { transform: rotate(4.5deg); } }
  .rsq.wag .q-tail { animation-duration: .42s; }
  .rsq .q-head {
    transform-origin: 70px 94px;
    transform: rotate(var(--tilt, 0deg)) translateY(var(--hy, 0px));
    transition: transform .45s cubic-bezier(.3, 1.4, .5, 1);
  }
  .rsq .q-eyes {
    transform-origin: 70px 67px;
    transform: translate(var(--lx, 0px), var(--ly, 0px));
    transition: transform .25s ease;
  }
  .rsq.blink .q-eyes { transform: translate(var(--lx, 0px), var(--ly, 0px)) scaleY(.08); transition: none; }
  .rsq .q-ear { transition: transform .12s ease; }
  .rsq .q-earL { transform-origin: 48px 40px; }
  .rsq .q-earR { transform-origin: 92px 40px; }
  .rsq.twl .q-earL { transform: rotate(-15deg); }
  .rsq.twr .q-earR { transform: rotate(15deg); }
  .rsq .q-muzzle { transform-origin: 70px 82px; transition: transform .2s ease; }
  .rsq.puff .q-muzzle { transform: scale(1.14, 1.06); }
  .rsq .q-blush { transition: opacity .3s ease; }
  .rsq.shy .q-blush { opacity: 1; }
  .rsq .q-chew { transform-origin: 70px 82px; animation: rs-chew .26s ease-in-out infinite alternate; }
  @keyframes rs-chew { from { transform: scaleY(.5); } to { transform: scaleY(1.25) translateY(.6px); } }
  .rsq .q-spark { transform-origin: center; transform-box: fill-box; animation: rs-twinkle 1s ease-in-out infinite; }
  .rsq .q-snot { transform-origin: 73px 79px; animation: rs-snot 4.2s ease-in-out infinite; }
  @keyframes rs-snot { 0%, 100% { transform: scale(.35); } 50% { transform: scale(1.15); } }

  .rsq .q-arm { transition: transform .4s cubic-bezier(.3, 1.3, .5, 1); }
  .rsq .q-armL { transform-origin: 48px 99px; transform: rotate(var(--al, -26deg)); }
  .rsq .q-armR { transform-origin: 92px 99px; transform: rotate(var(--ar, 26deg)); }
  .rsq[data-pose="hold"] { --al: -112deg; --ar: 112deg; }
  .rsq .q-arm > ellipse { transform-box: fill-box; transform-origin: 50% 6%; transform: scaleY(var(--ak, 1)); transition: transform .4s ease; }
  .rsq .q-arm > g { transform: translateY(calc((var(--ak, 1) - 1) * 19px)); }
  .rsq[data-pose="up"] { --al: 120deg; --ar: -120deg; --ak: 1.55; }
  .rsq[data-pose="wave"], .rsq[data-pose="cheer"] { --ak: 1.55; }
  .rsq[data-pose="shy"] { --al: -128deg; --ar: 128deg; }
  .rsq[data-pose="read"] { --al: -38deg; --ar: 38deg; }
  .rsq[data-pose="warm"] { --al: -78deg; --ar: 78deg; }
  .rsq[data-pose="wave"] .q-armR { animation: rs-armwave .26s ease-in-out infinite alternate; }
  @keyframes rs-armwave { from { transform: rotate(-100deg); } to { transform: rotate(-136deg); } }
  .rsq[data-pose="cheer"] .q-armL { animation: rs-cheerL .3s ease-in-out infinite alternate; }
  .rsq[data-pose="cheer"] .q-armR { animation: rs-cheerR .3s ease-in-out infinite alternate; }
  @keyframes rs-cheerL { from { transform: rotate(100deg); } to { transform: rotate(136deg); } }
  @keyframes rs-cheerR { from { transform: rotate(-136deg); } to { transform: rotate(-100deg); } }
  .rsq[data-pose="face"] .q-armL { animation: rs-groomL .2s ease-in-out infinite alternate; }
  .rsq[data-pose="face"] .q-armR { animation: rs-groomR .2s ease-in-out infinite alternate; }
  @keyframes rs-groomL { from { transform: rotate(-126deg); } to { transform: rotate(-146deg); } }
  @keyframes rs-groomR { from { transform: rotate(146deg); } to { transform: rotate(126deg); } }
  .rsq[data-pose="dig"] .q-armL { animation: rs-digL .16s ease-in-out infinite alternate; }
  .rsq[data-pose="dig"] .q-armR { animation: rs-digL .16s ease-in-out infinite alternate-reverse; }
  @keyframes rs-digL { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }
  .rsq.has-umbrella[data-pose] { --ar: -152deg; }
  .rsq.has-umbrella .q-armR { animation: none !important; }
  .rsq .q-umb { transform-origin: 101px 84px; animation: rs-umb 3.6s ease-in-out infinite alternate; }
  @keyframes rs-umb { from { transform: rotate(-2deg); } to { transform: rotate(2.5deg); } }
  .rsq.has-cup .q-arm { visibility: hidden; }
  .rsq .q-cup { transition: transform .5s ease; }
  .rsq.sip .q-cup { transform: translateY(-13px) rotate(-8deg); transform-origin: 70px 104px; }
  .rsq .q-steam { animation: rs-steam 2.4s ease-in-out infinite; }
  .rsq.sip .q-steam { display: none; }
  @keyframes rs-steam { 0% { transform: translateY(3px); opacity: 0; } 40% { opacity: .9; } 100% { transform: translateY(-7px); opacity: 0; } }
  .rsq .q-held { transform-origin: 70px 95px; }
  .rsq.puff .q-held { animation: rs-nibble .26s ease-in-out infinite alternate; }
  @keyframes rs-nibble { from { transform: translateY(0); } to { transform: translateY(-1.5px) rotate(3deg); } }

  .rs-flip { transform: scaleX(var(--flip, 1)); transform-origin: 50% 100%; }
  .rs-flip.hop { animation: rs-hop .34s ease-in-out infinite; }
  @keyframes rs-hop {
    0%, 100% { transform: scaleX(var(--flip, 1)) translateY(0) scale(1.06, .93); }
    50% { transform: scaleX(var(--flip, 1)) translateY(-12px) scale(.97, 1.04); }
  }

  .rs-act { transform-origin: 50% 100%; }
  .rs-act.a-jump { animation: rs-jump .62s cubic-bezier(.3, .6, .4, 1); }
  .rs-act.a-jump2 { animation: rs-jump .58s cubic-bezier(.3, .6, .4, 1) 2; }
  @keyframes rs-jump {
    0% { transform: scale(1.1, .88); }
    35% { transform: translateY(-46px) scale(.95, 1.07); }
    55% { transform: translateY(-52px); }
    85% { transform: translateY(0) scale(1.1, .88); }
    100% { transform: none; }
  }
  .rs-act.a-spin { transform-origin: 46% 55%; animation: rs-spin .85s ease-in-out; }
  @keyframes rs-spin {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-62px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
  }
  .rs-act.a-sway { animation: rs-sway .6s ease-in-out infinite alternate; }
  @keyframes rs-sway { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
  .rs-act.a-bounce { animation: rs-bounce .36s ease-in-out infinite; }
  @keyframes rs-bounce { 0%, 100% { transform: scale(1.04, .95); } 50% { transform: translateY(-10px); } }
  .rs-act.a-shiver { animation: rs-shiver .09s linear infinite; }
  @keyframes rs-shiver { 50% { transform: translateX(1.8px); } }
  .rs-act.a-sneeze { animation: rs-sneeze .5s ease; }
  @keyframes rs-sneeze {
    0% { transform: rotate(-7deg) scale(.96, 1.06); }
    40% { transform: rotate(9deg) scale(1.12, .84); }
    100% { transform: none; }
  }
  .rs-act.a-dig { animation: rs-dig .2s ease-in-out infinite alternate; }
  @keyframes rs-dig { from { transform: rotate(-9deg); } to { transform: rotate(-13deg) translateY(3px); } }
  .rs-act.a-sleep { animation: rs-sleep 4.2s ease-in-out infinite; }
  @keyframes rs-sleep { 0%, 100% { transform: scale(1.05, .9); } 50% { transform: scale(1.03, .93); } }
  .rs-act.a-squish { animation: rs-squish .4s ease; }
  @keyframes rs-squish { 35% { transform: scale(1.12, .86); } 70% { transform: scale(.97, 1.04); } }
  .rs-act.a-tall { animation: rs-tall 1.9s ease-in-out; }
  @keyframes rs-tall { 20%, 75% { transform: scale(.95, 1.09); } }
  .rs-act.a-lean { transform: rotate(-13deg); transition: transform .4s ease; }

  .rs-ground-acorn {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    transition: opacity .3s;
    animation: rs-pop .4s ease;
  }
  @keyframes rs-pop { 0% { transform: scale(0); } 70% { transform: scale(1.25); } }

  .rs-rainfx { position: absolute; inset: 0; z-index: 2; pointer-events: none; transition: background 2s ease; }
  .rs-rainfx.on { background: rgba(70, 82, 124, .2); }
  .rs-drop {
    position: absolute;
    top: -30px;
    width: 2px;
    height: 16px;
    border-radius: 2px;
    background: rgba(235, 244, 255, .5);
    animation: rs-dropfall var(--d, .9s) linear forwards;
  }
  @keyframes rs-dropfall { to { transform: translateY(112vh); } }

  .rs-zzz {
    position: absolute;
    top: 6%;
    right: 2%;
    font-weight: 800;
    color: #fff;
    font-size: 17px;
    letter-spacing: 2px;
    text-shadow: 0 2px 6px rgba(40, 30, 70, .45);
    opacity: 0;
    transition: opacity .5s;
    pointer-events: none;
  }
  .rs-zzz span { display: inline-block; animation: rs-zfloat 2.4s ease-in-out infinite; }
  .rs-zzz span:nth-child(2) { animation-delay: .4s; font-size: 14px; }
  .rs-zzz span:nth-child(3) { animation-delay: .8s; font-size: 11px; }
  .rs-zzz.on { opacity: .95; }
  @keyframes rs-zfloat { 50% { transform: translateY(-7px); } }

  .rs-heart {
    position: fixed;
    z-index: 7;
    pointer-events: none;
    font-weight: 800;
    font-size: 20px;
    line-height: 1;
    color: #fff;
    text-shadow: 0 2px 6px rgba(40, 30, 70, .5);
    animation: rs-heartup 1.3s ease-out forwards;
  }
  @keyframes rs-heartup {
    0% { transform: translateY(0) scale(.5); opacity: 0; }
    15% { opacity: 1; }
    100% { transform: translate(var(--hx, 0px), -72px) scale(1.15); opacity: 0; }
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
    max-width: 280px;
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
  .bb-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
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
    padding: 5px 10px;
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
    cursor: pointer;
  }
  .rs-friend .rsq { width: 134px; }

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
    font-weight: 800;
    letter-spacing: .02em;
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
    font-weight: 800;
    letter-spacing: .02em;
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
    font-weight: 800;
    font-size: 15px;
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
  .rs-foot span {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 999px;
    background: rgba(40, 32, 60, .32);
    color: rgba(255, 255, 255, .85);
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
    .rsq { width: 122px; }
    .rs-friend .rsq { width: 108px; }
  }
---
{% raw %}
<div class="risuta" id="rsApp">
  <div class="rs-sky" id="sky1"></div>
  <div class="rs-sky" id="sky2"></div>
  <div id="stars"></div>
  <div class="rs-sun"></div>
  <svg class="rs-moon" viewBox="0 0 60 60" aria-hidden="true">
    <path d="M40 6A26 26 0 1 0 54 42A21 21 0 0 1 40 6Z" fill="#FFF3CF"/>
    <circle cx="24" cy="34" r="3" fill="#F6DFA8" opacity=".7"/>
    <circle cx="33" cy="45" r="2" fill="#F6DFA8" opacity=".7"/>
  </svg>
  <div id="clouds"></div>
  <svg class="rs-bg bg-sougen" id="bgSougen" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true"></svg>
  <svg class="rs-bg bg-mori" id="bgMori" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true"></svg>
  <svg class="rs-bg bg-yuki" id="bgYuki" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true"></svg>
  <svg class="rs-bg bg-umi" id="bgUmi" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true"></svg>
  <div class="rs-ground"></div>
  <div class="rs-decor" id="decor" aria-hidden="true"></div>
  <div class="rs-fg" aria-hidden="true">
    <svg class="fg t-fl" id="fgL" viewBox="0 0 300 700"></svg>
    <svg class="fg t-fr" id="fgR" viewBox="0 0 300 700"></svg>
  </div>
  <div class="rs-campfire" id="campfire">
    <div class="rs-fireglow"></div>
    <svg viewBox="0 0 70 70" width="74" height="74" aria-hidden="true">
      <circle class="spark" cx="30" cy="30" r="1.6" fill="#FFD27A" style="--sx:-10px"/>
      <circle class="spark k2" cx="38" cy="28" r="1.3" fill="#FFE9A8" style="--sx:9px"/>
      <circle class="spark k3" cx="35" cy="32" r="1.5" fill="#FFB55C" style="--sx:3px"/>
      <path class="fl" d="M35 8C46 22 54 32 50 44C47 53 23 53 20 44C16 32 27 26 35 8Z" fill="#F7894A"/>
      <path class="fl f2" d="M35 22C42 31 47 37 44 45C42 51 28 51 26 45C23 37 30 33 35 22Z" fill="#FFC14D"/>
      <path class="fl f3" d="M35 34C38 39 41 42 39 47C38 50 32 50 31 47C29 42 33 40 35 34Z" fill="#FFF3B8"/>
      <rect x="10" y="50" width="50" height="9" rx="4.5" fill="#9A6A48" transform="rotate(-9 35 54)"/>
      <rect x="10" y="50" width="50" height="9" rx="4.5" fill="#B5805A" transform="rotate(9 35 54)"/>
      <circle cx="12.5" cy="58.3" r="3" fill="#D9AC84"/>
      <circle cx="57.5" cy="58.3" r="3" fill="#D9AC84"/>
    </svg>
  </div>
  <div id="leaves"></div>

  <div class="rs-rainfx" id="rainfx"></div>

  <div class="rs-sq" id="sq">
    <div class="rs-flip" id="sqFlip">
      <div class="rs-act" id="sqAct"></div>
    </div>
    <div class="rs-zzz" id="zzz"><span>Z</span><span>z</span><span>z</span></div>
  </div>
  <div class="rs-bubble" id="bubble">
    <p id="bubbleText"></p>
    <div class="bb-actions" id="bubbleActions"></div>
  </div>

  <div class="rs-hud-tl">
    <div class="rs-chip glass" id="acornChip">
      <svg id="acornIcon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="15" rx="6.6" ry="7.6" fill="#DDA45E" stroke="#7B4A30" stroke-width="1.4"/><path d="M4 10.5C4 3.5 20 3.5 20 10.5C16 8.3 8 8.3 4 10.5Z" fill="#8E5E40" stroke="#7B4A30" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 5V2" stroke="#7B4A30" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="9.4" cy="14.5" rx="1.4" ry="2.6" fill="#fff" opacity=".45"/></svg>
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
    <h3><svg width="14" height="14" viewBox="0 0 24 24" style="vertical-align:-2px;margin-right:6px;" aria-hidden="true"><ellipse cx="12" cy="15" rx="6.6" ry="7.6" fill="#DDA45E" stroke="#7B4A30" stroke-width="1.4"/><path d="M4 10.5C4 3.5 20 3.5 20 10.5C16 8.3 8 8.3 4 10.5Z" fill="#8E5E40" stroke="#7B4A30" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 5V2" stroke="#7B4A30" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="9.4" cy="14.5" rx="1.4" ry="2.6" fill="#fff" opacity=".45"/></svg>どんぐりを つかう</h3>
    <div class="rs-spend">
      <button type="button" data-cost="1"><span>おやつを あげる</span><span class="cost">×1</span></button>
      <button type="button" data-cost="3"><span>あっちむいてホイ</span><span class="cost">×3</span></button>
      <button type="button" data-cost="10"><span>どんぐりシャワー</span><span class="cost">×10</span></button>
      <button type="button" data-cost="30"><span>ともだちを よぶ</span><span class="cost">×30</span></button>
    </div>
  </div>

  <footer class="rs-foot"><span>made with <i class="fa-solid fa-heart"></i> by <a href="/apps/">naoqoo2</a></span></footer>
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

  /* ---------- squirrel (SVG・表情とポーズを差し替えできる) ---------- */
  function eyePair(fn) { return fn(52) + fn(88); }
  var SQ_SVG = [
    '<svg class="rsq" viewBox="0 -26 170 182" aria-hidden="true" data-pose="rest">',
    '<ellipse cx="76" cy="151" rx="46" ry="4.5" fill="rgba(40,30,70,.16)"/>',
    '<g class="q-all">',
    // しっぽ
    '<g class="q-tail">',
    '<path class="ol" fill="var(--tail)" d="M92 138C112 144 141 134 147 107C163 95 165 62 147 46C131 32 106 38 102 58C99 72 110 82 121 77C117 92 105 100 100 113C97 123 96 131 92 138Z"/>',
    '<path fill="none" stroke="var(--tail-l)" stroke-width="9" stroke-linecap="round" d="M112 127C126 123 134 113 136 99C148 89 150 71 141 60C134 52 122 51 116 59"/>',
    '</g>',
    // からだ
    '<ellipse class="ol" cx="52" cy="146" rx="13" ry="6" fill="var(--fur)"/>',
    '<ellipse class="ol" cx="88" cy="146" rx="13" ry="6" fill="var(--fur)"/>',
    '<path class="ol" fill="var(--fur)" d="M70 82C49 82 37 102 37 123C37 139 50 148 70 148C90 148 103 139 103 123C103 102 91 82 70 82Z"/>',
    '<ellipse cx="70" cy="122" rx="20" ry="22" fill="var(--cream)"/>',
    // あたま
    '<g class="q-head">',
    '<g class="q-ear q-earL"><path class="ol" fill="var(--fur)" d="M37 46C30 27 34 11 42 11C51 11 58 24 59 37Z"/><path fill="var(--pink)" d="M41 40C37 28 39 19 43.5 19C48 19 53 27 54 36Z"/></g>',
    '<g class="q-ear q-earR"><path class="ol" fill="var(--fur)" d="M103 46C110 27 106 11 98 11C89 11 82 24 81 37Z"/><path fill="var(--pink)" d="M99 40C103 28 101 19 96.5 19C92 19 87 27 86 36Z"/></g>',
    '<path class="ol" fill="var(--fur)" d="M70 28C43 28 27 45 27 65C27 85 44 99 70 99C96 99 113 85 113 65C113 45 97 28 70 28Z"/>',
    '<g class="q-muzzle"><path fill="var(--cream)" d="M70 70C59 65 45 71 45 82C45 91 57 95.5 70 95.5C83 95.5 95 91 95 82C95 71 81 65 70 70Z"/></g>',
    '<ellipse class="q-blush" cx="38.5" cy="78" rx="6.5" ry="4" fill="var(--pink)" opacity=".7"/>',
    '<ellipse class="q-blush" cx="101.5" cy="78" rx="6.5" ry="4" fill="var(--pink)" opacity=".7"/>',
    // め
    '<g class="q-eyes">',
    '<g data-e="open">' + eyePair(function (x) {
      return '<ellipse cx="' + x + '" cy="67" rx="5.8" ry="7.2" fill="var(--eye)"/><circle cx="' + (x - 1.9) + '" cy="64.2" r="2.3" fill="#fff"/><circle cx="' + (x + 2) + '" cy="69.8" r="1.1" fill="#fff" opacity=".85"/>';
    }) + '</g>',
    '<g data-e="happy">' + eyePair(function (x) { return '<path class="es" d="M' + (x - 6) + ' 69Q' + x + ' 60 ' + (x + 6) + ' 69"/>'; }) + '</g>',
    '<g data-e="sleep">' + eyePair(function (x) { return '<path class="es" d="M' + (x - 6) + ' 66Q' + x + ' 72 ' + (x + 6) + ' 66"/>'; }) + '</g>',
    '<g data-e="wide">' + eyePair(function (x) {
      return '<circle cx="' + x + '" cy="66" r="7.6" fill="#fff" stroke="var(--eye)" stroke-width="2"/><circle cx="' + x + '" cy="66" r="3.4" fill="var(--eye)"/>';
    }) + '</g>',
    '<g data-e="sparkle">' + eyePair(function (x) {
      return '<ellipse cx="' + x + '" cy="67" rx="6.6" ry="8" fill="var(--eye)"/><circle cx="' + (x - 2) + '" cy="63.6" r="3" fill="#fff"/><circle cx="' + (x + 2.4) + '" cy="70.6" r="1.7" fill="#fff"/>';
    }) + '<path class="q-spark" fill="#FFE27A" d="M36 47Q36.8 51.2 41 52Q36.8 52.8 36 57Q35.2 52.8 31 52Q35.2 51.2 36 47Z"/><path class="q-spark" fill="#FFE27A" d="M105 49Q105.6 52.4 109 53Q105.6 53.6 105 57Q104.4 53.6 101 53Q104.4 52.4 105 49Z"/></g>',
    '<g data-e="wink"><ellipse cx="52" cy="67" rx="5.8" ry="7.2" fill="var(--eye)"/><circle cx="50.1" cy="64.2" r="2.3" fill="#fff"/><circle cx="54" cy="69.8" r="1.1" fill="#fff" opacity=".85"/><path class="es" d="M82 69Q88 60 94 69"/></g>',
    '<g data-e="heart">' + eyePair(function (x) { return '<path transform="translate(' + x + ' 67) scale(1.2)" d="M0 5C-9 -1 -6 -8 0 -3.5C6 -8 9 -1 0 5Z" fill="#F0607A"/>'; }) + '</g>',
    '<g data-e="half">' + eyePair(function (x) {
      return '<path d="M' + (x - 5.8) + ' 67A5.8 6.6 0 0 0 ' + (x + 5.8) + ' 67Z" fill="var(--eye)"/><path class="es" d="M' + (x - 7) + ' 67H' + (x + 7) + '"/>';
    }) + '</g>',
    '<g data-e="squeeze"><path class="es" d="M46 62.5L57 67L46 71.5"/><path class="es" d="M94 62.5L83 67L94 71.5"/></g>',
    '</g>',
    // はな・くち
    '<path d="M66.4 75.6Q70 73.4 73.6 75.6Q72.8 79.2 70 79.6Q67.2 79.2 66.4 75.6Z" fill="#8C5546"/>',
    '<path data-m="smile" class="ms" d="M63.5 82Q66.7 86.6 70 82Q73.3 86.6 76.5 82"/>',
    '<g data-m="open"><path d="M64.5 82.5Q70 81.3 75.5 82.5Q75 91.5 70 91.5Q65 91.5 64.5 82.5Z" fill="#A9504C" stroke="var(--line)" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="70" cy="89" rx="3" ry="1.9" fill="#F59B95"/></g>',
    '<ellipse data-m="o" cx="70" cy="85.4" rx="2.8" ry="3.4" fill="#8E4A44"/>',
    '<g data-m="yawn"><ellipse cx="70" cy="87.4" rx="6" ry="7.4" fill="#A9504C" stroke="var(--line)" stroke-width="1.6"/><ellipse cx="70" cy="91.4" rx="3.4" ry="2.3" fill="#F59B95"/></g>',
    '<path data-m="munch" class="ms q-chew" d="M63.5 82Q66.7 86.6 70 82Q73.3 86.6 76.5 82"/>',
    '<path data-m="flat" class="ms" d="M66 83.4Q70 85.2 74 83.4"/>',
    // あたまの小物
    '<circle data-p="snot" class="q-snot" cx="80" cy="80" r="6.5" fill="rgba(215,240,255,.75)" stroke="#fff" stroke-width="1"/>',
    '<g data-p="glasses"><circle cx="52" cy="67" r="9.4" fill="rgba(255,255,255,.28)" stroke="#6B4A3A" stroke-width="1.8"/><circle cx="88" cy="67" r="9.4" fill="rgba(255,255,255,.28)" stroke="#6B4A3A" stroke-width="1.8"/><path d="M61.4 66Q70 62 78.6 66" fill="none" stroke="#6B4A3A" stroke-width="1.8"/></g>',
    '<g data-p="leafhat" transform="translate(72 27) rotate(-16)"><path d="M-14 0Q0 -13 14 0Q0 9 -14 0Z" fill="#8FCB6C" stroke="#5E9A48" stroke-width="1.8" stroke-linejoin="round"/><path d="M-10 0H10" stroke="#5E9A48" stroke-width="1.3" stroke-linecap="round"/></g>',
    '<g data-p="flower" transform="translate(46 37)"><circle cx="0" cy="-5.4" r="4.3" fill="#FF9DB8"/><circle cx="5.1" cy="-1.7" r="4.3" fill="#FF9DB8"/><circle cx="3.2" cy="4.4" r="4.3" fill="#FF9DB8"/><circle cx="-3.2" cy="4.4" r="4.3" fill="#FF9DB8"/><circle cx="-5.1" cy="-1.7" r="4.3" fill="#FF9DB8"/><circle cx="0" cy="0" r="3.3" fill="#FFE27A"/></g>',
    '</g>',
    // マフラー
    '<g data-p="scarf"><path class="ol" fill="#F2766A" d="M41 92Q70 107 99 92L101 100Q70 116 39 100Z"/><path class="ol" fill="#F2766A" d="M52 104L47 123L58 125L62 107Z"/><path d="M49.5 115l9 2M55 98.5q4 2.4 7 3M79 101.5q4-.8 7-2.6" stroke="#FFD9CF" stroke-width="2" stroke-linecap="round" fill="none"/></g>',
    // うで
    '<g class="q-arm q-armL"><ellipse class="ol" cx="48" cy="107.5" rx="6.3" ry="10" fill="var(--fur)"/><g data-p="pom"><circle cx="48" cy="118" r="9.5" fill="#FFD95E" stroke="#E9A93C" stroke-width="1.6"/><path d="M43 114l4 4M53 114l-3 5M48 123v-4" stroke="#E9A93C" stroke-width="1.4" stroke-linecap="round"/></g></g>',
    '<g class="q-arm q-armR"><ellipse class="ol" cx="92" cy="107.5" rx="6.3" ry="10" fill="var(--fur)"/><g data-p="pom"><circle cx="92" cy="118" r="9.5" fill="#FF9DB8" stroke="#E86E90" stroke-width="1.6"/><path d="M87 114l4 4M97 114l-3 5M92 123v-4" stroke="#E86E90" stroke-width="1.4" stroke-linecap="round"/></g></g>',
    // もちもの
    '<g data-p="acorn"><g class="q-held"><g transform="translate(70 95)"><ellipse class="ol" cx="0" cy="2.5" rx="6.8" ry="7.8" fill="#DDA45E"/><path class="ol" fill="#8E5E40" d="M-8 -1C-8 -8 8 -8 8 -1C4 -3.4 -4 -3.4 -8 -1Z"/><path d="M0 -6.5V-10" class="ms"/><ellipse cx="-2.6" cy="2" rx="1.4" ry="2.6" fill="#fff" opacity=".45"/></g></g></g>',
    '<g data-p="shell"><g transform="translate(70 96)"><path class="ol" fill="#FFCFDA" d="M-10 1A10 10 0 0 1 10 1L4 9H-4Z"/><path d="M0 -8V8M-5 -6L-2 8M5 -6L2 8" stroke="#F09AB0" stroke-width="1.3" stroke-linecap="round" fill="none"/></g></g>',
    '<g data-p="book"><path class="ol" fill="#7FB5E8" d="M70 103L49 100V121L70 125Z"/><path class="ol" fill="#6BA5DD" d="M70 103L91 100V121L70 125Z"/><path d="M52 123.5L70 127.5L88 123.5" stroke="#FFF6E6" stroke-width="2.2" stroke-linecap="round" fill="none"/><path transform="translate(80.5 112) scale(.55)" d="M0 5C-9 -1 -6 -8 0 -3.5C6 -8 9 -1 0 5Z" fill="#FFF6E6"/><ellipse class="ol" cx="50" cy="113" rx="4" ry="5" fill="var(--fur)"/><ellipse class="ol" cx="90" cy="113" rx="4" ry="5" fill="var(--fur)"/></g>',
    '<g data-p="cup"><g class="q-cup"><path class="q-steam" d="M66 92q-3-4 0-7M74 92q3-4 0-7" stroke="#fff" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse class="ol" cx="53" cy="105" rx="5.6" ry="9.5" fill="var(--fur)" transform="rotate(-62 53 105)"/><ellipse class="ol" cx="87" cy="105" rx="5.6" ry="9.5" fill="var(--fur)" transform="rotate(62 87 105)"/><path class="ol" fill="#fff" d="M60.5 97.5H79.5V106Q79.5 114 70 114Q60.5 114 60.5 106Z"/><ellipse cx="70" cy="98.6" rx="7.6" ry="1.5" fill="#C98F52"/></g></g>',
    '<g data-p="umbrella"><g class="q-umb"><path d="M101 84Q105 44 94 9" fill="none" stroke="#5E9A48" stroke-width="3.2" stroke-linecap="round"/><path d="M14 10C26 -22 112 -32 138 4C118 -1 104 8 94 9C76 2 42 1 14 10Z" fill="#84CB6E" stroke="#5E9A48" stroke-width="2.4" stroke-linejoin="round"/><path d="M94 9C80 -6 62 -12 44 -8M94 9C100 -4 112 -8 122 -6" fill="none" stroke="#5E9A48" stroke-width="1.6" stroke-linecap="round"/></g></g>',
    '</g></svg>'
  ].join('');

  var BLINKABLE = { open: 1, sparkle: 1, wide: 1, half: 1, wink: 0 };
  var ACT_PROPS = ['acorn', 'shell', 'book', 'glasses', 'cup', 'pom', 'snot'];
  function makeSq(holder, extraClass) {
    holder.innerHTML = SQ_SVG;
    var el = holder.firstChild;
    if (extraClass) el.classList.add(extraClass);
    var st = { eyes: '', mouth: '' };
    function pick(attr, name) {
      el.querySelectorAll('[data-' + attr + ']').forEach(function (n) {
        n.classList.toggle('on', n.getAttribute('data-' + attr) === name);
      });
    }
    var api = {
      el: el,
      head: el.querySelector('.q-head'),
      eyes: function (n) { if (st.eyes !== n) { st.eyes = n; pick('e', n); } },
      mouth: function (n) { if (st.mouth !== n) { st.mouth = n; pick('m', n); } },
      face: function (e, m) { api.eyes(e); if (m) api.mouth(m); },
      pose: function (p) { el.setAttribute('data-pose', p); },
      prop: function (name, on) {
        el.querySelectorAll('[data-p="' + name + '"]').forEach(function (n) { n.classList.toggle('on', !!on); });
        el.classList.toggle('has-' + name, !!on);
      },
      cls: function (c, on) { el.classList.toggle(c, !!on); },
      look: function (x, y) { el.style.setProperty('--lx', x + 'px'); el.style.setProperty('--ly', y + 'px'); },
      tilt: function (deg, hy) { el.style.setProperty('--tilt', deg + 'deg'); el.style.setProperty('--hy', (hy || 0) + 'px'); },
      blink: function () {
        if (!BLINKABLE[st.eyes]) return;
        el.classList.add('blink');
        setTimeout(function () { el.classList.remove('blink'); }, 130);
      },
      twitch: function () {
        var c = Math.random() < 0.5 ? 'twl' : 'twr';
        el.classList.add(c);
        setTimeout(function () { el.classList.remove(c); }, 130);
        setTimeout(function () { el.classList.add(c); }, 260);
        setTimeout(function () { el.classList.remove(c); }, 390);
      },
      reset: function () {
        api.face('open', 'smile');
        api.pose('rest');
        api.look(0, 0);
        api.tilt(0, 0);
        ACT_PROPS.forEach(function (p) { api.prop(p, false); });
        ['puff', 'wag', 'sip', 'shy'].forEach(function (c) { el.classList.remove(c); });
      }
    };
    api.reset();
    return api;
  }

  var sq = $('sq');
  var actEl = $('sqAct');
  var Sq = makeSq(actEl);
  var Fr = null; // ともだちリス（よんだときだけ）
  function anim(cls, ms) {
    actEl.className = 'rs-act';
    if (!cls) return;
    void actEl.offsetWidth;
    actEl.classList.add(cls);
    if (ms) setTimeout(function () { actEl.classList.remove(cls); }, ms);
  }

  // まばたき・耳ぴくぴく（なにもしていない時もいきいきと）
  (function blinkLoop() {
    setTimeout(function () {
      Sq.blink();
      if (Fr) Fr.blink();
      if (Math.random() < 0.25) setTimeout(function () { Sq.blink(); }, 260);
      blinkLoop();
    }, 2200 + Math.random() * 3800);
  })();
  (function earLoop() {
    setTimeout(function () {
      Sq.twitch();
      if (Fr && Math.random() < 0.5) Fr.twitch();
      earLoop();
    }, 5000 + Math.random() * 9000);
  })();

  /* ---------- sky ---------- */
  var skyEls = [$('sky1'), $('sky2')];
  var skyActive = 0;
  var lastSky = '';
  var curSky = 'night';
  var SKY_PRESETS = {
    dawn: { c: ['#7F92D8', '#F6B3C4', '#FFE3BC'], st: 0.25, tint: '#E59AB0', ta: 18, sun: [1, 17, 44], sunF: 'hue-rotate(-12deg) saturate(1.2)', cloud: 0.9, lit: 0.4 },
    day: { c: ['#6CC2F4', '#A8E0F8', '#EDF9EE'], st: 0, tint: '#1D2150', ta: 0, sun: [1, 78, 9], sunF: 'none', cloud: 0.96, lit: 0 },
    dusk: { c: ['#5A4A9C', '#EE8496', '#FFC27C'], st: 0.3, tint: '#5B4A8A', ta: 34, sun: [1, 76, 48], sunF: 'hue-rotate(-24deg) saturate(1.5)', cloud: 0.85, lit: 0.8 },
    night: { c: ['#141A44', '#2A2E6C', '#5E5596'], st: 1, tint: '#1D2150', ta: 60, sun: [0, 78, 60], sunF: 'none', cloud: 0.22, lit: 1 }
  };
  function skyName(h) {
    if (h >= 5 && h < 8) return 'dawn';
    if (h >= 8 && h < 16) return 'day';
    if (h >= 16 && h < 19) return 'dusk';
    return 'night';
  }
  function applySky() {
    var name = S.skyMode !== 'auto' && SKY_PRESETS[S.skyMode] ? S.skyMode : skyName(new Date().getHours());
    if (name === lastSky) return;
    lastSky = name;
    curSky = name;
    var sc = SKY_PRESETS[name];
    var next = skyEls[1 - skyActive];
    next.style.setProperty('--s1', sc.c[0]);
    next.style.setProperty('--s2', sc.c[1]);
    next.style.setProperty('--s3', sc.c[2]);
    next.style.opacity = 1;
    skyEls[skyActive].style.opacity = 0;
    skyActive = 1 - skyActive;
    app.style.setProperty('--stars', sc.st);
    app.style.setProperty('--tint', sc.tint);
    app.style.setProperty('--ta', sc.ta + '%');
    app.style.setProperty('--sun-o', sc.sun[0]);
    app.style.setProperty('--sun-x', sc.sun[1] + '%');
    app.style.setProperty('--sun-y', sc.sun[2] + '%');
    app.style.setProperty('--sun-f', sc.sunF);
    app.style.setProperty('--cloud-o', sc.cloud);
    app.style.setProperty('--lit', sc.lit);
  }
  (function makeStars() {
    var holder = $('stars');
    for (var i = 0; i < 48; i++) {
      var st = document.createElement('div');
      st.className = 'rs-star';
      st.style.left = (Math.random() * 100) + '%';
      st.style.top = (Math.random() * 58) + '%';
      st.style.setProperty('--sz', (1.5 + Math.random() * 2.2).toFixed(1) + 'px');
      st.style.animationDelay = (Math.random() * 3.5) + 's';
      holder.appendChild(st);
    }
  })();
  function shootStar() {
    var el = document.createElement('div');
    el.className = 'rs-shoot';
    el.style.left = (35 + Math.random() * 55) + '%';
    el.style.top = (6 + Math.random() * 24) + '%';
    $('stars').appendChild(el);
    setTimeout(function () { el.remove(); }, 1300);
  }
  setInterval(function () { if (curSky === 'night' && Math.random() < 0.35) shootStar(); }, 14000);

  /* ---------- scenery（SVGをJSで組み立て） ---------- */
  function f1(n) { return Math.round(n * 10) / 10; }
  function C(c, more) { return ' class="c' + (more ? ' ' + more : '') + '" style="--c:' + c + '"'; }
  function pa(d, c, more) { return '<path' + C(c, more) + ' d="' + d + '"/>'; }
  function ci(x, y, r, c, more) { return '<circle' + C(c, more) + ' cx="' + f1(x) + '" cy="' + f1(y) + '" r="' + f1(r) + '"/>'; }
  function el2(x, y, rx, ry, c) { return '<ellipse' + C(c) + ' cx="' + f1(x) + '" cy="' + f1(y) + '" rx="' + f1(rx) + '" ry="' + f1(ry) + '"/>'; }
  function rc(x, y, w, h, c, r) { return '<rect' + C(c) + ' x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(w) + '" height="' + f1(h) + '" rx="' + f1(r || 0) + '"/>'; }
  function ln(d, c, w) { return '<path class="s" style="--s:' + c + '" fill="none" stroke-width="' + w + '" d="' + d + '"/>'; }
  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function tri(x, yb, yt, w, c, s) {
    return '<path class="c k" style="--c:' + c + ';stroke-width:' + f1(6 * s) + 'px" d="M' + f1(x - w) + ' ' + f1(yb) + 'L' + f1(x) + ' ' + f1(yt) + 'L' + f1(x + w) + ' ' + f1(yb) + 'Z"/>';
  }
  function rtree(x, y, s, c1, c2, tr) {
    return rc(x - 3 * s, y - 26 * s, 6 * s, 28 * s, tr, 3 * s) +
      ci(x - 14 * s, y - 34 * s, 15 * s, c1) + ci(x + 14 * s, y - 34 * s, 15 * s, c1) +
      ci(x, y - 47 * s, 21 * s, c1) + ci(x - 6 * s, y - 53 * s, 8 * s, c2);
  }
  function pine(x, y, s, c1, c2, tr, snow) {
    var h = rc(x - 2.5 * s, y - 14 * s, 5 * s, 16 * s, tr, 2 * s) +
      tri(x, y - 12 * s, y - 42 * s, 18 * s, c1, s) +
      tri(x, y - 31 * s, y - 58 * s, 14 * s, c2, s) +
      tri(x, y - 49 * s, y - 73 * s, 9.5 * s, c1, s);
    if (snow) {
      h += tri(x, y - 34 * s, y - 43 * s, 5.5 * s, '#FFFFFF', s * 0.8) +
        tri(x, y - 51 * s, y - 59 * s, 4.5 * s, '#FFFFFF', s * 0.8) +
        tri(x, y - 67 * s, y - 74 * s, 3.2 * s, '#FFFFFF', s * 0.8);
    }
    return h;
  }
  function wavy(y, amp, len, c, more) {
    var d = 'M-40 ' + y + 'q' + (len / 2) + ' ' + (-amp) + ' ' + len + ' 0';
    for (var x = -40 + len; x < 1250; x += len) d += 't' + len + ' 0';
    return pa(d + 'V420H-40Z', c, more);
  }
  function treeRow(y, sMin, sMax, step, c1, c2, tr) {
    var h = '';
    for (var x = -20; x < 1230; x += step * (0.75 + rnd() * 0.5)) {
      var s = sMin + rnd() * (sMax - sMin);
      h += rnd() < 0.42 ? pine(x, y, s, c1, c2, tr) : rtree(x, y, s, c1, c2, tr);
    }
    return h;
  }

  function buildSougen() {
    var h = pa('M0 292Q160 214 330 268T650 246T960 270T1200 236V420H0Z', '#D5F0C2');
    [[110, 262, 0.55], [250, 250, 0.5], [610, 250, 0.45], [905, 262, 0.55], [1050, 246, 0.6]].forEach(function (t) {
      h += rtree(t[0], t[1], t[2], '#B6E2A8', '#CBEDBE', '#CDB096');
    });
    h += pa('M0 338Q210 268 430 326T830 306T1200 318V420H0Z', '#B0E19C');
    h += rtree(520, 348, 1.3, '#7CCB80', '#9ADC98', '#B98A62');
    h += pine(160, 318, 0.9, '#86CF8C', '#9DDBA0', '#B98A62') + pine(196, 322, 0.7, '#86CF8C', '#9DDBA0', '#B98A62');
    h += rtree(960, 316, 0.9, '#86CF8C', '#A2DEA2', '#B98A62');
    // ちいさなおうち（夜は窓に明かり）
    h += '<circle class="c smoke" style="--c:#FFFFFF" cx="706" cy="296" r="5"/><circle class="c smoke s2" style="--c:#FFFFFF" cx="706" cy="296" r="5"/><circle class="c smoke s3" style="--c:#FFFFFF" cx="706" cy="296" r="5"/>';
    h += rc(702, 300, 8, 16, '#E58474', 1.5) + rc(668, 320, 44, 30, '#FFF4DC', 3);
    h += '<path class="c k" style="--c:#F4907E;stroke-width:6px" d="M665 321L690 300L715 321Z"/>';
    h += rc(685, 333, 10, 17, '#C98B62', 3) + rc(672.5, 328, 9, 9, '#BFE6F5', 2) + rc(698.5, 328, 9, 9, '#BFE6F5', 2);
    h += '<rect class="lit" x="672.5" y="328" width="9" height="9" rx="2" fill="#FFE27A"/><rect class="lit" x="698.5" y="328" width="9" height="9" rx="2" fill="#FFE27A"/>';
    // ひつじ
    [[318, 352], [352, 362], [846, 338]].forEach(function (p) {
      h += rc(p[0] - 6, p[1] + 3, 2.4, 6, '#6B5A54', 1) + rc(p[0] + 3, p[1] + 3, 2.4, 6, '#6B5A54', 1) +
        el2(p[0], p[1], 10, 7, '#FFFFFF') + ci(p[0] - 9, p[1] - 2, 4, '#6B5A54');
    });
    h += pa('M0 384Q260 336 520 374T1000 362T1200 374V420H0Z', '#95D686');
    var cols = ['#FFFFFF', '#FFD0DE', '#FFE98A', '#FFFFFF'];
    for (var i = 0; i < 46; i++) h += ci(rnd() * 1200, 394 + rnd() * 24, 1.8 + rnd() * 1.2, cols[i % 4]);
    $('bgSougen').innerHTML = h;
  }
  function buildMori() {
    var h = '<path class="ray" fill="#FFFBE0" d="M360 0L470 0L330 420L170 420Z"/><path class="ray" fill="#FFFBE0" d="M640 0L700 0L640 420L540 420Z"/><path class="ray" fill="#FFFBE0" d="M880 0L1010 0L960 420L790 420Z"/>';
    h += rc(-10, 336, 1220, 90, '#CDEAD0') + treeRow(374, 1.5, 2.1, 60, '#CDEAD0', '#DBF2DD', '#C3D2BD');
    h += rc(-10, 372, 1220, 60, '#9CD4A8') + treeRow(400, 1.7, 2.4, 76, '#9CD4A8', '#B2E0BA', '#B39C84');
    h += treeRow(426, 2.0, 2.9, 94, '#66B682', '#80C795', '#A77B58');
    for (var x = -10; x < 1220; x += 34 + rnd() * 30) h += ci(x, 418 + rnd() * 6, 16 + rnd() * 12, rnd() < 0.5 ? '#58AA75' : '#6CBB85');
    $('bgMori').innerHTML = h;
  }
  function mount(x, t, w, c, id) {
    var d = 'M' + (x - w) + ' 420C' + f1(x - w * 0.5) + ' 420 ' + f1(x - w * 0.3) + ' ' + t + ' ' + x + ' ' + t + 'C' + f1(x + w * 0.3) + ' ' + t + ' ' + f1(x + w * 0.5) + ' 420 ' + (x + w) + ' 420Z';
    var cap = 'M' + (x - w) + ' ' + (t - 20) + 'H' + (x + w) + 'V' + (t + 58);
    for (var k = 0; k < Math.ceil(w / 22); k++) cap += 'q-11 16 -22 0t-22 0';
    return '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath>' + pa(d, c) +
      '<path class="c" style="--c:#FFFFFF" clip-path="url(#' + id + ')" d="' + cap + 'Z"/>';
  }
  function buildYuki() {
    var h = mount(250, 150, 300, '#C3D3F1', 'rsMk1') + mount(960, 172, 290, '#BECFEF', 'rsMk2') + mount(610, 92, 360, '#D2DFF6', 'rsMk3');
    h += pa('M0 350Q200 300 420 344T860 330T1200 344V420H0Z', '#E6EFFA');
    [[70, 344, 1.3], [140, 350, 1.0], [320, 342, 1.5], [392, 352, 1.05], [770, 350, 1.4], [838, 352, 1.0], [1010, 344, 1.5], [1100, 350, 1.1]].forEach(function (t) {
      h += pine(t[0], t[1], t[2], '#7FB8AA', '#96C9BB', '#A88468', true);
    });
    h += pa('M0 392Q280 350 560 384T1080 372T1200 380V420H0Z', '#F7FAFF');
    // ゆきだるま
    var sx = 548, sy = 392;
    h += ln('M' + (sx - 12) + ' ' + (sy - 44) + 'l-16 -10m6 3l-2 -7M' + (sx + 12) + ' ' + (sy - 44) + 'l16 -10m-6 3l2 -7', '#9A7458', 2.4);
    h += '<circle class="c s" style="--c:#FFFFFF;--s:#C5D7EC" stroke-width="2" cx="' + sx + '" cy="' + (sy - 17) + '" r="19"/>';
    h += '<circle class="c s" style="--c:#FFFFFF;--s:#C5D7EC" stroke-width="2" cx="' + sx + '" cy="' + (sy - 46) + '" r="13.5"/>';
    h += pa('M' + (sx - 13) + ' ' + (sy - 37) + 'q13 7 26 0l1 6q-14 8 -28 0Z', '#F2766A') + rc(sx + 5, sy - 33, 6, 13, '#F2766A', 2);
    h += rc(sx - 9, sy - 70, 18, 13, '#7FA8DD', 3) + rc(sx - 13, sy - 59, 26, 4.5, '#7FA8DD', 2);
    h += ci(sx - 4.5, sy - 49, 1.7, '#4A3A44') + ci(sx + 4.5, sy - 49, 1.7, '#4A3A44') + pa('M' + sx + ' ' + (sy - 46) + 'l9 2.2l-9 2Z', '#FF9A4D');
    h += ci(sx, sy - 22, 1.8, '#4A3A44') + ci(sx, sy - 13, 1.8, '#4A3A44');
    $('bgYuki').innerHTML = h;
  }
  function buildUmi() {
    var h = rc(-10, 250, 1220, 180, '#78D2E8');
    // しま と やしの木
    h += pa('M424 252Q520 196 616 252Z', '#F5E2AE') + ci(486, 238, 13, '#74C98A') + ci(556, 240, 11, '#74C98A');
    h += '<g class="palm">' + ln('M520 248Q513 222 526 196', '#B98A62', 7) +
      pa('M526 196C508 178 488 182 480 198C498 190 512 192 526 196Z', '#5FBC7A') +
      pa('M526 196C544 178 564 182 572 198C554 190 540 192 526 196Z', '#5FBC7A') +
      pa('M526 196C516 172 498 166 486 172C504 174 516 184 526 196Z', '#79CE8E') +
      pa('M526 196C536 172 554 166 566 172C548 174 536 184 526 196Z', '#79CE8E') +
      pa('M526 196C520 176 526 162 534 156C534 172 532 184 526 196Z', '#5FBC7A') +
      ci(523, 199, 3.4, '#A9744E') + ci(530, 200, 3.4, '#A9744E') + '</g>';
    h += pa('M940 252Q990 228 1040 252Z', '#F5E2AE') + ci(990, 240, 10, '#74C98A');
    // ヨット
    h += '<g class="boat"><g class="boatbob">' + ln('M700 230V262', '#9A7458', 2) +
      pa('M698 233L698 258L680 258Z', '#FFFFFF') + pa('M703 237L703 258L718 258Z', '#FF9C8A') +
      pa('M680 262H720L713 272H687Z', '#FFFFFF') + rc(684, 265.5, 32, 2.4, '#7FB5E8', 1) + '</g></g>';
    h += wavy(296, 5, 70, '#62C6E0', 'wavesB') + wavy(348, 5, 56, '#93E1E4', 'wavesA');
    h += '<path class="wavesA" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".75" d="M90 276h20M250 268h14M430 282h22M640 276h16M800 284h22M990 270h16M1120 280h20M180 320h24M520 326h20M880 322h26"/>';
    h += '<path class="wavesB" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".6" d="M160 290h16M340 300h20M560 296h14M740 302h20M930 294h18M60 372h26M320 378h22M600 370h28M860 380h22M1080 372h26"/>';
    [[300, 262], [470, 270], [612, 264], [760, 290], [900, 262], [1060, 268], [380, 312], [690, 318]].forEach(function (p, i) {
      h += '<circle class="glint g' + (i % 3 + 1) + '" cx="' + p[0] + '" cy="' + p[1] + '" r="2.2" fill="#fff"/>';
    });
    h += wavy(402, 4, 44, '#FFFFFF', 'wavesB');
    $('bgUmi').innerHTML = h;
  }
  function buildFg() {
    function tree(dark) {
      var t1 = dark ? '#9C7050' : '#A97C5A', lf = dark ? ['#4B9C6C', '#5EAE7C', '#74C08E'] : ['#52A372', '#66B684', '#7CC896'];
      return '<g>' +
        pa('M96 700C116 640 120 420 122 170L182 170C184 420 190 640 212 700Z', t1) +
        pa('M176 330C200 320 226 296 236 262L250 268C242 310 214 344 178 356Z', t1) +
        ln('M140 600q4 -40 0 -80M162 520q-3 -50 2 -90M136 400q5 -30 2 -60M166 300q-4 -30 0 -50', '#86603F', 3) +
        el2(152, 462, 11, 15, '#7A5437') +
        ci(60, 150, 78, lf[0]) + ci(244, 150, 82, lf[0]) + ci(150, 60, 92, lf[0]) +
        ci(150, 150, 96, lf[1]) + ci(30, 70, 62, lf[1]) + ci(272, 64, 64, lf[1]) + ci(262, 236, 40, lf[1]) +
        ci(96, 96, 46, lf[2]) + ci(206, 110, 40, lf[2]) + ci(150, 20, 44, lf[2]) +
        '</g>';
    }
    $('fgL').innerHTML = tree(true);
    $('fgR').innerHTML = tree(false);
  }
  function buildClouds() {
    var h = '';
    [[8, 210, 150, -20], [20, 150, 190, -95], [5, 260, 230, -160], [30, 120, 170, -60], [15, 180, 210, -130]].forEach(function (c) {
      h += '<div class="rs-cloud" style="--y:' + c[0] + '%;--w:' + c[1] + 'px;--d:' + c[2] + 's;--dl:' + c[3] + 's"><svg viewBox="0 0 200 90">' +
        ci(54, 58, 26, '#FFFFFF') + ci(98, 44, 34, '#FFFFFF') + ci(142, 58, 25, '#FFFFFF') + rc(34, 54, 130, 30, '#FFFFFF', 15) + '</svg></div>';
    });
    $('clouds').innerHTML = h;
  }
  function buildDecor() {
    function item(th, left, w, vb, inner, cls) {
      return '<svg class="dc dc-' + th + (cls ? ' ' + cls : '') + '" style="left:' + left + '%" width="' + w + '" viewBox="0 0 ' + vb + '">' + inner + '</svg>';
    }
    function flower(col) {
      var p = ln('M11 34V15', '#5FAE5A', 2.4) + pa('M11 27Q4 25 3 19Q10 20 11 27Z', '#6CBB64');
      [[0, -5.5], [5.2, -1.7], [3.2, 4.4], [-3.2, 4.4], [-5.2, -1.7]].forEach(function (o) { p += ci(11 + o[0], 10 + o[1], 4.2, col); });
      return p + ci(11, 10, 3.2, '#FFE27A');
    }
    function tulip(col) {
      return ln('M9 34V18', '#5FAE5A', 2.4) + pa('M9 28Q16 26 17 20Q10 21 9 28Z', '#6CBB64') +
        pa('M3 6L6.5 10L9 5L11.5 10L15 6V14Q15 20 9 20Q3 20 3 14Z', col);
    }
    function shroom(col) {
      return rc(11, 15, 8, 15, '#FFF6E6', 3) + pa('M2 18C2 5 28 5 28 18Q15 21.5 2 18Z', col) +
        ci(9, 12, 2.2, '#FFFFFF') + ci(17, 9.5, 2.6, '#FFFFFF') + ci(23, 14, 1.8, '#FFFFFF');
    }
    function tuft(c) { return pa('M4 24Q3 10 1 6Q9 12 10 24ZM11 24Q12 6 15 0Q18 8 18 24ZM20 24Q22 12 29 7Q27 16 26 24Z', c); }
    var h = '';
    // そうげん
    h += item('sougen', 5, 26, '22 34', flower('#FF9DB8'), 'swy') + item('sougen', 9, 20, '18 34', tulip('#FFC94D'), 'swy');
    h += item('sougen', 27, 22, '18 34', tulip('#FF8F7E'), 'swy') + item('sougen', 33, 30, '30 30', shroom('#F27E72'));
    h += item('sougen', 45, 24, '22 34', flower('#FFFFFF'), 'swy') + item('sougen', 61, 22, '18 34', tulip('#FF9DB8'), 'swy');
    h += item('sougen', 86, 26, '22 34', flower('#FFD95E'), 'swy') + item('sougen', 93, 20, '18 34', tulip('#FF8F7E'), 'swy');
    // もり
    h += item('mori', 24, 34, '30 30', shroom('#F27E72')) + item('mori', 29, 22, '30 30', shroom('#F5A75C'));
    h += item('mori', 42, 34, '30 24', tuft('#4FA36B'), 'swy') + item('mori', 60, 26, '30 30', shroom('#F27E72'));
    h += item('mori', 50, 56, '50 32', ci(14, 22, 12, '#4FA36B') + ci(30, 16, 15, '#5BB078') + ci(40, 24, 10, '#4FA36B') +
      ci(16, 18, 2.6, '#F2607A') + ci(27, 12, 2.6, '#F2607A') + ci(36, 20, 2.6, '#F2607A') + ci(24, 24, 2.6, '#F2607A'));
    h += item('mori', 84, 34, '30 24', tuft('#4FA36B'), 'swy');
    // ゆきやま（ゆきうさぎ）
    function usagi() {
      return '<path class="c s" style="--c:#FFFFFF;--s:#BDD3EA" stroke-width="1.6" d="M2 24C2 8 34 8 34 24Z"/>' +
        pa('M19 12Q20 3 26 4Q26 11 22 14Z', '#7CC36A') + pa('M25 13Q29 6 34 9Q32 15 27 16Z', '#7CC36A') + ci(29, 19, 1.8, '#E8556A');
    }
    h += item('yuki', 36, 44, '36 24', usagi()) + item('yuki', 41.5, 30, '36 24', usagi());
    h += item('yuki', 8, 70, '70 20', '<path class="c s" style="--c:#FFFFFF;--s:#CFE0F2" stroke-width="1.6" d="M2 20Q20 0 38 12Q52 4 68 20Z"/>');
    h += item('yuki', 88, 56, '70 20', '<path class="c s" style="--c:#FFFFFF;--s:#CFE0F2" stroke-width="1.6" d="M2 20Q20 0 38 12Q52 4 68 20Z"/>');
    // うみ
    h += item('umi', 6, 74, '60 48', rc(6, 26, 48, 22, '#EBCF90', 3) + rc(4, 16, 14, 32, '#F0D79C', 2) + rc(42, 16, 14, 32, '#F0D79C', 2) +
      rc(22, 8, 16, 40, '#F5DDA6', 2) + rc(3, 12, 5, 6, '#F0D79C', 1) + rc(13, 12, 5, 6, '#F0D79C', 1) + rc(42, 12, 5, 6, '#F0D79C', 1) + rc(52, 12, 5, 6, '#F0D79C', 1) +
      rc(26, 34, 8, 14, '#C9A866', 4) + ln('M30 8V-6', '#9A7458', 1.6) + pa('M30 -6L40 -2.5L30 1Z', '#F2766A'));
    h += item('umi', 30, 30, '30 28', '<path class="c k" style="--c:#FF9A86;stroke-width:3px" d="M15 3L18.5 11L27 11.6L20.5 17.4L23 26L15 21.4L7 26L9.5 17.4L3 11.6L11.5 11Z"/>' +
      ci(12.5, 14.5, 1.2, '#7A3F38') + ci(17.5, 14.5, 1.2, '#7A3F38'));
    h += item('umi', 47, 24, '26 22', pa('M2 14A11 11 0 0 1 24 14L16 21H10Z', '#FFD1DC') + ln('M13 4V20M7 6L10.5 20M19 6L15.5 20', '#F09AB0', 1.3));
    h += item('umi', 56, 36, '34 22', ln('M8 16l-6 4M9 13l-7 0M26 16l6 4M25 13l7 0', '#E0685C', 2) + ln('M12 8V3M22 8V3', '#E0685C', 1.8) +
      ci(12, 3, 2, '#4A2A2A') + ci(22, 3, 2, '#4A2A2A') + el2(17, 14, 10, 7, '#F27E72') + ci(5, 8, 3.6, '#F27E72') + ci(29, 8, 3.6, '#F27E72') +
      ln('M14 16q3 2.4 6 0', '#7A3F38', 1.3), 'crab');
    h += item('umi', 90, 38, '30 30', ci(15, 15, 14, '#FFFFFF') + pa('M15 15L15 1A14 14 0 0 1 27.1 8Z', '#FF8F7E') +
      pa('M15 15L27.1 22A14 14 0 0 1 15 29Z', '#FFD95E') + pa('M15 15L2.9 22A14 14 0 0 1 2.9 8Z', '#7FB5E8') + ci(15, 15, 2.6, '#FFFFFF'));
    $('decor').innerHTML = h;
  }
  buildSougen(); buildMori(); buildYuki(); buildUmi(); buildFg(); buildClouds(); buildDecor();
  applySky();
  setInterval(applySky, 60000);

  /* ---------- theme & particles ---------- */
  var THEMES = ['sougen', 'mori', 'yuki', 'umi'];
  function setTheme() {
    if (THEMES.indexOf(S.theme) < 0) S.theme = 'sougen';
    THEMES.forEach(function (t) { app.classList.toggle('th-' + t, S.theme === t); });
    Sq.prop('scarf', S.theme === 'yuki');
  }
  function leafSvg(c0, c1) {
    return '<svg width="15" height="15" viewBox="0 0 16 16"><path d="M2 14C2 6 7 2 14 2C14 9 10 14 2 14Z" fill="' + c0 + '"/><path d="M3.5 12.5L11 5" stroke="' + c1 + '" stroke-width="1.2" stroke-linecap="round"/></svg>';
  }
  function spawnParticle() {
    var el = document.createElement('div');
    var life = 21000;
    el.style.left = (Math.random() * 100) + '%';
    if (S.theme === 'yuki') {
      el.className = 'rs-snowp';
      el.style.setProperty('--sz', (3.5 + Math.random() * 4).toFixed(1) + 'px');
      el.style.setProperty('--d', (8 + Math.random() * 7) + 's');
      el.style.setProperty('--drift', (Math.random() * 90 - 45) + 'px');
    } else if (S.theme === 'umi') {
      if (curSky === 'night' || Math.random() < 0.6) return;
      el.className = 'rs-gull';
      el.innerHTML = '<svg width="30" height="12" viewBox="0 0 30 12"><path d="M2 9Q8 0 15 8Q22 0 28 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      el.style.left = '';
      el.style.top = (8 + Math.random() * 22) + '%';
      el.style.setProperty('--d', (18 + Math.random() * 10) + 's');
      el.style.setProperty('--drift', (Math.random() * 80 - 60) + 'px');
      life = 30000;
    } else if (curSky === 'night' && Math.random() < 0.7) {
      el.className = 'rs-ffly';
      el.style.bottom = (16 + Math.random() * 30) + '%';
      el.style.setProperty('--d', (9 + Math.random() * 6) + 's');
      el.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
      life = 16000;
    } else {
      el.className = 'rs-leaf';
      var r = Math.random();
      if (S.theme === 'sougen' && r < 0.5) {
        el.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1C9.5 3 10 7.5 6 11C2 7.5 2.5 3 6 1Z" fill="' + (r < 0.25 ? '#FFC7D8' : '#FFFFFF') + '"/></svg>';
      } else {
        el.innerHTML = r < 0.8 ? leafSvg('#9AD27A', '#6FAE55') : leafSvg('#F2B56A', '#D08E46');
      }
      el.style.setProperty('--d', (10 + Math.random() * 9) + 's');
      el.style.setProperty('--drift', (Math.random() * 140 - 70) + 'px');
    }
    $('leaves').appendChild(el);
    setTimeout(function () { el.remove(); }, life);
  }
  setInterval(spawnParticle, 2600);
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
  var ACORN_SVG = '<svg width="22" height="22" viewBox="0 0 24 24"><ellipse cx="12" cy="15" rx="6.6" ry="7.6" fill="#DDA45E" stroke="#7B4A30" stroke-width="1.4"/><path d="M4 10.5C4 3.5 20 3.5 20 10.5C16 8.3 8 8.3 4 10.5Z" fill="#8E5E40" stroke="#7B4A30" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 5V2" stroke="#7B4A30" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="9.4" cy="14.5" rx="1.4" ry="2.6" fill="#fff" opacity=".45"/></svg>';
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
    var r = Sq.head.getBoundingClientRect();
    var cx = Math.min(Math.max(r.left + r.width / 2, 145), window.innerWidth - 145);
    b.style.left = cx + 'px';
    b.style.bottom = Math.min(window.innerHeight - 90, window.innerHeight - r.top + 22) + 'px';
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
    left: { x: 26, y: 14.2, s: 1 },
    far: { x: 34, y: 14.7, s: 0.6 },
    far2: { x: 64, y: 14.7, s: 0.66 },
    near: { x: 80, y: 7, s: 1.7 },
    closeup: { x: 50, s: 5.2, closeup: true }
  };
  var flipEl = $('sqFlip');
  var curPos = POS.home;
  var curFlip = 1;
  var hopT = null;
  function hopFor(ms) {
    flipEl.classList.add('hop');
    clearTimeout(hopT);
    hopT = setTimeout(function () { flipEl.classList.remove('hop'); }, ms);
  }
  function setFlip(f) { curFlip = f; flipEl.style.setProperty('--flip', f); }
  function setFacing(targetX) {
    if (Math.abs(targetX - curPos.x) < 0.5) return;
    setFlip(targetX > curPos.x ? -1 : 1);
  }
  function moveTo(p) {
    if (p.closeup) {
      // 顔が画面中央に来るようにピクセルで計算（ウィンドウの縦横比に依存しない）
      setFlip(1);
      // とけい・タイマーが出ているときは、その下のあいたスペースに顔をおさめる
      var H = window.innerHeight;
      var top = app.classList.contains('zen') ? 0 : document.querySelector('.rs-center').getBoundingClientRect().bottom;
      var avail = H - top;
      var s = top ? Math.min(p.s, Math.max(2.2, avail * 0.8 / (71 * actEl.offsetWidth / 170))) : p.s;
      var cy = top ? top + avail * 0.5 : H * 0.52;
      var w = actEl.offsetWidth * s, h = actEl.offsetHeight * s;
      app.style.setProperty('--sq-x', 'calc(50% + ' + Math.round(w * 0.088) + 'px)');
      app.style.setProperty('--sq-s', s);
      app.style.setProperty('--sq-y', Math.round(H - cy - h * 0.5165) + 'px');
    } else {
      setFacing(p.x);
      app.style.setProperty('--sq-x', p.x + '%');
      app.style.setProperty('--sq-s', p.s);
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
  // 地面の高さ・ふつうの大きさに もどす（歩きまわる行動のまえに）
  function toGround() {
    if (curPos.s === 1 && !curPos.closeup) return 0;
    moveTo({ x: curPos.closeup ? 72 : curPos.x, y: 14.2, s: 1 });
    return 2000;
  }
  function lookTo(dx, dy) { Sq.look(dx * curFlip, dy); }

  var groundAcorn = null;
  function spawnGroundAcorn(x) {
    removeGroundAcorn();
    var el = document.createElement('div');
    el.className = 'rs-ground-acorn';
    el.innerHTML = ACORN_SVG;
    el.style.left = x + '%';
    el.style.bottom = '14.3%';
    app.appendChild(el);
    groundAcorn = el;
  }
  function removeGroundAcorn() {
    if (groundAcorn) { groundAcorn.remove(); groundAcorn = null; }
  }
  var bfly = null;
  function removeBfly() { if (bfly) { bfly.remove(); bfly = null; } }
  function spawnBfly(x, y) {
    removeBfly();
    var col = rand(['#FFB3C8', '#FFE27A', '#BFE0FF', '#FFFFFF']);
    var el = document.createElement('div');
    el.className = 'rs-bfly';
    el.innerHTML = '<svg width="26" height="22" viewBox="0 0 24 20"><g class="wg"><path d="M12 10C8 0 0 2 2 8C3 11 8 11 12 10C8 12 4 14 6 18C8 20 11 16 12 10Z" fill="' + col + '"/><path d="M12 10C16 0 24 2 22 8C21 11 16 11 12 10C16 12 20 14 18 18C16 20 13 16 12 10Z" fill="' + col + '"/></g><path d="M12 5V16" stroke="#6B4A3A" stroke-width="1.6" stroke-linecap="round"/></svg>';
    el.style.left = x + '%';
    el.style.bottom = y + '%';
    app.appendChild(el);
    bfly = el;
    return el;
  }

  var zzzEl = $('zzz');
  var accT = null;
  function wearAcc(name, ms) {
    clearTimeout(accT);
    Sq.prop('leafhat', false);
    Sq.prop('flower', false);
    Sq.prop(name, true);
    accT = setTimeout(function () { Sq.prop(name, false); accT = null; }, ms);
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function isNight() { return curSky === 'night'; }
  var TALK = ['おつかれさま！', 'きゅうけいも だいじだよ', 'がんばってるの、みてたよ', 'おちゃでも のむ？', 'ちょっと あそぼ？', 'きょうは どんな いちにち？', 'いっしょに いると たのしいね', 'しんこきゅう、してみる？', 'おみず のんだ？', 'かた、こってない？'];
  var CLOSE = ['じーっ……', 'ちかい？', 'なにしてるの？', 'みえてる〜？', 'おかお みせて！'];
  var PET = ['えへへ', 'きゅ〜ん', 'もっと！', 'ふわふわ でしょ', 'きもちいい〜'];
  function talkLine() {
    var h = new Date().getHours();
    var t = TALK.slice();
    if (h >= 5 && h < 10) t.push('おはよ！きょうも いっしょだね', 'あさごはん たべた？');
    else if (h >= 11 && h < 14) t.push('おひる なに たべる？');
    else if (h >= 15 && h < 17) t.push('おやつの じかん かな？');
    else if (h >= 22 || h < 4) t.push('よふかしさん だね…', 'そろそろ ねむく ない？', 'むり しないでね');
    t.push({ sougen: 'かぜが きもちいいね', mori: 'もりの においが するよ', yuki: 'ゆき、ふわふわ だよ', umi: 'なみのおと、すき' }[S.theme] || 'いい てんき！');
    var st = streak();
    if (st >= 3) t.push(st + 'にち れんぞく！すごい！');
    return rand(t);
  }

  var HEART_SVG = '<svg width="19" height="17" viewBox="-11 -10 22 18"><path d="M0 6C-10 -1 -7 -9 0 -4C7 -9 10 -1 0 6Z" fill="#FF7A8A" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var STAR_SVG = '<svg width="18" height="18" viewBox="-10 -10 20 20"><path d="M0 -9Q1.6 -1.6 9 0Q1.6 1.6 0 9Q-1.6 1.6 -9 0Q-1.6 -1.6 0 -9Z" fill="#FFE27A" stroke="#fff" stroke-width="1.2"/></svg>';
  function spawnFloat(html, count, who) {
    var r = (who || Sq).head.getBoundingClientRect();
    for (var i = 0; i < count; i++) {
      (function (i) {
        setTimeout(function () {
          var h = document.createElement('div');
          h.className = 'rs-heart';
          h.innerHTML = html;
          h.style.left = (r.left + r.width * (0.1 + Math.random() * 0.8)) + 'px';
          h.style.top = (r.top - 10 + Math.random() * r.height * 0.3) + 'px';
          h.style.setProperty('--hx', (Math.random() * 40 - 20) + 'px');
          document.body.appendChild(h);
          setTimeout(function () { h.remove(); }, 1400);
        }, i * 140);
      })(i);
    }
  }
  function spawnHearts(count) { spawnFloat(HEART_SVG, count); }
  function say(text, ms) {
    showBubble(text);
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(hideBubble, ms || 3500);
  }
  // 作業中（しゅうちゅう）は しゃべらない
  function mur(text, ms) { if (Beh.mode !== 'focus') say(text, ms || 2600); }
  function A(ms, fn) { return Beh.after(ms, fn); }

  function eatSeq(t0, quiet) {
    A(t0, function () { Sq.prop('acorn', true); Sq.pose('hold'); Sq.face('sparkle', 'open'); });
    A(t0 + 900, function () { Sq.face('happy', 'munch'); Sq.cls('puff', true); });
    A(t0 + 3600, function () {
      Sq.prop('acorn', false); Sq.pose('rest'); Sq.cls('puff', false); Sq.face('happy', 'smile');
      if (!quiet) mur(rand(['おいしい〜', 'もぐもぐ…', 'しあわせ…']), 2200);
    });
    A(t0 + 4900, function () { Sq.reset(); });
    return t0 + 5000;
  }

  /* 行動いろいろ。それぞれ かかる時間(ms)を返す */
  var ACT = {
    wander: function () { moveTo(POS[rand(['home', 'mid', 'left', 'far', 'far2', 'near'])]); return 2200; },
    walk: function () {
      var d = toGround();
      var x = 30 + Math.random() * 56;
      var wt = Math.abs(x - curPos.x) * 110;
      A(d, function () { walkTo(x); });
      return d + wt + 800;
    },
    talk: function () {
      Sq.pose('wave'); Sq.face('happy', 'open');
      A(500, function () { showBubble(talkLine(), [{ label: 'なでる', icon: 'fa-hand', cb: pet }]); });
      A(1900, function () { Sq.reset(); });
      return 15000;
    },
    closeup: function () {
      moveTo(POS.closeup);
      A(2000, function () { Sq.face(rand(['sparkle', 'wide', 'open']), 'smile'); showBubble(rand(CLOSE)); });
      A(4000, function () { Sq.tilt(8); Sq.face('happy', 'open'); });
      A(6800, function () { hideBubble(); Sq.reset(); moveTo(POS.home); });
      return 9000;
    },
    nap: function () {
      Sq.face('half', 'yawn'); Sq.pose('up'); anim('a-tall');
      A(1700, function () { Sq.pose('rest'); Sq.face('half', 'flat'); Sq.tilt(5, 2); });
      A(2900, function () {
        Sq.face('sleep', 'flat'); Sq.tilt(9, 4); anim('a-sleep');
        Sq.prop('snot', true); zzzEl.classList.add('on');
      });
      var d = 12000 + Math.random() * 10000;
      A(d, function () {
        zzzEl.classList.remove('on'); Sq.prop('snot', false);
        anim('a-squish'); Sq.tilt(0, 0); Sq.face('wide', 'o');
      });
      A(d + 900, function () { Sq.face('half', 'smile'); mur(rand(['…はっ、ねてた', 'ふわぁ…よく ねた', 'むにゃ…']), 2400); });
      A(d + 2600, function () { Sq.reset(); });
      return d + 2800;
    },
    gift: function () {
      Sq.prop('acorn', true); Sq.pose('hold'); Sq.face('sparkle', 'smile'); Sq.cls('wag', true);
      showBubble('いいもの みつけたの。あげる！', [{ label: 'もらう', acc: true, cb: receiveGift }]);
      return 20000;
    },
    eat: function () { return eatSeq(0); },
    stretch: function () {
      Sq.pose('up'); Sq.face('squeeze', 'open'); anim('a-tall');
      mur('のびび〜っ', 1800);
      A(1900, function () { Sq.pose('rest'); Sq.face('half', 'yawn'); });
      A(3000, function () { anim(''); Sq.reset(); });
      return 3200;
    },
    groom: function () {
      Sq.pose('face'); Sq.face('sleep', 'smile'); Sq.tilt(-5);
      A(1300, function () { Sq.tilt(5); });
      A(2600, function () { Sq.pose('rest'); Sq.tilt(0); Sq.face('happy', 'smile'); });
      A(3500, function () { Sq.reset(); });
      return 3700;
    },
    look: function () {
      Sq.look(-3.2, 0); Sq.tilt(-6);
      A(1100, function () { Sq.look(3.2, 0); Sq.tilt(6); });
      A(2200, function () { Sq.look(0, -2.6); Sq.tilt(0); Sq.mouth('o'); });
      A(3100, function () { Sq.reset(); Sq.twitch(); });
      return 3300;
    },
    dance: function () {
      anim('a-sway'); Sq.pose('cheer'); Sq.face('happy', 'open'); Sq.cls('wag', true);
      mur(rand(['るんるん♪', 'おどっちゃお！', 'いい きょく〜']), 2200);
      for (var i = 0; i < 7; i++) A(300 + i * 700, function () { spawnFloat('♪', 1); });
      if (Fr) { Fr.pose('cheer'); Fr.face('happy', 'open'); }
      A(5400, function () { anim(''); Sq.reset(); if (Fr) Fr.reset(); });
      return 5600;
    },
    jump: function () {
      anim('a-jump2'); Sq.face('happy', 'open'); Sq.pose('up'); Sq.cls('wag', true);
      if (Math.random() < 0.5) mur(rand(['わーい！', 'ぴょーん！']), 1600);
      A(1300, function () { anim(''); Sq.reset(); });
      return 1500;
    },
    spin: function () {
      mur('みてみて！', 1500);
      A(500, function () { anim('a-spin'); Sq.face('squeeze', 'open'); });
      A(1400, function () { anim(''); Sq.face('sparkle', 'open'); Sq.pose('up'); spawnFloat(STAR_SVG, 3); });
      A(2600, function () { Sq.reset(); });
      return 2800;
    },
    wave: function () {
      Sq.pose('wave'); Sq.face('happy', 'open'); Sq.tilt(-5);
      mur(rand(['やっほー！', 'ここに いるよ〜', 'げんき？']), 2200);
      A(2600, function () { Sq.reset(); });
      return 2800;
    },
    peek: function () {
      var d = toGround();
      var side = curPos.x > 50 ? 1 : -1;
      var wt = Math.abs((side > 0 ? 114 : -14) - curPos.x) * 110 + 300;
      A(d, function () { walkTo(side > 0 ? 114 : -14); });
      A(d + wt + 1200, function () {
        setFlip(side);
        sq.style.transition = 'left .45s ease-out';
        app.style.setProperty('--sq-x', side > 0 ? 'calc(100% + 6px)' : 'calc(0% - 6px)');
        curPos = { x: side > 0 ? 99 : 1, y: 14.2, s: 1 };
        anim('a-lean'); Sq.face('wide', 'smile');
      });
      A(d + wt + 2100, function () { Sq.face('happy', 'open'); mur('ばあっ！', 1800); });
      A(d + wt + 4300, function () { anim(''); Sq.reset(); sq.style.transition = ''; walkTo(side > 0 ? 74 : 28); });
      return d + wt + 4300 + 3400;
    },
    butterfly: function () {
      var d = toGround();
      var b = spawnBfly(-6, 30);
      [[18, 34], [36, 25], [54, 36], [70, 27], [86, 38], [110, 46]].forEach(function (p, i) {
        A(100 + i * 1500, function () { b.style.left = p[0] + '%'; b.style.bottom = p[1] + '%'; });
      });
      A(d + 600, function () { Sq.face('sparkle', 'o'); lookTo(-3, -2); mur('あ、ちょうちょ！', 2000); });
      A(d + 2200, function () { Sq.face('happy', 'open'); Sq.look(0, -2); walkTo(40); });
      A(d + 5600, function () { walkTo(78); });
      A(d + 8300, function () { anim('a-jump'); Sq.pose('up'); mur('まてまて〜', 1600); });
      A(d + 9600, function () { removeBfly(); anim(''); Sq.reset(); });
      return d + 9800;
    },
    dig: function () {
      var d = toGround();
      A(d, function () { anim('a-dig'); Sq.pose('dig'); Sq.face('squeeze', 'flat'); });
      A(d + 2600, function () { anim('a-jump'); Sq.prop('acorn', true); Sq.pose('hold'); Sq.face('sparkle', 'open'); mur('どんぐり みっけ！', 1900); });
      A(d + 4600, function () { Sq.prop('acorn', false); Sq.pose('shy'); Sq.cls('puff', true); Sq.face('happy', 'munch'); mur('ほっぺに しまっとこ', 1900); });
      A(d + 6600, function () { anim(''); Sq.reset(); });
      return d + 6800;
    },
    tea: function () {
      Sq.prop('cup', true); Sq.pose('read'); Sq.face('happy', 'smile');
      mur('おちゃ のも〜', 1800);
      A(1500, function () { Sq.cls('sip', true); Sq.face('sleep', 'flat'); });
      A(2700, function () { Sq.cls('sip', false); Sq.face('happy', 'open'); mur('ほっ…', 1500); });
      A(4400, function () { Sq.cls('sip', true); Sq.face('sleep', 'flat'); });
      A(5600, function () { Sq.cls('sip', false); Sq.face('happy', 'smile'); Sq.cls('shy', true); });
      A(7000, function () { Sq.reset(); });
      return 7200;
    },
    sneeze: function () {
      Sq.face('half', 'o'); Sq.tilt(-8);
      mur('は…は…', 1000);
      A(1100, function () { anim('a-sneeze'); Sq.face('squeeze', 'open'); Sq.tilt(6); mur('くしゅんっ！', 1500); });
      A(2100, function () { Sq.face('half', 'flat'); Sq.tilt(0); anim('a-shiver'); });
      A(3200, function () { anim(''); Sq.reset(); });
      return 3400;
    },
    warm: function () {
      var W = window.innerWidth;
      var x = Math.max(27, (0.15 * W + 74 + actEl.offsetWidth * 0.42) / W * 100);
      moveTo({ x: x, y: 14.2, s: 1 });
      A(2000, function () { setFlip(1); Sq.pose('warm'); Sq.face('sleep', 'smile'); Sq.cls('shy', true); mur(rand(['ぬくぬく…', 'あったか〜い']), 2600); });
      A(9000, function () { Sq.reset(); });
      return 9300;
    },
    stargaze: function () {
      Sq.look(0, -3); Sq.tilt(-4, -1); Sq.face('sparkle', 'o');
      mur(rand(['ほし きれい…', 'おつきさま、にこにこ']), 2200);
      A(2600, function () { shootStar(); });
      A(3300, function () { Sq.face('wide', 'open'); mur('あっ、ながれぼし！', 2000); });
      A(5400, function () { Sq.face('sleep', 'smile'); Sq.pose('shy'); mur('おねがいごと…', 1800); });
      A(7400, function () { Sq.reset(); });
      return 7600;
    },
    sing: function () {
      Sq.face('happy', 'open'); Sq.cls('wag', true);
      mur('ら〜ら〜♪', 2200);
      for (var i = 0; i < 8; i++) {
        (function (i) {
          A(i * 450, function () { Sq.mouth(i % 2 ? 'o' : 'open'); Sq.tilt(i % 2 ? 5 : -5); if (i % 2 === 0) spawnFloat('♪', 1); });
        })(i);
      }
      A(3800, function () { Sq.reset(); });
      return 4000;
    },
    leafhat: function () {
      anim('a-squish'); Sq.face('wide', 'o'); wearAcc('leafhat', 90000 + Math.random() * 60000);
      mur('わっ、はっぱ！', 1500);
      A(1700, function () { Sq.look(0, -3); Sq.face('open', 'smile'); });
      A(2600, function () { Sq.face('happy', 'open'); mur('ぼうしに しよっと', 1900); });
      A(4400, function () { anim(''); Sq.reset(); });
      return 4600;
    },
    flower: function () {
      var d = toGround();
      A(d, function () { anim('a-dig'); Sq.look(0, 2.4); Sq.face('open', 'o'); });
      A(d + 1300, function () { anim('a-squish'); wearAcc('flower', 90000 + Math.random() * 60000); Sq.face('happy', 'open'); Sq.pose('shy'); Sq.cls('shy', true); mur('おはな みつけた♪', 2200); });
      A(d + 3600, function () { anim(''); Sq.reset(); });
      return d + 3800;
    },
    snowcatch: function () {
      Sq.look(0, -3); Sq.tilt(0, -1.5); Sq.face('sparkle', 'yawn'); Sq.pose('up');
      mur('ゆき、たべちゃお', 1700);
      A(2200, function () { anim('a-shiver'); Sq.pose('shy'); Sq.face('squeeze', 'munch'); mur('つめたっ！', 1400); });
      A(3500, function () { anim(''); Sq.face('happy', 'smile'); });
      A(4400, function () { Sq.reset(); });
      return 4600;
    },
    shell: function () {
      var d = toGround();
      A(d, function () { anim('a-dig'); Sq.pose('dig'); Sq.face('squeeze', 'flat'); });
      A(d + 2200, function () { anim('a-jump'); Sq.prop('shell', true); Sq.pose('hold'); Sq.face('sparkle', 'open'); mur('かいがら みつけた！', 1900); });
      A(d + 4300, function () { Sq.tilt(10); Sq.face('sleep', 'smile'); mur('ざざーん…って きこえる', 2200); });
      A(d + 6800, function () { anim(''); Sq.reset(); });
      return d + 7000;
    },
    read: function () {
      function reading() { Sq.face('open', 'smile'); Sq.look(0, 2.4); Sq.tilt(0, 1.5); }
      Sq.prop('book', true); Sq.prop('glasses', true); Sq.pose('read'); reading();
      var d = 28000 + Math.random() * 30000;
      for (var t = 5000; t < d - 2500; t += 5000 + Math.random() * 5000) {
        A(t, function () {
          var r = Math.random();
          if (r < 0.3) Sq.face('happy', 'smile');
          else if (r < 0.55) { Sq.tilt(7, 1.5); Sq.look(2.5, 1); }
          else if (r < 0.75) Sq.face('wide', 'o');
          else Sq.twitch();
          A(1300, reading);
        });
      }
      A(d, function () { Sq.reset(); });
      return d + 300;
    },
    forage: function () {
      var d = toGround();
      var fx = 54 + Math.random() * 32;
      var wt = Math.abs(fx - curPos.x) * 110;
      A(d, function () { spawnGroundAcorn(fx); Sq.face('wide', 'o'); lookTo(fx > curPos.x ? 3 : -3, 1); });
      A(d + 900, function () {
        Sq.reset();
        walkTo(fx, function () { removeGroundAcorn(); eatSeq(0, true); });
      });
      return d + 900 + wt + 800 + 5200;
    },
    cheer: function () {
      Sq.prop('pom', true); Sq.pose('cheer'); Sq.face('happy', 'open'); anim('a-bounce');
      mur(rand(['ふれー！ふれー！', 'がんばれ〜！']), 2600);
      A(3600, function () { anim(''); Sq.reset(); });
      return 3800;
    },
    doze: function () {
      Sq.face('half', 'flat'); Sq.tilt(6, 2);
      A(1800, function () { Sq.face('sleep', 'flat'); Sq.tilt(12, 5); });
      A(3800, function () { anim('a-squish'); Sq.face('wide', 'o'); Sq.tilt(0, 0); });
      A(4600, function () { Sq.look(-3, 0); });
      A(5200, function () { Sq.look(3, 0); });
      A(5900, function () { anim(''); Sq.reset(); });
      return 6100;
    }
  };
  var IDLE_ACTS = [
    ['wander', 3], ['talk', 2.2], ['closeup', 1], ['nap', 1.4], ['gift', 0.8], ['eat', 2], ['stretch', 1.4], ['groom', 1.5],
    ['look', 1.8], ['dance', 1.5], ['jump', 1.3], ['spin', 1], ['wave', 1.5], ['peek', 0.9], ['butterfly', 1.6], ['dig', 1.5],
    ['tea', 1.2], ['sneeze', 1.3], ['warm', 3], ['stargaze', 2.2], ['sing', 1.2], ['leafhat', 1], ['flower', 1],
    ['snowcatch', 1.6], ['shell', 1.6], ['read', 0.8], ['forage', 1.2], ['cheer', 0.5]
  ];
  var FOCUS_ACTS = [['forage', 3], ['walk', 1.6], ['read', 3], ['look', 1.5], ['stretch', 0.9], ['groom', 1], ['cheer', 0.7], ['doze', 0.7], ['warm', 1.5], ['eat', 1]];
  var COND = {
    butterfly: function () { return !isNight() && S.theme !== 'yuki' && !S.snd.rain; },
    sneeze: function () { return S.theme === 'yuki'; },
    snowcatch: function () { return S.theme === 'yuki'; },
    shell: function () { return S.theme === 'umi'; },
    dig: function () { return S.theme !== 'umi'; },
    warm: function () { return !!S.snd.fire; },
    stargaze: function () { return isNight() && !S.snd.rain; },
    leafhat: function () { return (S.theme === 'sougen' || S.theme === 'mori') && !accT; },
    flower: function () { return S.theme === 'sougen' && !accT; }
  };
  function actWeight(a) {
    var w = a[1];
    if (a[0] === 'nap' && isNight()) w *= 2;
    if (a[0] === 'dance' && S.bgm) w *= 2.3;
    if (a[0] === 'tea' && Beh.mode === 'break') w *= 2;
    return w;
  }

  var Beh = {
    mode: 'idle', t1: null, tm: [], last: [],
    after: function (ms, fn) {
      var id = setTimeout(fn, ms);
      this.tm.push(id);
      return id;
    },
    // 進行中の行動をとりやめて、ふつうの姿にもどす
    cancel: function () {
      this.tm.forEach(clearTimeout);
      this.tm = [];
      clearTimeout(walkT);
      sq.style.transition = '';
      anim('');
      Sq.reset();
      zzzEl.classList.remove('on');
      removeGroundAcorn();
      removeBfly();
    },
    setMode: function (m) {
      this.mode = m;
      gameOn = false;
      clearTimeout(this.t1);
      this.cancel();
      hideBubble();
      if (m === 'focus') {
        moveTo(POS.home);
        this.schedule(7000 + Math.random() * 7000);
      } else {
        this.schedule(3000 + Math.random() * 4000);
      }
    },
    schedule: function (ms) {
      var self = this;
      clearTimeout(this.t1);
      this.t1 = setTimeout(function () { self.act(); }, ms);
    },
    act: function () {
      gameOn = false;
      this.cancel();
      if (curPos.closeup || curPos.x > 96 || curPos.x < 4) {
        moveTo(POS.home);
        this.schedule(2600);
        return;
      }
      var self = this;
      var focus = this.mode === 'focus';
      var list = (focus ? FOCUS_ACTS : IDLE_ACTS).filter(function (a) {
        return self.last.indexOf(a[0]) < 0 && (!COND[a[0]] || COND[a[0]]());
      });
      var total = 0;
      list.forEach(function (a) { total += actWeight(a); });
      var r = Math.random() * total;
      var name = list[0][0];
      for (var i = 0; i < list.length; i++) {
        r -= actWeight(list[i]);
        if (r <= 0) { name = list[i][0]; break; }
      }
      this.last.push(name);
      if (this.last.length > 3) this.last.shift();
      var dur = ACT[name]() || 2000;
      this.schedule(dur + (focus ? 9000 + Math.random() * 15000 : 3000 + Math.random() * 6000));
    },
    // きめた行動を いますぐ やる
    play: function (name) {
      gameOn = false;
      clearTimeout(this.t1);
      this.cancel();
      var dur = ACT[name]() || 2000;
      this.schedule(dur + 3000 + Math.random() * 5000);
    },
    // いまの行動をとめて、ms のあいだ おまかせ行動を おやすみ
    hold: function (ms) {
      clearTimeout(this.t1);
      this.cancel();
      this.schedule(ms);
    }
  };

  var petTimes = [];
  function pet() {
    if (gameOn) return;
    Snd.pet();
    var now = Date.now();
    petTimes = petTimes.filter(function (t) { return now - t < 3500; });
    petTimes.push(now);
    Beh.hold(3400 + Math.random() * 2500);
    var text;
    if (petTimes.length >= 5) {
      petTimes = [];
      anim('a-spin'); Sq.face('squeeze', 'open'); Sq.pose('up'); spawnHearts(6);
      text = rand(['くすぐったい〜！', 'きゃはは！', 'もう〜！']);
    } else {
      var r = Math.random();
      if (r < 0.4) {
        anim('a-squish'); Sq.face('happy', 'smile'); Sq.cls('wag', true); spawnHearts(4);
        text = rand(PET);
      } else if (r < 0.65) {
        anim('a-bounce'); Sq.face('heart', 'open'); Sq.cls('wag', true); spawnHearts(5);
        text = rand(['だいすき！', 'もっと なでて！']);
      } else if (r < 0.85) {
        Sq.pose('shy'); Sq.cls('shy', true); Sq.face('sleep', 'smile'); Sq.tilt(-7); spawnHearts(3);
        text = rand(['てれる…', 'えへへ…']);
      } else {
        Sq.pose('wave'); Sq.face('wink', 'open'); spawnFloat(STAR_SVG, 3);
        text = rand(['ありがと！', 'げんき でた！']);
      }
    }
    Beh.after(1800, function () { anim(''); Sq.reset(); });
    say(text, 2000);
  }
  sq.addEventListener('click', pet);

  function receiveGift() {
    S.acorns++;
    save();
    Snd.chime('gift');
    flyAcorn();
    Beh.hold(3600);
    anim('a-jump'); Sq.face('happy', 'open'); Sq.pose('up');
    Beh.after(1600, function () { anim(''); Sq.reset(); });
    say('えへん！', 2200);
  }

  /* ---------- spending acorns ---------- */
  var friendEl = null;
  function fxSnack() {
    Beh.play('eat');
    Snd.pet();
    spawnHearts(3);
    say(rand(['ありがと！もぐもぐ…', 'おいしい！', 'だいすき、どんぐり！']));
  }
  /* いっしょに あそぶ: じゃんけん → あっちむいてホイ */
  var HANDS = [
    { n: 'グー', icon: 'fa-hand-back-fist' },
    { n: 'チョキ', icon: 'fa-hand-scissors' },
    { n: 'パー', icon: 'fa-hand' }
  ];
  var DIRS = [
    { k: 'left', icon: 'fa-arrow-left', ch: '←', lx: -3.8, ly: 0, tilt: -15, hy: 0 },
    { k: 'right', icon: 'fa-arrow-right', ch: '→', lx: 3.8, ly: 0, tilt: 15, hy: 0 }
  ];
  // ボタン待ちのあいだ、おまかせ行動は おやすみ（ふきだしが消えたら もとにもどる）
  var gameOn = false; // ゲーム中は リスをタップしても なでない（ゲームが とぎれないように）
  function gameStep() { Beh.hold(26000); gameOn = true; setFlip(1); }
  function faceDir(d) { Sq.look(d.lx, d.ly); Sq.tilt(d.tilt, d.hy); }
  function fxPlay() {
    gameStep();
    Sq.face('happy', 'open'); Sq.cls('wag', true); anim('a-jump');
    say('あっちむいてホイ しよ！', 1600);
    Beh.after(1600, function () { askJanken('まずは じゃんけん…'); });
  }
  function askJanken(text) {
    gameStep();
    Sq.face('sparkle', 'smile'); Sq.pose('shy'); anim('a-bounce');
    showBubble(text, HANDS.map(function (h, i) {
      return { label: h.n, icon: h.icon, cb: function () { janken(i); } };
    }));
  }
  function janken(u) {
    gameStep();
    var q = Math.floor(Math.random() * 3);
    var res = (u - q + 3) % 3; // 0: あいこ / 2: きみの勝ち / 1: リスの勝ち
    anim('a-jump'); Sq.pose('wave');
    if (res === 0) {
      Sq.face('wide', 'o');
      say('ぽん！こっちも ' + HANDS[q].n + '！', 1500);
      Beh.after(1500, function () { askJanken('あいこで…'); });
    } else if (res === 2) {
      Sq.face('squeeze', 'open');
      say('ぽん！' + HANDS[q].n + '…まけた〜', 1700);
      Beh.after(1700, function () { askDir('きみが さす ばん！ あっちむいて…', true); });
    } else {
      Sq.face('happy', 'open'); Sq.cls('wag', true);
      say('ぽん！' + HANDS[q].n + '！かった〜', 1700);
      Beh.after(1700, function () { askDir('むく ほうを えらんでね。あっちむいて…', false); });
    }
  }
  function askDir(text, userPoints) {
    gameStep();
    Sq.face(userPoints ? 'wide' : 'sparkle', 'smile');
    if (!userPoints) Sq.pose('shy');
    showBubble(text, DIRS.map(function (d) {
      return { label: '', icon: d.icon, cb: function () { hoi(d, userPoints); } };
    }));
  }
  function hoi(ud, userPoints) {
    gameStep();
    var sd = rand(DIRS);
    var hit = sd.k === ud.k;
    faceDir(sd);
    anim('a-squish');
    if (userPoints) {
      // きみが さして、リスが むく
      Sq.face('wide', 'o');
      say('ホイ！ ' + sd.ch, 1300);
      Beh.after(1300, function () {
        if (hit) {
          anim('a-sneeze'); Sq.face('squeeze', 'open'); Sq.tilt(0, 0);
          say('あ〜っ、つられちゃった！きみの かち！', 2600);
          Beh.after(1500, function () {
            S.acorns++; save(); Snd.chime('gift'); flyAcorn(); spawnHearts(4);
            Sq.face('happy', 'smile'); Sq.look(0, 0);
          });
          Beh.after(2800, endGame);
        } else {
          Sq.face('happy', 'open'); Sq.look(0, 0); Sq.tilt(0, 0); Sq.cls('wag', true);
          say('せーふ！', 1300);
          Beh.after(1400, function () { askJanken('もういっかい じゃんけん…'); });
        }
      });
    } else {
      // リスが さして、きみが むく
      Sq.pose('wave'); Sq.face('happy', 'open');
      say('ホイ！ ' + sd.ch + '（きみは ' + ud.ch + '）', 1500);
      Beh.after(1500, function () {
        Sq.look(0, 0); Sq.tilt(0, 0);
        if (hit) {
          anim('a-jump2'); Sq.pose('up'); Sq.face('happy', 'open'); Sq.cls('wag', true);
          spawnFloat(STAR_SVG, 4);
          say('やったー！こっちの かち！', 2400);
          Beh.after(2600, endGame);
        } else {
          Sq.pose('rest'); Sq.face('squeeze', 'flat');
          say('おしい〜！', 1300);
          Beh.after(1400, function () { askJanken('もういっかい じゃんけん…'); });
        }
      });
    }
  }
  function endGame() {
    Beh.hold(4000);
    gameOn = false;
    Sq.face('happy', 'open'); Sq.pose('wave');
    spawnHearts(4);
    say('たのしかった！また あそぼ', 2400);
    Beh.after(2400, function () { Sq.reset(); });
  }
  function fxShower() {
    say('わあっ、どんぐりの あめ！！', 5000);
    Snd.chime('gift');
    Beh.hold(6000);
    Sq.face('sparkle', 'open'); Sq.pose('up'); Sq.cls('wag', true);
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
    var act = document.createElement('div');
    act.className = 'rs-act';
    flip.appendChild(act);
    wrap.appendChild(flip);
    app.appendChild(wrap);
    friendEl = wrap;
    var me = makeSq(act, 'gray');
    Fr = me;
    me.face('happy', 'open');
    function calm() { if (friendEl === wrap) { me.reset(); act.className = 'rs-act'; } }
    requestAnimationFrame(function () {
      flip.classList.add('hop');
      wrap.style.left = '32%';
      setTimeout(function () {
        flip.classList.remove('hop');
        flip.style.setProperty('--flip', 1);
        me.pose('wave');
        setTimeout(calm, 1800);
      }, 4100);
    });
    // ともだちも なでられる
    var petT = null;
    wrap.addEventListener('click', function () {
      if (friendEl !== wrap || flip.classList.contains('hop')) return;
      Snd.pet();
      clearTimeout(petT);
      calm();
      var r = Math.random();
      if (r < 0.4) { me.face('happy', 'smile'); me.cls('wag', true); act.classList.add('a-squish'); }
      else if (r < 0.7) { me.face('heart', 'open'); me.cls('wag', true); act.classList.add('a-bounce'); }
      else if (r < 0.88) { me.pose('shy'); me.cls('shy', true); me.face('sleep', 'smile'); me.tilt(7); }
      else { me.face('squeeze', 'open'); me.pose('up'); act.classList.add('a-jump'); }
      spawnFloat(HEART_SVG, 4, me);
      petT = setTimeout(calm, 1800);
      // リスも ちょっと うらやましい
      if (Math.random() < 0.3 && Beh.mode !== 'focus' && !$('bubble').classList.contains('on')) {
        lookTo(-3, 0);
        say(rand(['いいな〜', 'こっちも なでて！', 'なかよし だね']), 1800);
        setTimeout(function () { Sq.look(0, 0); }, 1800);
      }
    });
    // ともだちも きままに すごす
    var iv = setInterval(function () {
      if (friendEl !== wrap || flip.classList.contains('hop')) return;
      calm();
      var r = Math.random();
      if (r < 0.2) { me.face('happy', 'open'); act.classList.add('a-jump'); }
      else if (r < 0.4) { me.prop('acorn', true); me.pose('hold'); me.face('happy', 'munch'); me.cls('puff', true); }
      else if (r < 0.55) { me.pose('wave'); me.face('wink', 'open'); }
      else if (r < 0.7) { me.look(3, 0); me.tilt(6); }
      else if (r < 0.82) { me.face('sleep', 'flat'); me.tilt(8, 3); }
      else if (r < 0.92) { me.pose('cheer'); me.face('happy', 'open'); act.classList.add('a-sway'); }
      setTimeout(calm, 2800);
    }, 7000);
    setTimeout(function () {
      // そろそろ おうちに帰る時間
      calm();
      me.face('happy', 'open');
      flip.style.setProperty('--flip', 1);
      flip.classList.add('hop');
      wrap.style.left = '-16%';
      setTimeout(function () {
        clearInterval(iv);
        wrap.remove();
        if (friendEl === wrap) { friendEl = null; Fr = null; }
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
    Beh.play('jump');
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
      Beh.play('cheer');
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
    $('rainfx').classList.toggle('on', !!on);
    Sq.prop('umbrella', !!on);
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
      $('leaves').textContent = '';
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
    window.__risuta = { S: S, T: T, Beh: Beh, Snd: Snd, moveTo: moveTo, POS: POS, pet: pet, showBubble: showBubble, walkTo: walkTo, Sq: Sq, ACT: ACT, anim: anim, applySky: applySky };
  })();
})();
</script>
{% endraw %}
