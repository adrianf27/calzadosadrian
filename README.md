# [NOMBRE DE LA TIENDA] — Web escaparate

Web estática (HTML + CSS + JavaScript, sin backend) para mostrar online el
catálogo de calzado de la tienda. Pensada para publicarse gratis con
**GitHub Pages**.

- `index.html` → portada: hero, categorías, destacados, sobre la tienda, contacto.
- `catalogo.html` → catálogo completo con filtros por categoría y visor de fotos.
- `js/products.js` → **el único archivo que necesitas editar** para productos y datos de la tienda.
- `css/style.css` → estilos. No hace falta tocarlo para el uso normal.
- `js/app.js` → lógica de la web (renderizado, filtros, visor, animaciones). No hace falta tocarlo.

## Estructura de carpetas

```
/
├── index.html
├── catalogo.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── products.js
└── img/
    ├── logo/
    ├── hero/                 (fotos de portada / collage / interior de tienda)
    └── productos/
        ├── mujer/
        ├── hombre/
        ├── infantil/
        ├── deportivo/
        ├── casual/
        ├── botas/
        ├── sandalias/
        ├── zapatillas/
        └── accesorios/
```

Las carpetas de `img/` ya existen (con un `.gitkeep` para que Git no las
ignore al estar vacías). Mientras no haya fotos reales, la web muestra un
marcador de posición ("Foto pendiente de subir") en su lugar, así que puedes
publicarla y probarla ya mismo sin esperar a tener todas las fotografías.

## Cómo verla en tu ordenador

No hace falta instalar nada. Basta con abrir `index.html` haciendo doble
clic, o servirlo con un servidor local sencillo (recomendado para que las
rutas de imágenes funcionen igual que en producción):

```bash
# Con Python (ya instalado en la mayoría de sistemas)
python3 -m http.server 8000
# Luego abre http://localhost:8000 en el navegador
```

## Añadir un producto nuevo

1. Abre `js/products.js`.
2. Copia uno de los bloques dentro de `PRODUCTS` y pégalo (respetando las comas).
3. Cambia `id` (que no se repita), `name`, `category` (debe coincidir con un
   `id` de `CATEGORIES`), `color`, `price` (o `null` si no quieres precio) y
   `images` (rutas a las fotos).
4. Guarda el archivo. No hay que tocar ni HTML ni CSS.

```javascript
{
  id: "p13",
  name: "Bota de montaña",
  category: "botas",
  color: "Verde",
  price: 94.9,
  featured: false,
  images: ["img/productos/botas/bota-montana-1.jpg"]
}
```

## Sustituir o añadir fotografías

1. Guarda las fotos en la subcarpeta de `img/productos/<categoría>/` que
   corresponda (o en `img/hero/` para las de portada).
2. Usa nombres de archivo descriptivos y sin espacios ni tildes, por ejemplo
   `bota-chelsea-1.jpg`.
3. En `js/products.js`, escribe esa ruta exacta en el campo `images` del
   producto correspondiente.
4. Un producto puede tener varias fotos (se navega entre ellas con flechas en
   el visor ampliado): añade tantas rutas como quieras en la lista `images`.

**Consejos de rendimiento** (la web ya está preparada para ello):
- Recorta las fotos a un tamaño razonable antes de subirlas (con 1200 px de
  ancho suele sobrar para verse nítido en pantalla).
- El formato **WebP** pesa mucho menos que JPG con la misma calidad
  (`bota-chelsea-1.webp`); es opcional pero recomendable si el catálogo crece.
- Las imágenes ya cargan con `loading="lazy"`, así que las fotos fuera de
  pantalla no ralentizan la carga inicial.

## Cambiar los datos de la tienda

Todo está centralizado al principio de `js/products.js`, en el objeto
`STORE`: nombre, eslogan, dirección, teléfono, WhatsApp, Instagram, horario y
enlace de Google Maps. Cambia los valores entre comillas y se actualizan
automáticamente en toda la web (portada, catálogo y pie de página).

- `phoneIntl` y `whatsapp` deben ir en formato internacional sin espacios
  (ej. `+34600000000`) para que los botones de llamar y WhatsApp funcionen
  bien desde el móvil.
- `showPrices: false` oculta el precio en todas las tarjetas y en el visor,
  sin tener que borrar los precios de cada producto.
- `mapsEmbedUrl` es opcional: en Google Maps, botón "Compartir" → "Insertar
  un mapa", copia solo la URL que aparece dentro de `src="..."` y pégala ahí
  para tener un mapa incrustado; si se deja vacío, se muestra un botón que
  abre Google Maps directamente.

## Cambiar o añadir categorías

En `js/products.js`, en la lista `CATEGORIES`, añade, elimina o renombra
categorías. Los filtros del catálogo y los accesos rápidos de la portada se
generan solos a partir de esta lista.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado si tienes
   GitHub Pro/Team; Pages gratis con repos públicos).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio.
3. En el repositorio, ve a **Settings → Pages**.
4. En "Build and deployment" → "Source", elige **Deploy from a branch**.
5. Selecciona la rama `main` (o la que uses) y la carpeta `/ (root)`.
6. Guarda. GitHub tardará uno o dos minutos en publicar la web y te dará una
   URL del tipo `https://tu-usuario.github.io/nombre-repositorio/`.
7. Cada vez que subas cambios (nuevos productos, fotos, textos), la web se
   actualiza sola en ese enlace en un par de minutos.

## SEO y redes sociales — qué revisar antes de publicar

- Sustituye todos los textos entre corchetes (`[NOMBRE DE LA TIENDA]`,
  `[DIRECCIÓN]`, `[CIUDAD]`, `[TELÉFONO]`, `[USUARIO_INSTAGRAM]`...) en
  `js/products.js` y en el `<title>`/`meta description` de `index.html` y
  `catalogo.html`.
- Sube una imagen a `img/hero/og-image.jpg` (ideal 1200×630 px): es la que se
  muestra al compartir el enlace en WhatsApp, Instagram o redes sociales.
- El favicon usa un emoji de zapato por defecto; puedes sustituirlo por un
  icono propio en `img/logo/` si tienes uno.

## Qué revisar antes de dar por terminado

- [ ] Sustituir todos los placeholders `[...]` por los datos reales de la tienda.
- [ ] Subir al menos las fotos de portada (`img/hero/`) para que el hero no
      muestre los marcadores de posición.
- [ ] Revisar la web desde un móvil real (no solo el navegador de escritorio).
- [ ] Comprobar que los botones de llamar y WhatsApp abren correctamente.
- [ ] Revisar que el enlace de Google Maps apunta a la ubicación correcta.
