'use strict';

(function () {
  var OFFERS_MAX = 5;
  var offers;
  // var rankMax;

  function filterOffers() {

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
  
  window.backend.load(function (data) {
    offers = data;
  }, window.backend.showError);
  
  console.log(window.offers);
  
  // экспорт
  window.offers = {
    offers: offers,
    OFFERS_MAX: OFFERS_MAX,
    // sortOffers: sortOffers,
    filterOffers: filterOffers
  };
})();
