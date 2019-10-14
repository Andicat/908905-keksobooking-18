'use strict';

(function () {
  var OFFERS_COUNT = 5;
  var offers;

  function filterOffers(type) {
    var filteredOffers = offers.filter(function (it) {
      return it.offer.type === type;
    });
    return filteredOffers;
  }

  function sortOffers(type) {

    var sortedOffers = offers.sort(function (left, right) {
      var rankDiff = getRank(right, type) - getRank(left, type);
      if (rankDiff === 0) {
        rankDiff = pricesComparator(left.offer.price, right.offer.price);
      }
      return rankDiff;
    });

    return sortedOffers.slice(0, OFFERS_COUNT);
  }

  var getRank = function (offer, type) {
    var rank = 0;

    if (offer.offer.type === type) {
      rank += 1;
    }
    return rank;
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
    filterOffers: filterOffers,
    sortOffers: sortOffers
  };
})();
