const zoomJoin = "zoomy"
const assets = [
  "/",
  "/index.html",
  "/index.js",
  "/style.css",
  "/img/timetable.jpeg",
  "/https://fonts.googleapis.com/*",
  "/lib/*",
  "/lib/font-awesome/font-awesome.min.css",
  "/lib/vue.js",
  "/lib/bootstrap5.min.css",
  "/lib/jquery-3.3.1.min.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(zoomJoin).then(cache => {
      cache.addAll(assets)
    })
  )
})