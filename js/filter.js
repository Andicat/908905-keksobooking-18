'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var priceToRange = {
    'low': {
      'min': 0,
      'max': 10000
    },
    'middle': {
      'min': 10000,
      'max': 50000
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
    if (par >= priceToRange[value].min && par < priceToRange[value].max) {
      return true;
    }
    return false;
  }

  function equal(par, value) {
    if (value === 'any') {
      return true;
    }
    if (par.toString() === value) {
      return true;
    }
    return false;
  }

  function filterOffers(offers) {
    console.log(window.offers.offers);
    var filteredOffers = offers.filter(function (it) {
      // console.log(it.offer);
      return window.filter.equal(it.offer.type, window.filter.form['housing-type'].value);
    }).filter(function (it) {
      return window.filter.inRange(it.offer.price, window.filter.form['housing-price'].value);
    }).filter(function (it) {
      return window.filter.equal(it.offer.rooms, window.filter.form['housing-rooms'].value);
    }).filter(function (it) {
      return window.filter.equal(it.offer.guests, window.filter.form['housing-guests'].value);
    });
    return filteredOffers.slice(0, OFFERS_MAX);
  }

  // смена типа жилья
  function onChangeFilter() {
    window.card.closeCard();
    window.pins.deletePins();
    //window.pins.createPins(window.offers.filterOffers());
    window.pins.createPins(filterOffers(window.offers));
    // console.log(evt.target.value);
  }

  form.addEventListener('change', onChangeFilter);

  // экспорт
  window.filter = {
    form: form,
    inRange: inRange,
    equal: equal
  };
})();
