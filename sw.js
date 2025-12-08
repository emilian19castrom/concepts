const CACHE_NAME = "app-cache-v4";

// Archivos a cachear (TODOS en rutas relativas por GitHub Pages)
const ARCHIVOS_A_CACHEAR = [
  "./index.html",
  "./style2.css",
  "./script.js",

  // Nuevas páginas añadidas en tu index
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

  // Páginas que ya existían antes
  "./sensores.html",
  "./servicios.html",
  "./librerias.html",
  "./depuracion.html",
  "./empaquetado.html",
  "./plataformas.html",

  // Imágenes u otros recursos
  "./biomebaro.png",
  "./webb.png",

  // Manifest (opcional pero recomendable cachearlo)
  "./manifest.json",
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

// INTERCEPTAR PETICIONES Y USAR CACHÉ SI EXISTE
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      // Si existe en caché lo devuelve, si no, va a la red
      return cacheResponse || fetch(event.request);
    })
  );
});
