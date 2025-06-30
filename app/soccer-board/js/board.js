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
const rotateBtn = document.getElementById('rotate-btn');
const shareModal = document.getElementById('share-modal');
const presetModal = document.getElementById('preset-modal');
const helpModal = document.getElementById('help-modal');
const shareNativeBtn = document.getElementById('share-native');
const shareCopyBtn = document.getElementById('share-copy');
const shareCloseBtn = document.getElementById('share-close');
const presetCloseBtn = document.getElementById('preset-close');
const helpClose = document.getElementById('help-close');
const presetBtns = document.querySelectorAll('#preset-modal button[data-preset]');
// localStorageから縦横表示の設定を読み込む
// モバイルデバイスはデフォルトで縦向き、それ以外は横向き
function isMobileDevice() {
  return (window.innerWidth <= 768) || 
         (navigator.maxTouchPoints > 0 && /Mobi|Android/i.test(navigator.userAgent));
}

let isVertical;
// localStorageに保存された設定がある場合はそれを優先
if (localStorage.getItem('soccerBoardVertical') !== null) {
  isVertical = localStorage.getItem('soccerBoardVertical') === 'true';
} else {
  // 初回または設定がない場合はデバイスタイプに基づいて決定
  isVertical = isMobileDevice();
  localStorage.setItem('soccerBoardVertical', isVertical);
}

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
  ].map(p=>({...p,color:'red'}));
  
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
  ].map(p=>({...p,color:'blue'}));
  
  // 8人制用の選手配置 - 3-1-2-1ダイヤモンドフォーメーション
  const red8 = [
    {num:'',x:10,y:50},  // GK
    {num:'',x:20,y:25},  // DF右
    {num:'',x:20,y:50},  // DF中央
    {num:'',x:20,y:75},  // DF左
    {num:'',x:30,y:50},  // 守備的MF（アンカー）
    {num:'',x:35,y:25},  // MF右
    {num:'',x:35,y:75},  // MF左
    {num:'',x:40,y:50}   // FW（トップ）
  ].map(p=>({...p,color:'red'}));
  
  // 8人制用の青チーム
  const blue8 = [
    {num:'',x:90,y:50},  // GK
    {num:'',x:80,y:25},  // DF右
    {num:'',x:80,y:50},  // DF中央
    {num:'',x:80,y:75},  // DF左
    {num:'',x:70,y:50},  // 守備的MF（アンカー）
    {num:'',x:65,y:25},  // MF右
    {num:'',x:65,y:75},  // MF左
    {num:'',x:60,y:50}   // FW（トップ）
  ].map(p=>({...p,color:'blue'}));
  
  // 5人制用の選手配置 - 1-2-1ダイヤモンドフォーメーション
  const red5 = [
    {num:'',x:10,y:50},  // GK
    {num:'',x:20,y:50},  // DF
    {num:'',x:30,y:25},  // MF右
    {num:'',x:30,y:75},  // MF左
    {num:'',x:40,y:50}   // FW
  ].map(p=>({...p,color:'red'}));
  
  // 5人制用の青チーム
  const blue5 = [
    {num:'',x:90,y:50},  // GK
    {num:'',x:80,y:50},  // DF
    {num:'',x:70,y:25},  // MF右
    {num:'',x:70,y:75},  // MF左
    {num:'',x:60,y:50}   // FW
  ].map(p=>({...p,color:'blue'}));
  
  // ボールをフィールドの中央に配置
  const ball = {
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
  
  // 初期プレイヤーに連番IDを割り当てて返す
  const allPlayers = red.concat(blue, [ball]);
  return allPlayers.map((p, index) => ({
    ...p,
    id: (index + 1).toString()
  }));
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
  // 小数点第1位まで保持
  el.style.left = parseFloat(p.x).toFixed(1) + '%';
  el.style.top = parseFloat(p.y).toFixed(1) + '%';
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
  const x=parseFloat(((e.clientX-rect.left)/rect.width*100).toFixed(1));
  const y=parseFloat(((e.clientY-rect.top)/rect.height*100).toFixed(1));
  openNew(x,y);
});

field.addEventListener('pointerup',e=>{
  // タッチイベントの場合のみ特殊処理
  if(e.pointerType!=='touch') return;
  // 要素上でのタップは無視
  if(e.target.closest('.piece')) return;
  // ピンチズーム操作後のタップは無視
  if(e.touches && e.touches.length > 1) return;
  
  const rect=field.getBoundingClientRect();
  const now=Date.now();
  // 300ms以内の2回目のタップはダブルタップとして扱う
  if(now-fieldLastTap<300){
    const x=parseFloat(((e.clientX-rect.left)/rect.width*100).toFixed(1));
    const y=parseFloat(((e.clientY-rect.top)/rect.height*100).toFixed(1));
    openNew(x,y);
    fieldLastTap=0; // リセット
  }else{
    fieldLastTap=now;
  }
});

