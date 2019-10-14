'use strict';

(function () {
  var form = document.querySelector('.map__filters');

  // смена типа жилья
  function onChangeFilter(evt) {
    window.card.closeCard();
    window.pins.deletePins();
    window.pins.createPins(window.offers.sortOffers());
    //console.log(evt.target.value);
  }

  for (var i = 0; i < form.elements.length; i++) {
    form.elements[i].addEventListener('change', onChangeFilter);
  }
  
  // экспорт
  window.filter = {
    form: form
  };
})();
