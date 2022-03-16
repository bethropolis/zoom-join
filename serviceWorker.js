const zoomJoin = "zoomy"
const assets = [
  "/zoom-join/",
  "/zoom-join/index.html",
  "/zoom-join/index.js",
  "/zoom-join/style.css",
  "/zoom-join/img/timetable.jpeg",
  "/zoom-join/lib/*",
  "/zoom-join/lib/font-awesome/font-awesome.min.css",
  "/zoom-join/lib/vue.js",
  "/zoom-join/lib/bootstrap5.min.css",
  "/zoom-join/lib/jquery-3.3.1.min.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(zoomJoin).then(cache => {
      cache.addAll(assets)
    })
  )
}) 