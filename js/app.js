/*
  ============================================================
  LÓGICA DE LA WEB
  ============================================================
  No necesitas tocar este archivo para añadir productos o cambiar
  los datos de la tienda: todo eso vive en js/products.js.
  Este archivo solo lee esos datos y construye la página.
  ============================================================
*/

const SHOE_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M3 18.5c0-1.2 1-2 2-2.3l3-1 4.2-4.4c.6-.6 1.5-.8 2.3-.5l4 1.5c1.3.5 2.5 1.5 2.5 3.2v3H3.5c-.3 0-.5-.2-.5-.5Z" stroke-linejoin="round"/>
    <path d="M8 16.2V13" stroke-linecap="round"/>
    <path d="M12.5 11.4 14 9" stroke-linecap="round"/>
  </svg>`;

const CHEVRON_LEFT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEVRON_RIGHT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>`;

document.addEventListener("DOMContentLoaded", () => {
  fillStoreData();
  buildMobileNav();
  buildQuickCategories();
  buildFeatured();
  buildCatalog();
  buildLightbox();
  observeReveals();
  setActiveNav();
  document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());
});

/* ------------------------------------------------------------
   Utilidades
------------------------------------------------------------ */
function categoryLabel(id) {
  const cat = CATEGORIES.find((c) => c.id === id);
  return cat ? cat.label : id;
}

function formatPrice(price) {
  if (price === null || price === undefined || STORE.showPrices === false) return "";
  return price.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function waLink(number, text) {
  const clean = (number || "").replace(/[^\d+]/g, "");
  return `https://wa.me/${clean.replace("+", "")}${text ? "?text=" + encodeURIComponent(text) : ""}`;
}

/* ------------------------------------------------------------
   Datos de la tienda -> cualquier elemento con data-store="campo"
------------------------------------------------------------ */
function fillStoreData() {
  document.querySelectorAll("[data-store]").forEach((el) => {
    const key = el.getAttribute("data-store");
    if (STORE[key] !== undefined) el.textContent = STORE[key];
  });
  document.querySelectorAll("[data-store-href]").forEach((el) => {
    const type = el.getAttribute("data-store-href");
    if (type === "tel") el.href = `tel:${STORE.phoneIntl}`;
    if (type === "whatsapp") el.href = waLink(STORE.whatsapp, `Hola, escribo desde la web de ${STORE.name}`);
    if (type === "maps") el.href = STORE.mapsUrl;
    if (type === "instagram") el.href = STORE.instagram;
  });

  const scheduleBody = document.getElementById("schedule-body");
  if (scheduleBody) {
    scheduleBody.innerHTML = STORE.schedule
      .map((row) => `<tr><td>${row.day}</td><td>${row.hours}</td></tr>`)
      .join("");
  }

  const mapFrame = document.getElementById("map-frame");
  if (mapFrame) {
    if (STORE.mapsEmbedUrl) {
      mapFrame.innerHTML = `<iframe src="${STORE.mapsEmbedUrl}" loading="lazy" allowfullscreen title="Ubicación de ${STORE.name}"></iframe>`;
    } else {
      mapFrame.innerHTML = `
        <div class="map-fallback">
          <p>Añade tu enlace de "insertar mapa" de Google Maps en <code>STORE.mapsEmbedUrl</code> (js/products.js) para mostrarlo aquí.</p>
          <a class="btn btn--ghost" data-store-href="maps" target="_blank" rel="noopener">Abrir en Google Maps</a>
        </div>`;
    }
  }
}

/* ------------------------------------------------------------
   Navegación móvil
------------------------------------------------------------ */
function buildMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".mobile-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("is-open"))
  );
}

function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-nav a").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("is-active");
  });
}

/* ------------------------------------------------------------
   Accesos rápidos a categorías (portada)
------------------------------------------------------------ */
function buildQuickCategories() {
  const el = document.querySelector("[data-quick-categories]");
  if (!el) return;
  el.innerHTML = CATEGORIES.map(
    (c) => `<a class="chip" href="catalogo.html?categoria=${c.id}">${c.label}</a>`
  ).join("");
}

/* ------------------------------------------------------------
   Destacados (portada)
------------------------------------------------------------ */
function buildFeatured() {
  const grid = document.querySelector("[data-featured-grid]");
  if (!grid) return;
  const featured = PRODUCTS.filter((p) => p.featured);
  grid.innerHTML = featured.map((p, i) => productCardHTML(p, i)).join("");
  attachCardEvents(grid, featured);
}

/* ------------------------------------------------------------
   Catálogo completo con filtros (catalogo.html)
------------------------------------------------------------ */
let CATALOG_STATE = { category: "todos" };

function buildCatalog() {
  const grid = document.querySelector("[data-catalog-grid]");
  const chipRow = document.querySelector("[data-filter-chips]");
  if (!grid || !chipRow) return;

  const params = new URLSearchParams(location.search);
  const initial = params.get("categoria");
  if (initial && CATEGORIES.some((c) => c.id === initial)) {
    CATALOG_STATE.category = initial;
  }

  const chips = [{ id: "todos", label: "Todos" }, ...CATEGORIES];
  chipRow.innerHTML = chips
    .map(
      (c) =>
        `<button class="chip${c.id === CATALOG_STATE.category ? " is-active" : ""}" data-cat="${c.id}">${c.label}</button>`
    )
    .join("");

  chipRow.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      CATALOG_STATE.category = btn.getAttribute("data-cat");
      chipRow.querySelectorAll(".chip").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderCatalogGrid();
    });
  });

  renderCatalogGrid();
}

