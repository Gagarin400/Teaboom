(function () {
  'use strict';

  var chips = document.querySelectorAll('.variant-chip');
  var skuEl = document.getElementById('productSku');
  var oldPriceEl = document.getElementById('oldPrice');
  var currentPriceEl = document.getElementById('currentPrice');
  var discountEl = document.getElementById('discountBadge');
  var addToCartBtn = document.getElementById('addToCartBtn');
  var addedMessage = document.getElementById('addedMessage');

  var currencyFormatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function formatPrice(value) {
    return currencyFormatter.format(value) + ' ₽';
  }

  function calcDiscount(oldPrice, price) {
    if (!oldPrice || oldPrice <= price) return null;
    return Math.round((1 - price / oldPrice) * 100);
  }

  function applyVariant(chip) {
    var oldPrice = parseFloat(chip.dataset.old);
    var price = parseFloat(chip.dataset.price);
    var sku = chip.dataset.sku;

    skuEl.textContent = sku;
    oldPriceEl.textContent = formatPrice(oldPrice);
    currentPriceEl.querySelector('[itemprop="price"]').textContent =
      currencyFormatter.format(price);

    var discount = calcDiscount(oldPrice, price);
    if (discount) {
      discountEl.textContent = '-' + discount + '%';
      discountEl.hidden = false;
      oldPriceEl.hidden = false;
    } else {
      discountEl.hidden = true;
      oldPriceEl.hidden = true;
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (chip.classList.contains('is-active')) return;

      chips.forEach(function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-checked', 'false');
      });

      chip.classList.add('is-active');
      chip.setAttribute('aria-checked', 'true');

      applyVariant(chip);
    });
  });

  var addedTimeout;
  addToCartBtn.addEventListener('click', function () {
    addedMessage.classList.add('is-visible');
    clearTimeout(addedTimeout);
    addedTimeout = setTimeout(function () {
      addedMessage.classList.remove('is-visible');
    }, 2000);
  });
})();
