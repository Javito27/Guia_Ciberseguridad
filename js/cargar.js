/* Añadir título y .txt de Glosario */
async function cargarTerminoGlosario() {
  const id = new URLSearchParams(location.search).get("id");

  try {
    const res = await fetch("../../json/glosario.json");
    const datos = await res.json();
    const t = datos[id];
    

    if (!t) {
      document.getElementById("titulo").textContent = "Término no encontrado";
      return;
    }

    document.title = `${t.titulo} | Glosario`;
    document.getElementById("breadcrumb-termino").textContent = t.titulo;
    document.getElementById("titulo").textContent = t.titulo;
  } catch (e) {
    document.getElementById("titulo").textContent = "Error al cargar el título";
    console.error(e);
  }

  cargarDocumentoGlosario();
}

async function cargarDocumentoGlosario() {
  const pre = document.getElementById("file");
  const id = new URLSearchParams(location.search).get("id");

  // Solo letras, números, guiones y guiones bajos (evita rutas raras como ../)
  if (!id || !/^[\w-]+$/.test(id)) {
    pre.textContent = "Término no válido";
    return;
  }

  try {
    // Contenido (.txt) y datos (.json) a la vez
    const [resTxt, resJson] = await Promise.all([
      fetch(`../../documentos/teoria/glosario/${id}.txt`),
      fetch("../../json/glosario.json")
    ]);

    if (!resTxt.ok) throw new Error(`HTTP ${resTxt.status}`);
    pre.textContent = await resTxt.text();

    // Título desde el JSON (si falla, usa el id como respaldo)
    let titulo = id;
    if (resJson.ok) {
      const datos = await resJson.json();
      titulo = datos[id]?.titulo ?? id;
    }

    document.title = `${titulo} | Glosario`;

    // Si tienes estos elementos en el HTML, también se rellenan
    const h1 = document.getElementById("titulo");
    if (h1) h1.textContent = titulo;

    const migas = document.getElementById("breadcrumb-termino");
    if (migas) migas.textContent = titulo;
  } catch (e) {
    pre.textContent = "No se encontró el documento";
    console.error(e);
  }
}

cargarTerminoGlosario();

/******************************************************************************************/

/* Añadir título y .txt de las Herramientas */
async function cargarTerminoTools() {
  const id = new URLSearchParams(location.search).get("id");

  try {
    const res = await fetch("../../json/tools.json");
    const datos = await res.json();
    const t = datos[id];
    

    if (!t) {
      document.getElementById("titulo").textContent = "Término no encontrado";
      return;
    }

    document.title = `${t.titulo} | Herramientas`;
    document.getElementById("breadcrumb-termino").textContent = t.titulo;
    document.getElementById("titulo").textContent = t.titulo;
  } catch (e) {
    document.getElementById("titulo").textContent = "Error al cargar el título";
    console.error(e);
  }

  cargarDocumentoTools();
}

const NOMBRES_ORIGEN = {
  "reconocimiento.html": "Reconocimiento",
  "escaneo-enumeracion.html": "Escaneo y Enumeración",
  "explotacion.html": "Explotación",
  "post-explotacion.html": "Post-Explotación",
  "limpieza-reporte.html": "Limpieza y Reporte",
  "otras-herramientas.html": "Otras Herramientas",
  "analisis-vulnerabilidades.html": "Análisis de Vulnerabilidades"
};


