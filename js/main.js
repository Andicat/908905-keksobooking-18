'use strict';

var OFFERS_NEARBY_AMOUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 65;
var PIN_MAIN_ACTIVE_HEIGHT = 87;
var PRICE_MIN = 1000;
var PRICE_MAX = 10000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 4;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var ROOMS_FOR_NOBODY = 100;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};
var MIN_PRICES = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};

var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapPinMain = document.querySelector('.map__pin--main');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var filterForm = document.querySelector('.map__filters');
var cardCurrentElement;

// получаем случайный элемент из массива
function getRandomElementFromArray(arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
}

// получаем массив случайной длины
function createRandomLengthArray(arr) {
  var randomArr = [];

  for (var i = 0; i < arr.length; i++) {
    var randomBoolean = Math.random() >= 0.5;
    if (randomBoolean) {
      randomArr.push(arr[i]);
    }
  }
  return randomArr;
}

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
        type: getRandomElementFromArray(TYPES),
        rooms: ROOMS_MIN + Math.round((ROOMS_MAX - ROOMS_MIN) * Math.random()),
        guests: GUESTS_MIN + Math.round((GUESTS_MAX - GUESTS_MIN) * Math.random()),
        checkin: getRandomElementFromArray(CHECK_TIMES),
        checkout: getRandomElementFromArray(CHECK_TIMES),
        features: createRandomLengthArray(FEATURES),
        description: 'Description',
        photos: createRandomLengthArray(PHOTOS)
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

// делаем элементы формы неактивными
function disabledForm(form, disabled) {
  var formElements = form.elements;

  if (disabled) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }

  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = disabled;
  }
}

// активируем карту и форму
function activateMap() {
  map.classList.remove('map--faded');
  disabledForm(adForm, false);
  disabledForm(filterForm, false);
}

// устанавливаем значение поля адреса
function setPinMainAddress(pinActive) {
  var x = mapPinMain.offsetLeft + PIN_MAIN_WIDTH / 2;
  var y = mapPinMain.offsetTop + (pinActive ? PIN_MAIN_ACTIVE_HEIGHT : PIN_MAIN_HEIGHT / 2);

  adForm.address.value = Math.round(x) + ', ' + Math.round(y);
}

// активируем главную метку
function activatePinMain() {
  activateMap();
  setPinMainAddress(true);
  createPins(offers);
}

// проверка соответствия кол-ва комнат и гостей
function checkRoomsCapacity() {
  var roomsCapacity = adForm.rooms.value;
  var capacityOptions = adForm.capacity.options;

  for (var i = 0; i < capacityOptions.length; i++) {
    if (roomsCapacity < ROOMS_FOR_NOBODY) {
      capacityOptions[i].disabled = ((capacityOptions[i].value > 0 & capacityOptions[i].value <= roomsCapacity) ? false : true);
    } else {
      capacityOptions[i].disabled = (capacityOptions[i].value > 0 ? true : false);
    }
  }

  if (capacityOptions[capacityOptions.selectedIndex].disabled) {
    capacityOptions[capacityOptions.selectedIndex].selected = false;
  }
}

// проверка минимальной цены
function checkMinPrice() {
  var minPrice = MIN_PRICES[adForm.type.value];

  adForm.price.setAttribute('min', minPrice);
  adForm.price.setAttribute('placeholder', minPrice);
}

// проверка времены заезда/выезда
function checkCheckTime(evt) {
  if (evt.target.name === 'timein') {
    adForm.timeout.value = evt.target.value;
  } else {
    adForm.timein.value = evt.target.value;
  }
}

// проверка заголовка
function checkValue(evt) {
  var nameValue = adForm.querySelector('label[for=' + evt.target.name + ']').textContent;

  if (evt.target.validity.tooShort) {
    evt.target.setCustomValidity('Поле "' + nameValue + '" должно состоять как минимум из ' + evt.target.minLength + ' символов');
  } else if (evt.target.validity.tooLong) {
    evt.target.setCustomValidity('Поле "' + nameValue + '" не должно превышать ' + evt.target.maxlength + ' символов');
  } else if (evt.target.validity.rangeOverflow) {
    evt.target.setCustomValidity('Поле "' + nameValue + '" не может быть больше ' + evt.target.max);
  } else if (evt.target.validity.rangeUnderflow) {
    evt.target.setCustomValidity('Поле "' + nameValue + '" не может быть меньше ' + evt.target.min);
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное поле');
  } else {
    evt.target.setCustomValidity('');
  }
}

// клик мышкой на главную метку
mapPinMain.addEventListener('mousedown', activatePinMain);

adForm.action = 'https://js.dump.academy/keksobooking';
adForm.method = 'POST';
adForm.enctype = 'multipart/form-data';
adForm.rooms.addEventListener('change', checkRoomsCapacity);
adForm.type.addEventListener('change', checkMinPrice);
adForm.timein.addEventListener('change', checkCheckTime);
adForm.timeout.addEventListener('change', checkCheckTime);

adForm.title.setAttribute('minlength', 30);
adForm.title.setAttribute('maxlength', 100);
adForm.title.addEventListener('invalid', checkValue);

adForm.price.setAttribute('max', 1000000);
adForm.address.readOnly = true;

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

disabledForm(adForm, true);
disabledForm(filterForm, true);

// подставляются координаты центра метки
setPinMainAddress(false);
checkRoomsCapacity();
checkMinPrice();

// создаем массив соседних предложений
var offers = createOffersArray(OFFERS_NEARBY_AMOUNT);
