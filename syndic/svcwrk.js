const APP_NAME = 'syndic';
const RELEASE = 2;
const CACHE_NAME = `${APP_NAME}-v${RELEASE}`;
const CACHE_PAGES = ['/syndic'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_PAGES);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(response => {
        // Verify that the response is valid
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Create a new response stream to be consumed by the cache.
        const responseForCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseForCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', event => {
  caches.keys().then(keys => {
    let matches = keys.map(key => {
      if (key.startsWith('syndic-') && key !== CACHE_NAME) {
        caches.delete(key);
      }
    });
  });
});
