'use strict';

(function () {
  var form = document.querySelector('.map__filters');

  // смена типа жилья
  function onChangeType() {
    window.card.closeCard();
    window.pins.deletePins();
    window.pins.createPins(window.offers.filterOffers(form['housing-type'].value));
  }

  form['housing-type'].addEventListener('change', onChangeType);

  // экспорт
  window.filter = {
    form: form
  };
})();
