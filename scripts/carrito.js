document.addEventListener('DOMContentLoaded', function () {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carritoContainer');
    const carritoTotal = document.getElementById('carritoTotal');
    const enviarBtn = document.getElementById('enviarPedido');

    // ===== Función para agregar productos =====
    window.agregarAlCarrito = function(btn) {
        const productoCard = btn.closest('.producto-card');

        const producto = {
            id: productoCard.dataset.id,
            nombre: productoCard.dataset.nombre,
            precio: parseFloat(productoCard.dataset.precio),
            imagen: productoCard.querySelector('img').src
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

    // ===== Función para mostrar el carrito =====
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
                    <span class="producto-cantidad">Cantidad: ${producto.cantidad || 1}</span>
                    <span style="margin-left: 10px; color: #888;">$${producto.precio}</span>
                </div>
                <button class="eliminar" aria-label="Eliminar ${producto.nombre}" data-index="${index}">Eliminar</button>
            `;

            carritoContainer.appendChild(prodDiv);

            total += (producto.precio || 0) * (producto.cantidad || 1);
        });

        carritoTotal.textContent = "Total: $" + total.toFixed(2);

        // Event listeners para eliminar productos
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

    // ===== Función para enviar pedido a WhatsApp =====
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

        // Generar mensaje para WhatsApp
        let mensaje = '🛒 *Pedido:*\n\n';
        carrito.forEach((producto, i) => {
            mensaje += `${i + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad || 1}\n`;
        });

        mensaje += `\n📍 *Datos del cliente:*\n`;
        mensaje += `Nombre: ${nombre} ${apellido}\nDomicilio: ${domicilio}\nProvincia: ${provincia}\nCiudad: ${ciudad}\n`;

        const mensajeCodificado = encodeURIComponent(mensaje);

        // Usando tu variable NUMERO_WHATSAPP
        window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`, '_blank');

        // Vaciar carrito y limpiar formulario
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        document.getElementById('datosForm').reset();
        alert('¡Pedido enviado exitosamente! Te contactaremos por WhatsApp.');
    });
});