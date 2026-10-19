const app = document.getElementById("app");
let filtro = { texto: "", tipo: "Todas" };

const paso = (p) => (typeof p === "string" ? { texto: p } : p);

// Número de botes de la CREAMi para los que se calculan las cantidades (las recetas son para 1)
let botes = 1;
try {
  botes = parseInt(localStorage.getItem("botes"), 10) || 1;
} catch (e) {}

const formatear = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(1).replace(".", ","));

// Multiplica todas las cantidades de un ingrediente (menos los porcentajes, como "35% MG")
function escalar(texto) {
  if (botes === 1) return texto;
  return texto
    .replace(/\b1 (pizca|cucharada|cucharadita|lata)\b/g, "1 $1s")
    .replace(/\b1 limón/g, "1 limones")
    .replace(/\d+(?:[.,]\d+)?(?![\d.,]|\s*%)/g, (num) => formatear(parseFloat(num.replace(",", ".")) * botes));
}

function textoPaso(p) {
  if (botes > 1 && p.espera) {
    return `Reparte la mezcla a partes iguales en los ${botes} vasos de la CREAMi, sin pasar la línea MAX FILL, tapa y congélalos completamente planos.`;
  }
  if (botes > 1 && p.creami) return `${p.texto} Hazlo con cada vaso.`;
  return p.texto;
}

function selectorBotes() {
  return `<div class="botes">
    <span>Botes</span>
    ${[1, 2, 3, 4].map((n) => `<button data-botes="${n}" class="${n === botes ? "activo" : ""}">${n}</button>`).join("")}
  </div>
  ${
    botes > 1
      ? `<p class="aviso">Cantidades para ${botes} botes. Prepara toda la mezcla de una vez en la Mambo (con más cantidad puede necesitar unos segundos más) y repártela entre los vasos.</p>`
      : ""
  }`;
}

function activarSelector(alCambiar) {
  app.querySelectorAll("[data-botes]").forEach((b) => {
    b.onclick = () => {
      botes = parseInt(b.dataset.botes, 10);
      try {
        localStorage.setItem("botes", botes);
      } catch (e) {}
      alCambiar();
    };
  });
}

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
        <li>Las cantidades están en gramos para pesarlas directamente en la báscula de la Mambo. "—" en temperatura significa sin calor.</li>
        <li>Llena el vaso de la CREAMi solo hasta la línea MAX.</li>
        <li>Congela 24 horas en una superficie plana.</li>
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

// Línea corta con los ajustes de un paso, para la vista de receta completa
function ajustesCortos(p) {
  if (p.mambo) return ["Mambo", p.mambo.tiempo, p.mambo.temp !== "—" && p.mambo.temp, `vel. ${p.mambo.vel}`].filter(Boolean).join(" · ");
  if (p.creami) return `CREAMi · ${p.creami}`;
  if (p.espera) return `Congelar · ${p.espera}`;
  return "";
}

function ingredientesHTML(r) {
  return `<ul class="ingredientes">
    ${r.ingredientes.map((i) => `<li><label><input type="checkbox"> <span>${escalar(i)}</span></label></li>`).join("")}
  </ul>`;
}

function detalle(r) {
  app.innerHTML = `
    <a href="#" class="volver">← Índice</a>
    <article class="receta">
      <header>
        <p class="meta">${r.tipo}</p>
        <h1>${r.nombre}</h1>
        <p class="programa">Programa: ${r.programa}</p>
        <a class="empezar" href="#${r.id}/0">Empezar paso a paso →</a>
      </header>

      <div class="cuerpo">
        <section>
          <h2>Ingredientes</h2>
          ${selectorBotes()}
          ${ingredientesHTML(r)}
        </section>

        <section>
          <h2>Elaboración</h2>
          <ol class="pasos">
            ${r.pasos
              .map(paso)
              .map((p) => `<li>${ajustesCortos(p) ? `<span class="ajuste">${ajustesCortos(p)}</span>` : ""}${textoPaso(p)}</li>`)
              .join("")}
          </ol>
          ${r.consejo ? `<p class="nota"><b>Nota.</b> ${r.consejo}</p>` : ""}
        </section>
      </div>
    </article>
  `;
  activarSelector(() => detalle(r));
}

// Panel grande con los ajustes del paso actual
function panel(p) {
  if (p.mambo) {
    return `<div class="panel">
      <p class="aparato">Mambo</p>
      <dl>
        <div><dt>Tiempo</dt><dd>${p.mambo.tiempo}</dd></div>
        <div><dt>Temp.</dt><dd>${p.mambo.temp}</dd></div>
        <div><dt>Velocidad</dt><dd>${p.mambo.vel}</dd></div>
      </dl>
    </div>`;
  }
  if (p.creami) {
    return `<div class="panel">
      <p class="aparato">Ninja CREAMi</p>
      <dl><div><dt>Programa</dt><dd>${p.creami}</dd></div></dl>
    </div>`;
  }
  if (p.espera) {
    return `<div class="panel">
      <p class="aparato">Congelador</p>
      <dl><div><dt>Tiempo</dt><dd>${p.espera}</dd></div></dl>
    </div>`;
  }
  return "";
}

