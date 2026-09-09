/**
 * Paw & Home - Bilingual Engine & Geolocation Auto-Detection
 * Automatically adapts store language based on visitor country (Spain -> ES, Other -> EN)
 * Handles manual language switcher with instant DOM translation and Shopify Markets synchronization.
 */

(function() {
  'use strict';

  var DICTIONARY = {
    // Navigation
    "Inicio": "Home",
    "🐶 Perros": "🐶 Dogs",
    "🐱 Gatos": "🐱 Cats",
    "🛋️ Para Casa": "🛋️ For Home",
    "🚗 Para Viajar": "🚗 For Travel",
    "🦮 Para Pasear": "🦮 For Walks",
    "🏷️ Ofertas": "🏷️ Deals",
    "🏷️ Ofertas Especiales": "🏷️ Special Deals",
    "📖 Blog": "📖 Blog",
    "Carrito": "Cart",

    // Announcement bar
    "Hecho con amor para ti y para ellos": "Made with love for you and for them",
    "Envío Gratis": "Free Shipping",
    "desde 50 €": "from €50",
    "14 días": "14-day",
    "de prueba sin compromiso": "risk-free trial",

    // Hero Section
    "Porque nunca han sido solo mascotas: son nuestra familia": "Because they've never been just pets: they're our family",
    "Hacerlos felices es nuestra forma de darles las gracias.": "Making them happy is our way of saying thank you.",
    "Cuidamos de su descanso, sus paseos y la armonía de tu hogar con soluciones hechas con auténtico cariño por los animales.": "We take care of their rest, walks, and home harmony with products crafted with genuine pet love.",
    "Cuidamos de su descanso, sus paseos y la armona de tu hogar con soluciones hechas con autntico cario por los animales.": "We take care of their rest, walks, and home harmony with products crafted with genuine pet love.",
    "Ver mimos para ellos": "Shop Treats for Them",
    "Para tu hogar": "For Your Home",
    "4.9/5 por miles de familias con mascota": "4.9/5 rated by thousands of pet families",
    "🚚 Envíos cuidados con cariño (3-6 días)": "🚚 Carefully shipped (3-6 business days)",
    "💚 14 días para probar con tu peludo": "💚 14-day trial with your furry friend",

    // Categories
    "Explora por categoría": "Explore by Category",
    "Explora por categora": "Explore by Category",
    "Encuentra justo lo que necesitas para tu día a día con ellos": "Find exactly what you need for daily life with your furry friend",
    "Encuentra justo lo que necesitas para tu da a da con ellos": "Find exactly what you need for daily life with your furry friend",
    "Perros": "Dogs",
    "Accesorios y confort": "Accessories & Comfort",
    "Gatos": "Cats",
    "Juegos y descanso": "Play & Rest",
    "Para casa": "For Home",
    "Limpieza y orden": "Cleaning & Order",
    "Para viajar": "For Travel",
    "Seguridad en ruta": "Travel Safety",
    "Para pasear": "For Walks",
    "Paseos cómodos": "Comfortable Walks",
    "Paseos cmodos": "Comfortable Walks",
    "Explorar": "Explore",

    // Featured Products & Best Sellers
    "Los favoritos más mimados": "Most-Loved Favorites",
    "Los favoritos ms mimados": "Most-Loved Favorites",
    "Los productos mejor valorados por familias con perros y gatos": "The highest-rated essentials by families with dogs and cats",
    "Lo que más quieren ellos": "What They Love Most",
    "Lo que ms quieren ellos": "What They Love Most",
    "Los productos más vendidos de nuestra tienda": "Our store's top-selling favorites",
    "Los productos ms vendidos de nuestra tienda": "Our store's top-selling favorites",
    "⚡ Más vendido": "⚡ Bestseller",
    "⚡ Ms vendido": "⚡ Bestseller",
    "🔥 Quedan pocas unidades": "🔥 Only a few left in stock",
    "Ver producto": "View Product",
    "Oferta": "Sale",
    "Agotado": "Sold Out",

    // Brand Values
    "Hecho por y para quienes no imaginamos la vida sin ellos": "Made by and for those who cannot imagine life without pets",
    "Amor, respeto y calidad en cada rincón de nuestra tienda": "Love, respect, and quality in every corner of our store",
    "Amor, respeto y calidad en cada rincn de nuestra tienda": "Love, respect, and quality in every corner of our store",
    "Amor en cada detalle": "Love in Every Detail",
    "Solo elegimos productos cómodos, seguros y duraderos que usaríamos sin dudarlo con nuestros propios compañeros peludos.": "We only select comfortable, safe, durable products we would use with our own furry companions.",
    "Solo elegimos productos cmodos, seguros y duraderos que usaramos sin dudarlo con nuestros propios compaeros peludos.": "We only select comfortable, safe, durable products we would use with our own furry companions.",
    "Pensado para la vida real": "Designed for Real Life",
    "Sabemos lo que es un sofá lleno de pelos o unas patitas con barro tras pasear. Te ayudamos a disfrutar juntos sin estrés.": "We know the feeling of a fur-covered sofa or muddy paws after a walk. We help you enjoy life together stress-free.",
    "Sabemos lo que es un sof lleno de pelos o unas patitas con barro tras pasear. Te ayudamos a disfrutar juntos sin estrs.": "We know the feeling of a fur-covered sofa or muddy paws after a walk. We help you enjoy life together stress-free.",
    "Siempre a tu lado": "Always By Your Side",
    "Hablamos tu mismo idioma: el de quienes nos desvivimos por su bienestar y felicidad. Escríbenos cuando lo necesites.": "We speak your language: passionate about their happiness and well-being. Message us anytime you need.",
    "Hablamos tu mismo idioma: el de quienes nos desvivimos por su bienestar y felicidad. Escrbenos cuando lo necesites.": "We speak your language: passionate about their happiness and well-being. Message us anytime you need.",

    // Pet Owners Section
    "CONVIVENCIA & AMOR REAL": "LIVING TOGETHER & REAL LOVE",
    "Vivir con ellos es maravilloso (incluso cuando llenan todo de pelos).": "Living with them is wonderful (even when they fill everything with fur).",
    "Convivir con un perro o un gato llena la casa de alegría, miradas cómplices y momentos únicos. Creamos soluciones pensadas desde el corazón para que disfrutes de su compañía manteniendo tu hogar bonito, limpio y en calma.": "Sharing life with a pet fills your home with joy and unique moments. We design thoughtful solutions so you can cherish their company while keeping your home clean, stylish, and calm.",
    "Convivir con un perro o un gato llena la casa de alegra, miradas cmplices y momentos nicos. Creamos soluciones pensadas desde el corazn para que disfrutes de su compaa manteniendo tu hogar bonito, limpio y en calma.": "Sharing life with a pet fills your home with joy and unique moments. We design thoughtful solutions so you can cherish their company while keeping your home clean, stylish, and calm.",
    "Mímale como se merece": "Pamper Them As They Deserve",
    "Mmale como se merece": "Pamper Them As They Deserve",
    "Casa limpia": "Clean Home",
    "Viajes": "Travel",
    "Organización": "Organization",
    "Organizacin": "Organization",
    "Lifestyle": "Lifestyle",
    "Hogar en calma": "Calm Home",
    "Viajes seguros": "Safe Travels",
    "Paseos felices": "Happy Walks",
    "Su rincón favorito": "Their Favorite Corner",
    "Su rincn favorito": "Their Favorite Corner",
    "💚 100% Creado por Pet Lovers": "💚 100% Created by Pet Lovers",

    // Bundles
    "Todo lo que necesitas, en un solo pack": "Everything You Need, in One Single Bundle",
    "Ahorra y equípate al completo con nuestros packs seleccionados": "Save more and equip yourself completely with our curated bundles",
    "Ahorra y equpate al completo con nuestros packs seleccionados": "Save more and equip yourself completely with our curated bundles",
    "Todo lo que necesitas para mantener tu casa limpia y organizada con tu mascota.": "Everything you need to keep your home clean and organized with your pet.",
    "Viaja tranquilo con todo lo que tu mascota necesita para el camino.": "Travel with peace of mind with everything your pet needs on the road.",
    "Paseos más cómodos y organizados con los accesorios esenciales.": "More comfortable and organized walks with essential gear.",
    "Paseos ms cmodos y organizados con los accesorios esenciales.": "More comfortable and organized walks with essential gear.",
    "¿Acabas de adoptar? Este pack tiene todo lo básico para empezar.": "Just adopted? This pack has all the essentials to get started.",
    "Acabas de adoptar? Este pack tiene todo lo bsico para empezar.": "Just adopted? This pack has all the essentials to get started.",
    "Ver pack": "View Bundle",
    "Popular": "Popular",
    "Nuevo": "New",
    "✓ Envío gratis (3-6 días)": "✓ Free shipping (3-6 days)",
    "✓ Envo gratis (3-6 das)": "✓ Free shipping (3-6 days)",
    "✓ Selección de esenciales": "✓ Curated essentials selection",
    "✓ Seleccin de esenciales": "✓ Curated essentials selection",

    // Problems
    "Te entendemos porque también nos pasa": "We Understand Because It Happens to Us Too",
    "Te entendemos porque tambin nos pasa": "We Understand Because It Happens to Us Too",
    "Pequeñas soluciones a los retos diarios de convivir con nuestros compañeros peludos": "Smart solutions for the daily joys and challenges of living with furry companions",
    "Pequeas soluciones a los retos diarios de convivir con nuestros compaeros peludos": "Smart solutions for the daily joys and challenges of living with furry companions",
    "¿Tu sofá parece tener su propio abrigo de pelos?": "Does your sofa seem to grow its own coat of fur?",
    "Tu sof parece tener su propio abrigo de pelos?": "Does your sofa seem to grow its own coat of fur?",
    "Descubre cómo tenerlo limpio en segundos sin estropear las telas.": "Discover how to get it spotless in seconds without damaging fabrics.",
    "Descubre cmo tenerlo limpio en segundos sin estropear las telas.": "Discover how to get it spotless in seconds without damaging fabrics.",
    "Ver solución con amor": "See Solution",
    "Ver solucin con amor": "See Solution",
    "¿Ir en coche con tu peludo es un mar de nervios o pelos?": "Is riding in the car with your pet full of stress or stray hair?",
    "Ir en coche con tu peludo es un mar de nervios o pelos?": "Is riding in the car with your pet full of stress or stray hair?",
    "Mantas y protectores impermeables para que viaje seguro y relajado.": "Waterproof seat covers and protectors so they travel safe and relaxed.",
    "Viajar tranquilos": "Travel in Peace",
    "¿Llega del paseo y deja huellitas por toda la casa?": "Do they come back from walks leaving muddy paw prints all over?",
    "Llega del paseo y deja huellitas por toda la casa?": "Do they come back from walks leaving muddy paw prints all over?",
    "Soluciones suaves para limpiar sus patitas antes de entrar al salón.": "Gentle paw-cleaning solutions before stepping onto your rugs and floors.",
    "Soluciones suaves para limpiar sus patitas antes de entrar al saln.": "Gentle paw-cleaning solutions before stepping onto your rugs and floors.",
    "Cuidar sus patitas": "Care for Paws",
    "¿Notas que le cuesta levantarse tras una siesta larga?": "Do you notice them struggling to stand up after a long nap?",
    "Notas que le cuesta levantarse tras una siesta larga?": "Do you notice them struggling to stand up after a long nap?",
    "Camas ortopédicas con viscoelástica para cuidar sus articulaciones.": "Orthopedic memory-foam beds designed to protect joints and ensure deep rest.",
    "Camas ortopdicas con viscoelstica para cuidar sus articulaciones.": "Orthopedic memory-foam beds designed to protect joints and ensure deep rest.",
    "Cuidar su descanso": "Care for Their Rest",
    "Ver solución": "View Solution",
    "Ver solucin": "View Solution",

    // Reviews
    "Lo que dicen nuestros clientes": "What Our Customers Say",
    "Experiencias reales de personas que viven con mascotas": "Genuine stories from families who share their lives with pets",
    "✓ Compra verificada": "✓ Verified Purchase",
    "Dueña de Max (Golden Retriever)": "Max's Mom (Golden Retriever)",
    "Duea de Max (Golden Retriever)": "Max's Mom (Golden Retriever)",
    "Dueño de Misa y Leo": "Misa & Leo's Dad (Cats)",
    "Dueo de Misa y Leo": "Misa & Leo's Dad (Cats)",
    "Dueña de Bubu (Caniche)": "Bubu's Mom (Poodle)",
    "Duea de Bubu (Caniche)": "Bubu's Mom (Poodle)",
    "Los productos para el coche han cambiado nuestros viajes. La manta protectora es facilísima de limpiar y súper resistente.": "The car accessories totally transformed our road trips. The seat protector is super durable and a breeze to clean.",
    "Los productos para el coche han cambiado nuestros viajes. La manta protectora es facilsima de limpiar y sper resistente.": "The car accessories totally transformed our road trips. The seat protector is super durable and a breeze to clean.",
    "El rodillo quitapelos para el sofá funciona de maravilla. Por fin puedo tener la casa limpia teniendo dos gatos.": "The pet hair remover roller works wonders! Finally I can keep the living room clean with two shedding cats.",
    "El rodillo quitapelos para el sof funciona de maravilla. Por fin puedo tener la casa limpia teniendo dos gatos.": "The pet hair remover roller works wonders! Finally I can keep the living room clean with two shedding cats.",
    "Excelente calidad y envío muy rápido. El dispensador de bolsas y la botella de agua para paseos son imprescindibles.": "Outstanding quality and quick delivery. The portable water bottle and poop bag dispenser are everyday lifesavers.",
    "Excelente calidad y envo muy rpido. El dispensador de bolsas y la botella de agua para paseos son imprescindibles.": "Outstanding quality and quick delivery. The portable water bottle and poop bag dispenser are everyday lifesavers.",

    // UGC / Social
    "Comparte tu momento — Síguenos en Instagram": "Share your moment — Follow us on Instagram",
    "Comparte tu momento  Sguenos en Instagram": "Share your moment — Follow us on Instagram",
    "Comunidad Paw & Home": "Paw & Home Community",
    "Síguenos en Instagram": "Follow us on Instagram",
    "Sguenos en Instagram": "Follow us on Instagram",

    // Newsletter
    "📌 COMUNIDAD PET LOVERS": "📌 PET LOVERS COMMUNITY",
    "Únete a nuestra comunidad": "Join Our Community",
    "nete a nuestra comunidad": "Join Our Community",
    "Consejos, novedades y productos para disfrutar aún más de la vida con tu mascota.": "Tips, fresh arrivals, and curated picks to enjoy life with your pet even more.",
    "Consejos, novedades y productos para disfrutar an ms de la vida con tu mascota.": "Tips, fresh arrivals, and curated picks to enjoy life with your pet even more.",
    "Tu correo electrónico": "Your email address",
    "Tu correo electrnico": "Your email address",
    "Quiero unirme": "Join Now",
    "🔒 Sin spam": "🔒 No spam",
    "🐾 10% dto en tu primer pedido": "🐾 10% off your first order",
    "Cancela cuando quieras": "Cancel anytime",

    // Trust Banner
    "Envío en 3-6 días laborables": "Shipping in 3-6 business days",
    "Envo en 3-6 das laborables": "Shipping in 3-6 business days",
    "14 días de devolución": "14-day returns policy",
    "14 das de devolucin": "14-day returns policy",
    "Pago 100% seguro": "100% Secure Checkout",
    "Atención personalizada": "Personalized Support",
    "Atencin personalizada": "Personalized Support",

    // Cart Drawer
    "Subtotal": "Subtotal",
    "Finalizar compra": "Checkout",
    "Ver carrito completo": "View Full Cart",
    "Tu carrito está vacío": "Your cart is empty",
    "Tu carrito est vaco": "Your cart is empty",
    "Explorar productos": "Explore Products",
    "Eliminar": "Remove",
    "¡Tienes envío gratis! 🎉": "You've unlocked free shipping! 🎉",
    "Tienes envo gratis! 🎉": "You've unlocked free shipping! 🎉",

    // Footer
    "Sobre nosotros": "About Us",
    "Contacto & Ayuda": "Contact & Help",
    "Envíos (3-6 días laborables)": "Shipping (3-6 business days)",
    "Envos (3-6 das laborables)": "Shipping (3-6 business days)",
    "Devoluciones (14 días RGPD)": "Returns (14-day policy)",
    "Devoluciones (14 das RGPD)": "Returns (14-day policy)",
    "Aviso Legal": "Legal Notice",
    "Política de Privacidad": "Privacy Policy",
    "Poltica de Privacidad": "Privacy Policy",
    "Términos y Condiciones": "Terms & Conditions",
    "Trminos y Condiciones": "Terms & Conditions",
    "Política de Cookies": "Cookie Policy",
    "Poltica de Cookies": "Cookie Policy",
    "Todos los derechos reservados.": "All rights reserved.",
    "Ayuda": "Help",
    "Navegación": "Navigation",
    "Navegacin": "Navigation",

    // Newsletter popup
    "¡10% DE DESCUENTO! 🐾": "GET 10% OFF! 🐾",
    "10% DE DESCUENTO! 🐾": "GET 10% OFF! 🐾",
    "Únete a la familia Paw & Home y llévate un 10% en tu primer pedido para mimar a tu mascota.": "Join the Paw & Home family and enjoy 10% off your first order to pamper your furry companion.",
    "nete a la familia Paw & Home y llvate un 10% en tu primer pedido para mimar a tu mascota.": "Join the Paw & Home family and enjoy 10% off your first order to pamper your furry companion.",
    "Tu mejor email": "Your best email",
    "¡QUIERO MI 10% DTO!": "CLAIM MY 10% OFF!",
    "QUIERO MI 10% DTO!": "CLAIM MY 10% OFF!",
    "No gracias, prefiero pagar precio completo": "No thanks, I'll pay full price"
  };

  // Build reverse dictionary for switching back to Spanish
  var REVERSE_DICTIONARY = {};
  for (var esKey in DICTIONARY) {
    var enVal = DICTIONARY[esKey];
    if (!REVERSE_DICTIONARY[enVal]) {
      REVERSE_DICTIONARY[enVal] = esKey;
    }
  }

  /**
   * Translates all matching text nodes and input placeholders in the DOM
   */
  function translateDOM(targetLang) {
    var map = targetLang === 'en' ? DICTIONARY : REVERSE_DICTIONARY;

    // 1. Walk visible text nodes
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          var tag = node.parentElement ? node.parentElement.tagName : '';
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
            return NodeFilter.FILTER_REJECT;
          }
          var val = node.nodeValue.trim();
          if (val.length > 1 && map[val]) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        }
      },
      false
    );

    var node;
    var nodesToReplace = [];
    while ((node = walker.nextNode())) {
      nodesToReplace.push({
        node: node,
        newText: node.nodeValue.replace(node.nodeValue.trim(), map[node.nodeValue.trim()])
      });
    }

    nodesToReplace.forEach(function(item) {
      item.node.nodeValue = item.newText;
    });

    // 2. Placeholders and inputs
    var inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(function(el) {
      var ph = el.getAttribute('placeholder');
      if (ph && map[ph.trim()]) {
        el.setAttribute('placeholder', map[ph.trim()]);
      }
    });

    // 3. Document Title
    if (targetLang === 'en' && document.title.includes('Inicio')) {
      document.title = document.title.replace('Inicio', 'Home');
    } else if (targetLang === 'es' && document.title.includes('Home')) {
      document.title = document.title.replace('Home', 'Inicio');
    }

    // 4. Update html lang attribute
    document.documentElement.lang = targetLang;
  }

  /**
   * Updates visual active states of switcher elements in Header and Drawer
   */
  function updateSwitcherUI(lang) {
    // Segmented toggle buttons in header
    var buttons = document.querySelectorAll('[data-paw-lang]');
    buttons.forEach(function(btn) {
      var btnLang = btn.getAttribute('data-paw-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Header flag & text indicator (if any)
    var flagSpans = document.querySelectorAll('.pet-lang-current-flag');
    var codeSpans = document.querySelectorAll('.pet-lang-current-code');
    flagSpans.forEach(function(s) {
      s.textContent = lang === 'en' ? '🇬🇧' : '🇪🇸';
    });
    codeSpans.forEach(function(s) {
      s.textContent = lang === 'en' ? 'EN' : 'ES';
    });
  }

  /**
   * Core function called when user or auto-detect triggers a language change
   */
  window.switchStoreLanguage = function(targetLang, userInitiated) {
    if (!targetLang) return;
    targetLang = targetLang.toLowerCase();

    // Persist choice
    try {
      localStorage.setItem('paw_user_lang', targetLang);
      document.cookie = 'paw_lang=' + targetLang + '; path=/; max-age=31536000; SameSite=Lax';
    } catch(e) {}

    // Update UI & translate DOM immediately
    updateSwitcherUI(targetLang);
    translateDOM(targetLang);

    // If native Shopify Localization form is present, let Shopify know
    var form = document.getElementById('HeaderLanguageFormDirect');
    var input = document.getElementById('HeaderLanguageCodeInput');
    if (form && input && userInitiated) {
      input.value = targetLang;
      // If we are in Shopify theme editor, avoid full page post to prevent editor disconnect
      if (!window.Shopify || !window.Shopify.designMode) {
        form.submit();
        return;
      }
    }

    // If user clicked and URL routes are enabled in Shopify
    if (userInitiated) {
      var pathname = window.location.pathname;
      var search = window.location.search;
      var hash = window.location.hash;

      if (targetLang === 'en' && !pathname.startsWith('/en')) {
        // Attempt navigation to /en
        var newPath = '/en' + (pathname === '/' ? '' : pathname);
        // Test fetch first to ensure /en returns 200 and not a 404/redirect loop
        fetch(newPath, { method: 'HEAD' })
          .then(function(res) {
            if (res.ok && res.url.includes('/en')) {
              window.location.href = newPath + search + hash;
            }
          })
          .catch(function() {});
      } else if (targetLang === 'es' && pathname.startsWith('/en')) {
        var cleanPath = pathname.replace(/^\/en(\/|$)/, '/');
        window.location.href = cleanPath + search + hash;
      }
    }
  };

  /**
   * Smart Geolocation & Browser Language Auto-Detection
   */
  function initLanguageAutoDetect() {
    var saved = null;
    try {
      saved = localStorage.getItem('paw_user_lang');
    } catch(e) {}

    // 1. If user previously chose a language manually, respect it unconditionally
    if (saved === 'en' || saved === 'es') {
      window.switchStoreLanguage(saved, false);
      return;
    }

    // 2. Check if current URL already indicates language
    if (window.location.pathname.startsWith('/en')) {
      window.switchStoreLanguage('en', false);
      return;
    }

    // 3. Fast local detection: Timezone and Navigator Language
    var isSpain = false;

    // Check timezone (Spain = Europe/Madrid, Atlantic/Canary, Africa/Ceuta)
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz === 'Europe/Madrid' || tz === 'Atlantic/Canary' || tz === 'Africa/Ceuta') {
        isSpain = true;
      }
    } catch(e) {}

    // Check navigator language
    var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var isSpanishNav = navLang.startsWith('es');

    // If both Spanish timezone and/or Spanish language detected -> keep ES
    if (isSpain || isSpanishNav) {
      window.switchStoreLanguage('es', false);
    } else {
      // Foreign visitor detected! Default to English
      window.switchStoreLanguage('en', false);
    }

    // 4. Background IP Country verification (non-blocking, fallback)
    try {
      if (!sessionStorage.getItem('paw_ip_checked')) {
        sessionStorage.setItem('paw_ip_checked', '1');
        fetch('https://get.geojs.io/v1/ip/country.json')
          .then(function(res) { return res.json(); })
          .then(function(data) {
            if (data && data.country) {
              var country = data.country.toUpperCase();
              var newLang = (country === 'ES') ? 'es' : 'en';
              // Only override if user hasn't made an explicit choice
              if (!localStorage.getItem('paw_user_lang')) {
                window.switchStoreLanguage(newLang, false);
              }
            }
          })
          .catch(function() {});
      }
    } catch(e) {}
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageAutoDetect);
  } else {
    initLanguageAutoDetect();
  }

})();
