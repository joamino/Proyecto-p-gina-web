<script>
function actualizarCarritoCantidad() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  // Suma la cantidad total de productos
  let total = carrito.reduce((sum, prod) => sum + (prod.cantidad || 1), 0);
  document.getElementById('carrito-cantidad').textContent = total;
}
// Llama la función al cargar la página
actualizarCarritoCantidad();
document.addEventListener('DOMContentLoaded', function() {
  // Carga carrito desde localStorage o vacío
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carritoContainer');
  const carritoTotal = document.getElementById('carritoTotal');

  function mostrarCarrito() {
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
      carritoContainer.innerHTML = '<p class="vacio">Tu carrito está vacío.</p>';
      carritoTotal.textContent = "";
      return;
    }

    let total = 0;
    carrito.forEach((producto, index) => {
      total += producto.precio * (producto.cantidad || 1);

      const prodDiv = document.createElement('div');
      prodDiv.classList.add('producto');
      prodDiv.innerHTML = `
        <img src="${producto.imagen ? producto.imagen : 'https://cdn-icons-png.flaticon.com/512/479/479295.png'}" alt="${producto.nombre}" style="width:38px;height:38px;object-fit:cover;border-radius:5px;margin-right:12px;">
        <div class="producto-info">
          <span class="producto-nombre">${producto.nombre}</span>
          <span class="producto-cantidad">Cantidad: ${producto.cantidad || 1}</span>
          <span style="margin-left:10px; color:#888;">$${producto.precio}</span>
        </div>
        <button class="eliminar" aria-label="Eliminar ${producto.nombre}" data-index="${index}">Eliminar</button>
      `;
      carritoContainer.appendChild(prodDiv);
    });

    carritoTotal.textContent = "Total: $" + total;

    // Event listeners para eliminar
    document.querySelectorAll('button.eliminar').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = e.target.dataset.index;
        carrito.splice(idx, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        actualizarCarritoCantidad(); // Actualiza el numerito del carrito si lo tienes en el header
      });
    });
  }

  function actualizarCarritoCantidad() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((sum, prod) => sum + (prod.cantidad || 1), 0);
    const spanCantidad = document.getElementById('carrito-cantidad');
    if (spanCantidad) {
      spanCantidad.textContent = total;
    }
  }

  mostrarCarrito();
  actualizarCarritoCantidad();

  // Enviar pedido por WhatsApp
  document.getElementById('enviarPedido').addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de enviar el pedido.');
      return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const domicilio = document.getElementById('domicilio').value.trim();
    const provincia = document.getElementById('provincia').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();

    if (!nombre || !apellido || !domicilio || !provincia || !ciudad) {
      alert('Por favor, completa todos los datos personales antes de enviar el pedido.');
      return;
    }

    let mensaje = 'Pedido:\n\n';
    carrito.forEach((producto, i) => {
      mensaje += `${i + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad || 1}\n`;
    });
    mensaje += `\nDatos del cliente:\nNombre: ${nombre} ${apellido}\nDomicilio: ${domicilio}\nProvincia: ${provincia}\nCiudad: ${ciudad}\n`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    // Cambia este número por tu número real de WhatsApp, ej: 5491122223333
    const NUMERO_WHATSAPP = "TUNUMEROAQUI";
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`, '_blank');
  });
});
</script>