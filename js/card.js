'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popup;

  var OfferTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  // вставкa списка преимуществ в карточку
  function createFeatures(cardFeatures, features) {
    cardFeatures.textContent = '';

    cardFeatures.insertAdjacentHTML('afterBegin', features.map(function (it) {
      return '<li class="popup__feature popup__feature--' + it + '"></li>';
    }).join(' '));
  }

  // вставка фото в карточку
  function createPhotos(cardPhotos, photos) {
    var cardPhotoTemplate = cardPhotos.querySelector('.popup__photo');
    cardPhotos.textContent = '';

    photos.forEach(function (photoSrc) {
      var photoItem = cardPhotoTemplate.cloneNode(true);
      photoItem.src = photoSrc;
      cardPhotos.appendChild(photoItem);
    });
  }

  // обработчик закрытия карточки по клику
  function onPopupClose() {
    closeCard();
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
    popup.querySelector('.popup__type').textContent = OfferTypes[offer.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей.';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    popup.querySelector('.popup__description').textContent = offer.offer.description;
    popup.querySelector('.popup__avatar').src = offer.author.avatar;
    createFeatures(popup.querySelector('.popup__features'), offer.offer.features);
    createPhotos(popup.querySelector('.popup__photos'), offer.offer.photos);

    window.main.map.insertBefore(popup, window.main.mapFilter);

    popup.querySelector('.popup__close').addEventListener('click', onPopupClose);
  }

  // удаляем карточку предложения с карты
  function closeCard() {
    window.pins.disactivatePins();
    if (popup) {
      popup.remove();
      popup.querySelector('.popup__close').removeEventListener('click', onPopupClose);
    }
  }

  // экспорт
  window.card = {
    showCard: showCard,
    closeCard: closeCard
  };
})();
