const CACHE_NAME = "dm-app-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache ouvert");
        return cache.addAll(urlsToCache);
      })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("Service Worker activé");
});

// FETCH (mode offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});