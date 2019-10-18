'use strict';

(function () {
  var OFFERS_MAX = 5;
  var offers;

  var form = document.querySelector('.map__filters');
  var priceRangeMap = {
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

  function isEqual(par, filter) {
    switch (filter.name) {
      case 'price':
        return (par[filter.name] >= priceRangeMap[filter.value].min && par[filter.name] < priceRangeMap[filter.value].max) ? true : false;
      case 'feature':
        return (par.features.indexOf(filter.value) >= 0);
      default:
        return (par[filter.name].toString() === filter.value) ? true : false;
    }
  }

  function filterOffers(offersArray) {
    var filterArray = [];
    form.querySelectorAll('.map__filter').forEach(function (filter) {
      filterArray.push({name: filter.name.replace('housing-', ''), value: filter.value});
    });
    form.querySelectorAll('.map__checkbox:checked').forEach(function (filter) {
      filterArray.push({name: 'feature', value: filter.value});
    });

    var filteredOffers = offersArray.slice().filter(function (it) {
      var i = 0;
      var result = true;
      do {
        result = (filterArray[i].value === 'any' ? true : isEqual(it.offer, filterArray[i]));
        i++;
      } while (i < filterArray.length && result);
      return result;
    });

    return filteredOffers.slice(0, OFFERS_MAX);
  }

  function onChangeFilter() {
    window.card.closeCard();
    window.pins.deletePins();
    window.pins.createPins(filterOffers(window.filter.offers));
  }

  form.addEventListener('change', window.debounce(function () {
    window.filter.onChangeFilter();
  }));

  window.backend.load(function (data) {
    window.filter.offers = data;
  }, window.backend.showError);

  // экспорт
  window.filter = {
    offers: offers,
    form: form,
    filterOffers: filterOffers,
    onChangeFilter: onChangeFilter
  };
})();
