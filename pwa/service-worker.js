
const CACHE_NAME = "elprisen-v8";
const APP_FILES = [
    "/",
    "/index.html",
    "/offline.html",
    "/offline/offline.html",
    "/assets/css/site.css",
    "/assets/js/site.js",
    "/src/App.js",
    "/src/animations.js",
    "/src/api/elprisApi.js",
    "/src/controller/router.js",
    "/src/view/pages/currentpage.js",
    "/src/view/pages/historypage.js",
    "/src/view/pages/notfoundpage.js",
    "/src/view/pages/overviewpage.js",
    "/assets/img/favicon.png",
    "/pwa/manifest.json",
    "/reference/assets/logo-favicon%20assets/192.png",
    "/reference/assets/logo-favicon%20assets/512.png"
];



self.addEventListener("install", (event) => {
    event.waitUntil(Promise.all([
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)),
        self.skipWaiting()
    ]));
}

);
self.addEventListener("activate", (event) => {
    event.waitUntil(

        caches.keys().then((cacheNames) => Promise.all(
            cacheNames
            .filter((cacheName) => cacheName.startsWith("elprisen-") && cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )).then(() => self.clients.claim())
    );


});
self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET") {
        return; }


    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).catch(async () => {
                const cache = await caches.open(CACHE_NAME);
                return (await cache.match(request)) || cache.match("/offline/offline.html");
                
            })
        );
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => cache.match(request)).then((cachedResponse) => {
            return cachedResponse || fetch(request);
        }));
    });


