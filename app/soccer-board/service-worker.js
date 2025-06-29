self.addEventListener('install',e=>{
  e.waitUntil(caches.open('board-v1').then(c=>c.addAll(['./','./index.html','./js/board.js','./manifest.json','./service-worker.js'])));
});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
