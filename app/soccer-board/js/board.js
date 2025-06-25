const PASSWORD = 'soccer-secret';
let state = {players:[]};
const field = document.getElementById('field');
const modal = document.getElementById('modal');
const nameInput = document.getElementById('m-name');
const numInput = document.getElementById('m-number');
const colorOpts = Array.from(document.querySelectorAll('#modal .color-option'));
const saveBtn = document.getElementById('save-btn');
const deleteBtn = document.getElementById('delete-btn');
const cancelBtn = document.getElementById('cancel-btn');
let editId = null;
let newPos = null;
let dragTarget = null, offsetX=0, offsetY=0;
let pointerMoved = false, pressStart = 0, lastTap = 0;
let fieldLastTap = 0;
const shareBtn = document.getElementById('share-btn');
const presetBtn = document.getElementById('preset-btn');
const helpBtn = document.getElementById('help-btn');
const shareModal = document.getElementById('share-modal');
const presetModal = document.getElementById('preset-modal');
const helpModal = document.getElementById('help-modal');
const shareNativeBtn = document.getElementById('share-native');
const shareCopyBtn = document.getElementById('share-copy');
const shareCloseBtn = document.getElementById('share-close');
const presetCloseBtn = document.getElementById('preset-close');
const helpClose = document.getElementById('help-close');
const presetBtns = document.querySelectorAll('#preset-modal button[data-preset]');

function defaultPlayers(){
  // 赤チーム - 4-4-2フォーメーション
  const red=[
    {num:1,x:10,y:50},  // GK
    {num:2,x:20,y:20},  // DF右
    {num:3,x:20,y:40},  // DF中央右
    {num:4,x:20,y:60},  // DF中央左
    {num:5,x:20,y:80},  // DF左
    {num:6,x:30,y:20},  // MF右
    {num:7,x:30,y:40},  // MF中央右
    {num:8,x:30,y:60},  // MF中央左
    {num:9,x:30,y:80},  // MF左
    {num:10,x:40,y:35}, // FW右
    {num:11,x:40,y:65}  // FW左
  ].map((p,i)=>({...p,color:'red',id:'r'+(i+1)}));
  
  // 青チーム - 4-4-2フォーメーション
  const blue=[
    {num:1,x:90,y:50},  // GK
    {num:2,x:80,y:20},  // DF右
    {num:3,x:80,y:40},  // DF中央右
    {num:4,x:80,y:60},  // DF中央左
    {num:5,x:80,y:80},  // DF左
    {num:6,x:70,y:20},  // MF右
    {num:7,x:70,y:40},  // MF中央右
    {num:8,x:70,y:60},  // MF中央左
    {num:9,x:70,y:80},  // MF左
    {num:10,x:60,y:35}, // FW右
    {num:11,x:60,y:65}  // FW左
  ].map((p,i)=>({...p,color:'blue',id:'b'+(i+1)}));
  
  // 8人制用の選手配置 - 3-1-2-1ダイヤモンドフォーメーション
  const red8 = [
    {num:1,x:10,y:50},  // GK
    {num:2,x:20,y:25},  // DF右
    {num:3,x:20,y:50},  // DF中央
    {num:4,x:20,y:75},  // DF左
    {num:5,x:30,y:50},  // 守備的MF（アンカー）
    {num:6,x:35,y:25},  // MF右
    {num:7,x:35,y:75},  // MF左
    {num:8,x:40,y:50}   // FW（トップ）
  ].map((p,i)=>({...p,color:'red',id:'r8'+(i+1)}));
  
  // 8人制用の青チーム
  const blue8 = [
    {num:1,x:90,y:50},  // GK
    {num:2,x:80,y:25},  // DF右
    {num:3,x:80,y:50},  // DF中央
    {num:4,x:80,y:75},  // DF左
    {num:5,x:70,y:50},  // 守備的MF（アンカー）
    {num:6,x:65,y:25},  // MF右
    {num:7,x:65,y:75},  // MF左
    {num:8,x:60,y:50}   // FW（トップ）
  ].map((p,i)=>({...p,color:'blue',id:'b8'+(i+1)}));
  
  // 5人制用の選手配置 - 1-2-1ダイヤモンドフォーメーション
  const red5 = [
    {num:1,x:10,y:50},  // GK
    {num:2,x:20,y:50},  // DF
    {num:3,x:30,y:25},  // MF右
    {num:4,x:30,y:75},  // MF左
    {num:5,x:40,y:50}   // FW
  ].map((p,i)=>({...p,color:'red',id:'r5'+(i+1)}));
  
  // 5人制用の青チーム
  const blue5 = [
    {num:1,x:90,y:50},  // GK
    {num:2,x:80,y:50},  // DF
    {num:3,x:70,y:25},  // MF右
    {num:4,x:70,y:75},  // MF左
    {num:5,x:60,y:50}   // FW
  ].map((p,i)=>({...p,color:'blue',id:'b5'+(i+1)}));
  
  // ボールをフィールドの中央に配置
  const ball = {
    id: 'ball-1',
    color: 'ball',
    x: 50,
    y: 50,
    num: ''
  };
  
  // 全ての選手データを保持
  state.redFull = red;
  state.blueFull = blue;
  state.red8 = red8;
  state.blue8 = blue8;
  state.red5 = red5;
  state.blue5 = blue5;
  
  return red.concat(blue, [ball]);
}

