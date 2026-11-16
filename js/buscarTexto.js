/* ============================================================
   UTILIDADES
   ============================================================ */
const norm = s =>
  s.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");


/* ============================================================
   PARTE 1: CARGAR
   Lee cada <pre data-archivo="..."> y devuelve la lista
   [{ pre, seccion, texto }, ...]
   ============================================================ */
async function cargarSecciones() {
  const bloques = [...document.querySelectorAll("pre[data-archivo]")];
  const documentos = [];

  await Promise.all(bloques.map(async pre => {
    try {
      const res = await fetch(pre.dataset.archivo);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const texto = await res.text();
      pre.textContent = texto;

      documentos.push({
        pre,
        seccion: pre.closest(".article-section") || pre.parentElement,
        texto
      });
    } catch (e) {
      pre.textContent = "No se encontró el documento";
      console.error(pre.dataset.archivo, e);
    }
  }));

  return documentos;
}


/* ============================================================
   PARTE 2: BUSCAR
   Recibe la lista de documentos y conecta el buscador
   ============================================================ */
function activarBuscador(documentos) {
  const search = document.getElementById("search");
  const vacio = document.getElementById("empty-state");
  if (!search) return;

  search.addEventListener("input", () => {
    const q = norm(search.value.trim());
    let seccionesVisibles = 0;

    documentos.forEach(({ pre, seccion, texto }) => {
      // Sin búsqueda: texto completo
      if (!q) {
        pre.textContent = texto;
        seccion.hidden = false;
        seccionesVisibles++;
        return;
      }

      const frag = document.createDocumentFragment();
      let coincidencias = 0;

      texto.split(/\r?\n/).forEach(linea => {
        const t = norm(linea);
        let i = t.indexOf(q);
        if (i === -1) return;

        coincidencias++;
        let pos = 0;
        while (i !== -1) {
          frag.append(linea.slice(pos, i));
          const mark = document.createElement("mark");
          mark.textContent = linea.slice(i, i + q.length);
          frag.append(mark);
          pos = i + q.length;
          i = t.indexOf(q, pos);
        }
        frag.append(linea.slice(pos) + "\n");
      });

      seccion.hidden = coincidencias === 0;
      if (coincidencias) {
        pre.textContent = "";
        pre.append(frag);
        seccionesVisibles++;
      }
    });

    if (vacio) vacio.hidden = seccionesVisibles > 0;
  });
}


/* ============================================================
   INICIO: une las dos partes
   ============================================================ */
(async () => {
  const documentos = await cargarSecciones();
  if (documentos.length) activarBuscador(documentos);
})();