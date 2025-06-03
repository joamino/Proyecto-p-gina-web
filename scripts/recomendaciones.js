<script>
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

  // Opcional: Si no hay recomendaciones por nota, usar por estación
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
const carritoManager = {
  carrito: [],

  init() {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    this.carrito = guardado;
    this.actualizarContador();
  },

  agregar(producto) {
    this.carrito.push(producto);
    this.guardar();
    this.actualizarContador();
    mostrarPopup("Producto agregado al carrito");
  },

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  },

  actualizarContador() {
    const countEl = document.getElementById("cartCount");
    countEl.textContent = this.carrito.length;
    countEl.style.display = this.carrito.length ? "inline-block" : "none";
  },

  irAlCarrito() {
    this.guardar();
    window.location.href = "carrito.html";
  }
};

function agregarAlCarrito(btn) {
  const prod = btn.closest(".producto");
  const producto = {
    id: prod.dataset.id,
    nombre: prod.dataset.nombre,
    precio: parseFloat(prod.dataset.precio)
  };
  carritoManager.agregar(producto);
}

function mostrarPopup(mensaje) {
  const popup = document.getElementById("popup");
  popup.textContent = mensaje;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

function closeSidebar() {
  sidebar.classList.remove("open");
  menuBtn.style.color = "black";
  menuBtn.setAttribute("aria-label", "Abrir menú");
}

document.getElementById("menuBtn").addEventListener("click", () => {
  sidebar.classList.toggle("open");
  const isOpen = sidebar.classList.contains("open");
  menuBtn.style.color = isOpen ? "white" : "black";
  menuBtn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

document.querySelector(".cart-btn").addEventListener("click", () => carritoManager.irAlCarrito());

window.onload = () => carritoManager.init();
</script>