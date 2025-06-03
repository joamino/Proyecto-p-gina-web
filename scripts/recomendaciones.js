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

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const cartCount = document.getElementById("cartCount");
const popup = document.getElementById("popup");
const carritoSection = document.getElementById("carrito");
const listaCarrito = document.getElementById("lista-carrito");
const formDatos = document.getElementById("form-datos");

let carrito = [];

menuBtn.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuBtn.classList.toggle("open", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen);
  sidebar.setAttribute("aria-hidden", !isOpen);
});

function agregarAlCarrito(button) {
  const producto = button.closest(".producto");
  const id = producto.dataset.id;
  const nombre = producto.dataset.nombre;
  const precio = parseFloat(producto.dataset.precio);

  // Evitar agregar el mismo producto más de una vez (opcional)
  if (!carrito.find(item => item.id === id)) {
    carrito.push({ id, nombre, precio });
  }

  cartCount.textContent = carrito.length;
  cartCount.style.display = carrito.length > 0 ? "inline-block" : "none";

  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

// Mostrar la sección carrito y listar los productos
function irAlCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  // Mostrar carrito
  carritoSection.style.display = "block";

  // Limpiar lista antes de mostrar
  listaCarrito.innerHTML = "";

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    listaCarrito.appendChild(li);
  });

  // Scroll a la sección carrito (opcional)
  carritoSection.scrollIntoView({ behavior: "smooth" });
}

// Evento para enviar datos por WhatsApp
formDatos.addEventListener("submit", (e) => {
  e.preventDefault();

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Obtener datos del formulario
  const nombre = formDatos.nombre.value.trim();
  const apellido = formDatos.apellido.value.trim();
  const provincia = formDatos.provincia.value.trim();
  const ciudad = formDatos.ciudad.value.trim();

  if (!nombre || !apellido || !provincia || !ciudad) {
    alert("Por favor, completa todos los datos.");
    return;
  }

  // Construir mensaje para WhatsApp
  let mensaje = `*Pedido de tienda*\n\n*Productos:*\n`;
  carrito.forEach((item, i) => {
    mensaje += `${i + 1}. ${item.nombre} - $${item.precio.toFixed(2)}\n`;
  });

  mensaje += `\n*Datos de envío:*\n`;
  mensaje += `Nombre: ${nombre}\n`;
  mensaje += `Apellido: ${apellido}\n`;
  mensaje += `Provincia: ${provincia}\n`;
  mensaje += `Ciudad: ${ciudad}`;

  // Codificar mensaje para URL
  const urlMensaje = encodeURIComponent(mensaje);

  // Número de WhatsApp al que enviar (cambia el +54911xxxxxxx por tu número)
  const numeroWhatsApp = "2901565241";

  // Abrir WhatsApp en nueva pestaña
  window.open(`https://wa.me/${numeroWhatsApp}?text=${urlMensaje}`, "_blank");
});
document.addEventListener('DOMContentLoaded', () => {
  const icono = document.getElementById('carrito-icono');
  const carrito = document.getElementById('carrito');

  icono.addEventListener('click', () => {
    carrito.classList.toggle('mostrar');
  });
});
function agregarAlCarrito(button) {
  const producto = button.closest(".producto");
  const id = producto.dataset.id;
  const nombre = producto.dataset.nombre;
  const precio = parseFloat(producto.dataset.precio);

  // Leer carrito de localStorage o inicializar
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscar si el producto ya está en el carrito
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  // Guardar carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualizar contador visual
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.style.display = carrito.length > 0 ? "inline-block" : "none";

  // Mostrar popup
  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// ...mostrar carrito...
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
  document.getElementById("cartCount").textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
}
}