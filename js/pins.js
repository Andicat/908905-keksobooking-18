'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_COUNT = 5;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var offers;

  // создаем метку через шаблон
  function renderPin(offer, index) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinElementImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + (offer.location.x - PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
    pinElementImage.src = offer.author.avatar;
    pinElementImage.alt = offer.offer.description;
    pinElement.setAttribute('data-index', index);

    pinElement.addEventListener('click', function () {
      window.card.showCard(offer);
      pinElement.classList.add('map__pin_active');
    });

    return pinElement;
  }

  function filterOffers(type) {

    var filteredOffers = offers.sort(function (left, right) {
      var rankDiff = getRank(right, type) - getRank(left, type);
      if (rankDiff === 0) {
        rankDiff = pricesComparator(left.offer.price, right.offer.price);
      }
      return rankDiff;
    });

    return filteredOffers.slice(0, PIN_COUNT);
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

  // вставляем метки на карту
  function createPins() {
    var pinsOnMap = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pinsOnMap.length; i++) {
      if (!pinsOnMap[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pinsOnMap[i]);
      }
    }
    var offersToShow = filterOffers(window.form.form.type.value);
    var fragment = document.createDocumentFragment();

    for (i = 0; i < offersToShow.length; i++) {
      fragment.appendChild(renderPin(offersToShow[i], i));
    }
    mapPins.appendChild(fragment);
  }

  window.backend.load(function (data) {
    offers = data;
  }, window.backend.showError);

  // экспорт
  window.pins = {
    offers: offers,
    createPins: createPins
  };
})();
