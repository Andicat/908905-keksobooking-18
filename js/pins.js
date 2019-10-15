'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

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
      disactivatePins();
      pinElement.classList.add('map__pin_active');
    });

    return pinElement;
  }

  // удаляем метки с карты
  function deletePins() {
    var pinsOnMap = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pinsOnMap.length; i++) {
      if (!pinsOnMap[i].classList.contains('map__pin--main')) {
        mapPins.removeChild(pinsOnMap[i]);
      }
    }
  }

  // деактивируем пины
  function disactivatePins() {
    document.querySelectorAll('.map__pin').forEach(function (pinItem) {
      pinItem.classList.remove('map__pin_active');
    });
  }

  // вставляем метки на карту
  function createPins(pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i], i));
    }
    mapPins.appendChild(fragment);
  }

  // экспорт
  window.pins = {
    createPins: createPins,
    deletePins: deletePins,
    disactivatePins: disactivatePins
  };
})();
