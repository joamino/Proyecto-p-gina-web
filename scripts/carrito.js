<script>
function actualizarCarritoCantidad() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  // Suma la cantidad total de productos
  let total = carrito.reduce((sum, prod) => sum + (prod.cantidad || 1), 0);
  document.getElementById('carrito-cantidad').textContent = total;
}
// Llama la función al cargar la página
actualizarCarritoCantidad();
</script>