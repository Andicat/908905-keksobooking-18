'use strict';

(function () {
  var OFFERS_MAX = 5;
  var offers;
  var rankMax;

   function filterOffers() {
    
    var filteredOffers = offers.filter(function (it) {
      console.log(it.offer);
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
  
  function sortOffers(def) {
    rankMax = 0;
    //if (window.filter.form['housing-type'].value !== 'any' || window.filter.form['housing-price'].value !== 'any') {
    //}
    var sortedOffers = offers.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = pricesComparator(left.offer.price, right.offer.price);
      }
      return rankDiff;
    }).filter(function (it) {
      return it.rank === rankMax;
    });
    //console.log(sortedOffers);
    //console.log(rankMax);
    return sortedOffers.slice(0, OFFERS_MAX);
  }

  var getRank = function (offer) {
    offer.rank = 0;
    if (offer.offer.type === window.filter.form['housing-type'].value) {
      offer.rank += 1;
      if (window.filter.priceInRange(offer.offer.price)) {
        offer.rank += 1;
      }
    }
    rankMax = offer.rank > rankMax ? offer.rank : rankMax;
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
    sortOffers: sortOffers,
    filterOffers: filterOffers
  };
})();
