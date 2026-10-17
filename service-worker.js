// TruxFlow moved to truxflow.net — this removes the old offline helper from phones.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try { const names = await caches.keys(); await Promise.all(names.map((n) => caches.delete(n))); } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    const list = await self.clients.matchAll({ type: "window" });
    list.forEach((c) => { try { c.navigate(c.url); } catch (e) {} });
  })());
});
