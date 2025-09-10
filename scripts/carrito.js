// Asegúrate de definir tu número de WhatsApp antes del script
const NUMERO_WHATSAPP = '5491123456789'; // Cambia por tu número real

document.addEventListener('DOMContentLoaded', function () {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carritoContainer');
  const carritoTotal = document.getElementById('carritoTotal');
  const enviarBtn = document.getElementById('enviarPedido');

  // Función para mostrar el carrito
  function mostrarCarrito() {
    carritoContainer.innerHTML = '';
    if (carrito.length === 0) {
      carritoContainer.innerHTML = '<p class="vacio">Tu carrito está vacío.</p>';
      carritoTotal.textContent = '';
      return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
      const prodDiv = document.createElement('div');
      prodDiv.classList.add('producto');

      prodDiv.innerHTML = `
        <div class="producto-info" style="display:flex; align-items:center;">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <span class="producto-nombre" style="margin-left:10px;">${producto.nombre}</span>
          <span class="producto-cantidad" style="margin-left:10px;">Cantidad: ${producto.cantidad}</span>
          <span style="margin-left:10px; color:#888;">$${producto.precio}</span>
        </div>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;

      carritoContainer.appendChild(prodDiv);
      total += producto.precio * producto.cantidad;
    });

    carritoTotal.textContent = 'Total: $' + total.toFixed(2);

    // Event listeners para eliminar productos
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

  // Botones de agregar al carrito
  document.querySelectorAll('.producto-card button').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault(); // Evita que <a> navegue al hacer click en el botón
      const card = btn.closest('.producto-card');
      const producto = {
        id: card.dataset.id,
        nombre: card.dataset.nombre,
        precio: parseFloat(card.dataset.precio),
        imagen: card.querySelector('img').src,
        cantidad: 1
      };

      const index = carrito.findIndex(p => p.id == producto.id);
      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push(producto);
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
    });
  });

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
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`, '_blank');

    // Vaciar carrito y actualizar
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();

    // Limpiar formulario
    document.getElementById('datosForm').reset();

    alert('¡Pedido enviado exitosamente! Te contactaremos por WhatsApp.');
  });
});