const CACHE_NAME = "app-cache-v1";

const ARCHIVOS_A_CACHEAR = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/sensores.html",
  "/servicios.html",
  "/librerias.html",
  "/depuracion.html",
  "/empaquetado.html",
  "/plataformas.html",
  "/biomebaro.png",
  "/webb.png"
];

// INSTALACIÓN DEL SERVICE WORKER
self.addEventListener("install", e => {
  console.log("Service Worker instalado");
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );
});

// ACTIVACIÓN Y LIMPIEZA DE CACHÉS ANTIGUOS
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// INTERCEPTAR PETICIONES Y USAR CACHÉ
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(respuestaCache => {
      return respuestaCache || fetch(e.request);
    })
  );
});
