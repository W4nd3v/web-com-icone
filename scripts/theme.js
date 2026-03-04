(function () {
  const html = document.documentElement;
  const btn = document.getElementById("toggleTheme");

  // Se a página não tiver o botão, não faz nada
  if (!btn) return;

  const themes = [
    { key: "dark", label: "Dark" },
    { key: "light", label: "Light" },
    { key: "purple", label: "Purple" },
    { key: "green", label: "Green" },
  ];

  function setButtonLabel(themeKey) {
    const t = themes.find(x => x.key === themeKey) || themes[0];
    btn.textContent = `Tema: ${t.label}`;
  }

  // Função pública simples: você pode chamar window.applyTheme("light")
  window.applyTheme = function (themeKey) {
    html.dataset.theme = themeKey;
    localStorage.setItem("theme", themeKey);
    setButtonLabel(themeKey);

    // Gancho: se existir uma função para atualizar a imagem principal
    if (typeof window.onThemeChanged === "function") {
      window.onThemeChanged(themeKey);
    }
  };

  const saved = localStorage.getItem("theme") || "dark";
  window.applyTheme(saved);

  btn.addEventListener("click", () => {
    const current = html.dataset.theme || "dark";
    const idx = themes.findIndex(t => t.key === current);
    const next = themes[(idx + 1) % themes.length].key;
    window.applyTheme(next);
  });
})();