function selectColor(color){
  colorOpts.forEach(o=>o.classList.toggle('selected',o.dataset.color===color));
}
colorOpts.forEach(o=>o.addEventListener('click',()=>selectColor(o.dataset.color)));

function openEdit(id){
  const p=state.players.find(pl=>pl.id==id);
  if(!p)return;
  editId=id;
  newPos=null;
  nameInput.value=p.name||'';
  numInput.value=p.num;
  selectColor(p.color);
  deleteBtn.style.display='block';
  modal.classList.remove('hidden');
  numInput.focus();
}

function openNew(x,y){
  editId=null;
  newPos={x,y};
  nameInput.value='';
  numInput.value='';
  selectColor(x>50?'blue':'red');
  deleteBtn.style.display='none';
  modal.classList.remove('hidden');
  numInput.focus();
}

function createPlayer(p){
  const el=document.createElement('div');
  el.className='piece';
  if (p.color) {
    el.classList.add('player', p.color);
  }
  el.style.left=p.x+'%';
  el.style.top=p.y+'%';
  el.dataset.id=p.id;
  el.style.zIndex = '10'; // 明示的にz-indexを設定
  
  const num=document.createElement('div');
  num.textContent=p.num;
  el.appendChild(num);
  if(p.name){
    const n=document.createElement('div');
    n.className='name';
    n.textContent=p.name;
    el.appendChild(n);
  }
  
  el.addEventListener('pointerdown',startDrag);
  el.addEventListener('dblclick',e=>{e.stopPropagation();openEdit(p.id);});
  field.appendChild(el);
}

field.addEventListener('dblclick',e=>{
  if(e.target.closest('.piece')) return;
  const rect=field.getBoundingClientRect();
  const x=(e.clientX-rect.left)/rect.width*100;
  const y=(e.clientY-rect.top)/rect.height*100;
  openNew(x,y);
});

field.addEventListener('pointerup',e=>{
  if(e.pointerType!=='touch') return;
  if(e.target.closest('.piece')) return;
  const rect=field.getBoundingClientRect();
  const now=Date.now();
  if(now-fieldLastTap<300){
    const x=(e.clientX-rect.left)/rect.width*100;
    const y=(e.clientY-rect.top)/rect.height*100;
    openNew(x,y);
    fieldLastTap=0;
  }else{
    fieldLastTap=now;
  }
});

// タッチデバイスのためのスクロール防止（フィールド内でのスクロールを防止）
field.addEventListener('touchstart', e => {
  if (e.target.closest('.piece') || e.target.closest('#field')) {
    e.preventDefault();
  }
}, { passive: false });

// ドラッグ中のコンテキストメニュー表示を防止
field.addEventListener('contextmenu', e => {
  if (dragTarget) {
    e.preventDefault();
    return false;
  }
});

function startDrag(e){
  // 親要素が.pieceクラスを持つ場合はその要素をドラッグ対象にする
  dragTarget = e.target.closest('.piece');
  if (!dragTarget) return;

  pointerMoved = false;
  pressStart = Date.now();
  
  // ドラッグ中の視覚的フィードバック
  dragTarget.style.opacity = '0.8';
  dragTarget.style.zIndex = '100';
  
  // キャプチャを設定
  dragTarget.setPointerCapture(e.pointerId);
  
  // フィールドの位置を基準にドラッグオフセットを計算
  const rect = field.getBoundingClientRect();
  const targetLeft = parseFloat(dragTarget.style.left) || 0;
  const targetTop = parseFloat(dragTarget.style.top) || 0;
  
  offsetX = (e.clientX - rect.left) / rect.width * 100 - targetLeft;
  offsetY = (e.clientY - rect.top) / rect.height * 100 - targetTop;
  
  // イベントリスナーを追加
  dragTarget.addEventListener('pointermove', onMove);
  dragTarget.addEventListener('pointerup', endDrag);
  dragTarget.addEventListener('pointercancel', endDrag);
  
  // タッチデバイスでのスクロール防止
  e.preventDefault();
}
function onMove(e){
  if (!dragTarget) return;

  pointerMoved = true;
  
  const rect = field.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width * 100 - offsetX;
  const y = (e.clientY - rect.top) / rect.height * 100 - offsetY;
  
  // 移動を制限（フィールド内）
  dragTarget.style.left = Math.min(100, Math.max(0, x)) + '%';
  dragTarget.style.top = Math.min(100, Math.max(0, y)) + '%';
  
  e.preventDefault(); // タッチデバイスでのスクロール防止
}

