/*
  ============================================================
  DATOS DE LA TIENDA Y DE LOS PRODUCTOS
  ============================================================
  Este es el ÚNICO archivo que necesitas tocar para:
    1. Cambiar los datos de la tienda (nombre, dirección, horario...)
    2. Añadir, editar o eliminar categorías
    3. Añadir, editar o eliminar productos

  No hace falta tocar HTML ni CSS para nada de esto.
  Consulta el README.md para instrucciones detalladas.
  ============================================================
*/

// ------------------------------------------------------------
// 1. DATOS GENERALES DE LA TIENDA
// ------------------------------------------------------------
const STORE = {
  name: "[NOMBRE DE LA TIENDA]",
  tagline: "Calzado con carácter, hecho para caminar tu día a día",
  shortAbout:
    "Somos una zapatería de barrio con toda la vida. Elegimos cada modelo " +
    "a mano pensando en calidad, comodidad y buen precio, y te atendemos " +
    "como a alguien de la familia, no como a un número.",
  address: "[DIRECCIÓN DE LA TIENDA]",
  city: "[CIUDAD]",
  phone: "[TELÉFONO]",           // formato local, ej: 987 123 456
  phoneIntl: "+34600000000",     // formato internacional para enlaces tel:/wa.me, SIN espacios
  whatsapp: "+34600000000",      // mismo número en formato internacional para wa.me
  instagram: "https://instagram.com/[USUARIO_INSTAGRAM]",
  mapsUrl: "https://maps.google.com/?q=[DIRECCIÓN+DE+LA+TIENDA]",
  mapsEmbedUrl: "", // opcional: pega aquí una URL de iframe "Google Maps embed" si quieres mapa incrustado
  schedule: [
    { day: "Lunes - Viernes", hours: "10:00 - 13:30 y 17:00 - 20:30" },
    { day: "Sábado", hours: "10:00 - 14:00" },
    { day: "Domingo", hours: "Cerrado" }
  ],
  // Cambia esto a false si de momento no quieres mostrar precios en ningún producto
  showPrices: true
};

// ------------------------------------------------------------
// 2. CATEGORÍAS
// ------------------------------------------------------------
// "id" se usa internamente para filtrar, no lo traduzcas.
// "label" es lo que se ve en pantalla, cámbialo libremente.
// Puedes añadir, quitar o reordenar categorías sin miedo:
// el resto de la web se adapta automáticamente.
const CATEGORIES = [
  { id: "mujer", label: "Mujer" },
  { id: "hombre", label: "Hombre" },
  { id: "ninos", label: "Niños" },
  { id: "deportivo", label: "Deportivo" },
  { id: "casual", label: "Casual" },
  { id: "botas", label: "Botas" },
  { id: "sandalias", label: "Sandalias" },
  { id: "zapatillas", label: "Zapatillas" },
  { id: "accesorios", label: "Accesorios" }
];

// ------------------------------------------------------------
// 3. PRODUCTOS
// ------------------------------------------------------------
// Copia un bloque { ... } entero para crear un producto nuevo.
//
//  id        -> identificador único, no lo repitas (ej: "p13")
//  name      -> nombre o descripción corta del modelo
//  category  -> debe coincidir con un "id" de CATEGORIES (arriba)
//  color     -> opcional, escribe "" si no lo quieres mostrar
//  price     -> número (ej: 49.95) o null si no tiene precio / no se muestra
//  featured  -> true para que aparezca en "Destacados" en portada
//  images    -> lista de rutas a fotos del modelo (1 o varias)
//
// Las fotos aún no existen en el proyecto: coloca los archivos reales
// en las carpetas img/productos/<categoria>/ con esos mismos nombres
// y aparecerán automáticamente. Mientras tanto, la web muestra un
// marcador de posición para que puedas ver el diseño funcionando.
const PRODUCTS = [
  {
    id: "p01",
    name: "Mocasín Oxford clásico",
    category: "hombre",
    color: "Marrón cuero",
    price: 79.9,
    featured: true,
    images: [
      "img/productos/hombre/mocasin-oxford-1.jpg",
      "img/productos/hombre/mocasin-oxford-2.jpg"
    ]
  },
  {
    id: "p02",
    name: "Bailarina trenzada",
    category: "mujer",
    color: "Negro",
    price: 39.9,
    featured: true,
    images: ["img/productos/mujer/bailarina-trenzada-1.jpg"]
  },
  {
    id: "p03",
    name: "Bota chelsea",
    category: "botas",
    color: "Marrón oscuro",
    price: 89.5,
    featured: true,
    images: [
      "img/productos/botas/bota-chelsea-1.jpg",
      "img/productos/botas/bota-chelsea-2.jpg",
      "img/productos/botas/bota-chelsea-3.jpg"
    ]
  },
  {
    id: "p04",
    name: "Zapatilla urbana running",
    category: "deportivo",
    color: "Blanco / Gris",
    price: 54.0,
    featured: true,
    images: ["img/productos/deportivo/zapatilla-running-1.jpg"]
  },
  {
    id: "p05",
    name: "Sandalia de tiras",
    category: "sandalias",
    color: "Beige",
    price: 29.9,
    featured: false,
    images: ["img/productos/sandalias/sandalia-tiras-1.jpg"]
  },
  {
    id: "p06",
    name: "Zapatilla escolar velcro",
    category: "ninos",
    color: "Azul marino",
    price: 24.5,
    featured: false,
    images: ["img/productos/infantil/escolar-velcro-1.jpg"]
  },
  {
    id: "p07",
    name: "Derby casual",
    category: "casual",
    color: "Gris antracita",
    price: 64.9,
    featured: false,
    images: ["img/productos/casual/derby-casual-1.jpg"]
  },
  {
    id: "p08",
    name: "Botín tacón cuadrado",
    category: "mujer",
    color: "Camel",
    price: 74.9,
    featured: false,
    images: [
      "img/productos/mujer/botin-tacon-1.jpg",
      "img/productos/mujer/botin-tacon-2.jpg"
    ]
  },
  {
    id: "p09",
    name: "Zapatilla skate baja",
    category: "zapatillas",
    color: "Negro / Blanco",
    price: 44.9,
    featured: false,
    images: ["img/productos/zapatillas/skate-baja-1.jpg"]
  },
  {
    id: "p10",
    name: "Cinturón piel trenzada",
    category: "accesorios",
    color: "Marrón",
    price: 19.9,
    featured: false,
    images: ["img/productos/accesorios/cinturon-trenzado-1.jpg"]
  },
  {
    id: "p11",
    name: "Sandalia sport niño",
    category: "ninos",
    color: "Verde",
    price: 22.0,
    featured: false,
    images: ["img/productos/infantil/sandalia-sport-1.jpg"]
  },
  {
    id: "p12",
    name: "Bota de agua",
    category: "botas",
    color: "Negro",
    price: 34.9,
    featured: false,
    images: ["img/productos/botas/bota-agua-1.jpg"]
  }
];