// タッチデバイスのタッチイベント処理
// ピンチズームなどのマルチタッチジェスチャーを許可する
field.addEventListener('touchstart', e => {
  // タッチポイントが1つの場合のみドラッグ操作を優先
  if (e.touches.length === 1 && e.target.closest('.piece')) {
    // 駒要素のドラッグ時のみpreventDefaultを実行
    e.preventDefault();
  }
  // マルチタッチの場合やフィールド自体へのタッチはデフォルト動作を許可する
}, { passive: false });

// ドラッグ中のコンテキストメニュー表示を防止
field.addEventListener('contextmenu', e => {
  if (dragTarget) {
    e.preventDefault();
    return false;
  }
});

function startDrag(e){
  // タッチイベントの場合、マルチタッチ時はドラッグを開始しない（ピンチズームを許可）
  if (e.touches && e.touches.length > 1) {
    return;
  }
  
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
  
  // タッチデバイスでのスクロール防止（駒のドラッグ時のみ）
  if (e.cancelable) {
    e.preventDefault();
  }
}
function onMove(e){
  // タッチイベントの場合、マルチタッチ時は処理しない（ピンチズームを許可）
  if (e.touches && e.touches.length > 1) {
    endDrag(e); // マルチタッチを検出したらドラッグを終了
    return;
  }
  
  if (!dragTarget) return;

  pointerMoved = true;
  
  const rect = field.getBoundingClientRect();
  // 小数点第1位まで保持（Math.roundではなくtoFixedを使用）
  const x = parseFloat(((e.clientX - rect.left) / rect.width * 100 - offsetX).toFixed(1));
  const y = parseFloat(((e.clientY - rect.top) / rect.height * 100 - offsetY).toFixed(1));
  
  // 移動を制限（フィールド内）
  dragTarget.style.left = Math.min(100, Math.max(0, x)) + '%';
  dragTarget.style.top = Math.min(100, Math.max(0, y)) + '%';
  
  // タッチデバイスでのスクロール防止（駒の移動中のみ）
  if (e.cancelable) {
    e.preventDefault();
  }
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
      // 小数点第1位まで保持
      p.x = parseFloat(parseFloat(dragTarget.style.left).toFixed(1));
      p.y = parseFloat(parseFloat(dragTarget.style.top).toFixed(1));
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
    color: 'ball',
    x: 50,
    y: 50,
    num: ''
  };

  // ベンチプレイヤー - 赤チーム
  const redBench = [
    {color: 'red', num: '', x: 2, y: 96.5},
    {color: 'red', num: '', x: 6, y: 96.5},
    {color: 'red', num: '', x: 10, y: 96.5}
  ];

  // ベンチプレイヤー - 青チーム
  const blueBench = [
    {color: 'blue', num: '', x: 90, y: 96.5},
    {color: 'blue', num: '', x: 94, y: 96.5},
    {color: 'blue', num: '', x: 98, y: 96.5}
  ];
  
  let players = [];
  
  switch(type){
    case 'clear':
      players = [];
      break;
    case 'red11':
      players = [...state.redFull, ball];
      break;
    case 'full':
      players = [...state.redFull, ...state.blueFull, ball];
      break;
    case 'red8':
      players = [...state.red8, ...redBench, ball];
      break;
    case 'full8':
      players = [...state.red8, ...state.blue8, ...redBench, ...blueBench, ball];
      break;
    case 'red5':
      players = [...state.red5, ...redBench, ball];
      break;
    case 'full5':
      players = [...state.red5, ...state.blue5, ...redBench, ...blueBench, ball];
      break;
    default:
      return; // 何も変更しない
  }

  // 選手にIDを割り当て
  state.players = players.map((p, index) => ({
    ...p,
    id: (index + 1).toString()
  }));

  // 現在表示中の選手を全て削除
  field.querySelectorAll('.piece').forEach(el=>el.remove());
  
  // 縦表示モードの場合、プレイヤー座標を変換
  if (isVertical) {
    state.players.forEach(player => {
      const oldX = player.x;
      const oldY = player.y;
      player.x = oldY;
      player.y = 100 - oldX;
    });
  }
  
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
    // 最大のIDを取得して次の連番を生成
    const maxId = state.players.length > 0 
      ? Math.max(...state.players.map(p => parseInt(p.id) || 0))
      : 0;
    
    const p = {
      id: (maxId + 1).toString(),
      name: nameInput.value,
      num,
      color,
      x: newPos.x,
      y: newPos.y
    };
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