function endDrag(e){
  if (!dragTarget) return;

  const now = Date.now();
  const duration = now - pressStart;

  // ドラッグ終了時の視覚的フィードバックをリセット
  dragTarget.style.opacity = '1';
  dragTarget.style.zIndex = '10'; // 明示的に元のz-indexに戻す
  
  // イベントリスナーを削除
  dragTarget.removeEventListener('pointermove', onMove);
  dragTarget.removeEventListener('pointerup', endDrag);
  dragTarget.removeEventListener('pointercancel', endDrag);
  
  const id = dragTarget.dataset.id;

  if(!pointerMoved){
    if(duration > 600){
      openEdit(id);
      dragTarget = null;
      return;
    }else{
      if(now - lastTap < 300){
        openEdit(id);
      }
      lastTap = now;
    }
  }else if(id){
    const p = state.players.find(pl => pl.id == id);
    if (p) {
      p.x = parseFloat(dragTarget.style.left);
      p.y = parseFloat(dragTarget.style.top);
    }
    saveState();
  }
  dragTarget = null;
}

function removePlayer(id){
  const idx=state.players.findIndex(p=>p.id==id);
  if(idx>=0){state.players.splice(idx,1);}
  const el=document.querySelector('.piece[data-id="'+id+'"]');
  if(el) el.remove();
  saveState();
}

function applyPreset(type){
  // 初期化するためにまずdefaultPlayersを実行して全ての選手配置を読み込む
  defaultPlayers();
  
  // ボールは常に中央に配置
  const ball = {
    id: 'ball-1',
    color: 'ball',
    x: 50,
    y: 50,
    num: ''
  };
  
  switch(type){
    case 'clear':
      state.players = [];
      break;
    case 'red11':
      state.players = [...state.redFull, ball];
      break;
    case 'full':
      state.players = [...state.redFull, ...state.blueFull, ball];
      break;
    case 'red8':
      state.players = [...state.red8, ball];
      break;
    case 'full8':
      state.players = [...state.red8, ...state.blue8, ball];
      break;
    case 'red5':
      state.players = [...state.red5, ball];
      break;
    case 'full5':
      state.players = [...state.red5, ...state.blue5, ball];
      break;
    default:
      return; // 何も変更しない
  }

  // 現在表示中の選手を全て削除
  field.querySelectorAll('.piece').forEach(el=>el.remove());
  // 新しい選手を表示
  state.players.forEach(createPlayer);
  // 状態を保存
  saveState();
}

// フォームのサブミットイベントを処理
const playerForm = document.getElementById('player-form');
playerForm.addEventListener('submit', (e) => {
  e.preventDefault(); // フォームのデフォルト送信を防止
  savePlayer();
});

// キーボードイベントをグローバルに監視し、Deleteキーで削除
document.addEventListener('keydown', (e) => {
  if (e.key === 'Delete' && editId && !modal.classList.contains('hidden')) {
    removePlayer(editId);
    modal.classList.add('hidden');
    editId = null;
  }
});

// 選手情報を保存する関数
function savePlayer() {
  const color=colorOpts.find(o=>o.classList.contains('selected')).dataset.color;
  
  // 番号を3桁以内に制限（空文字はそのまま）
  let num = numInput.value === '' ? '' : parseInt(numInput.value) || 0;
  if (num !== '' && num > 999) num = 999;
  
  if(editId){
    const p=state.players.find(pl=>pl.id==editId);
    if(p){
      p.name=nameInput.value;
      p.num=num;
      p.color=color;
      const el=document.querySelector('.piece[data-id="'+editId+'"]');
      if(el){
        // クラスをリセットして再設定
        el.className='piece';
        if (color) {
          el.classList.add('player', color);
        }
        
        el.innerHTML='';
        const numEl=document.createElement('div');
        numEl.textContent=num;
        el.appendChild(numEl);
        if(nameInput.value){
          const nameEl=document.createElement('div');
          nameEl.className='name';
          nameEl.textContent=nameInput.value;
          el.appendChild(nameEl);
        }
      }
    }
  }else if(newPos){
    const p={id:Date.now().toString(),name:nameInput.value,num,color,x:newPos.x,y:newPos.y};
    state.players.push(p);
    createPlayer(p);
  }
  modal.classList.add('hidden');
  editId=null;
  newPos=null;
  saveState();
}

