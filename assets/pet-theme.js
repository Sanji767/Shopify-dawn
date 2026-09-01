/* ============================================================
   PET LIFESTYLE THEME — JavaScript
   ============================================================ */

(function() {
  'use strict';

  // ---- Sticky Header ----
  window.addEventListener('scroll', function() {
    var header = document.getElementById('pet-header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // ---- Product Page: Image Gallery ----
  window.changeMainImage = function(thumb, src) {
    var mainImg = document.getElementById('mainProductImg');
    if (mainImg) {
      mainImg.src = src;
    }
    // Update active thumb
    var thumbs = document.querySelectorAll('.pet-product-gallery-thumb');
    thumbs.forEach(function(t) { t.classList.remove('active'); });
    thumb.classList.add('active');
  };

  // ---- Product Page: Quantity ----
  window.updateProductQty = function(delta) {
    var input = document.getElementById('productQty');
    var hiddenQty = document.getElementById('quantity');
    if (input) {
      var val = parseInt(input.value) + delta;
      if (val < 1) val = 1;
      input.value = val;
      if (hiddenQty) hiddenQty.value = val;
    }
  };

  // ---- Accordions ----
  window.toggleAccordion = function(trigger) {
    var item = trigger.parentElement;
    var isOpen = item.classList.contains('open');

    // Close all
    var allItems = document.querySelectorAll('.pet-accordion-item');
    allItems.forEach(function(i) { i.classList.remove('open'); });

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
    }
  };

  // ---- Collection Sort ----
  document.addEventListener('DOMContentLoaded', function() {
    var sortSelect = document.getElementById('pet-collection-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        var url = new URL(window.location.href);
        url.searchParams.set('sort_by', this.value);
        window.location.href = url.toString();
      });
    }
  });

})();
