const app = document.getElementById("app");
let filtro = { texto: "", tipo: "Todas" };

function lista() {
  const tipos = ["Todas", ...new Set(RECETAS.map((r) => r.tipo))];
  app.innerHTML = `
    <div class="herramientas">
      <input id="buscar" type="search" placeholder="Buscar receta o ingrediente" value="${filtro.texto}">
      <nav class="filtros">
        ${tipos.map((t) => `<button class="${t === filtro.tipo ? "activo" : ""}" data-tipo="${t}">${t}</button>`).join("")}
      </nav>
    </div>
    <ol class="indice" id="recetas"></ol>
    <details class="guia">
      <summary>Notas de uso</summary>
      <ol>
        <li>Llena el vaso solo hasta la línea MAX.</li>
        <li>Congela 24 horas en una superficie plana.</li>
        <li>Quita la tapa y usa el programa que indica la receta.</li>
        <li>Si sale arenoso, añade una cucharada de leche y usa RE-SPIN.</li>
        <li>Para los toppings, haz un hueco en el centro, añádelos y usa MIX-IN.</li>
      </ol>
    </details>
  `;

  const pintar = () => {
    const q = filtro.texto.toLowerCase();
    const res = RECETAS.filter(
      (r) =>
        (filtro.tipo === "Todas" || r.tipo === filtro.tipo) &&
        (r.nombre + " " + r.ingredientes.join(" ")).toLowerCase().includes(q)
    );
    document.getElementById("recetas").innerHTML = res.length
      ? res
          .map(
            (r) => `
        <li><a href="#${r.id}">
          <span class="nombre">${r.nombre}</span>
          <span class="meta">${r.tipo} · ${r.programa}</span>
        </a></li>`
          )
          .join("")
      : `<li class="vacio">No hay recetas que coincidan.</li>`;
  };

  document.getElementById("buscar").addEventListener("input", (e) => {
    filtro.texto = e.target.value;
    pintar();
  });
  app.querySelectorAll(".filtros button").forEach((b) =>
    b.addEventListener("click", () => {
      filtro.tipo = b.dataset.tipo;
      app.querySelectorAll(".filtros button").forEach((c) => c.classList.toggle("activo", c === b));
      pintar();
    })
  );
  pintar();
}

function detalle(r) {
  app.innerHTML = `
    <a href="#" class="volver">← Índice</a>
    <article class="receta">
      <header>
        <p class="meta">${r.tipo}</p>
        <h1>${r.nombre}</h1>
        <p class="programa">Programa: ${r.programa}</p>
      </header>

      <div class="cuerpo">
        <section>
          <h2>Ingredientes</h2>
          <ul class="ingredientes">
            ${r.ingredientes.map((i) => `<li><label><input type="checkbox"> <span>${i}</span></label></li>`).join("")}
          </ul>
        </section>

        <section>
          <h2>Elaboración</h2>
          <ol class="pasos">${r.pasos.map((p) => `<li>${p}</li>`).join("")}</ol>
          ${r.mixin ? `<p class="nota"><b>Mix-in.</b> ${r.mixin}</p>` : ""}
          ${r.consejo ? `<p class="nota"><b>Nota.</b> ${r.consejo}</p>` : ""}
        </section>
      </div>
    </article>
  `;
}

function router() {
  const id = decodeURIComponent(location.hash.slice(1));
  const receta = RECETAS.find((r) => r.id === id);
  if (receta) {
    detalle(receta);
    document.title = `${receta.nombre} · Recetas Ninja CREAMi`;
  } else {
    lista();
    document.title = "Recetas Ninja CREAMi";
  }
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", router);
router();