function renderCatalogGrid() {
  const grid = document.querySelector("[data-catalog-grid]");
  const count = document.querySelector("[data-results-count]");
  const list =
    CATALOG_STATE.category === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === CATALOG_STATE.category);

  if (count) {
    count.textContent = `${list.length} ${list.length === 1 ? "modelo" : "modelos"}`;
  }

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">No hay modelos en esta categoría todavía. Vuelve pronto.</div>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => productCardHTML(p, i)).join("");
  attachCardEvents(grid, list);
  requestAnimationFrame(() => observeReveals());
}

/* ------------------------------------------------------------
   Tarjeta de producto (HTML compartido)
------------------------------------------------------------ */
function productCardHTML(p, index) {
  const price = formatPrice(p.price);
  return `
    <article class="card reveal" data-index="${index}" data-id="${p.id}" tabindex="0" role="button" aria-label="Ver fotos de ${p.name}">
      <div class="card-media">
        <img src="${p.images[0]}" alt="${p.name}, ${categoryLabel(p.category)}" loading="lazy" width="480" height="600"
          onerror="var m=this.closest('.card-media'); m.classList.add('is-fallback'); this.remove(); m.insertAdjacentHTML('beforeend', placeholderHTML('${escapeAttr(p.name)}'))">
      </div>
      <div class="card-body">
        <span class="card-cat">${categoryLabel(p.category)}</span>
        <h3 class="card-name">${p.name}</h3>
        <div class="card-meta">
          <span>${p.color || ""}</span>
          ${price ? `<span class="card-price">${price}</span>` : ""}
        </div>
      </div>
    </article>`;
}

function placeholderHTML(name) {
  return `<div class="ph">${SHOE_ICON}<small>${name}<br>Foto pendiente de subir</small></div>`;
}

function escapeAttr(str) {
  return String(str).replace(/'/g, "\\'");
}

function attachCardEvents(grid, list) {
  grid.querySelectorAll(".card").forEach((card) => {
    const open = () => openLightbox(list[Number(card.getAttribute("data-index"))]);
    card.addEventListener("click", open);
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    });
  });
}

/* ------------------------------------------------------------
   Lightbox / visor de fotografías
------------------------------------------------------------ */
let LIGHTBOX = { product: null, index: 0, el: null };

function buildLightbox() {
  if (document.querySelector(".lightbox")) return;
  const el = document.createElement("div");
  el.className = "lightbox";
  el.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Cerrar">${CLOSE_ICON}</button>
      <div class="lightbox-media">
        <button class="lightbox-nav lightbox-prev" aria-label="Foto anterior">${CHEVRON_LEFT}</button>
        <img alt="">
        <button class="lightbox-nav lightbox-next" aria-label="Foto siguiente">${CHEVRON_RIGHT}</button>
        <div class="lightbox-dots"></div>
      </div>
      <div class="lightbox-caption">
        <div>
          <h3></h3>
          <div class="meta"></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(el);
  LIGHTBOX.el = el;

  el.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  el.addEventListener("click", (e) => {
    if (e.target === el) closeLightbox();
  });
  el.querySelector(".lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  el.querySelector(".lightbox-next").addEventListener("click", () => stepLightbox(1));

  document.addEventListener("keydown", (e) => {
    if (!el.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });
}

function openLightbox(product) {
  LIGHTBOX.product = product;
  LIGHTBOX.index = 0;
  renderLightbox();
  LIGHTBOX.el.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  LIGHTBOX.el.classList.remove("is-open");
  document.body.style.overflow = "";
}

function stepLightbox(dir) {
  const total = LIGHTBOX.product.images.length;
  LIGHTBOX.index = (LIGHTBOX.index + dir + total) % total;
  renderLightbox();
}

function renderLightbox() {
  const { product, index, el } = LIGHTBOX;
  const media = el.querySelector(".lightbox-media");
  const existingImg = media.querySelector("img");
  const existingPh = media.querySelector(".ph");
  if (existingPh) existingPh.remove();
  existingImg.style.display = "block";
  existingImg.src = product.images[index];
  existingImg.alt = product.name;
  existingImg.onerror = () => {
    existingImg.style.display = "none";
    media.insertAdjacentHTML(
      "afterbegin",
      `<div class="ph">${SHOE_ICON}<span>Foto pendiente de subir</span></div>`
    );
  };

  el.querySelector("h3").textContent = product.name;
  const price = formatPrice(product.price);
  el.querySelector(".meta").textContent = [categoryLabel(product.category), product.color, price]
    .filter(Boolean)
    .join(" · ");

  const nav = product.images.length > 1;
  el.querySelector(".lightbox-prev").style.display = nav ? "flex" : "none";
  el.querySelector(".lightbox-next").style.display = nav ? "flex" : "none";
  const dots = el.querySelector(".lightbox-dots");
  dots.innerHTML = nav
    ? product.images
        .map((_, i) => `<span class="${i === index ? "is-active" : ""}"></span>`)
        .join("")
    : "";
}

/* ------------------------------------------------------------
   Aparición progresiva al hacer scroll
------------------------------------------------------------ */
function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.is-visible), .card:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((i) => io.observe(i));
}
