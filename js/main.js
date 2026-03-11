// ── THEME ───────────────────────────────────────
var isDark = localStorage.getItem('abhran-dark') === '1';
function applyTheme() {
  document.body.classList.toggle('dark', isDark);
  var btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}
document.addEventListener('DOMContentLoaded', function () {
  applyTheme();
  document.getElementById('theme-btn').addEventListener('click', function () {
    isDark = !isDark;
    localStorage.setItem('abhran-dark', isDark ? '1' : '0');
    applyTheme();
  });

  // ── HAMBURGER ─────────────────────────────────
  var hb = document.getElementById('hamburger');
  var nl = document.getElementById('nav-links');
  if (hb && nl) {
    hb.addEventListener('click', function () {
      var open = nl.classList.toggle('open');
      var s = hb.querySelectorAll('span');
      s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      s[1].style.opacity   = open ? '0' : '';
      s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
  }

  // ── ACTIVE NAV LINK ───────────────────────────
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ── SCROLL REVEAL ──────────────────────────────
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('in'); }, i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(function (el) { obs.observe(el); });

  // ── COUNTERS ───────────────────────────────────
  var cobs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        var tgt = parseInt(e.target.dataset.target);
        var suf = e.target.dataset.suffix || '';
        var dur = 1800, st = performance.now();
        (function tick(now) {
          var p = Math.min((now - st) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          e.target.textContent = Math.floor(eased * tgt) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
        cobs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.ctr-num[data-target]').forEach(function (el) { cobs.observe(el); });

  // ── TESTIMONIALS ──────────────────────────────
  var track = document.getElementById('testi-track');
  var dots  = document.querySelectorAll('.testi-dot');
  var ti = 0, timer;
  function goT(n) {
    ti = (n + dots.length) % dots.length;
    if (track) track.style.transform = 'translateX(-' + ti * 100 + '%)';
    dots.forEach(function (d, i) { d.classList.toggle('on', i === ti); });
  }
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { goT(i); clearInterval(timer); timer = setInterval(function(){goT(ti+1);},5000); });
  });
  if (dots.length) timer = setInterval(function () { goT(ti + 1); }, 5000);

  // ── CAROUSEL ──────────────────────────────────
  var prev = document.getElementById('carousel-prev');
  var next = document.getElementById('carousel-next');
  var row  = document.getElementById('home-carousel');
  if (prev && next && row) {
    prev.addEventListener('click', function () { row.scrollBy({ left: -310, behavior: 'smooth' }); });
    next.addEventListener('click', function () { row.scrollBy({ left:  310, behavior: 'smooth' }); });
  }

  // ── WISHLIST ──────────────────────────────────
  document.querySelectorAll('.tc-wish').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.classList.toggle('on');
      btn.textContent = btn.classList.contains('on') ? '❤️' : '🤍';
      showToast(btn.classList.contains('on') ? '❤️ Added to wishlist!' : 'Removed from wishlist');
    });
  });

  // ── TRIP FILTERS ──────────────────────────────
  var activeF = 'all';
  document.querySelectorAll('.fb').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.fb').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
      activeF = btn.dataset.filter;
      filterTrips();
    });
  });
  var budSel = document.getElementById('budget-sel');
  var durSel = document.getElementById('duration-sel');
  if (budSel) budSel.addEventListener('change', filterTrips);
  if (durSel) durSel.addEventListener('change', filterTrips);
  function filterTrips() {
    var bud = budSel ? budSel.value : 'all';
    var dur = durSel ? durSel.value : 'all';
    document.querySelectorAll('#trips-grid .tc').forEach(function (c) {
      var type = c.dataset.type, price = +c.dataset.price, days = +c.dataset.days;
      var show = activeF === 'all' || type === activeF;
      if (bud === 'budget' && price >= 15000) show = false;
      if (bud === 'mid' && (price < 15000 || price > 50000)) show = false;
      if (bud === 'luxury' && price < 50000) show = false;
      if (dur === 'short' && days >= 5) show = false;
      if (dur === 'medium' && (days < 5 || days > 7)) show = false;
      if (dur === 'long' && days <= 7) show = false;
      c.style.display = show ? '' : 'none';
    });
  }

  // ── FAQ ───────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(function (b) {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); btn.nextElementSibling.classList.add('open'); }
    });
  });

  // ── FORMS ─────────────────────────────────────
  document.querySelectorAll('form.ajx').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type=submit]'), orig = btn.innerHTML;
      btn.innerHTML = '⏳ Sending...'; btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = orig; btn.disabled = false;
        form.reset(); showToast('✅ Sent! We\'ll contact you within 24 hours.');
      }, 1600);
    });
  });
});

// ── TOAST ────────────────────────────────────────
var _tt;
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_tt); _tt = setTimeout(function () { t.classList.remove('show'); }, 3200);
}
