document.addEventListener('DOMContentLoaded', function() {
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
     ="width:38px;height:38px;object-fit:cover;border-radius:5px;margin-right:12px;">
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
        // Si usás el utilitario:
        if (typeof actualizarContadorCarrito === "function") actualizarContadorCarrito();
      });
    });
  }

  mostrarCarrito();

  // Enviar pedido por WhatsApp
  document.getElementById('enviarPedido').addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de enviar el pedido.');
      return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementBy.getElementById('domicilio').value.trim();
    const provincia = document.getElementById('provincia').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();

    if (!nombre || !apellido || !domicilio || !provincia || !ciudad) {
      alert('Por favor, completa todos los datos personales antes de enviar el pedido.');
      return;
    }

    let mensaje = 'Pedido:\n\n';
    carrito.forEach((producto, i) => {
      mensaje += `${i + 1}. ${producto.nombre} - Cantidad: ${producto.cantidadn`;
    });
    mensaje += `\nDatos del cliente:\nNombre: ${nombre} ${apellido}\nDomicilio: ${domicilio}\nProvincia: ${provincia}\nCiudad: ${ciudad}\n`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    // Cambia este número por ej: 5491122223333
    const NUMERO_WHATSAPP = "TUNUMEROAQUI";
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`, '_blank');
  });
});