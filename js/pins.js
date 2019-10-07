'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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
    });

    return pinElement;
  }

  // вставляем метки на карту
  function createPins() {
    window.backend.load(function (data) {
      offers = data;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offers.length; i++) {
        fragment.appendChild(renderPin(offers[i], i));
      }
      mapPins.appendChild(fragment);
    }, window.backend.showError);
  }

  // экспорт
  window.pins = {
    offers: offers,
    createPins: createPins
  };
})();
