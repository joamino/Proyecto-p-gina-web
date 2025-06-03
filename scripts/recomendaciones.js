// --- RECOMENDACIONES POR NOTA/ESTACIÓN (opcional, solo si usás esta parte) ---
const perfumes = [
  {
    nombre: "Gonzalo",
    imagen: "https://i.imgur.com/6a1VHRQ.jpeg",
    link: "gonzalo.html",
    nota: "amaderado",
    estacion: "invierno"
  },
  {
    nombre: "Joako",
    imagen: "https://i.imgur.com/OTDMKmW.jpeg",
    link: "joako.html",
    nota: "cítrico",
    estacion: "verano"
  },
  {
    nombre: "Dylan",
    imagen: "https://i.imgur.com/HjDx5RW.jpeg",
    link: "dylan.html",
    nota: "amaderado",
    estacion: "invierno"
  }
];

if (document.querySelector(".producto-detalle")) {
  const current = document.querySelector(".producto-detalle");
  const notaActual = current.dataset.nota;
  const estacionActual = current.dataset.estacion;
  const recomendacionesDiv = document.getElementById("recomendaciones");

  perfumes
    .filter(p => p.nota === notaActual && p.link !== window.location.pathname.split("/").pop())
    .forEach(p => {
      recomendacionesDiv.innerHTML += `
        <a class="producto" href="${p.link}">
          <img src="${p.imagen}" alt="Perfume ${p.nombre}" />
          <h2>Perfume ${p.nombre}</h2>
        </a>`;
    });

  // Si no hay recomendaciones por nota, usar por estación
  if (recomendacionesDiv.children.length === 0) {
    perfumes
      .filter(p => p.estacion === estacionActual && p.link !== window.location.pathname.split("/").pop())
      .forEach(p => {
        recomendacionesDiv.innerHTML += `
          <a class="producto" href="${p.link}">
            <img src="${p.imagen}" alt="Perfume ${p.nombre}" />
            <h2>Perfume ${p.nombre}</h2>
          </a>`;
      });
  }
}

// --- CARRITO UNIVERSAL ---

// Actualiza el contador visual del carrito
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? "inline-block" : "none";
  }
}

// Función para agregar productos al carrito (con cantidad)
function agregarAlCarrito(button) {
  const producto = button.closest(".producto");
  const id = producto.dataset.id;
  const nombre = producto.dataset.nombre;
  const precio = parseFloat(producto.dataset.precio);

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();

  // Mostrar popup si existe
  const popup = document.getElementById("popup");
  if (popup) {
    popup.textContent = "Producto agregado al carrito";
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 2000);
  }
}

// Inicializa el contador al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  // Si tienes un botón de carrito (ícono), puedes poner esto:
  const carritoBtn = document.querySelector(".cart-btn");
  if (carritoBtn) {
    carritoBtn.addEventListener("click", (e) => {
      window.location.href = "carrito.html";
    });
  }
});

// --- SIDEBAR (menú lateral, opcional) ---
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