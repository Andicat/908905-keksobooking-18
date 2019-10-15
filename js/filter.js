'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var priceToRange = {
    'low': {
      'min': 0,
      'max': 9999
    },
    'middle': {
      'min': 10000,
      'max': 49999
    },
    'high': {
      'min': 50000,
      'max': Infinity
    }
  };

  function inRange(par, value) {
    if (value === 'any') {
      return true;
    }
    if (par >= priceToRange[value].min && par <= priceToRange[value].max) {
      return true;
    }
    return false;
  }

  function equal(par,value) {
    if (value == 'any') {
      return true;
    }
    if (par == value) {
      return true;
    }
    return false;
  }

  // смена типа жилья
  function onChangeFilter(evt) {
    window.card.closeCard();
    window.pins.deletePins();
    window.pins.createPins(window.offers.filterOffers());
    console.log(evt.target.value);
  }

  for (var i = 0; i < form.elements.length; i++) {
    form.elements[i].addEventListener('change', onChangeFilter);
  }
  
  // экспорт
  window.filter = {
    form: form,
    inRange: inRange,
    equal: equal
  };
})();
