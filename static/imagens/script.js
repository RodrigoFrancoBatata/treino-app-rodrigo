document.addEventListener("DOMContentLoaded", () => {
  // 🌙 Modo escuro/claro
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

  // ⏱ Timer de descanso com tempo personalizável + som
  const botoes = document.querySelectorAll(".timer");
  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tempoSelect = btn.parentElement.querySelector(".tempo-descanso");
      let tempo = tempoSelect ? parseInt(tempoSelect.value) : 45;
      const div = btn.nextElementSibling;
      const audio = new Audio("/static/som/timer.mp3");

      div.textContent = `Descanso: ${tempo}s`;

      const intervalo = setInterval(() => {
        tempo--;
        div.textContent = `Descanso: ${tempo}s`;
        if (tempo <= 0) {
          clearInterval(intervalo);
          div.textContent = "⏱ Descanso finalizado!";
          audio.play();
        }
      }, 1000);
    });
  });

  // ✅ Checkbox com localStorage e envio para o backend
  const checkboxes = document.querySelectorAll(".check-exercicio");
  const exerciciosFeitos = {};
  const diaAtual = document.querySelector("h1")?.textContent?.replace("Treino de ", "").trim();

  checkboxes.forEach((checkbox) => {
    const key = checkbox.dataset.exercicio;
    checkbox.checked = localStorage.getItem(key) === "true";

    checkbox.addEventListener("change", () => {
      localStorage.setItem(key, checkbox.checked);
      exerciciosFeitos[key] = checkbox.checked;

      if (diaAtual) {
        fetch("/salvar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dia: diaAtual, feitos: exerciciosFeitos })
        }).then(res => {
          if (!res.ok) {
            console.error("❌ Erro ao salvar histórico.");
          }
        });
      }
    });
  });
});
