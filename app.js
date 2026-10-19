const app = document.getElementById("app");
let filtro = { texto: "", tipo: "Todas" };

function lista() {
  const tipos = ["Todas", ...new Set(RECETAS.map((r) => r.tipo))];
  app.innerHTML = `
    <details class="guia">
      <summary>Cómo usar la Creami</summary>
      <ol>
        <li>Llena el vaso solo hasta la línea <b>MAX</b>.</li>
        <li>Congela <b>24 h</b> en una superficie plana.</li>
        <li>Quita la tapa y usa el programa de la receta.</li>
        <li>¿Sale arenoso? Añade 1 cucharada de leche y pulsa <b>RE-SPIN</b>.</li>
        <li>Para los toppings: haz un hueco en el centro, añádelos y pulsa <b>MIX-IN</b>.</li>
      </ol>
    </details>
    <input id="buscar" type="search" placeholder="Buscar receta…" value="${filtro.texto}">
    <div class="chips">
      ${tipos.map((t) => `<button class="chip ${t === filtro.tipo ? "activo" : ""}" data-tipo="${t}">${t}</button>`).join("")}
    </div>
    <ul class="recetas" id="recetas"></ul>
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
        <li><a href="#${r.id}" class="tarjeta">
          <span class="emoji">${r.emoji}</span>
          <span><b>${r.nombre}</b><small>${r.tipo} · ${r.programa}</small></span>
        </a></li>`
          )
          .join("")
      : `<li class="vacio">No hay recetas con ese nombre.</li>`;
  };

  document.getElementById("buscar").addEventListener("input", (e) => {
    filtro.texto = e.target.value;
    pintar();
  });
  app.querySelectorAll(".chip").forEach((b) =>
    b.addEventListener("click", () => {
      filtro.tipo = b.dataset.tipo;
      app.querySelectorAll(".chip").forEach((c) => c.classList.toggle("activo", c === b));
      pintar();
    })
  );
  pintar();
}

function detalle(r) {
  app.innerHTML = `
    <a href="#" class="volver">← Todas las recetas</a>
    <article class="receta">
      <h1><span>${r.emoji}</span> ${r.nombre}</h1>
      <p class="programa">${r.tipo} · Programa <b>${r.programa}</b></p>

      <h2>Ingredientes</h2>
      <ul class="ingredientes">
        ${r.ingredientes.map((i) => `<li><label><input type="checkbox"> <span>${i}</span></label></li>`).join("")}
      </ul>

      <h2>Pasos</h2>
      <ol class="pasos">${r.pasos.map((p) => `<li>${p}</li>`).join("")}</ol>

      ${r.mixin ? `<div class="nota"><b>MIX-IN:</b> ${r.mixin}</div>` : ""}
      ${r.consejo ? `<div class="nota consejo"><b>Consejo:</b> ${r.consejo}</div>` : ""}
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
