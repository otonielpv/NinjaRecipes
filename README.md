# NinjaRecipes

Web sencilla con recetas de helado para la **Ninja CREAMi**. Es HTML, CSS y JS puro: no hace falta instalar nada.

## Verla en local

Abre `index.html` en el navegador.

## Añadir una receta

Edita `recetas.js`, copia uno de los bloques `{ ... }` y cambia los datos (el `id` tiene que ser único, sin espacios).

Los pasos pueden ser texto normal o llevar ajustes, que se muestran en grande en el modo paso a paso:

```js
mambo("Pon todo en la jarra.", { tiempo: "1 min", temp: "40 °C", vel: "4" }),
congelar(),
creami("ICE CREAM"),
creami("MIX-IN", "Haz un hueco en el centro, añade las galletas y procesa."),
```

## Publicación

La web está en https://otonielpv.github.io/NinjaRecipes/ y se publica con GitHub Pages desde la rama `main` (Settings → Pages → rama `main`, carpeta `/ (root)`). Cada cambio que se sube a `main` aparece en la web en un par de minutos.

Truco: en el móvil, abre la web y usa "Añadir a pantalla de inicio" para tenerla como una app.
