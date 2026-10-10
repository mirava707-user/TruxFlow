const CACHE_NAME = "dispatch-app-v304";
const APP_SHELL = [
  "./",
  "./index.html",
  "./app.js?v=301",
  "./manifest.json",
  "./login-bg.jpg",
];

// Install: first remove every older copy (frees the phone's storage), then store
// the app's files. Storing is a bonus, never a requirement — if it fails (storage
// full, weak signal) the new version still takes over, so a stuck old version
// can't block its own fix.
// Each step gets a few seconds at most, so a phone whose storage is stuck can't
// hold up the new version.
const limit = (p, ms) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);
self.addEventListener("install", (event) => {
  event.waitUntil(limit((async () => {
    try {
      const names = await caches.keys();
      await Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)));
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(APP_SHELL.map((u) => cache.add(u).catch(() => {})));
    } catch (e) { /* keep going */ }
  })(), 8000));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    await limit((async () => {
      try {
        const names = await caches.keys();
        await Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)));
      } catch (e) { /* keep going */ }
    })(), 5000);
    await self.clients.claim();
  })());
});

// Only the app's own files (page, app code) are kept here, as a fallback when the
// network fails. Everything else goes straight to the network and is never stored: live
// data (Supabase), maps and ZIP lookups; the code libraries are fixed versions the
// browser keeps in its normal cache. (Storing every live-data answer — many with a
// new time in the address each minute — is what filled a phone's storage before.)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // the browser handles it directly
  // Network-first: {cache: "no-store"} also skips the browser's HTTP cache, so a
  // new version is picked up right away. The copies stored at install are only
  // the fallback when the network fails; answers are passed straight through
  // (not copied while loading, which can stall a big file on a full phone).
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .catch(() => caches.match(event.request, { ignoreSearch: url.pathname.endsWith("/") || url.pathname.endsWith(".html") }).then((hit) => hit || Response.error()))
  );
});

// ---- Push notifications (Oregon permit + IFTA filing reminders) ----
// iOS requires every push to show a visible notification, so this always does.
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; }
  catch (_) { data = { body: event.data ? event.data.text() : "" }; }
  const title = data.title || "TruxFlow";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      tag: data.tag || undefined,
      icon: "icon-192.png",
      badge: "icon-192.png",
      data: { url: data.url || "./" },
    })
  );
});

// Tapping a notification brings the open app forward, or opens it if closed.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || "./", self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.startsWith(self.registration.scope) && "focus" in c) return c.focus();
      }
      return self.clients.openWindow(target);
    })
  );
});
