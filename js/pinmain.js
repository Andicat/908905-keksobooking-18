'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ACTIVE_HEIGHT = 87;

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var limits = {
    top: mapPins.offsetTop + PIN_MAIN_ACTIVE_HEIGHT,
    right: mapPins.offsetLeft + mapPins.offsetWidth,
    bottom: mapPins.offsetTop + mapPins.offsetHeight,
    left: mapPins.offsetLeft
  };

  // устанавливаем значение поля адреса
  function setPinMainAddress(pinActive) {
    var x = mapPinMain.offsetLeft + PIN_MAIN_WIDTH / 2;
    var y = mapPinMain.offsetTop + (pinActive ? PIN_MAIN_ACTIVE_HEIGHT : PIN_MAIN_HEIGHT / 2);

    window.form.form.address.value = Math.round(x) + ', ' + Math.round(y);
  }

  function activatePinMain() {
    if (window.main.map.classList.contains('map--faded')) {
      window.main.activateMap();
    }
    setPinMainAddress(true);
    window.pins.createPins();
  }

  // перетаскивание метки
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // начальные координаты мышки
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      // смещение мышки относительно начальных координат
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      // новые начальные коррдинаты после перемещения мышки
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = Math.min(Math.max((mapPinMain.offsetTop - shift.y), limits.top), limits.bottom - PIN_MAIN_HEIGHT) + 'px';
      mapPinMain.style.left = Math.min(Math.max((mapPinMain.offsetLeft - shift.x), limits.left), limits.right - PIN_MAIN_WIDTH) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clEvt) {
          clEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
      activatePinMain();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // экспорт
  window.pinmain = {
    mapPinMain: mapPinMain,
    setPinMainAddress: setPinMainAddress,
    activatePinMain: activatePinMain
  };
})();
