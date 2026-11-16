/* BUSCADOR PÁGINA DE INICIO */ 
const menuIndex = document.getElementById('menu-toggle');
const sidebarIndex = document.getElementById('sidebar');
menuIndex.addEventListener('click', () => { const opened = sidebarIndex.classList.toggle('open'); menuIndex.setAttribute('aria-expanded', String(opened)); });
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { sidebarIndex.classList.remove('open'); menuIndex.setAttribute('aria-expanded', 'false'); }));
const searchIndex = document.getElementById('search');
const panelsIndex = [...document.querySelectorAll('.panel')];
searchIndex.addEventListener('input', () => {
  const query = searchIndex.value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  let shown = 0;
  panelsIndex.forEach(panel => {
    const title = panel.querySelector('h2').textContent.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let visible = 0;
    panel.querySelectorAll('.resource').forEach(resource => {
      const name = resource.textContent.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const match = !query || title.includes(query) || name.includes(query);
      resource.hidden = !match;
      if (match) visible++;
    });
    panel.hidden = visible === 0;
    shown += visible;
  });
  document.getElementById('empty-state-index').hidden = shown > 0;
});

/* BUSCADOR RESTO DE CONTENIDOS */
const menu = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
menu.addEventListener('click', () => { const opened = sidebar.classList.toggle('open'); menu.setAttribute('aria-expanded', String(opened)); });
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { sidebar.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
const search = document.getElementById('search');
const panels = [...document.querySelectorAll('.article-section')];
search.addEventListener('input', () => {
  const query = search.value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  let shown = 0;
  panels.forEach(panel => {
    const title = panel.querySelector('h2').textContent.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let visible = 0;
    panel.querySelectorAll('.resource').forEach(resource => {
      const name = resource.textContent.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const match = !query || title.includes(query) || name.includes(query);
      resource.hidden = !match;
      if (match) visible++;
    });
    panel.hidden = visible === 0;
    shown += visible;
  });
  document.getElementById('empty-state').hidden = shown > 0;
});
