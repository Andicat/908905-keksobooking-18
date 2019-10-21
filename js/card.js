'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popup;

  var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

  // вставкf списка преимуществ в карточку
  function createFeatures(cardFeatures, features) {
    var cardFeaturesList = cardFeatures.querySelectorAll('.popup__feature');
    //console.log(features);
    //cardPhotos.querySelector('.popup__photo').remove();
    /*cardFeaturesList.forEach(function (it) {
      if ( features.indexOf(it.filter.value) >= 0);) {
        cardFeatures.removeChild(it);
      }
    });



   /* while (cardFeatures.firstChild) {
      cardFeatures.removeChild(cardFeatures.firstChild);
    }
    features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + it);
      cardFeatures.appendChild(featureItem);
    });*/
  }

  // вставка фото в карточку
  function createPhotos(cardPhotos, photos) {
    var cardPhotoTemplate = cardPhotos.querySelector('.popup__photo');
    cardPhotos.querySelector('.popup__photo').remove();
    photos.forEach(function (it) {
      var photoItem = cardPhotoTemplate.cloneNode(true);
      photoItem.src = it;
      cardPhotos.appendChild(photoItem);
    });
  }

  // создаем карточку предложения и вставляем ее на карту
  function showCard(offer) {
    if (window.main.map.querySelector('.map__card')) {
      window.main.map.removeChild(popup);
    }
    popup = mapCardTemplate.cloneNode(true);

    popup.querySelector('.popup__title').textContent = offer.offer.title;
    popup.querySelector('.popup__text--address').textContent = offer.offer.address;
    popup.querySelector('.popup__text--price').textContent = offer.offer.price + '¥/ночь';
    popup.querySelector('.popup__type').textContent = RUSSIAN_WORDS[offer.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей.';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    popup.querySelector('.popup__description').textContent = offer.offer.description;
    popup.querySelector('.popup__avatar').src = offer.author.avatar;
    createFeatures(popup.querySelector('.popup__features'), offer.offer.features);
    createPhotos(popup.querySelector('.popup__photos'), offer.offer.photos);

    window.main.map.insertBefore(popup, window.main.mapFilter);

    popup.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
  }

  // удаляем карточку предложения с карты
  function closeCard() {
    window.pins.disactivatePins();
    if (popup) {
      popup.remove();
    }
  }

  // экспорт
  window.card = {
    showCard: showCard,
    closeCard: closeCard
  };
})();
