const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    const isOpen = sidebar.classList.contains("open");
    menuBtn.style.color = isOpen ? "white" : "black";
    menuBtn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuBtn.setAttribute("aria-expanded", isOpen);
    sidebar.setAttribute("aria-hidden", !isOpen);
  });
}

function closeSidebar() {
  if (sidebar && menuBtn) {
    sidebar.classList.remove("open");
    menuBtn.style.color = "black";
    menuBtn.setAttribute("aria-label", "Abrir menú");
    menuBtn.setAttribute("aria-expanded", "false");
    sidebar.setAttribute("aria-hidden", "true");
  }
}