async function cargarDocumentoTools() {
  // --- Breadcrumb de origen ---
  const origenEl = document.getElementById("breadcrumb-origen");
  const from = new URLSearchParams(location.search).get("from");

  if (origenEl) {
    origenEl.textContent = NOMBRES_ORIGEN[from] || "..";
    if (from) {
      const a = document.createElement("a");
      a.href = from;
      a.textContent = origenEl.textContent;
      origenEl.replaceWith(a);
      a.id = "breadcrumb-origen";
    }
  }

// --- Botón "Volver a" ---
const backLink = document.getElementById("back-link");
if (backLink) {
  if (from) {
    backLink.href = from;
    backLink.textContent = `← Volver a ${NOMBRES_ORIGEN[from] || "Herramientas"}`;
  } else {
    backLink.href = "../../index.html#herramientas"; // respaldo si no hay from
    backLink.textContent = "← Volver a Herramientas";
  }
}

  // --- Cargar la herramienta ---
  const pre = document.getElementById("file");
  const id = new URLSearchParams(location.search).get("id");

  if (!id || !/^[\w-]+$/.test(id)) {
    pre.textContent = "Término no válido";
    return;
  }

  try {
    const [resTxt, resJson] = await Promise.all([
      fetch(`../../documentos/tools/${id}.txt`),
      fetch("../../json/tools.json")
    ]);

    if (!resTxt.ok) throw new Error(`HTTP ${resTxt.status}`);
    pre.textContent = await resTxt.text();

    let titulo = id;
    if (resJson.ok) {
      const datos = await resJson.json();
      titulo = datos[id]?.titulo ?? id;
    }

    document.title = `${titulo} | Herramientas`;

    const h1 = document.getElementById("titulo");
    if (h1) h1.textContent = titulo;

    const termino = document.getElementById("breadcrumb-termino");
    if (termino) termino.textContent = titulo;
  } catch (e) {
    pre.textContent = "No se encontró el documento";
    console.error(e);
  }
}

cargarTerminoTools();

/******************************************************************************************/

/* Añadir título y .txt de las Puertos */
async function cargarTerminoPorts() {
  const id = new URLSearchParams(location.search).get("id");

  try {
    const res = await fetch("../../json/ports.json");
    const datos = await res.json();
    const t = datos[id];
    

    if (!t) {
      document.getElementById("titulo").textContent = "Término no encontrado";
      return;
    }

    document.title = `${t.titulo} | Puertos y Servicios`;
    document.getElementById("breadcrumb-termino").textContent = t.titulo;
    document.getElementById("titulo").textContent = t.titulo;
  } catch (e) {
    document.getElementById("titulo").textContent = "Error al cargar el título";
    console.error(e);
  }

  cargarDocumentoPorts();
}

async function cargarDocumentoPorts() {
  const pre = document.getElementById("file");
  const id = new URLSearchParams(location.search).get("id");

  // Solo letras, números, guiones y guiones bajos (evita rutas raras como ../)
  if (!id || !/^[\w-]+$/.test(id)) {
    pre.textContent = "Término no válido";
    return;
  }

  try {
    // Contenido (.txt) y datos (.json) a la vez
    const [resTxt, resJson] = await Promise.all([
      fetch(`../../documentos/ports/${id}.txt`),
      fetch("../../json/ports.json")
    ]);

    if (!resTxt.ok) throw new Error(`HTTP ${resTxt.status}`);
    pre.textContent = await resTxt.text();

    // Título desde el JSON (si falla, usa el id como respaldo)
    let titulo = id;
    if (resJson.ok) {
      const datos = await resJson.json();
      titulo = datos[id]?.titulo ?? id;
    }

    document.title = `${titulo} | Puertos y Servicios`;

    // Si tienes estos elementos en el HTML, también se rellenan
    const h1 = document.getElementById("titulo");
    if (h1) h1.textContent = titulo;

    const migas = document.getElementById("breadcrumb-termino");
    if (migas) migas.textContent = titulo;
  } catch (e) {
    pre.textContent = "No se encontró el documento";
    console.error(e);
  }
}

cargarTerminoPorts();

/******************************************************************************************/

/* Añadir título y .txt de writeups */
async function cargarTerminoWriteup() {
  const id = new URLSearchParams(location.search).get("id");

  try {
    const res = await fetch("../../json/writeup.json");
    const datos = await res.json();
    const t = datos[id];
    

    if (!t) {
      document.getElementById("titulo").textContent = "Término no encontrado";
      return;
    }

    document.title = `${t.titulo} | Laboratorios`;
    document.getElementById("breadcrumb-termino").textContent = t.titulo;
    document.getElementById("titulo").textContent = t.titulo;
  } catch (e) {
    document.getElementById("titulo").textContent = "Error al cargar el título";
    console.error(e);
  }

  cargarDocumentoWriteup();
}

const NOMBRES_LABS = {
  "machines_htb.html": "Hack The Box",
  "machines_dl.html": "DockerLabs",
  "machines_ps.html": "PortSwigger",
  "machines_ma.html": "Maldev Academy",
  "machines_vh.html": "VulnHub",
  "machines_goad.html": "GOAD"

};


