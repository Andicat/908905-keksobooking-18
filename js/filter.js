'use strict';

(function () {
  var OFFERS_MAX = 5;
  var offers;
  var dataLoaded = false;

  var form = document.querySelector('.map__filters');
  var PriceRangeMap = {
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
        return (par[filter.name] >= PriceRangeMap[filter.value].min && par[filter.name] < PriceRangeMap[filter.value].max) ? true : false;
      case 'feature':
        return (par.features.indexOf(filter.value) >= 0);
      default:
        return (par[filter.name].toString() === filter.value) ? true : false;
    }
  }

  function filterOffers(offersArray) {
    var filtersArray = [];
    form.querySelectorAll('.map__filter').forEach(function (filter) {
      filtersArray.push({name: filter.name.replace('housing-', ''), value: filter.value});
    });
    form.querySelectorAll('.map__checkbox:checked').forEach(function (filter) {
      filtersArray.push({name: 'feature', value: filter.value});
    });

    var filteredOffers = offersArray.slice().filter(function (it) {
      var i = 0;
      var result = true;
      do {
        result = (filtersArray[i].value === 'any' ? true : isEqual(it.offer, filtersArray[i]));
        i++;
      } while (i < filtersArray.length && result);
      return result;
    });

    return filteredOffers.slice(0, OFFERS_MAX);
  }

  function disableFilterForm(isDisabled) {
    var formElements = form.elements;

    if (isDisabled) {
      form.classList.add('ad-form--disabled');
    } else {
      form.classList.remove('ad-form--disabled');
    }

    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = isDisabled;
    }
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
    window.filter.dataLoaded = true;
    if (!window.main.map.classList.contains('map--faded')) {
      window.filter.disableFilterForm(false);
      window.pins.createPins(window.filter.filterOffers(window.filter.offers));
    }
  }, window.backend.showError);

  // экспорт
  window.filter = {
    offers: offers,
    dataLoaded: dataLoaded,
    form: form,
    filterOffers: filterOffers,
    onChangeFilter: onChangeFilter,
    disableFilterForm: disableFilterForm
  };
})();
