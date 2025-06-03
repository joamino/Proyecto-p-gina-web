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
const carritoSeccion = document.getElementById("carrito");
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
  const precio = producto.dataset.precio;

  carrito.push({ id, nombre, precio });
  actualizarCarrito();
  mostrarPopup("Producto agregado al carrito");
}

function actualizarCarrito() {
  cartCount.textContent = carrito.length;
  if (carrito.length > 0) {
    carritoSeccion.style.display = "block";
  } else {
    carritoSeccion.style.display = "none";
  }

  // Limpiar la lista
  listaCarrito.innerHTML = "";

  // Mostrar productos
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    
    // Botón para eliminar producto del carrito
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.type = "button";
    btnEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      actualizarCarrito();
    });

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
  });
}

function mostrarPopup(mensaje) {
  popup.textContent = mensaje;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

// Manejar el envío del formulario
formDatos.addEventListener("submit", (event) => {
  event.preventDefault();

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const nombre = formDatos.nombre.value.trim();
  const apellido = formDatos.apellido.value.trim();
  const provincia = formDatos.provincia.value.trim();
  const ciudad = formDatos.ciudad.value.trim();

  if (!nombre || !apellido || !provincia || !ciudad) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Crear mensaje para WhatsApp
  let mensaje = `Hola, quiero realizar un pedido.\n\nDatos de envío:\nNombre: ${nombre}\nApellido: ${apellido}\nProvincia: ${provincia}\nCiudad: ${ciudad}\n\nProductos:\n`;
  carrito.forEach((item, i) => {
    mensaje += `${i + 1}. ${item.nombre} - $${item.precio}\n`;
  });

  const mensajeCodificado = encodeURIComponent(mensaje);

  // Número de teléfono destino (pon tu número aquí con código país sin signos, ejemplo "5491122334455")
  const telefono = "5491122334455";

  // Abrir WhatsApp Web o app móvil con el mensaje
  window.open(`https://wa.me/${2901565241}?text=${mensajeCodificado}`, "_blank");
});
</script>