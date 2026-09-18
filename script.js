(function(){
var pages = ['hjem','om-meg','cv','prosjekter'];
var sections = document.querySelectorAll('.page');
var navLinks = document.querySelectorAll('.nav-link');

function showPage(name){
  sections.forEach(function(s){
    s.classList.toggle('active', s.getAttribute('data-page') === name);
  });
  navLinks.forEach(function(l){
    var isActive = l.getAttribute('data-page') === name;
    l.classList.toggle('active', isActive);
    if(isActive){ l.setAttribute('aria-current','page'); } else { l.removeAttribute('aria-current'); }
  });
  window.scrollTo(0,0);
}

function syncFromHash(){
  var hash = (location.hash || '#hjem').slice(1);
  var page = pages.indexOf(hash) !== -1 ? hash : 'hjem';
  showPage(page);
}

window.addEventListener('hashchange', syncFromHash);
syncFromHash();

var themeToggle = document.getElementById('themeToggle');
var themeIcon = document.getElementById('themeIcon');

function currentTheme(){
  var stored = null;
  try { stored = localStorage.getItem('kh-theme'); } catch(e){}
  if(stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  themeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
}

applyTheme(currentTheme());

themeToggle.addEventListener('click', function(){
  var next = currentTheme() === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('kh-theme', next); } catch(e){}
  applyTheme(next);
});

var printBtn = document.getElementById('printBtn');
if(printBtn){
  printBtn.addEventListener('click', function(){
    location.hash = 'cv';
    setTimeout(function(){ window.print(); }, 60);
  });
}
})();
