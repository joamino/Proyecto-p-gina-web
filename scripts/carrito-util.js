// --- CARRITO UNIVERSAL ---

// Actualiza el contador del carrito
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? "inline-block" : "none";
  }
}

// Muestra un toast elegante
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Agrega un producto al carrito
function agregarAlCarrito(button) {
  const producto = button.closest(".producto-card");
  const id = producto.dataset.id;
  const nombre = producto.dataset.nombre;
  const precio = parseFloat(producto.dataset.precio);
  const imagen = producto.querySelector("img").src;

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1, imagen });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarToast("Producto agregado al carrito");
}

// Inicializa eventos y contador al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  // Botón del carrito
  const carritoBtn = document.querySelector(".cart-btn");
  if (carritoBtn) {
    carritoBtn.addEventListener("click", () => {
      window.location.href = "carrito.html";
    });
  }

  // Botones de agregar al carrito
  document.querySelectorAll(".agregar-carrito-btn").forEach(btn => {
    btn.addEventListener("click", () => agregarAlCarrito(btn));
  });
});

function generarMensajePedido(productos, datosEnvio) {
  // productos: array de objetos { nombre, cantidad, precio }
  // datosEnvio: objeto { nombre, domicilio, provincia, ciudad }

  let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";

  mensaje += "🛒 Productos:\n";
  let total = 0;
  productos.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}\n`;
    total += p.precio * p.cantidad;
  });

  mensaje += `\n💰 Total: $${total}\n\n`;
  mensaje += "📦 Datos de envío:\n";
  mensaje += `Nombre: ${datosEnvio.nombre}\n`;
  mensaje += `Domicilio: ${datosEnvio.domicilio}\n`;
  mensaje += `Provincia: ${datosEnvio.provincia}\n`;
  mensaje += `Ciudad: ${datosEnvio.ciudad}\n`;

  return mensaje;
}

// Ejemplo de uso:
const productos = [{ nombre: "Bacca – Leduft", cantidad: 1, precio: 40000 }];
const datosEnvio = { nombre: "W S", domicilio: "S", provincia: "S", ciudad: "S" };

const mensaje = generarMensajePedido(productos, datosEnvio);
console.log(mensaje);