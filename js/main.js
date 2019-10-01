'use strict';

var OFFERS_NEARBY_AMOUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 65;
var PIN_MAIN_ACTIVE_HEIGHT = 87;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var PRICE_MIN = 1000;
var PRICE_MAX = 10000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 4;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapPinMain = document.querySelector('.map__pin--main');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterForm = document.querySelector('.map__filters');
var cardCurrentElement;

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
        x: Math.round(mapPins.offsetWidth * Math.random()),
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
    showCard(offer);
  });

  return pinElement;
}

// вставляем метки на карту
function createPins(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i], i));
  }

  mapPins.appendChild(fragment);
}

// создаем код для вставки преимуществ в карточку
function createFeaturesHTML(features) {
  var featuresHTMLText = '';

  for (var i = 0; i < features.length; i++) {
    featuresHTMLText = featuresHTMLText + '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
  }

  return featuresHTMLText;
}

// создаем код для вставки фото в карточку
function createPhotosHTML(photos) {
  var photosHTMLText = '';

  for (var i = 0; i < photos.length; i++) {
    photosHTMLText = photosHTMLText + '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }

  return photosHTMLText;
}

// создаем карточку предложения и вставляем ее на карту
function showCard(offer) {
  cardCurrentElement = mapCardTemplate.cloneNode(true);

  cardCurrentElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardCurrentElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardCurrentElement.querySelector('.popup__text--price').textContent = offer.offer.price + '¥/ночь';
  cardCurrentElement.querySelector('.popup__type').textContent = RUSSIAN_WORDS[offer.offer.type];
  cardCurrentElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей.';
  cardCurrentElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  cardCurrentElement.querySelector('.popup__features').innerHTML = createFeaturesHTML(offer.offer.features);
  cardCurrentElement.querySelector('.popup__description').textContent = offer.offer.description;
  cardCurrentElement.querySelector('.popup__photos').innerHTML = createPhotosHTML(offer.offer.photos);
  cardCurrentElement.querySelector('.popup__avatar').src = offer.author.avatar;

  map.insertBefore(cardCurrentElement, mapFilter);

  cardCurrentElement.querySelector('.popup__close').addEventListener('click', function () {
    map.removeChild(cardCurrentElement);
  });
}

// удаляем карточку предложения с карты
function closeCard() {
  map.removeChild(cardCurrentElement);
}

// активируем карту и форму
function activateMap() {
  map.classList.remove('map--faded');
  window.adform.disabledForm(false);
  window.util.disabledForm(filterForm, false, 'ad-form--disabled');
}

// устанавливаем значение поля адреса
function setPinMainAddress(pinActive) {
  var x = mapPinMain.offsetLeft + PIN_MAIN_WIDTH / 2;
  var y = mapPinMain.offsetTop + (pinActive ? PIN_MAIN_ACTIVE_HEIGHT : PIN_MAIN_HEIGHT / 2);

  window.adform.form.address.value = Math.round(x) + ', ' + Math.round(y);
}

// активируем главную метку
function activatePinMain() {
  activateMap();
  setPinMainAddress(true);
  createPins(offers);
}


// клик мышкой на главную метку
mapPinMain.addEventListener('mousedown', activatePinMain);

// обработка нажатия клавиш на клавиатуре
window.addEventListener('keydown', function (evt) {

  if (evt.keyCode === ENTER_KEYCODE) {

    if (evt.target === mapPinMain) {
      activatePinMain();
    }
    if (evt.target === mapPinMain) {
      activatePinMain();
    }
    if (evt.target.classList.contains('map__pin')) {
      showCard(offers[evt.target.getAttribute('data-index')]);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeCard();
    }
  }
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
});

window.adform.disabledForm(true);
window.util.disabledForm(filterForm, true, 'ad-form--disabled');

// подставляются координаты центра метки
setPinMainAddress(false);


// создаем массив соседних предложений
var offers = createOffersArray(OFFERS_NEARBY_AMOUNT);
