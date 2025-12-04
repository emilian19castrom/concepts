const CACHE_NAME = "app-cache-v3";

// Archivos a cachear (TODOS en rutas relativas para GitHub Pages)
const ARCHIVOS_A_CACHEAR = [
  "./index.html",
  "./style.css",
  "./script.js",
  "./sensores.html",
  "./servicios.html",
  "./librerias.html",
  "./depuracion.html",
  "./empaquetado.html",
  "./plataformas.html",
  "./biomebaro.png",
  "./webb.png"
];

// INSTALACIÓN DEL SERVICE WORKER
self.addEventListener("install", event => {
  console.log("Service Worker instalado");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );
});

// ACTIVACIÓN Y LIMPIEZA DE CACHÉS ANTIGUOS
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Eliminando caché antiguo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// INTERCEPTAR PETICIONES Y USAR CACHÉ
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request);
    })
  );
});