// Save button も click イベントで savePlayer を呼び出す
saveBtn.addEventListener('click', function(e) {
  if (!e.target.form) { // フォームから呼ばれなかった場合のみ
    e.preventDefault();
    savePlayer();
  }
});

deleteBtn.addEventListener('click',()=>{
  if(editId){
    removePlayer(editId);
    modal.classList.add('hidden');
    editId=null;
  }
});

// cancelボタンのイベントリスナーを削除
// 代わりにモーダルの閉じるボタンと外側クリックのイベントリスナーを追加
const closeModalBtns = document.querySelectorAll('.close-btn');
closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalEl = btn.closest('[id$="modal"]');
    if (modalEl) {
      modalEl.classList.add('hidden');
      if (modalEl.id === 'modal') {
        editId = null;
        newPos = null;
      }
    }
  });
});

// モーダル外をクリックしたときに閉じる
const modals = document.querySelectorAll('[id$="modal"]');
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      if (modal.id === 'modal') {
        editId = null;
        newPos = null;
      }
    }
  });
});

async function saveState(){
  const json=JSON.stringify(state);
  const enc=await encryptData(PASSWORD,json);
  history.replaceState(null,'','?d='+encodeURIComponent(enc));
}

async function loadState(){
  const params=new URLSearchParams(location.search);
  if(params.has('d')){
    try{
      const data=await decryptData(PASSWORD,params.get('d'));
      state=JSON.parse(data);
    }catch(e){console.error(e);}
  }else{
    state.players=defaultPlayers();
  }
  state.players.forEach(createPlayer);
  if(!params.has('d')) saveState();
}

// encryption helpers using Web Crypto
async function getKey(password,salt){
  const enc=new TextEncoder();
  const mat=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},mat,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
async function encryptData(password,data){
  const enc=new TextEncoder();
  const salt=crypto.getRandomValues(new Uint8Array(16));
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const key=await getKey(password,salt);
  const cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,enc.encode(data));
  const buf=new Uint8Array(salt.length+iv.length+cipher.byteLength);
  buf.set(salt,0); buf.set(iv,salt.length); buf.set(new Uint8Array(cipher),salt.length+iv.length);
  return btoa(String.fromCharCode(...buf));
}
async function decryptData(password,str){
  const data=Uint8Array.from(atob(str),c=>c.charCodeAt(0));
  const salt=data.slice(0,16); const iv=data.slice(16,28); const cipher=data.slice(28);
  const key=await getKey(password,salt);
  const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv},key,cipher);
  return new TextDecoder().decode(plain);
}

// PWAを無効化：サービスワーカーの登録を削除
// if('serviceWorker' in navigator){
//   navigator.serviceWorker.register('service-worker.js');
// }

// 既存のサービスワーカーを解除
if('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}

// ブラウザキャッシュをクリア
caches.keys().then(keyList => {
  return Promise.all(keyList.map(key => caches.delete(key)));
}).catch(e => console.warn('Cache clear error:', e));

// トースト通知を表示する関数
function showToast(message, duration = 2000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

shareBtn.addEventListener('click',()=>shareModal.classList.remove('hidden'));
shareNativeBtn.addEventListener('click',()=>{
  const url=location.href;
  if(navigator.share){
    navigator.share({title:'Soccer Board',url}).catch(()=>{});
  }else{
    navigator.clipboard.writeText(url)
      .then(() => {
        shareModal.classList.add('hidden');
        showToast('URL Copied');
      })
      .catch(() => {
        shareModal.classList.add('hidden');
        showToast('Copy failed');
      });
  }
});
shareCopyBtn.addEventListener('click',async ()=>{
  try{
    await navigator.clipboard.writeText(location.href);
    shareModal.classList.add('hidden');
    showToast('URL Copied');
  }catch(e){
    shareModal.classList.add('hidden');
    showToast('Copy failed');
  }
});

presetBtn.addEventListener('click',()=>presetModal.classList.remove('hidden'));
presetBtns.forEach(btn=>btn.addEventListener('click',()=>{applyPreset(btn.dataset.preset);presetModal.classList.add('hidden');}));

helpBtn.addEventListener('click',()=>helpModal.classList.remove('hidden'));

loadState();
