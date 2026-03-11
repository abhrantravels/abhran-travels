// Injects shared nav and footer into every page
document.addEventListener('DOMContentLoaded', function () {

  var root = document.querySelector('meta[name=root]') ? document.querySelector('meta[name=root]').content : '';

  // NAV
  document.getElementById('site-nav').innerHTML = `
    <a class="logo" href="${root}index.html">Abhr<span>an</span></a>
    <ul class="nav-links" id="nav-links">
      <li><a href="${root}index.html">Home</a></li>
      <li><a href="${root}pages/trips.html">Trips</a></li>
      <li><a href="${root}pages/about.html">About</a></li>
      <li><a href="${root}pages/contact.html">Contact</a></li>
      <li><a href="${root}pages/plan.html" class="nav-cta">Plan My Trip</a></li>
    </ul>
    <div class="nav-right">
      <button class="theme-toggle" id="theme-btn" title="Toggle theme">🌙</button>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  // FOOTER
  document.getElementById('site-footer').innerHTML = `
    <div class="footer-grid">
      <div>
        <a class="footer-logo" href="${root}index.html">Abhr<span>an</span></a>
        <p class="footer-desc">Premium travel experiences crafted with care. From serene backwaters to snowy Alps, we bring your dream destination to life.</p>
        <div class="socials">
          <a href="#" class="soc">f</a>
          <a href="#" class="soc">📷</a>
          <a href="#" class="soc">▶</a>
          <a href="#" class="soc">𝕏</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Quick Links</h5>
        <ul class="footer-links">
          <li><a href="${root}index.html">Home</a></li>
          <li><a href="${root}pages/trips.html">All Trips</a></li>
          <li><a href="${root}pages/about.html">About Us</a></li>
          <li><a href="${root}pages/plan.html">Plan My Trip</a></li>
          <li><a href="${root}pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Destinations</h5>
        <ul class="footer-links">
          <li><a href="${root}pages/trip-kerala.html">Kerala</a></li>
          <li><a href="${root}pages/trip-rajasthan.html">Rajasthan</a></li>
          <li><a href="${root}pages/trip-bali.html">Bali</a></li>
          <li><a href="${root}pages/trip-switzerland.html">Switzerland</a></li>
          <li><a href="${root}pages/trip-maldives.html">Maldives</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Newsletter</h5>
        <p style="font-size:.84rem;color:rgba(255,255,255,.44);margin-bottom:.5rem">Get exclusive deals in your inbox.</p>
        <form class="ns-form ajx">
          <input type="email" class="ns-input" placeholder="Your email..." required/>
          <button type="submit" class="ns-btn">→</button>
        </form>
        <div class="footer-contact-info">
          📞 +91 63775 06662<br/>
          📞 +91 97847 63663<br/>
          ✉ abhrantravels@gmail.com<br/>
          📍 Jaipur, Rajasthan
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Abhran Travel. All rights reserved.</span>
      <span>Made with ❤ for adventurers</span>
    </div>
  `;
});
