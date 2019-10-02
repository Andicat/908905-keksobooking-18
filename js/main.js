'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ACTIVE_HEIGHT = 87;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var filterForm = document.querySelector('.map__filters');

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
    window.pins.createPins();
  }

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
        window.card.showCard(window.pins.offers[evt.target.getAttribute('data-index')]);
      }
      if (evt.target.classList.contains('popup__close')) {
        window.card.closeCard();
      }
    }
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.closeCard();
    }
  });

  // по умолчанию формы не активные
  window.adform.disabledForm(true);
  window.util.disabledForm(filterForm, true, 'ad-form--disabled');

  // подставляются координаты центра метки
  setPinMainAddress(false);

  // экспорт
  window.main = {
    map: map,
    mapFilter: mapFilter
  };
})();
