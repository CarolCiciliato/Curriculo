const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Abrir menu de navegação" : "Fechar menu de navegação",
    );
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Node &&
      !menuToggle.contains(event.target) &&
      !navigation.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

document.querySelectorAll("table").forEach((table) => {
  const headings = Array.from(table.querySelectorAll("thead th")).map((heading, index) => {
    const label = heading.textContent.trim();
    return label || (index === 0 ? "Item" : `Coluna ${index + 1}`);
  });

  if (!headings.length) {
    return;
  }

  table.classList.add("responsive-table");
  table.querySelectorAll("tbody tr").forEach((row) => {
    Array.from(row.cells).forEach((cell, index) => {
      cell.dataset.label = headings[index] || `Coluna ${index + 1}`;
    });
  });
});
