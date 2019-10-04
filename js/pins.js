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
  var offers;


  // создаем массив случайных предложений поблизости
  function createOffersArray(count) {
    var offersArray = [];
    var startX = window.pinmain.mapPinMain.offsetLeft - mapPins.offsetWidth / 4;
    var startY = window.pinmain.mapPinMain.offsetTop - mapPins.offsetHeight / 4;

    if (startX < 0) {
      startX = 0;
    } else if (startX > (mapPins.offsetWidth / 2)) {
      startX = mapPins.offsetWidth / 2;
    }
    if (startY < 0) {
      startY = Math.max(PIN_HEIGHT, 0);
    } else if (startY > (mapPins.offsetHeight / 2)) {
      startY = mapPins.offsetHeight / 2;
    }

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
          x: startX + Math.round(mapPins.offsetWidth / 2 * Math.random()),
          y: startY + Math.round(mapPins.offsetHeight / 2 * Math.random())
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

  // вставляем метки на карту
  function createPins() {
    var currentPins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < currentPins.length; i++) {
      if (!currentPins[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(currentPins[i]);
      }
    }
    var fragment = document.createDocumentFragment();

    offers = createOffersArray(OFFERS_NEARBY_AMOUNT);

    for (i = 0; i < offers.length; i++) {
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
