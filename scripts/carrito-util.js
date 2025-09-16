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


// Calcula el precio total aplicando combo gradual hasta 3 perfumes y mantiene 41k c/u después
function calcularTotalConCombo(carrito) {
  let total = 0;
  let perfumes = 0;

  carrito.forEach(item => {
    perfumes += item.cantidad;
  });

  if (perfumes === 1) {
    total = 45000;
  } else if (perfumes === 2) {
    total = 43000 * 2;
  } else if (perfumes >= 3) {
    total = 41000 * perfumes; // A partir del 3, cada perfume vale 41k
  }

  return total;
}
