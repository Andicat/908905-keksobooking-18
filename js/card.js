'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardCurrentElement;

  var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

  // вставкf списка преимуществ в карточку
  function createFeatures(cardFeatures, features) {
    while (cardFeatures.firstChild) {
      cardFeatures.removeChild(cardFeatures.firstChild);
    }
    features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + it);
      cardFeatures.appendChild(featureItem);
    });
  }

  // вставка фото в карточку
  function createPhotos(cardPhotos, photos) {
    while (cardPhotos.firstChild) {
      cardPhotos.removeChild(cardPhotos.firstChild);
    }
    photos.forEach(function (it) {
      var photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = it;
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.alt = 'Фотография жилья';
      cardPhotos.appendChild(photoItem);
    });
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
    cardCurrentElement.querySelector('.popup__description').textContent = offer.offer.description;
    cardCurrentElement.querySelector('.popup__avatar').src = offer.author.avatar;
    createFeatures(cardCurrentElement.querySelector('.popup__features'), offer.offer.features);
    createPhotos(cardCurrentElement.querySelector('.popup__photos'), offer.offer.photos);

    window.main.map.insertBefore(cardCurrentElement, window.main.mapFilter);

    cardCurrentElement.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
  }

  // удаляем карточку предложения с карты
  function closeCard() {
    window.pins.disactivatePins();
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
