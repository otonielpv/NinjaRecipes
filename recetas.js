// Recetas para Ninja CREAMi (vaso estándar de ~470 ml), con la base preparada en la Cecotec Mambo.
//
// Para añadir una receta nueva, copia uno de los bloques { ... } y cambia los datos.
// Cada paso puede ser:
//   - un texto normal:                "Deja enfriar la mezcla."
//   - un paso de Mambo:               mambo("Texto", { tiempo: "1 min", temp: "40 °C", vel: "4" })
//   - congelar en el vaso de la CREAMi: congelar()
//   - un programa de la CREAMi:       creami("ICE CREAM")  o  creami("MIX-IN", "Texto")

const mambo = (texto, ajustes) => ({ texto, mambo: ajustes });
const congelar = () => ({
  texto: "Vierte la mezcla en el vaso de la CREAMi hasta la línea MAX, tapa y congela en una superficie plana.",
  espera: "24 h",
});
const creami = (programa, texto) => ({
  texto: texto || "Quita la tapa, monta el vaso en la CREAMi y procesa.",
  creami: programa,
});
const enfriar = "Deja enfriar la mezcla a temperatura ambiente (o en la nevera) antes de congelarla.";

const RECETAS = [
  {
    id: "vainilla",
    nombre: "Vainilla clásico",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "1 cucharada de queso crema (15 g)",
      "65 g de azúcar",
      "1 cucharadita de extracto de vainilla",
      "180 ml de nata para montar (35% MG)",
      "240 ml de leche entera",
    ],
    pasos: [
      mambo("Pon todos los ingredientes en la jarra de la Mambo.", { tiempo: "1 min", temp: "40 °C", vel: "4" }),
      enfriar,
      congelar(),
      creami("ICE CREAM"),
    ],
    consejo: "Es la base perfecta para otros sabores: añade galletas, chocolate troceado o fruta con MIX-IN.",
  },
  {
    id: "chocolate",
    nombre: "Chocolate",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "1 cucharada de queso crema (15 g)",
      "70 g de azúcar",
      "20 g de cacao puro en polvo",
      "1 cucharadita de extracto de vainilla",
      "180 ml de nata para montar",
      "240 ml de leche entera",
      "Opcional para el MIX-IN: 40 g de chocolate negro troceado",
    ],
    pasos: [
      mambo("Pon en la jarra todo menos el chocolate troceado. El calor ayuda a que el cacao se disuelva sin grumos.", { tiempo: "3 min", temp: "60 °C", vel: "3" }),
      enfriar,
      congelar(),
      creami("ICE CREAM"),
      creami("MIX-IN", "Opcional: haz un hueco en el centro, añade el chocolate troceado y procesa."),
    ],
  },
  {
    id: "nutella",
    nombre: "Nutella",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "100 g de Nutella",
      "25 g de azúcar",
      "150 ml de nata para montar",
      "250 ml de leche entera",
      "1 pizca de sal",
      "Para el MIX-IN: 1 cucharada de Nutella y un puñado de avellanas tostadas",
    ],
    pasos: [
      mambo("Pon en la jarra la leche, la Nutella, el azúcar y la sal.", { tiempo: "4 min", temp: "60 °C", vel: "3" }),
      mambo("Añade la nata y mezcla.", { tiempo: "20 s", temp: "—", vel: "3" }),
      enfriar,
      congelar(),
      creami("ICE CREAM"),
      creami("MIX-IN", "Haz un hueco en el centro, añade la cucharada de Nutella y las avellanas troceadas y procesa."),
    ],
  },
  {
    id: "kinder",
    nombre: "Kinder",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "4 barritas de Kinder Chocolate (50 g), troceadas",
      "1 cucharada de queso crema (15 g)",
      "40 g de azúcar",
      "150 ml de nata para montar",
      "250 ml de leche entera",
      "Para el MIX-IN: 1 Kinder Bueno (2 barritas)",
    ],
    pasos: [
      mambo("Pon en la jarra la leche, el Kinder Chocolate troceado, el queso crema y el azúcar.", { tiempo: "4 min", temp: "60 °C", vel: "3" }),
      mambo("Añade la nata y mezcla.", { tiempo: "20 s", temp: "—", vel: "3" }),
      enfriar,
      congelar(),
      creami("ICE CREAM"),
      creami("MIX-IN", "Haz un hueco en el centro, añade el Kinder Bueno troceado y procesa."),
    ],
  },
  {
    id: "oreo",
    nombre: "Oreo (cookies & cream)",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "1 cucharada de queso crema (15 g)",
      "60 g de azúcar",
      "1 cucharadita de extracto de vainilla",
      "180 ml de nata para montar",
      "240 ml de leche entera",
      "Para el MIX-IN: 4-5 galletas Oreo troceadas",
    ],
    pasos: [
      mambo("Pon en la jarra todo menos las Oreo.", { tiempo: "1 min", temp: "40 °C", vel: "4" }),
      enfriar,
      congelar(),
      creami("ICE CREAM"),
      creami("MIX-IN", "Haz un hueco en el centro hasta el fondo, mete las Oreo troceadas y procesa."),
    ],
    consejo: "Para un helado con más sabor a galleta, añade 2 Oreo extra a la jarra en el primer paso.",
  },
  {
    id: "fresa",
    nombre: "Fresa",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "200 g de fresas limpias",
      "70 g de azúcar",
      "1 cucharadita de zumo de limón",
      "150 ml de nata para montar",
      "100 ml de leche entera",
    ],
    pasos: [
      mambo("Pon en la jarra las fresas, el azúcar y el zumo de limón y tritura.", { tiempo: "1 min", temp: "—", vel: "8" }),
      mambo("Añade la nata y la leche y mezcla.", { tiempo: "20 s", temp: "—", vel: "4" }),
      congelar(),
      creami("ICE CREAM"),
    ],
  },
  {
    id: "cafe",
    nombre: "Café",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "1 cucharada de queso crema (15 g)",
      "70 g de azúcar",
      "2 cucharaditas de café soluble",
      "180 ml de nata para montar",
      "240 ml de leche entera",
    ],
    pasos: [
      mambo("Pon todos los ingredientes en la jarra.", { tiempo: "1 min", temp: "40 °C", vel: "4" }),
      enfriar,
      congelar(),
      creami("ICE CREAM"),
    ],
  },
  {
    id: "platano",
    nombre: "Plátano",
    tipo: "Helado",
    programa: "ICE CREAM",
    ingredientes: [
      "2 plátanos muy maduros",
      "200 ml de leche entera",
      "100 ml de nata para montar",
      "1 cucharada de miel o 20 g de azúcar",
    ],
    pasos: [
      mambo("Pon todos los ingredientes en la jarra y tritura hasta que quede liso.", { tiempo: "1 min", temp: "—", vel: "6" }),
      congelar(),
      creami("ICE CREAM"),
    ],
    consejo: "Queda muy bien con nueces o chocolate troceado añadidos con MIX-IN.",
  },
  {
    id: "proteico-chocolate",
    nombre: "Proteico de chocolate",
    tipo: "Ligero",
    programa: "LITE ICE CREAM",
    ingredientes: [
      "400 ml de leche desnatada (o bebida vegetal)",
      "30 g de proteína en polvo sabor chocolate",
      "1 cucharada de cacao puro en polvo",
      "Edulcorante al gusto",
      "1 pizca de sal",
    ],
    pasos: [
      mambo("Pon todos los ingredientes en la jarra.", { tiempo: "30 s", temp: "—", vel: "5" }),
      "Deja reposar 5 minutos para que baje la espuma.",
      congelar(),
      creami("LITE ICE CREAM"),
      creami("RE-SPIN", "Casi siempre sale arenoso la primera vez: añade 1-2 cucharadas de leche y repasa. Repite si hace falta."),
    ],
  },
  {
    id: "limon",
    nombre: "Sorbete de limón",
    tipo: "Sorbete",
    programa: "SORBET",
    ingredientes: [
      "120 ml de zumo de limón (3-4 limones)",
      "Ralladura de 1 limón",
      "100 g de azúcar",
      "280 ml de agua",
    ],
    pasos: [
      mambo("Pon en la jarra el agua, el azúcar y la ralladura para hacer el almíbar.", { tiempo: "5 min", temp: "80 °C", vel: "2" }),
      "Deja enfriar el almíbar.",
      mambo("Añade el zumo de limón y mezcla.", { tiempo: "10 s", temp: "—", vel: "3" }),
      congelar(),
      creami("SORBET"),
    ],
  },
  {
    id: "mango",
    nombre: "Sorbete de mango",
    tipo: "Sorbete",
    programa: "SORBET",
    ingredientes: [
      "1 lata de mango en almíbar (unos 425 g, con su almíbar)",
      "1 cucharada de zumo de lima o limón",
    ],
    pasos: [
      mambo("Pon en la jarra el mango con todo su almíbar y el zumo y tritura.", { tiempo: "1 min", temp: "—", vel: "8" }),
      congelar(),
      creami("SORBET"),
    ],
    consejo: "El mismo truco funciona con piña o melocotón en almíbar.",
  },
];
