
//Ещё один момент касается ограничения перемещения: не забудьте сделать так, чтобы метку невозможно было переместить за пределы карты (см. пункт 3.4).

'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ACTIVE_HEIGHT = 87;

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  
  var limits = {
    top: mapPins.offsetTop,
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

  // перетаскивание метки
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (shift.x > limits.right) {
      	shift.x = limits.right;
      } else if (shift.x > limits.left) {
      	shift.x = shift.x;
      }
      if (shift.y > limits.bottom) {
      	shift.y = limits.bottom;
      } else if (shift.y > limits.top) {
      	shift.y = shift.y;
      }
     
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

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
      if (window.main.map.classList.contains('map--faded')) {
      	window.main.activateMap();
      }
      setPinMainAddress(true);
      window.pins.createPins();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

 // экспорт
  window.pinmain = {
    setPinMainAddress: setPinMainAddress
  };
 

})();

