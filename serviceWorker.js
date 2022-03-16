const zoomJoin = "zoomy"
const assets = [
  "./?v2",
  "serviceWorker.js",
  "app.webmanifest",
  "index.html?v2",
  "index.js",
  "style.css",
  "img/timetable.jpeg",
  "lib/",
  "lib/font-awesome/font-awesome.min.css",
  "lib/vue.js",
  "lib/bootstrap5.min.css",
  "lib/jquery-3.3.1.min.js",
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(zoomJoin).then(cache => {
      cache.addAll(assets)
    })
  )
}) 

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request)
          .then(function(response) {
                  // Cache hit - return response
                  if (response) {
                      return response;
                  }
                  return fetch(event.request);
              }
          )
  );
});

self.addEventListener('activate', (event) => {
  // Specify allowed cache keys
  const cacheAllowList = zoomJoin;

  // Get all the currently active `Cache` instances.
  event.waitUntil(caches.keys().then((keys) => {
    // Delete all caches that aren't in the allow list:
    return Promise.all(keys.map((key) => {
      if (!cacheAllowList.includes(key)) {
        return caches.delete(key);
      }
    }));
  }));
});