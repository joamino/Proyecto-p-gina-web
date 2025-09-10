document.addEventListener('DOMContentLoaded', function () {
  // Obtenemos el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carritoContainer');
  const carritoTotal = document.getElementById('carritoTotal');
  const enviarBtn = document.getElementById('enviarPedido');

  // Función para agregar producto
  function agregarProducto(card) {
    const producto = {
      id: card.dataset.id,
      nombre: card.dataset.nombre,
      precio: parseFloat(card.dataset.precio),
      imagen: card.querySelector('img').src
    };

    const index = carrito.findIndex(p => p.id == producto.id);
    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }

  // Capturamos todos los botones de agregar al carrito
  document.querySelectorAll('.producto-card button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();  // Evita que el <a> navegue
      e.stopPropagation(); // Evita propagación

      const card = btn.closest('.producto-card');
      agregarProducto(card);
    });
  });

  // Función para mostrar carrito
  function mostrarCarrito() {
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
      carritoContainer.innerHTML = '<p class="vacio">Tu carrito está vacío.</p>';
      carritoTotal.textContent = "";
      return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
      const prodDiv = document.createElement('div');
      prodDiv.classList.add('producto');

      const imagen = producto.imagen || 'ruta_por_defecto.png';

      prodDiv.innerHTML = `
        <div style="display: flex; align-items: center;" class="producto-info">
          <img src="${imagen}" alt="${producto.nombre}" />
          <span class="producto-nombre">${producto.nombre}</span>
          <span class="producto-cantidad">Cantidad: ${producto.cantidad}</span>
          <span style="margin-left: 10px; color: #888;">$${producto.precio}</span>
        </div>
        <button class="eliminar" aria-label="Eliminar ${producto.nombre}" data-index="${index}">Eliminar</button>
      `;

      carritoContainer.appendChild(prodDiv);

      total += producto.precio * producto.cantidad;
    });

    carritoTotal.textContent = "Total: $" + total.toFixed(2);

    // Event listeners para eliminar
    document.querySelectorAll('button.eliminar').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = e.target.dataset.index;
        carrito.splice(idx, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
      });
    });
  }

  mostrarCarrito();

  // Enviar pedido por WhatsApp
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
      alert('Por favor, completa todos los datos personales');
      return;
    }

    let mensaje = '🛒 *Pedido:*\n\n';
    carrito.forEach((producto, i) => {
      mensaje += `${i + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad}\n`;
    });

    mensaje += `\n📍 *Datos del cliente:*\n`;
    mensaje += `Nombre: ${nombre} ${apellido}\nDomicilio: ${domicilio}\nProvincia: ${provincia}\nCiudad: ${ciudad}\n`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    // Abrir WhatsApp con el número de config.js
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`, '_blank');

    // Vaciar carrito
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();

    // Limpiar formulario
    document.getElementById('datosForm').reset();

    alert('¡Pedido enviado exitosamente! Te contactaremos por WhatsApp.');
  });
});