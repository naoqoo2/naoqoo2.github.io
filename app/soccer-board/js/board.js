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

function defaultPlayers(){
  const red=[
    {num:1,x:10,y:50},
    {num:2,x:25,y:20},
    {num:3,x:25,y:50},
    {num:4,x:25,y:80},
    {num:5,x:40,y:15},
    {num:6,x:40,y:35},
    {num:7,x:40,y:50},
    {num:8,x:40,y:65},
    {num:9,x:40,y:85},
    {num:10,x:45,y:35},
    {num:11,x:45,y:65}
  ].map((p,i)=>({...p,color:'red',id:'r'+(i+1)}));
  const blue=[
    {num:1,x:90,y:50},
    {num:2,x:75,y:20},
    {num:3,x:75,y:40},
    {num:4,x:75,y:60},
    {num:5,x:75,y:80},
    {num:6,x:60,y:20},
    {num:7,x:60,y:40},
    {num:8,x:60,y:60},
    {num:9,x:60,y:80},
    {num:10,x:55,y:35},
    {num:11,x:55,y:65}
  ].map((p,i)=>({...p,color:'blue',id:'b'+(i+1)}));
  
  // ボールをフィールドの中央に配置（中央は x:50%, y:50%）
  const ball = {
    id: 'ball-1',
    color: 'ball',
    x: 50,
    y: 50,
    num: ''
  };
  
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
  el.className='token';
  if (p.color) {
    el.classList.add('player', p.color);
  }
  el.style.left=p.x+'%';
  el.style.top=p.y+'%';
  el.dataset.id=p.id;
  
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
  if(e.target.closest('.token')) return;
  const rect=field.getBoundingClientRect();
  const x=(e.clientX-rect.left)/rect.width*100;
  const y=(e.clientY-rect.top)/rect.height*100;
  openNew(x,y);
});

// タッチデバイスのためのスクロール防止（フィールド内でのスクロールを防止）
field.addEventListener('touchstart', e => {
  if (e.target.closest('.token') || e.target.closest('#field')) {
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
  // 親要素が.tokenクラスを持つ場合はその要素をドラッグ対象にする
  dragTarget = e.target.closest('.token');
  if (!dragTarget) return;
  
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
  
  // ドラッグ終了時の視覚的フィードバックをリセット
  dragTarget.style.opacity = '1';
  dragTarget.style.zIndex = '';
  
  // イベントリスナーを削除
  dragTarget.removeEventListener('pointermove', onMove);
  dragTarget.removeEventListener('pointerup', endDrag);
  dragTarget.removeEventListener('pointercancel', endDrag);
  
  // 位置を保存
  const id = dragTarget.dataset.id;
  if (id) {
    const p = state.players.find(pl => pl.id == id);
    if (p) {
      p.x = parseFloat(dragTarget.style.left);
      p.y = parseFloat(dragTarget.style.top);
    }
  }
  
  saveState();
  dragTarget = null;
}

function removePlayer(id){
  const idx=state.players.findIndex(p=>p.id==id);
  if(idx>=0){state.players.splice(idx,1);}
  const el=document.querySelector('.token[data-id="'+id+'"]');
  if(el) el.remove();
  saveState();
}

saveBtn.addEventListener('click',()=>{
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
      const el=document.querySelector('.token[data-id="'+editId+'"]');
      if(el){
        // クラスをリセットして再設定
        el.className='token';
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
});

deleteBtn.addEventListener('click',()=>{
  if(editId){
    removePlayer(editId);
    modal.classList.add('hidden');
    editId=null;
  }
});

cancelBtn.addEventListener('click',()=>{
  modal.classList.add('hidden');
  editId=null;
  newPos=null;
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
  return Promise.all(keyList.map(key => {
    return caches.delete(key);
  }));
}).catch(e => console.warn('Cache clear error:', e));

loadState();
