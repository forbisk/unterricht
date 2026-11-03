/* Abschalt-Service-Worker fuer die ALTE Adresse forbisk.github.io/unterricht/ (Umzug nach https://klassefit.de).
   Ersetzt den alten SW, loescht nur dessen Notfall-Caches (KEIN localStorage), meldet sich ab und leitet offene Fenster weiter. */
function ziel(u){u=new URL(u);return 'https://klassefit.de'+(u.pathname.replace(/^\/unterricht(\/|$)/,'/'))+u.search+u.hash;}
self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil((async function(){
  try{var k=await caches.keys();await Promise.all(k.map(function(x){return caches.delete(x);}));}catch(_){}
  try{await self.clients.claim();}catch(_){}
  var cs=[];try{cs=await self.clients.matchAll({type:'window',includeUncontrolled:true});}catch(_){}
  await self.registration.unregister();
  cs.forEach(function(c){try{c.navigate(ziel(c.url));}catch(_){}});
})());});
