/* ============================================
   MONE - Service Worker
   ============================================ */

const CACHE_NAME = 'mone-cache-v1';
const ASSETS = [
  '/mvp/',
  '/mvp/index.html',
  '/mvp/css/style.css',
  '/mvp/js/app.js',
  '/mvp/js/products.js',
  '/mvp/manifest.json',
  '/mvp/assets/icons/logo.jpeg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/mvp/index.html');
      });
    })
  );
});
