const PASSWORD = 'soccer-secret';
let state = {players:[], ball:{x:50,y:50}};
const field = document.getElementById('field');
const form = document.getElementById('addForm');
let dragTarget = null, offsetX=0, offsetY=0;

function createPlayer(p){
  const el = document.createElement('div');
  el.className='player';
  el.style.background=p.color;
  el.style.left=p.x+'%';
  el.style.top=p.y+'%';
  el.textContent=p.num;
  el.title=p.name;
  el.dataset.id=p.id;
  el.addEventListener('pointerdown',startDrag);
  el.addEventListener('dblclick',()=>removePlayer(p.id));
  field.appendChild(el);
}

function createBall(){
  const b=document.createElement('div');
  b.id='ball';
  b.style.left=state.ball.x+'%';
  b.style.top=state.ball.y+'%';
  b.addEventListener('pointerdown',startDrag);
  field.appendChild(b);
}

function startDrag(e){
  dragTarget=e.target; dragTarget.setPointerCapture(e.pointerId);
  const rect=field.getBoundingClientRect();
  offsetX=(e.clientX-rect.left)/(rect.width)*100 - parseFloat(dragTarget.style.left);
  offsetY=(e.clientY-rect.top)/(rect.height)*100 - parseFloat(dragTarget.style.top);
  dragTarget.addEventListener('pointermove',onMove);
  dragTarget.addEventListener('pointerup',endDrag);
}
function onMove(e){
  const rect=field.getBoundingClientRect();
  const x=(e.clientX-rect.left)/(rect.width)*100 - offsetX;
  const y=(e.clientY-rect.top)/(rect.height)*100 - offsetY;
  dragTarget.style.left=Math.min(100,Math.max(0,x))+'%';
  dragTarget.style.top=Math.min(100,Math.max(0,y))+'%';
}
function endDrag(e){
  dragTarget.removeEventListener('pointermove',onMove);
  dragTarget.removeEventListener('pointerup',endDrag);
  const id=dragTarget.dataset.id;
  if(id){
    const p=state.players.find(pl=>pl.id==id);
    p.x=parseFloat(dragTarget.style.left);
    p.y=parseFloat(dragTarget.style.top);
  }else{
    state.ball.x=parseFloat(dragTarget.style.left);
    state.ball.y=parseFloat(dragTarget.style.top);
  }
  saveState();
  dragTarget=null;
}

function removePlayer(id){
  const idx=state.players.findIndex(p=>p.id==id);
  if(idx>=0){state.players.splice(idx,1);}
  const el=document.querySelector('.player[data-id="'+id+'"]');
  if(el) el.remove();
  saveState();
}

form.addEventListener('submit',e=>{
  e.preventDefault();
  const p={id:Date.now(),name:pname.value,num:pnum.value,color:pcolor.value,x:50,y:50};
  state.players.push(p);
  createPlayer(p);
  saveState();
  form.reset();
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
  }
  state.players.forEach(createPlayer);
  createBall();
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

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js');
}

loadState();
