document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const toggleButton = document.getElementById("toggleDark");

  // Aplicar modo salvo
  const lightSaved = localStorage.getItem("modoClaro") === "true";
  if (lightSaved) {
    body.classList.add("light-mode");
  }

  // Alternância de modo
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      body.classList.toggle("light-mode");
      const modoClaro = body.classList.contains("light-mode");
      localStorage.setItem("modoClaro", modoClaro);
    });
  }

  // Timer de 45s
  const botoesTimer = document.querySelectorAll(".timer");
  botoesTimer.forEach((botao) => {
    botao.addEventListener("click", () => {
      let tempo = 45;
      const divContador = botao.nextElementSibling;
      divContador.textContent = `Descanso: ${tempo}s`;

      const intervalo = setInterval(() => {
        tempo--;
        divContador.textContent = `Descanso: ${tempo}s`;

        if (tempo <= 0) {
          clearInterval(intervalo);
          divContador.textContent = "⏱ Descanso finalizado!";
        }
      }, 1000);
    });
  });
});