function saveState(){
  // カスタムの短い形式を作成: x色y-背番号-名前, 形式
  let customStr = '';
  
  state.players.forEach((p, index) => {
    // 縦表示中の場合は、保存前に座標を横表示に変換（一時的な変換）
    let xPos = p.x;
    let yPos = p.y;
    
    if (isVertical) {
      // 縦向きの座標を横向きに変換（表示には影響しない一時的な変換）
      xPos = 100 - p.y;
      yPos = p.x;
    }
    
    // 座標（10倍して整数化）
    const x = Math.round(xPos * 10);
    const y = Math.round(yPos * 10);
    
    // 色のコード（先頭1文字、ただしボールは'l'を使用）
    let colorCode = p.color.charAt(0);
    if (p.color === 'ball') {
      colorCode = 'l'; // 'bal[l]'の末尾の文字を使用（'b'は青と重複するため）
    }
    
    // 基本情報
    customStr += `${x}${colorCode}${y}`;
    
    // 背番号と名前がある場合は追加
    if (p.num !== undefined && p.num !== '') {
      customStr += `-${p.num}`;
      
      // 名前もある場合
      if (p.name) {
        customStr += `-${p.name}`;
      }
    } else if (p.name) {
      // 背番号なしで名前のみの場合
      customStr += `--${p.name}`;
    }
    
    // 最後の選手でなければカンマを追加
    if (index < state.players.length - 1) {
      customStr += ',';
    }
  });
  
  // バージョン番号を追加（将来の互換性のため）
  customStr = 'v2:' + customStr;
  
  // LZStringで圧縮
  const compressed = LZString.compressToEncodedURIComponent(customStr);
  
  // URLに設定
  history.replaceState(null, '', '?d=' + compressed);
}

function loadState(){
  const params = new URLSearchParams(location.search);
  if(params.has('d')){
    try {
      const compressed = params.get('d');
      // LZStringで解凍
      const dataStr = LZString.decompressFromEncodedURIComponent(compressed);
      if (!dataStr) throw new Error('Invalid compressed data');
      
      // フォーマットバージョンをチェック
      if (dataStr.startsWith('v2:')) {
        // v2形式: x色y-背番号-名前, 形式
        const playerDataStr = dataStr.substring(3); // 'v2:'の後ろから
        
        // カンマで分割して各選手データを取得
        const playerStrings = playerDataStr.split(',');
        
        // 各選手データを解析
        state.players = playerStrings.map((playerStr, index) => {
          // 空文字列の場合はスキップ
          if (!playerStr.trim()) return null;
          
          const parts = playerStr.split('-');
          const baseInfo = parts[0];
          
          // 位置情報と色を抽出（例: "100r50"から x=10.0, color="red", y=5.0）
          // 色は1文字のコード: r=red, b=blue, y=yellow, g=green, l=ball
          let colorFullName;
          let x, y;
          
          // 色コードを検出してフルネームに変換
          if (baseInfo.includes('r')) {
            colorFullName = 'red';
            [x, y] = baseInfo.split('r');
          } else if (baseInfo.includes('b')) {
            colorFullName = 'blue';
            [x, y] = baseInfo.split('b');
          } else if (baseInfo.includes('y')) {
            colorFullName = 'yellow';
            [x, y] = baseInfo.split('y');
          } else if (baseInfo.includes('g')) {
            colorFullName = 'green';
            [x, y] = baseInfo.split('g');
          } else if (baseInfo.includes('l')) {
            colorFullName = 'ball';
            [x, y] = baseInfo.split('l');
          } else {
            // 不明な色コードの場合はスキップ
            return null;
          }
          
          // 基本プレイヤーオブジェクトを作成
          const player = {
            id: (index + 1).toString(),
            color: colorFullName,
            x: parseInt(x) / 10,
            y: parseInt(y) / 10,
            num: ''
          };
          
          // 背番号が指定されている場合は追加
          if (parts.length > 1 && parts[1] !== '') {
            player.num = parts[1];
          }
          
          // 名前が指定されている場合は追加
          if (parts.length > 2) {
            player.name = parts[2];
          }
          
          return player;
        }).filter(p => p !== null); // nullを除外
        
      } else {
        // v1形式（JSON）のままサポート
        const customFormat = JSON.parse(dataStr);
        
        if (customFormat.v === 1) {
          // 読み込み時に連番でIDを割り当てる
          state.players = customFormat.p.map((p, index) => {
            // 元のフォーマットに戻す
            const player = {
              // 単純な連番IDを割り当て
              id: (index + 1).toString(),
              color: p.c,
              // 整数化された座標を10で割って小数点に戻す
              x: p.x / 10,
              y: p.y / 10,
              num: p.n !== undefined ? p.n : ''
            };
            
            if (p.m) player.name = p.m;
            
            return player;
          });
        } else {
          throw new Error('Unsupported format version');
        }
      }
    } catch(e) {
      console.error('Failed to load state:', e);
      state.players = defaultPlayers();
    }
  } else {
    state.players = defaultPlayers();
  }
  
  field.querySelectorAll('.piece').forEach(el => el.remove());
  
  
  state.players.forEach(createPlayer);
  
  if (!params.has('d')) saveState();
}



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

