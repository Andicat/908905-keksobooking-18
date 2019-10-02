'use strict';

(function () {
  var ROOMS_FOR_NOBODY = 100;
  var MIN_PRICES = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};

  var form = document.querySelector('.ad-form');

  // проверка соответствия кол-ва комнат и гостей
  function checkRoomsCapacity() {
    var roomsCapacity = form.rooms.value;
    var capacityOptions = form.capacity.options;

    for (var i = 0; i < capacityOptions.length; i++) {
      if (roomsCapacity < ROOMS_FOR_NOBODY) {
        capacityOptions[i].disabled = ((capacityOptions[i].value > 0 & capacityOptions[i].value <= roomsCapacity) ? false : true);
      } else {
        capacityOptions[i].disabled = (capacityOptions[i].value > 0 ? true : false);
      }
    }

    if (capacityOptions[capacityOptions.selectedIndex].disabled) {
      capacityOptions[capacityOptions.selectedIndex].selected = false;
    }
  }

  // проверка минимальной цены
  function checkMinPrice() {
    var minPrice = MIN_PRICES[form.type.value];

    form.price.setAttribute('min', minPrice);
    form.price.setAttribute('placeholder', minPrice);
  }

  // проверка времены заезда/выезда
  function checkCheckTime(evt) {
    switch (evt.target.name) {
      case 'timein':
        form.timeout.value = evt.target.value;
        break;
      case 'timeout':
        form.timein.value = evt.target.value;
        break;
    }
  }

  // проверка заголовка
  function checkTitle() {
    if (form.title.validity.tooShort) {
      form.title.setCustomValidity('Заголовок объявления должен состоять как минимум из 30 символов');
    } else if (form.title.validity.tooLong) {
      form.title.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (form.title.validity.valueMissing) {
      form.title.setCustomValidity('Заголовок объявления не может быть пустым');
    } else {
      form.title.setCustomValidity('');
    }
  }

  // проверка цены
  function checkPrice() {
    if (form.price.validity.rangeOverflow) {
      form.price.setCustomValidity('Цена за ночь не может быть больше ' + form.price.max);
    } else if (form.price.validity.rangeUnderflow) {
      form.price.setCustomValidity('Цена за ночь не может быть меньше ' + form.price.min);
    } else if (form.price.validity.valueMissing) {
      form.price.setCustomValidity('Цена за ночь не может быть пустой');
    } else {
      form.price.setCustomValidity('');
    }
  }

  function disabledForm(disabled) {
    window.util.disabledForm(form, disabled, 'ad-form--disabled');
    if (!disabled) {
      checkRoomsCapacity();
      checkMinPrice();
    }
  }

  form.action = 'https://js.dump.academy/keksobooking';
  form.method = 'POST';
  form.enctype = 'multipart/form-data';
  form.rooms.addEventListener('change', checkRoomsCapacity);
  form.type.addEventListener('change', checkMinPrice);
  form.timein.addEventListener('change', checkCheckTime);
  form.timeout.addEventListener('change', checkCheckTime);

  form.title.setAttribute('minlength', 30);
  form.title.setAttribute('maxlength', 100);
  form.title.required = true;
  form.title.addEventListener('invalid', checkTitle);

  form.price.setAttribute('max', 1000000);
  form.price.required = true;
  form.price.addEventListener('invalid', checkPrice);

  form.address.readOnly = true;

  // экспорт
  window.adform = {
    form: form,
    disabledForm: disabledForm
  };
})();
