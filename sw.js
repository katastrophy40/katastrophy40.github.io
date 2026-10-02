/* Offline support: serves saved copies first, updates them in the background.
   Change CACHE to "games-v2", "games-v3"... if you ever want to force-clear everything saved. */
const CACHE = "games-v1";

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(["./", "index.html"]);
    /* optional: offline-files.json can list extra files to save right away, e.g. ["games/snake/index.html"] */
    try {
      const r = await fetch("offline-files.json", {cache: "no-store"});
      if (r.ok) await Promise.allSettled((await r.json()).map(u => c.add(u)));
    } catch (_) {}
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(r, {ignoreSearch: true});
    const net = fetch(r).then(res => { if (res.status === 200) c.put(r, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || new Response("You're offline and this page hasn't been saved yet.", {status: 503});
  })());
});
