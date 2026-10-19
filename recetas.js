// Recetas para Ninja CREAMi (vaso estándar de ~470 ml), con la base preparada en la Cecotec Mambo.
//
// Para añadir una receta nueva, copia uno de los bloques { ... } y cambia los datos.
// Cada paso puede ser:
//   - un texto normal:                "Deja reposar 15 minutos."
//   - un paso de Mambo:               mambo("Texto", { tiempo: "30 s", temp: "—", vel: "4" })
//   - congelar en el vaso de la CREAMi: congelar()
//   - un programa de la CREAMi:       creami("ICE CREAM")  o  creami("MIX-IN", "Texto")
//   - repasar si queda polvoso:       respin()

const mambo = (texto, ajustes) => ({ texto, mambo: ajustes });
const congelar = () => ({
  texto: "Vierte la mezcla en el vaso de la CREAMi sin pasar la línea MAX FILL, tapa y congela completamente plano.",
  espera: "24 h",
});
const creami = (programa, texto) => ({
  texto: texto || "Quita la tapa, monta el vaso en la CREAMi y procesa.",
  creami: programa,
});
const respin = () =>
  creami("RE-SPIN", "Si queda polvoso, añade 1-2 cucharadas de leche y repasa con RE-SPIN una o dos veces.");
const pesar = (que) => `Pon el vaso de la Mambo en la báscula y pesa ${que}.`;

