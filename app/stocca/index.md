---
layout: app
title: "ストッカ | おうちの「ある・ない」を1タップ管理"
app_name: "ストッカ"
description: "家の調味料や日用品の「ある・ない」を1タップで管理できる無料の買い物メモアプリ。スーパーでは「ない」ものだけがリストに。ログイン不要・スマホ対応。"
custom_head: |
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&display=swap" rel="stylesheet">
  <link rel="manifest" href="/app/stocca/manifest.webmanifest">
  <meta name="theme-color" content="#FAF6F0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="ストッカ">
  <link rel="apple-touch-icon" href="/app/stocca/icon-180.png">
---
{% raw %}
<style>
html, body.layout--app { background: #FAF6F0; }
.app-header { display: none; }

.stocca {
  --bg: #FAF6F0; --card: #fff; --ink: #4A4238; --muted: #A79E92; --line: #EEE5D9;
  --coral: #F1745C; --coral-dark: #D95339; --coral-soft: #FDEDE8;
  --green: #5FA97C; --green-soft: #E9F4ED;
  font-family: 'M PLUS Rounded 1c', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--ink);
  max-width: 480px; margin: 0 auto; padding: 20px 4px 120px;
  -webkit-user-select: none; user-select: none;
  -webkit-touch-callout: none; touch-action: manipulation;
}
.stocca button { -webkit-tap-highlight-color: transparent; }

