self.addEventListener("install", function (event) {
    event.waitUntil(
      caches.open("v1").then(function (cache) {
        return cache.addAll([
          "/",
          "/manifest.json",
          "/static/css/style.css",
          "/static/js/script.js",
          "/treino/segunda-feira",
          "/treino/quarta-feira",
          "/treino/sexta-feira"
        ]);
      })
    );
    console.log("Service Worker instalado");
  });
  
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  });

  