// 画面回転やリサイズ時の処理
let resizeTimeout;
window.addEventListener('resize', () => {
  // 連続したリサイズイベントを抑制
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // ユーザーが手動で設定を変更していない場合のみ自動調整
    const savedSetting = localStorage.getItem('soccerBoardVertical');
    const userManuallyChanged = savedSetting !== null;
    
    // ユーザーが手動で変更していない場合のみ自動調整
    if (!userManuallyChanged) {
      const shouldBeVertical = isMobileDevice();
      if (shouldBeVertical !== isVertical) {
        toggleFieldOrientation(shouldBeVertical);
      }
    }
  }, 300);
});

// 縦横切り替えボタンのイベントリスナー
rotateBtn.addEventListener('click', () => {
  // ユーザーによる手動切り替え
  toggleFieldOrientation();
  
  // ユーザーが手動で変更したことをマーク
  localStorage.setItem('userChangedOrientation', 'true');
});

// フィールドの向きを切り替える関数
function toggleFieldOrientation(forceVertical = null) {
  // forceVerticalが指定されている場合はその値を使用、そうでなければ現在の値を反転
  isVertical = forceVertical !== null ? forceVertical : !isVertical;
  
  // フィールドのクラスを切り替え
  field.classList.toggle('vertical', isVertical);
  
  // SVG要素の表示切り替え
  const horizontalSvg = field.querySelector('.horizontal-field');
  const verticalSvg = field.querySelector('.vertical-field');
  
  if (isVertical) {
    horizontalSvg.style.display = 'none';
    verticalSvg.style.display = 'block';
  } else {
    horizontalSvg.style.display = 'block';
    verticalSvg.style.display = 'none';
  }
  
  // 既存プレイヤーの座標を変換
  convertPlayerPositions();
  
  // localStorageに設定を保存
  localStorage.setItem('soccerBoardVertical', isVertical);
}

// プレイヤーの座標を変換する関数
function convertPlayerPositions() {
  // 全プレイヤーの座標を変換
  state.players.forEach(player => {
    // 現在の座標を取得
    const oldX = player.x;
    const oldY = player.y;
    
    if (isVertical) {
      // 横向き → 縦向きへの変換
      player.x = oldY;
      player.y = 100 - oldX;
    } else {
      // 縦向き → 横向きへの変換
      player.x = 100 - player.y;
      player.y = oldX;
    }
    
    // DOM要素の位置を更新
    const el = document.querySelector(`.piece[data-id="${player.id}"]`);
    if (el) {
      el.style.left = parseFloat(player.x).toFixed(1) + '%';
      el.style.top = parseFloat(player.y).toFixed(1) + '%';
    }
  });
}

// モーダルの閉じるボタンのイベントハンドラを統一
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

// 初期状態の設定
function initializeFieldOrientation() {
  // SVG要素を取得
  const horizontalSvg = field.querySelector('.horizontal-field');
  const verticalSvg = field.querySelector('.vertical-field');

  // 向き設定を適用
  if (isVertical) {
    field.classList.add('vertical');
    horizontalSvg.style.display = 'none';
    verticalSvg.style.display = 'block';
  } else {
    field.classList.remove('vertical');
    horizontalSvg.style.display = 'block';
    verticalSvg.style.display = 'none';
  }
}

// 初期化時に向き設定を適用
initializeFieldOrientation();

// 初期状態の読み込み
loadState();

// loadStateの後、向き設定が縦向きなら座標変換を行う
if (isVertical) {
  // 縦向きの場合は座標変換を確実に行う
  convertPlayerPositions();
}
