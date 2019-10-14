'use strict';

(function () {
  var OFFERS_MAX = 5;
  var offers;

  function sortOffers(def) {
    console.log(offers);
    var sortedOffers = offers.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = pricesComparator(left.offer.price, right.offer.price);
      }
      return rankDiff;
    }).filter(function (it) {
      return def ? true : it.rank > 0;
    });
    
    return sortedOffers.slice(0, OFFERS_MAX);
  }

  var getRank = function (offer) {
    offer.rank = 0;
    if (offer.offer.type === window.filter.form['housing-type'].value) {
      offer.rank += 1;
    }
    if (offer.offer.type === window.filter.form['housing-type'].value) {
      offer.rank += 1;
    }
    return offer.rank;
  };

  var pricesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.backend.load(function (data) {
    offers = data;
  }, window.backend.showError);

  // экспорт
  window.offers = {
    offers: offers,
    OFFERS_MAX: OFFERS_MAX,
    sortOffers: sortOffers
  };
})();