.st-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.st-brand { display: flex; align-items: center; gap: 10px; }
.st-logo { width: 40px; height: 40px; border-radius: 13px; background: var(--coral); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 3px 10px rgba(241,116,92,.35); }
.st-title { font-size: 24px; font-weight: 800; letter-spacing: .03em; }
.st-sub { font-size: 12px; color: var(--muted); font-weight: 500; margin: 0 0 18px; min-height: 18px; }
.st-editbtn { display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid var(--line); background: #fff; color: var(--muted); border-radius: 999px; padding: 9px 16px; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; transition: background .15s, border-color .15s, color .15s; }
.st-editbtn.done { background: var(--ink); border-color: var(--ink); color: #fff; }

.st-cat { margin-bottom: 22px; }
.st-cath { display: flex; align-items: center; gap: 8px; margin: 0 0 10px; padding-left: 2px; }
.st-cath h2 { font-size: 15px; font-weight: 800; margin: 0; }
.st-catn { font-size: 11px; font-weight: 800; color: var(--coral-dark); background: var(--coral-soft); padding: 3px 9px; border-radius: 999px; }
.st-catn.hide { display: none; }

.st-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; }
.chip { display: flex; align-items: center; gap: 8px; padding: 0 12px; height: 52px; border-radius: 15px; border: 1.5px solid var(--line); background: var(--card); font: inherit; font-size: 14px; font-weight: 700; color: #948A7C; cursor: pointer; text-align: left; transition: background .15s, border-color .15s, color .15s, box-shadow .15s; }
.chip .ic { flex: none; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; background: var(--green-soft); color: var(--green); transition: .15s; }
.chip .nm { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chip.off { background: var(--coral); border-color: var(--coral); color: #fff; box-shadow: 0 3px 10px rgba(241,116,92,.3); }
.chip.off .ic { background: rgba(255,255,255,.28); color: #fff; }
.chip.pop { animation: st-pop .25s ease; }
@keyframes st-pop { 50% { transform: scale(.93); } }

.st-nav { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(14px + env(safe-area-inset-bottom)); width: min(calc(100% - 28px), 440px); background: #fff; border: 1.5px solid var(--line); border-radius: 999px; display: flex; padding: 6px; box-shadow: 0 10px 30px rgba(74,66,56,.15); z-index: 50; }
.st-nav button { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; height: 48px; border: none; background: none; border-radius: 999px; font: inherit; font-size: 14px; font-weight: 800; color: var(--muted); cursor: pointer; transition: .15s; }
.st-nav button.on { background: var(--coral-soft); color: var(--coral-dark); }
.st-badge { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: var(--coral); color: #fff; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.st-badge.zero { background: #D8CFC2; }

.sc-label { font-size: 11px; font-weight: 800; color: var(--muted); letter-spacing: .06em; margin: 16px 2px 6px; }
.srow { display: flex; align-items: center; gap: 12px; width: 100%; padding: 0 14px; height: 58px; background: #fff; border: 1.5px solid var(--line); border-radius: 15px; margin-bottom: 8px; font: inherit; font-size: 15px; font-weight: 700; color: var(--ink); cursor: pointer; text-align: left; transition: opacity .2s; }
.srow .cb { flex: none; width: 26px; height: 26px; border-radius: 50%; border: 2px solid #D8CFC2; background: #fff; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: .15s; }
.srow .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.srow.done { opacity: .45; }
.srow.done .cb { background: var(--green); border-color: var(--green); }
.srow.done .nm { text-decoration: line-through; }
.srow.pop { animation: st-pop .25s ease; }

.st-empty { text-align: center; padding: 56px 0; }
.st-empty .big { width: 76px; height: 76px; border-radius: 50%; background: var(--green-soft); color: var(--green); font-size: 30px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.st-empty .t1 { font-size: 16px; font-weight: 800; margin: 0 0 6px; }
.st-empty .t2 { font-size: 12px; color: var(--muted); margin: 0; }

.ecat { background: #fff; border: 1.5px solid var(--line); border-radius: 18px; padding: 12px; margin-bottom: 14px; }
.ecat-h { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.ecat-h input { flex: 1; min-width: 0; border: 1.5px solid transparent; background: #F7F1E8; border-radius: 11px; height: 40px; padding: 0 12px; font: inherit; font-size: 16px; font-weight: 800; color: var(--ink); -webkit-user-select: text; user-select: text; }
.stocca input:focus { outline: none; border-color: var(--coral); }
.ico-btn { flex: none; width: 36px; height: 36px; border-radius: 11px; border: 1.5px solid var(--line); background: #fff; color: var(--muted); font-size: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.ico-btn:disabled { opacity: .3; }
.elist .erow { transition: transform .15s; }
.erow { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
.erow.dragging { transition: none; position: relative; z-index: 5; }
.erow.dragging input { box-shadow: 0 6px 16px rgba(74,66,56,.18); border-color: var(--line); }
.erow .hnd { flex: none; width: 34px; height: 44px; display: flex; align-items: center; justify-content: center; color: #D3C9BB; font-size: 14px; cursor: grab; touch-action: none; }
.erow input { flex: 1; min-width: 0; height: 44px; border: 1.5px solid var(--line); border-radius: 12px; background: #fff; padding: 0 12px; font: inherit; font-size: 16px; font-weight: 600; color: var(--ink); -webkit-user-select: text; user-select: text; }
.del { flex: none; height: 36px; min-width: 36px; border-radius: 11px; border: 1.5px solid var(--line); background: #fff; color: var(--muted); font: inherit; font-size: 13px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: .15s; }
.del.arm { background: var(--coral); border-color: var(--coral); color: #fff; font-size: 12px; font-weight: 800; padding: 0 12px; }
.addbtn { width: 100%; height: 42px; border: 1.5px dashed #DBD2C4; border-radius: 12px; background: none; color: var(--muted); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.addbtn i { margin-right: 4px; }
.addcat { height: 50px; margin-bottom: 14px; }

.bk { background: #fff; border: 1.5px solid var(--line); border-radius: 18px; padding: 14px; }
.bk h3 { font-size: 13px; font-weight: 800; margin: 0 0 4px; color: var(--ink); }
.bk .note { font-size: 11px; color: var(--muted); margin: 0 0 10px; }
.bk textarea { width: 100%; height: 72px; border: 1.5px solid var(--line); border-radius: 12px; font-size: 12px; font-family: ui-monospace, monospace; padding: 8px 10px; color: var(--ink); resize: vertical; box-sizing: border-box; -webkit-user-select: text; user-select: text; }
.bk textarea:focus { outline: none; border-color: var(--coral); }
.bk .row { display: flex; gap: 8px; margin-top: 8px; }
.bk .row button { flex: 1; height: 40px; border: 1.5px solid var(--line); border-radius: 999px; background: #fff; color: var(--ink); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.bk .msg { font-size: 11px; font-weight: 700; margin: 8px 0 0; min-height: 14px; }
.bk .msg.ok { color: var(--green); }
.bk .msg.err { color: var(--coral-dark); }

.st-foot { text-align: center; font-size: 11px; font-weight: 700; color: #C4BBAD; margin-top: 40px; }
.st-foot a { color: inherit; text-decoration: none; border-bottom: 1.5px dotted #D8CFC2; padding-bottom: 1px; }
.st-foot a:hover { color: var(--coral); border-color: var(--coral); text-decoration: none; }
.st-foot .fa-heart { color: var(--coral); font-size: 10px; }

.st-cheer { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; background: rgba(250,246,240,.65); animation: st-fadein .2s ease; }
.st-cheer.bye { opacity: 0; transition: opacity .35s; }
.st-cheer .card { position: relative; background: #fff; border: 1.5px solid var(--line); border-radius: 24px; padding: 26px 34px; text-align: center; box-shadow: 0 16px 40px rgba(74,66,56,.18); animation: st-bounce-in .45s cubic-bezier(.2,1.4,.4,1); }
.st-cheer .big { width: 64px; height: 64px; border-radius: 50%; background: var(--coral-soft); color: var(--coral); font-size: 26px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.st-cheer .t1 { font-size: 16px; font-weight: 800; margin: 0; color: var(--ink); }
.st-cheer .cf { position: absolute; left: 50%; top: 50%; margin: -5px 0 0 -5px; width: 10px; height: 10px; border-radius: 3px; opacity: 0; animation: st-burst .9s ease-out forwards; }
.st-cheer .cf:nth-child(3n) { background: var(--coral); }
.st-cheer .cf:nth-child(3n+1) { background: var(--green); }
.st-cheer .cf:nth-child(3n+2) { background: #F2B33D; }
@keyframes st-fadein { from { opacity: 0; } }
@keyframes st-bounce-in { 0% { transform: scale(.5); opacity: 0; } 60% { transform: scale(1.06); opacity: 1; } 100% { transform: scale(1); } }
@keyframes st-burst { 0% { transform: rotate(var(--a)) translateY(-40px) scale(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: rotate(var(--a)) translateY(-130px) scale(1); opacity: 0; } }
</style>

<div class="stocca">
  <div class="st-top">
    <div class="st-brand">
      <span class="st-logo"><i class="fa-solid fa-basket-shopping"></i></span>
      <span class="st-title">ストッカ</span>
    </div>
    <button type="button" id="stEditBtn" class="st-editbtn"><i class="fa-solid fa-pen"></i> 編集</button>
  </div>
  <p class="st-sub" id="stSub"></p>
  <div id="stView"></div>
  <footer class="st-foot">made with <i class="fa-solid fa-heart"></i> by <a href="/apps/">naoqoo2</a></footer>
  <nav class="st-nav">
    <button type="button" id="stTabHome"><i class="fa-solid fa-house"></i> おうち</button>
    <button type="button" id="stTabShop"><i class="fa-solid fa-cart-shopping"></i> かいもの <span class="st-badge" id="stBadge">0</span></button>
  </nav>
</div>

<script>
(function () {
  'use strict';
  var KEY = 'stocca-v1';
  var SEED = [
    ['調味料', ['しょうゆ', 'マヨネーズ', 'ケチャップ', 'おこのみソース', 'ウスターソース', '油', 'みりん', '料理酒', '麺つゆ', 'ドレッシング']],
    ['だし・乾物', ['塩', '砂糖', 'ほんだし', '白だし', 'のり', 'ゆかり', 'お茶漬け', 'お吸いもの']],
    ['麺・レトルト', ['そば', 'うどん', 'パスタ', 'レトルトカレー', 'パスタソース', 'ぷるんとゼリー']],
    ['その他食品', ['味噌', 'シーチキン缶詰']],
    ['日用品', ['ティッシュ', 'ポケットティッシュ', 'トイレットペーパー', 'キッチンペーパー']]
  ];

  var seq = 0;
  function uid() { return 'x' + (++seq).toString(36) + Math.random().toString(36).slice(2, 7); }
  function seed() {
    return { cats: SEED.map(function (c) {
      return { id: uid(), name: c[0], items: c[1].map(function (n) { return { id: uid(), name: n, have: true }; }) };
    }) };
  }
  function loadState() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY));
      if (d && Array.isArray(d.cats)) return d;
    } catch (e) {}
    return null;
  }
  var state = loadState() || seed();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  save();

  var tab = 'home', edit = false, focusId = null, bkMsg = null;
  var bought = {};

  var view = document.getElementById('stView');
  var badge = document.getElementById('stBadge');
  var editBtn = document.getElementById('stEditBtn');
  var tabHome = document.getElementById('stTabHome');
  var tabShop = document.getElementById('stTabShop');
  var subLine = document.getElementById('stSub');
  var catBadges = {};

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    for (var i = 2; i < arguments.length; i++) {
      var k = arguments[i];
      if (k === null || k === undefined) continue;
      e.append(k);
    }
    return e;
  }
  function icon(name) {
    var i = document.createElement('i');
    i.className = 'fa-solid ' + name;
    return i;
  }
  function missing() {
    return state.cats.reduce(function (n, c) {
      return n + c.items.filter(function (i) { return !i.have; }).length;
    }, 0);
  }
  function updateBadge() {
    var n = missing();
    badge.textContent = n;
    badge.classList.toggle('zero', n === 0);
  }
  function refreshCatBadge(cat) {
    var b = catBadges[cat.id];
    if (!b) return;
    var n = cat.items.filter(function (i) { return !i.have; }).length;
    b.textContent = 'ない ' + n;
    b.classList.toggle('hide', n === 0);
  }
  function pop(node) {
    node.classList.remove('pop');
    void node.offsetWidth;
    node.classList.add('pop');
  }

  /* ---------- home (stock) view ---------- */

  function chipEl(cat, item) {
    var ic = el('span', 'ic', icon(item.have ? 'fa-check' : 'fa-exclamation'));
    var b = el('button', 'chip' + (item.have ? '' : ' off'), ic, el('span', 'nm', item.name || '（未入力）'));
    b.type = 'button';
    b.onclick = function () {
      item.have = !item.have;
      save();
      b.classList.toggle('off', !item.have);
      ic.textContent = '';
      ic.append(icon(item.have ? 'fa-check' : 'fa-exclamation'));
      pop(b);
      updateBadge();
      refreshCatBadge(cat);
    };
    return b;
  }

  function renderHome() {
    catBadges = {};
    state.cats.forEach(function (c) {
      var bdg = el('span', 'st-catn hide');
      catBadges[c.id] = bdg;
      var grid = el('div', 'st-grid');
      c.items.forEach(function (it) { grid.append(chipEl(c, it)); });
      view.append(el('section', 'st-cat', el('div', 'st-cath', el('h2', null, c.name || '（未入力）'), bdg), grid));
      refreshCatBadge(c);
    });
  }

  /* ---------- shopping view ---------- */

  function celebrate() {
    if (document.querySelector('.st-cheer')) return;
    var c = el('div', 'st-cheer');
    var card = el('div', 'card',
      el('div', 'big', icon('fa-basket-shopping')),
      el('p', 't1', 'おかいもの おつかれさま！'));
    for (var i = 0; i < 12; i++) {
      var d = el('span', 'cf');
      d.style.setProperty('--a', (i * 30) + 'deg');
      d.style.animationDelay = (i % 3) * 60 + 'ms';
      card.append(d);
    }
    c.append(card);
    (document.querySelector('.stocca') || document.body).appendChild(c);
    c.onclick = function () { c.remove(); };
    setTimeout(function () { c.classList.add('bye'); }, 1700);
    setTimeout(function () { c.remove(); }, 2100);
  }

  function srowEl(item) {
    var r = el('button', 'srow' + (bought[item.id] ? ' done' : ''),
      el('span', 'cb', icon('fa-check')), el('span', 'nm', item.name || '（未入力）'));
    r.type = 'button';
    r.onclick = function () {
      if (bought[item.id]) {
        delete bought[item.id];
        item.have = false;
        r.classList.remove('done');
      } else {
        bought[item.id] = true;
        item.have = true;
        r.classList.add('done');
        pop(r);
        if (missing() === 0) celebrate();
      }
      save();
      updateBadge();
    };
    return r;
  }

  function renderShop() {
    var any = false;
    state.cats.forEach(function (c) {
      var items = c.items.filter(function (i) { return !i.have || bought[i.id]; });
      if (!items.length) return;
      any = true;
      view.append(el('div', 'sc-label', c.name || '（未入力）'));
      items.forEach(function (it) { view.append(srowEl(it)); });
    });
    if (!any) {
      view.append(el('div', 'st-empty',
        el('div', 'big', icon('fa-check')),
        el('p', 't1', 'ぜんぶ そろってます！'),
        el('p', 't2', '「おうち」タブで ない にすると、ここに並びます')));
    }
  }

  /* ---------- edit view ---------- */

  var armed = null, armTimer = null;
  function disarm() {
    if (armed) {
      armed.classList.remove('arm');
      armed.textContent = '';
      armed.append(icon('fa-xmark'));
      armed = null;
    }
    clearTimeout(armTimer);
  }
  function delBtn(label, onDelete) {
    var b = el('button', 'del', icon('fa-xmark'));
    b.type = 'button';
    b.onclick = function (e) {
      e.stopPropagation();
      if (armed === b) { disarm(); onDelete(); return; }
      disarm();
      armed = b;
      b.classList.add('arm');
      b.textContent = label;
      armTimer = setTimeout(disarm, 2500);
    };
    return b;
  }
  function iconBtn(name, onClick) {
    var b = el('button', 'ico-btn', icon(name));
    b.type = 'button';
    b.onclick = onClick;
    return b;
  }
  function inputEl(value, placeholder, id, onSet) {
    var i = document.createElement('input');
    i.type = 'text';
    i.value = value;
    i.placeholder = placeholder;
    if (id) i.dataset.id = id;
    i.oninput = function () { onSet(i.value); save(); };
    i.onkeydown = function (e) { if (e.key === 'Enter') i.blur(); };
    i.onchange = function () { i.value = i.value.trim(); onSet(i.value); save(); };
    return i;
  }
  function moveIn(arr, from, to) {
    if (to < 0 || to >= arr.length) return false;
    var it = arr.splice(from, 1)[0];
    arr.splice(to, 0, it);
    return true;
  }

  function initDrag(hnd, row, cat) {
    hnd.addEventListener('pointerdown', function (ev) {
      ev.preventDefault();
      disarm();
      var list = row.parentElement;
      var rows = Array.prototype.slice.call(list.children);
      var idx = rows.indexOf(row);
      if (rows.length < 2) return;
      var gap = rows.length > 1 ? rows[1].offsetTop - rows[0].offsetTop - rows[0].offsetHeight : 6;
      var h = row.offsetHeight + (isNaN(gap) ? 6 : gap);
      var y0 = ev.clientY;
      var shift = 0;
      try { hnd.setPointerCapture(ev.pointerId); } catch (e) {}
      row.classList.add('dragging');
      function onMove(e) {
        var dy = e.clientY - y0;
        row.style.transform = 'translateY(' + dy + 'px)';
        var s = Math.round(dy / h);
        s = Math.max(-idx, Math.min(rows.length - 1 - idx, s));
        if (s !== shift) {
          shift = s;
          rows.forEach(function (r2, j) {
            if (r2 === row) return;
            var t = 0;
            if (shift > 0 && j > idx && j <= idx + shift) t = -h;
            else if (shift < 0 && j < idx && j >= idx + shift) t = h;
            r2.style.transform = t ? 'translateY(' + t + 'px)' : '';
          });
        }
      }
      function onUp() {
        hnd.removeEventListener('pointermove', onMove);
        hnd.removeEventListener('pointerup', onUp);
        hnd.removeEventListener('pointercancel', onUp);
        row.classList.remove('dragging');
        if (shift) { moveIn(cat.items, idx, idx + shift); save(); }
        render();
      }
      hnd.addEventListener('pointermove', onMove);
      hnd.addEventListener('pointerup', onUp);
      hnd.addEventListener('pointercancel', onUp);
    });
  }

  function erowEl(cat, item) {
    var hnd = el('span', 'hnd', icon('fa-grip-vertical'));
    var input = inputEl(item.name, 'なまえ', item.id, function (v) { item.name = v; });
    var del = delBtn('削除', function () {
      var i = cat.items.indexOf(item);
      if (i >= 0) cat.items.splice(i, 1);
      delete bought[item.id];
      save();
      render();
    });
    var r = el('div', 'erow', hnd, input, del);
    initDrag(hnd, r, cat);
    return r;
  }

  function backupEl() {
    var ta = document.createElement('textarea');
    ta.spellcheck = false;
    ta.placeholder = '「書き出す」を押すとここにデータが出ます。もどすときはデータを貼り付けて「読み込む」';
    var msg = el('p', 'msg', '');
    if (bkMsg) { msg.textContent = bkMsg.t; msg.className = 'msg ' + bkMsg.k; bkMsg = null; }
    var ex = el('button', null, '書き出す');
    ex.type = 'button';
    ex.onclick = function () {
      ta.value = JSON.stringify(state);
      ta.select();
      msg.textContent = 'メモアプリなどに貼り付けて保存してください';
      msg.className = 'msg ok';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ta.value).then(function () {
          msg.textContent = 'コピーしました。メモアプリなどに保存してください';
        }, function () {});
      }
    };
    var im = el('button', null, '読み込む');
    im.type = 'button';
    im.onclick = function () {
      try {
        var d = JSON.parse(ta.value);
        if (!d || !Array.isArray(d.cats)) throw new Error('bad');
        d.cats.forEach(function (c) {
          if (typeof c.name !== 'string' || !Array.isArray(c.items)) throw new Error('bad');
          c.id = c.id || uid();
          c.items.forEach(function (i) {
            if (typeof i.name !== 'string') throw new Error('bad');
            i.have = !!i.have;
            i.id = i.id || uid();
          });
        });
        state = { cats: d.cats };
        bought = {};
        save();
        bkMsg = { t: '読み込みました', k: 'ok' };
        render();
      } catch (e) {
        msg.textContent = '読み込めませんでした。データの形式を確認してください';
        msg.className = 'msg err';
      }
    };
    return el('div', 'bk',
      el('h3', null, 'バックアップ'),
      el('p', 'note', '機種変更やデータ消失にそなえて、たまに書き出しておくと安心です'),
      ta, el('div', 'row', ex, im), msg);
  }

  function renderEdit() {
    state.cats.forEach(function (c, ci) {
      var nameIn = inputEl(c.name, 'カテゴリ名', c.id, function (v) { c.name = v; });
      var up = iconBtn('fa-chevron-up', function () { if (moveIn(state.cats, ci, ci - 1)) { save(); render(); } });
      var dn = iconBtn('fa-chevron-down', function () { if (moveIn(state.cats, ci, ci + 1)) { save(); render(); } });
      up.disabled = ci === 0;
      dn.disabled = ci === state.cats.length - 1;
      var del = delBtn(c.items.length ? 'まるごと削除' : '削除', function () {
        state.cats.splice(ci, 1);
        save();
        render();
      });
      var list = el('div', 'elist');
      c.items.forEach(function (it) { list.append(erowEl(c, it)); });
      var add = el('button', 'addbtn', icon('fa-plus'), 'アイテムを追加');
      add.type = 'button';
      add.onclick = function () {
        var it = { id: uid(), name: '', have: true };
        c.items.push(it);
        focusId = it.id;
        save();
        render();
      };
      view.append(el('div', 'ecat', el('div', 'ecat-h', nameIn, up, dn, del), list, add));
    });
    var addc = el('button', 'addbtn addcat', icon('fa-plus'), 'カテゴリを追加');
    addc.type = 'button';
    addc.onclick = function () {
      var c = { id: uid(), name: '', items: [] };
      state.cats.push(c);
      focusId = c.id;
      save();
      render();
    };
    view.append(addc);
    view.append(backupEl());
  }

  /* ---------- render ---------- */

  function render() {
    disarm();
    updateBadge();
    tabHome.classList.toggle('on', tab === 'home');
    tabShop.classList.toggle('on', tab === 'shop');
    editBtn.style.visibility = tab === 'home' ? 'visible' : 'hidden';
    editBtn.textContent = '';
    editBtn.append(icon(edit ? 'fa-check' : 'fa-pen'), ' ' + (edit ? '完了' : '編集'));
    editBtn.classList.toggle('done', edit);
    subLine.textContent = tab === 'shop'
      ? '買ったらタップ。おうちの「ある」に戻ります'
      : (edit ? '名前の変更・追加・ならびかえができます' : 'タップで「ある・ない」を切りかえ');
    view.textContent = '';
    if (tab === 'home') { if (edit) renderEdit(); else renderHome(); }
    else renderShop();
    if (focusId) {
      var f = view.querySelector('input[data-id="' + focusId + '"]');
      if (f) f.focus();
      focusId = null;
    }
  }

  tabHome.onclick = function () { if (tab === 'home') return; tab = 'home'; bought = {}; render(); };
  tabShop.onclick = function () { if (tab === 'shop') return; tab = 'shop'; render(); };
  editBtn.onclick = function () { edit = !edit; render(); };

  render();
})();
</script>
{% endraw %}
