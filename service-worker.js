const CACHE_NAME = 'SW-001';
const toCache = [
    '/',
    'index.html',
    'assets/js/web.webmanifest',
    'assets/js/register.js',
    'assets/js/app.js',
    'assets/css/main.css',
    'assets/css/all.min.css',
    'assets/css/animate.min.css',
    'assets/fonts/Poppins-Light.ttf',
    'assets/fonts/Poppins-SemiBold.ttf',
    'assets/webfonts/fa-solid-900.woff',
    'assets/webfonts/fa-solid-900.woff2',
    'assets/img/apple-icon.png',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event.request)
            })
        })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] delete old cache.', key)
                return caches.delete(key)
            }
            }))
        })
        .then(() => self.clients.claim())
    )
})
