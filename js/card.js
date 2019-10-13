'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardCurrentElement;

  var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

  // создаем код для вставки списка преимуществ в карточку
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
    if (window.main.map.querySelector('.map__card')) {
      window.main.map.removeChild(cardCurrentElement);
    }
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

    window.main.map.insertBefore(cardCurrentElement, window.main.mapFilter);

    cardCurrentElement.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
  }

  // удаляем карточку предложения с карты
  function closeCard() {
    document.querySelectorAll('.map__pin').forEach(function (pinItem) {
      pinItem.classList.remove('map__pin_active');
    });
    if (cardCurrentElement) {
      cardCurrentElement.remove();
    }
  }

  // экспорт
  window.card = {
    showCard: showCard,
    closeCard: closeCard
  };
})();
