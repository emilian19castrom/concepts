// ==============================
//      SERVICE WORKER PWA
// ==============================

const CACHE_NAME = "app-cache-v5";

// Archivos esenciales para modo offline.
// Rutas EXACTAS respetando MAYÚSCULAS y la estructura del repo.
const ARCHIVOS_A_CACHEAR = [
  "./index.html",
  "./style2.css",
  "./script.js",
  "./manifest.json",

  // Páginas principales
  "./sistemas.html",
  "./Aplicaciones.html",
  "./Hardware.html",
  "./Lenguajes.html",
  "./Entornos.html",
  "./Diseño.html",
  "./Guias.html",
  "./Arquitecturas.html",
  "./Herramientas.html",
  "./Persistencia.html",
  "./sensores.html",
  "./servicios.html",
  "./librerias.html",
  "./depuracion.html",
  "./empaquetado.html",
  "./plataformas.html",

  // Íconos
  "./biomebaro.png",
  "./webb.png",
  "./shared.jpg",
];

// ==============================
//      INSTALACIÓN DEL SW
// ==============================
self.addEventListener("install", event => {
  console.log("Service Worker instalado");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );

  self.skipWaiting();
});

// ==============================
//   ACTIVACIÓN Y LIMPIEZA DE CACHE
// ==============================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Eliminando caché antiguo:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// ==============================
//      FETCH: CACHE DINÁMICO
// ==============================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Si existe en cache → lo devuelve
      if (cachedResponse) return cachedResponse;

      // Si no existe → lo obtiene y lo guarda (para imágenes y nuevos recursos)
      return fetch(event.request)
        .then(networkResponse => {
          // No guardar recursos inseguros o errores
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // Guardar en caché dinámico
          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          // Fallback para HTML si estás offline y no existe en caché
          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("./index.html");
          }
        });
    })
  );
});
