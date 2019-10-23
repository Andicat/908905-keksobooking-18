'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');

  // активируем карту и форму
  function activateMap() {
    map.classList.remove('map--faded');
    window.form.disableOfferForm(false);
    window.filter.disableFilterForm(false);
  }

  function onPressEnter(target) {
    if (target === window.pinMain.mapPinMain) {
      window.pinMain.activatePinMain();
    }
    if (target.classList.contains('map__pin')) {
      window.card.showCard(window.offers.offers[target.getAttribute('data-index')]);
    }
    if (target.classList.contains('popup__close')) {
      window.card.closeCard();
    }
  }

  function onPressEsc() {
    window.pins.disactivatePins();
    window.card.closeCard();
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
  }

  // обработка нажатия клавиш на клавиатуре
  window.addEventListener('keydown', function (evt) {

    if (evt.keyCode === ENTER_KEYCODE) {
      onPressEnter(evt.target);
    }
    if (evt.keyCode === ESC_KEYCODE) {
      onPressEsc();
    }
  });

  // по умолчанию формы не активные
  window.filter.disableFilterForm(true);
  window.form.disableOfferForm(true);

  // подставляются координаты центра метки
  window.pinMain.setPinMainAddress(false);

  // экспорт
  window.main = {
    map: map,
    mapFilter: mapFilter,
    activateMap: activateMap
  };
})();
