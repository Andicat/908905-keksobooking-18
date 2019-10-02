'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var filterForm = document.querySelector('.map__filters');

  // активируем карту и форму
  function activateMap() {
    map.classList.remove('map--faded');
    window.form.disableForm(false);
    window.util.disableForm(filterForm, false, 'ad-form--disabled');
  }

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
  window.util.disableForm(filterForm, true, 'ad-form--disabled');
  window.form.disableForm(true);
 
 // подставляются координаты центра метки
  window.pinmain.setPinMainAddress(false);  
  
  // экспорт
  window.main = {
    map: map,
    mapFilter: mapFilter,
    activateMap: activateMap
  };
})();