async function cargarDocumentoWriteup() {
  // --- Breadcrumb de origen ---
  const origenEl = document.getElementById("breadcrumb-origen");
  const from = new URLSearchParams(location.search).get("from");

  if (origenEl) {
    origenEl.textContent = NOMBRES_LABS[from] || "..";
    if (from) {
      const a = document.createElement("a");
      a.href = from;
      a.textContent = origenEl.textContent;
      origenEl.replaceWith(a);
      a.id = "breadcrumb-origen";
    }
  }

// --- Botón "Volver a" ---
const backLink = document.getElementById("back-link");
if (backLink) {
  if (from) {
    backLink.href = from;
    backLink.textContent = `← Volver a ${NOMBRES_LABS[from] || "Laboratorios"}`;
  } else {
    backLink.href = "../../index.html#laboratorios"; // respaldo si no hay from
    backLink.textContent = "← Volver a Laboratorios";
  }
}

  // --- Cargar el writeup ---
  const pre = document.getElementById("file");
  const id = new URLSearchParams(location.search).get("id");

  if (!id || !/^[\w-]+$/.test(id)) {
    pre.textContent = "Término no válido";
    return;
  }

  try {
    const [resTxt, resJson] = await Promise.all([
      fetch(`../../documentos/labs/${id}.txt`),
      fetch("../../json/writeup.json")
    ]);

    if (!resTxt.ok) throw new Error(`HTTP ${resTxt.status}`);
    pre.textContent = await resTxt.text();

    let titulo = id;
    if (resJson.ok) {
      const datos = await resJson.json();
      titulo = datos[id]?.titulo ?? id;
    }

    document.title = `${titulo} | Laboratorios`;

    const h1 = document.getElementById("titulo");
    if (h1) h1.textContent = titulo;

    const termino = document.getElementById("breadcrumb-termino");
    if (termino) termino.textContent = titulo;
  } catch (e) {
    pre.textContent = "No se encontró el documento";
    console.error(e);
  }
}

cargarTerminoWriteup();


/******************************************************************************************/

/* Añadir título y .txt de Vulnerabilidades */
async function cargarTerminoVulnerabilidades() {
  const id = new URLSearchParams(location.search).get("id");

  try {
    const res = await fetch("../../json/vulnerabilities.json");
    const datos = await res.json();
    const t = datos[id];
    

    if (!t) {
      document.getElementById("titulo").textContent = "Término no encontrado";
      return;
    }

    document.title = `${t.titulo} | Vulnerabilidades`;
    document.getElementById("breadcrumb-termino").textContent = t.titulo;
    document.getElementById("titulo").textContent = t.titulo;
  } catch (e) {
    document.getElementById("titulo").textContent = "Error al cargar el título";
    console.error(e);
  }

  cargarDocumentoVulnerabilidades();
}

async function cargarDocumentoVulnerabilidades() {
  const pre = document.getElementById("file");
  const id = new URLSearchParams(location.search).get("id");

  // Solo letras, números, guiones y guiones bajos (evita rutas raras como ../)
  if (!id || !/^[\w-]+$/.test(id)) {
    pre.textContent = "Término no válido";
    return;
  }

  try {
    // Contenido (.txt) y datos (.json) a la vez
    const [resTxt, resJson] = await Promise.all([
      fetch(`../../documentos/vulnerabilities/${id}.txt`),
      fetch("../../json/vulnerabilities.json")
    ]);

    if (!resTxt.ok) throw new Error(`HTTP ${resTxt.status}`);
    pre.textContent = await resTxt.text();

    // Título desde el JSON (si falla, usa el id como respaldo)
    let titulo = id;
    if (resJson.ok) {
      const datos = await resJson.json();
      titulo = datos[id]?.titulo ?? id;
    }

    document.title = `${titulo} | Glosario`;

    // Si tienes estos elementos en el HTML, también se rellenan
    const h1 = document.getElementById("titulo");
    if (h1) h1.textContent = titulo;

    const migas = document.getElementById("breadcrumb-termino");
    if (migas) migas.textContent = titulo;
  } catch (e) {
    pre.textContent = "No se encontró el documento";
    console.error(e);
  }
}

cargarTerminoVulnerabilidades();





