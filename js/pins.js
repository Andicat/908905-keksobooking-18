'use strict';

(function () {
  var OFFERS_NEARBY_AMOUNT = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 10000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 4;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;

  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  // создаем массив случайных предложений поблизости
  function createOffersArray(count) {
    var offersArray = [];

    for (var i = 1; i < count; i++) {
      var randomOffer = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: 'Title ' + i,
          address: '600, 350',
          price: PRICE_MIN + Math.round((PRICE_MAX - PRICE_MIN) * Math.random()),
          type: window.util.getRandomElementFromArray(TYPES),
          rooms: ROOMS_MIN + Math.round((ROOMS_MAX - ROOMS_MIN) * Math.random()),
          guests: GUESTS_MIN + Math.round((GUESTS_MAX - GUESTS_MIN) * Math.random()),
          checkin: window.util.getRandomElementFromArray(CHECK_TIMES),
          checkout: window.util.getRandomElementFromArray(CHECK_TIMES),
          features: window.util.createRandomLengthArray(FEATURES),
          description: 'Description',
          photos: window.util.createRandomLengthArray(PHOTOS)
        },
        location: {
          x: mapPins.offsetLeft + Math.round(mapPins.offsetWidth * Math.random()),
          y: 130 + Math.round(500 * Math.random())
        }
      };

      offersArray.push(randomOffer);
    }
    return offersArray;
  }

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
    });

    return pinElement;
  }

  var offers = createOffersArray(OFFERS_NEARBY_AMOUNT);

  // вставляем метки на карту
  function createPins() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderPin(offers[i], i));
    }

    mapPins.appendChild(fragment);
  }

  // экспорт
  window.pins = {
    offers: offers,
    createPins: createPins
  };
})();
