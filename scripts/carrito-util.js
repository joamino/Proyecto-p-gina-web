// --- CARRITO UNIVERSAL ---
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? "inline-block" : "none";
  }
}

function agregarAlCarrito(button) {
  const producto = button.closest(".producto");
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

  // Mostrar popup si existe
  const popup = document.getElementById("popup");
  if (popup) {
    popup.textContent = "Producto agregado al carrito";
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  const carritoBtn = document.querySelector(".cart-btn");
  if (carritoBtn) {
    carritoBtn.addEventListener("click", () => {
      window.location.href = "carrito.html";
    });
  }
});