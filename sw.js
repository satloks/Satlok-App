const V="satlok-v2",CORE=["./","index.html","manifest.json","manifest-guest.json","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
if(r.method!=="GET"||u.origin!==location.origin)return; /* Firebase/Google calls always go to network */
if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put("index.html",c));return x}).catch(()=>caches.match("index.html")));return}
e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put(r,c));return x})))});
