const PASSWORD = 'soccer-secret';
let state = {players:[], ball:{x:50,y:50}};
const field = document.getElementById('field');
const form = document.getElementById('controls');
const nameInput = document.getElementById('name');
const numInput = document.getElementById('number');
const colorInput = document.getElementById('color');
let editId = null;
let dragTarget = null, offsetX=0, offsetY=0;

function defaultPlayers(){
  const base=[
    {num:1,x:5,y:50},
    {num:2,x:20,y:15},
    {num:3,x:20,y:35},
    {num:4,x:20,y:65},
    {num:5,x:20,y:85},
    {num:6,x:40,y:25},
    {num:7,x:40,y:45},
    {num:8,x:40,y:55},
    {num:9,x:40,y:75},
    {num:10,x:60,y:35},
    {num:11,x:60,y:65}
  ];
  const red=base.map((p,i)=>({...p,color:'red',id:'r'+(i+1)}));
  const blue=base.map((p,i)=>({num:p.num,x:100-p.x,y:p.y,color:'blue',id:'b'+(i+1)}));
  return red.concat(blue);
}

function editPlayer(id){
  const p=state.players.find(pl=>pl.id==id);
  if(!p)return;
  editId=id;
  nameInput.value=p.name||'';
  numInput.value=p.num;
  colorInput.value=p.color;
  nameInput.focus();
}

function createPlayer(p){
  const el=document.createElement('div');
  el.className='token player '+p.color;
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
  el.addEventListener('click',()=>editPlayer(p.id));
  el.addEventListener('dblclick',()=>removePlayer(p.id));
  field.appendChild(el);
}

function createBall(){
  const b=document.createElement('div');
  b.id='ball';
  b.className='token';
  b.textContent='\u26BD';
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
  if(editId){
    const p=state.players.find(pl=>pl.id==editId);
    if(p){
      p.name=nameInput.value;
      p.num=numInput.value;
      p.color=colorInput.value;
      const el=document.querySelector('.player[data-id="'+editId+'"]');
      if(el){
        el.className='token player '+p.color;
        el.firstChild.textContent=p.num;
        let n=el.querySelector('.name');
        if(p.name){
          if(!n){n=document.createElement('div');n.className='name';el.appendChild(n);} 
          n.textContent=p.name;
        }else if(n){
          n.remove();
        }
      }
    }
    editId=null;
  }else{
    const p={id:Date.now().toString(),name:nameInput.value,num:numInput.value,color:colorInput.value,x:50,y:50};
    state.players.push(p);
    createPlayer(p);
  }
  form.reset();
  saveState();
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
  createBall();
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

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js');
}

loadState();
