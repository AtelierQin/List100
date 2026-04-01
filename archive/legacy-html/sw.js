const CACHE_NAME = 'futurecast-v1';
const ASSETS_TO_CACHE = [
    './',
    './landing.html',
    './list100.html',
    './OS.html',
    './world.html',
    './china.html',
    './assets/css/global.css',
    './assets/css/landing.css',
    './assets/css/OS.css',
    './assets/css/world.css',
    './assets/css/china.css',
    './assets/css/base/variables.css',
    './assets/css/base/reset.css',
    './assets/css/components/navbar.css',
    './assets/css/components/buttons.css',
    './assets/js/components/layout.js',
    './assets/js/core/data-manager.js',
    './assets/js/dropdown.js',
    './assets/js/landing.js',
    './assets/js/list100.js',
    './assets/js/OS.js',
    './assets/js/world.js',
    './assets/js/china.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
