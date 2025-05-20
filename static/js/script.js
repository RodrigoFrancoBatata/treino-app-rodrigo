document.addEventListener("DOMContentLoaded", () => {
  // Dark mode
  const toggle = document.getElementById("toggleDark");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      localStorage.setItem("modoClaro", document.body.classList.contains("light-mode"));
    });
    const lightSaved = localStorage.getItem("modoClaro") === "true";
    if (lightSaved) {
      document.body.classList.add("light-mode");
    }
  }

  // Timer de descanso
  const botoes = document.querySelectorAll(".timer");
  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      let tempo = 45;
      const div = btn.nextElementSibling;
      div.textContent = `Descanso: ${tempo}s`;

      const intervalo = setInterval(() => {
        tempo--;
        div.textContent = `Descanso: ${tempo}s`;
        if (tempo <= 0) {
          clearInterval(intervalo);
          div.textContent = "⏱ Descanso finalizado!";
        }
      }, 1000);
    });
  });

  // Check de exercício com localStorage
  const checkboxes = document.querySelectorAll(".check-exercicio");
  checkboxes.forEach((checkbox) => {
    const key = checkbox.dataset.exercicio;
    checkbox.checked = localStorage.getItem(key) === "true";
    checkbox.addEventListener("change", () => {
      localStorage.setItem(key, checkbox.checked);
    });
  });
});