const RECETAS = [
  {
    id: "helado-mango",
    nombre: "Helado de mango",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "300-320 g de mango maduro, pelado y troceado",
      "125 g de leche semidesnatada",
      "100 g de nata para montar (35% MG)",
      "60 g de azúcar",
      "1 pizca de sal",
    ],
    pasos: [
      pesar("el mango troceado"),
      mambo("Tritura el mango. Si quedan trozos, da unos segundos más a velocidad 7-8 hasta que el puré quede fino.", { tiempo: "20-30 s", temp: "—", vel: "5-6" }),
      "Añade la leche, la nata, el azúcar y la sal.",
      mambo("Mezcla hasta que el azúcar se disuelva.", { tiempo: "15-20 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM", "Quita la tapa, monta el vaso en la CREAMi y procesa. Para un sabor más afrutado, usa SORBET en lugar de ICE CREAM."),
      creami("RE-SPIN", "Si queda granulado o polvoso, repasa con RE-SPIN."),
    ],
  },
  {
    id: "gofio",
    nombre: "Helado de gofio",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "250 g de leche semidesnatada",
      "100 g de nata para montar (35% MG)",
      "45 g de gofio (trigo o millo)",
      "50 g de azúcar",
      "1 cucharadita de aroma de vainilla",
      "1 pizca de sal",
    ],
    pasos: [
      pesar("todos los ingredientes"),
      mambo("Mezcla hasta integrar el gofio sin grumos. Si hace falta, rasca las paredes y repite 15 segundos.", { tiempo: "30 s", temp: "—", vel: "4" }),
      "Deja reposar la mezcla 15 minutos para que el gofio se hidrate y espese.",
      mambo("Vuelve a mezclar.", { tiempo: "10 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
    ],
    consejo: "Para un sabor más intenso, sube el gofio a 55 g; para que quede más dulce, usa 60 g de azúcar. Queda muy bien con un hilo de miel de palma por encima.",
  },
  {
    id: "vainilla",
    nombre: "Vainilla",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "280 g de leche semidesnatada",
      "120 g de nata para montar (35% MG)",
      "60 g de azúcar",
      "1 cucharadita de aroma de vainilla",
      "1 pizca de sal",
    ],
    pasos: [
      pesar("todos los ingredientes"),
      mambo("Mezcla hasta que el azúcar se disuelva.", { tiempo: "30 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
    ],
    consejo: "Es la base para otros sabores: añade galletas, chocolate troceado o fruta con MIX-IN.",
  },
  {
    id: "chocolate",
    nombre: "Chocolate",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "270 g de leche semidesnatada",
      "100 g de nata para montar (35% MG)",
      "70 g de azúcar",
      "20 g de cacao puro en polvo",
      "1 pizca de sal",
      "Opcional para el MIX-IN: 40 g de chocolate troceado",
    ],
    pasos: [
      pesar("todo menos el chocolate troceado"),
      mambo("Mezcla hasta que el cacao quede sin grumos. Si hace falta, rasca las paredes y repite 15 segundos.", { tiempo: "30 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
      creami("MIX-IN", "Opcional: haz un hueco en el centro, añade el chocolate troceado y procesa."),
    ],
  },
  {
    id: "nutella",
    nombre: "Nutella",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "250 g de leche semidesnatada",
      "100 g de nata para montar (35% MG)",
      "100 g de Nutella",
      "20 g de azúcar",
      "1 pizca de sal",
      "Opcional para el MIX-IN: 1 cucharada de Nutella",
    ],
    pasos: [
      pesar("todos los ingredientes"),
      mambo("Mezcla hasta que la Nutella quede bien integrada. Si hace falta, rasca las paredes y repite 15 segundos.", { tiempo: "40 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
      creami("MIX-IN", "Opcional: haz un hueco en el centro, añade la cucharada de Nutella y procesa."),
    ],
  },
  {
    id: "kinder",
    nombre: "Kinder",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "250 g de leche semidesnatada",
      "100 g de nata para montar (35% MG)",
      "4 barritas de Kinder Chocolate (50 g)",
      "40 g de azúcar",
      "1 pizca de sal",
      "Para el MIX-IN: 1 Kinder Bueno (2 barritas)",
    ],
    pasos: [
      "Pon las barritas de Kinder Chocolate enteras en la jarra de la Mambo.",
      mambo("Pica el chocolate. Si quedan trozos grandes, baja con la espátula lo que se pegue a las paredes y repite.", { tiempo: "5 s", temp: "—", vel: "7" }),
      pesar("la leche encima del chocolate picado"),
      mambo("Calienta para derretir el chocolate en la leche.", { tiempo: "3 min", temp: "50 °C", vel: "2" }),
      "Añade la nata, el azúcar y la sal.",
      mambo("Mezcla hasta que el azúcar se disuelva.", { tiempo: "20 s", temp: "—", vel: "4" }),
      "Deja enfriar la mezcla antes de congelarla.",
      congelar(),
      creami("ICE CREAM"),
      respin(),
      creami("MIX-IN", "Parte el Kinder Bueno con las manos en trocitos, haz un hueco en el centro del helado, añádelos y procesa."),
    ],
  },
  {
    id: "oreo",
    nombre: "Oreo",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "280 g de leche semidesnatada",
      "120 g de nata para montar (35% MG)",
      "60 g de azúcar",
      "1 cucharadita de aroma de vainilla",
      "1 pizca de sal",
      "Para el MIX-IN: 4-5 galletas Oreo",
    ],
    pasos: [
      pesar("todo menos las Oreo"),
      mambo("Mezcla hasta que el azúcar se disuelva.", { tiempo: "30 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
      creami("MIX-IN", "Haz un hueco en el centro hasta el fondo, mete las Oreo troceadas y procesa."),
    ],
  },
  {
    id: "fresa",
    nombre: "Fresa",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "200 g de fresas limpias",
      "150 g de leche semidesnatada",
      "100 g de nata para montar (35% MG)",
      "60 g de azúcar",
      "1 pizca de sal",
    ],
    pasos: [
      pesar("las fresas"),
      mambo("Tritura las fresas hasta que el puré quede fino.", { tiempo: "20-30 s", temp: "—", vel: "5-6" }),
      "Añade la leche, la nata, el azúcar y la sal.",
      mambo("Mezcla hasta que el azúcar se disuelva.", { tiempo: "15-20 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
    ],
  },
  {
    id: "platano",
    nombre: "Plátano",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "2 plátanos muy maduros (unos 220 g pelados)",
      "150 g de leche semidesnatada",
      "100 g de nata para montar (35% MG)",
      "30 g de azúcar",
      "1 pizca de sal",
    ],
    pasos: [
      pesar("los plátanos troceados"),
      mambo("Tritura los plátanos hasta que el puré quede fino.", { tiempo: "20-30 s", temp: "—", vel: "5-6" }),
      "Añade la leche, la nata, el azúcar y la sal.",
      mambo("Mezcla hasta que quede liso.", { tiempo: "15-20 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
    ],
  },
  {
    id: "cafe",
    nombre: "Café",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "270 g de leche semidesnatada",
      "120 g de nata para montar (35% MG)",
      "60 g de azúcar",
      "2 cucharaditas de café soluble",
      "1 pizca de sal",
    ],
    pasos: [
      pesar("todos los ingredientes"),
      mambo("Mezcla hasta que el café y el azúcar se disuelvan.", { tiempo: "30 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
      respin(),
    ],
  },
  {
    id: "limon",
    nombre: "Sorbete de limón",
    tipo: "Sorbete",
    programa: "SORBET",
    ingredientes: [
      "280 g de agua",
      "120 g de zumo de limón (3-4 limones)",
      "100 g de azúcar",
      "Ralladura de 1 limón",
    ],
    pasos: [
      pesar("todos los ingredientes"),
      mambo("Mezcla hasta que el azúcar se disuelva del todo.", { tiempo: "1 min", temp: "—", vel: "4" }),
      congelar(),
      creami("SORBET"),
      creami("RE-SPIN", "Si queda granulado, repasa con RE-SPIN."),
    ],
  },
  {
    id: "sorbete-mango",
    nombre: "Sorbete de mango en almíbar",
    tipo: "Sorbete",
    programa: "SORBET",
    ingredientes: ["1 lata de mango en almíbar (unos 425 g, con su almíbar)"],
    pasos: [
      pesar("el mango con todo su almíbar"),
      mambo("Tritura hasta que quede un puré fino.", { tiempo: "30 s", temp: "—", vel: "7-8" }),
      congelar(),
      creami("SORBET"),
      creami("RE-SPIN", "Si queda granulado, repasa con RE-SPIN."),
    ],
    consejo: "El mismo truco funciona con piña o melocotón en almíbar.",
  },
];
