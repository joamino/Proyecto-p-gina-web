document.addEventListener('DOMContentLoaded', function () {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carritoContainer');
  const carritoTotal = document.getElementById('carritoTotal');
  const enviarBtn = document.getElementById('enviarPedido');

  function mostrarCarrito() {
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
      carritoContainer.innerHTML = '<p class="vacio">Tu carrito está vacío.</p>';
      carritoTotal.textContent = "";
      return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
      const prodDiv = document.createElement-icons-png.flaticon.com/512/479/479295.png';

      prodDiv.innerHTML = `
        <div style="display: flex; align-items: center;" class="producto-info">
          <img src="${imagen}" alt="${producto.nombre}" />
          <span class="producto-nombre">${producto.nombre}</span>
          <span class="producto-cantidad">Cantidad: ${producto.cantidad || 1}</span>
          <span style="margin-left: 10px; color: #888;">$${producto.precio}</span>
        </div>
        <button class="eliminar" aria-label="Eliminar ${producto.nombre}" data-index="${index}">Eliminar</button>
      `;

      carritoContainer.appendChild(prodDiv);

      total += (producto.precio || 0) * (producto.cantidad || 1);
    });

    carritoTotal.textContent = "Total: $" + total.toFixed(2);

    // Event listeners para eliminar
    document.querySelectorAll('button.eliminar').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = e.target.dataset.index;
        carrito.splice(idx, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito(); // Recarga el DOM
      });
    });
  }

  mostrarCarrito();

  enviarBtn.addEventListener('click', function () {
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
      alert('Por favor, completa todos los datos personales }

    let mensaje = '🛒 *Pedido:*\n\n';
    carrito.forEach((producto, i) => {
      mensaje += `${i + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad || 1}\n`;
    });

    mensaje += `\n📍 *Datos del cliente:*\n`;
    mensaje += `Nombre: ${nombre} ${apellido}\nDomicilio: ${domicilio}\nProvincia: ${provincia}\nCiudad: ${ciudad}\n`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    // ⚠️ Cambia este número por tu número de Whats Abre WhatsApp
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`, '_blank');

    // Vacía el carrito
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();

    // Limpia el formulario
    document.getElementById('datosForm').reset();

    // Muestra mensaje de confirmación
    alert('¡Pedido enviado exitosamente! Te contactaremos por WhatsApp.');
  });
});