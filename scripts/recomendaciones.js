<script>
  const perfumes = [
    {
      nombre: "Gonzalo",
      imagen: "https://i.imgur.com/6a1VHRQ.jpeg",
      link: "gonzalo.html",
      nota: "amaderado",
      estacion: "invierno"
    },
    {
      nombre: "Joako",
      imagen: "https://i.imgur.com/OTDMKmW.jpeg",
      link: "joako.html",
      nota: "cítrico",
      estacion: "verano"
    },
    {
      nombre: "Dylan",
      imagen: "https://i.imgur.com/HjDx5RW.jpeg",
      link: "dylan.html",
      nota: "amaderado",
      estacion: "invierno"
    }
  ];

  const current = document.querySelector(".producto-detalle");
  const notaActual = current.dataset.nota;
  const estacionActual = current.dataset.estacion;
  const recomendacionesDiv = document.getElementById("recomendaciones");

  perfumes
    .filter(p => p.nota === notaActual && p.link !== window.location.pathname.split("/").pop())
    .forEach(p => {
      recomendacionesDiv.innerHTML += `
        <a class="producto" href="${p.link}">
          <img src="${p.imagen}" alt="Perfume ${p.nombre}" />
          <h2>Perfume ${p.nombre}</h2>
        </a>`;
    });

  // Opcional: Si no hay recomendaciones por nota, usar por estación
  if (recomendacionesDiv.children.length === 0) {
    perfumes
      .filter(p => p.estacion === estacionActual && p.link !== window.location.pathname.split("/").pop())
      .forEach(p => {
        recomendacionesDiv.innerHTML += `
          <a class="producto" href="${p.link}">
            <img src="${p.imagen}" alt="Perfume ${p.nombre}" />
            <h2>Perfume ${p.nombre}</h2>
          </a>`;
      });
  }
</script>