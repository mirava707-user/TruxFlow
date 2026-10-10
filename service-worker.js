const CACHE_NAME = "dispatch-app-v302"; // new name: the old, overfilled cache is deleted on update
const APP_SHELL = [
  "./",
  "./index.html",
  "./app.js?v=300",
  "./manifest.json",
  "./login-bg.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Only the app's own files and the code libraries it loads are kept here, so the
// app can still open on a weak connection. Live data (Supabase), maps and ZIP
// lookups always go straight to the network and are never stored: storing every
// answer — many with a new time in the address each minute — filled the phone's
// storage until those requests started failing.
const CACHED_HOSTS = ["cdn.jsdelivr.net", "unpkg.com", "fonts.googleapis.com", "fonts.gstatic.com"];
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const own = url.origin === self.location.origin;
  if (!own && !CACHED_HOSTS.includes(url.hostname)) return; // the browser handles it directly
  // Network-first: {cache: "no-store"} also skips the browser's HTTP cache, so a
  // new version is picked up right away; the stored copy is only the fallback.
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then((res) => {
        if ((res.ok || res.type === "opaque") && !(own && url.search && !url.pathname.endsWith(".js"))) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((hit) => hit || Response.error()))
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