// Modo paso a paso: 0 = ingredientes, 1..n = pasos, n+1 = final
function modoPasos(r, n) {
  const pasos = r.pasos.map(paso);
  const total = pasos.length + 1;
  n = Math.max(0, Math.min(n, total));

  let contenido;
  if (n === 0) {
    contenido = `<p class="etiqueta">Antes de empezar</p>
      <h2 class="instruccion">Prepara los ingredientes</h2>
      ${selectorBotes()}
      ${ingredientesHTML(r)}`;
  } else if (n === total) {
    contenido = `<p class="etiqueta">Terminado</p>
      <h2 class="instruccion">¡Listo para servir!</h2>
      <p>Si no lo comes todo, alisa la superficie, tapa el vaso y vuelve a congelarlo. La próxima vez, procésalo de nuevo antes de servir.</p>
      ${r.consejo ? `<p class="nota"><b>Nota.</b> ${r.consejo}</p>` : ""}`;
  } else {
    const p = pasos[n - 1];
    contenido = `<p class="etiqueta">Paso ${n} de ${pasos.length}</p>
      <h2 class="instruccion">${textoPaso(p)}</h2>
      ${panel(p)}`;
  }

  app.innerHTML = `
    <div class="modo">
      <div class="modo-cabecera">
        <a href="#${r.id}" class="volver">✕ Salir</a>
        <span class="modo-nombre">${r.nombre}${botes > 1 ? ` · ${botes} botes` : ""}</span>
      </div>
      <div class="progreso"><span style="width:${(n / total) * 100}%"></span></div>
      <div class="modo-paso">${contenido}</div>
      <nav class="modo-nav">
        <button id="anterior" ${n === 0 ? "disabled" : ""}>← Anterior</button>
        ${
          n === total
            ? `<a class="siguiente" href="#${r.id}">Terminar</a>`
            : `<button id="siguiente" class="siguiente">${n === 0 ? "Empezar" : "Siguiente"} →</button>`
        }
      </nav>
    </div>
  `;

  if (n === 0) activarSelector(() => modoPasos(r, 0));
  const ir = (m) => location.replace(`#${r.id}/${m}`);
  document.getElementById("anterior").onclick = () => ir(n - 1);
  const sig = document.getElementById("siguiente");
  if (sig) sig.onclick = () => ir(n + 1);

  teclas = (e) => {
    if (e.key === "ArrowRight" && n < total) ir(n + 1);
    if (e.key === "ArrowLeft" && n > 0) ir(n - 1);
  };
  deslizar = (dx) => {
    if (dx < 0 && n < total) ir(n + 1);
    if (dx > 0 && n > 0) ir(n - 1);
  };
}

// Navegación con teclado y deslizando el dedo en el modo paso a paso
let teclas = null;
let deslizar = null;
let inicioX = null;
let inicioY = null;
document.addEventListener("keydown", (e) => teclas && teclas(e));
document.addEventListener("touchstart", (e) => {
  inicioX = e.touches[0].clientX;
  inicioY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener("touchend", (e) => {
  if (!deslizar || inicioX === null) return;
  const dx = e.changedTouches[0].clientX - inicioX;
  const dy = e.changedTouches[0].clientY - inicioY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) deslizar(dx);
  inicioX = null;
});

// Mantener la pantalla encendida mientras se cocina
let bloqueo = null;
async function pantallaEncendida(activar) {
  try {
    if (activar && !bloqueo && "wakeLock" in navigator) {
      bloqueo = await navigator.wakeLock.request("screen");
      bloqueo.addEventListener("release", () => (bloqueo = null));
    } else if (!activar && bloqueo) {
      await bloqueo.release();
    }
  } catch (e) {
    bloqueo = null;
  }
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && /\/\d+$/.test(location.hash)) pantallaEncendida(true);
});

function router() {
  const [id, n] = decodeURIComponent(location.hash.slice(1)).split("/");
  const receta = RECETAS.find((r) => r.id === id);
  teclas = deslizar = null;

  if (receta && n !== undefined) {
    modoPasos(receta, parseInt(n, 10) || 0);
    pantallaEncendida(true);
  } else {
    pantallaEncendida(false);
    if (receta) detalle(receta);
    else lista();
  }
  document.title = receta ? `${receta.nombre} · Recetas Ninja CREAMi` : "Recetas Ninja CREAMi";
  window.scrollTo(0, 0);
}

// Selector de tema claro / oscuro. Si no se ha elegido ninguno, se sigue el del sistema.
const temaSistema = window.matchMedia("(prefers-color-scheme: dark)");
function pintarTema() {
  const tema = document.documentElement.dataset.tema || (temaSistema.matches ? "oscuro" : "claro");
  document.querySelectorAll(".tema button").forEach((b) => b.classList.toggle("activo", b.dataset.tema === tema));
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement)
    .getPropertyValue("--papel")
    .trim();
}
document.querySelectorAll(".tema button").forEach((b) => {
  b.onclick = () => {
    document.documentElement.dataset.tema = b.dataset.tema;
    try {
      localStorage.setItem("tema", b.dataset.tema);
    } catch (e) {}
    pintarTema();
  };
});
temaSistema.addEventListener("change", pintarTema);
pintarTema();

window.addEventListener("hashchange", router);
router();
