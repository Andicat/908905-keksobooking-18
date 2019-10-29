'use strict';

(function () {
  var ROOMS_FOR_NOBODY = 100;
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var PRICE_MAX = 1000000;
  var MinPrices = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var form = document.querySelector('.ad-form');
  var formTime = form.querySelector('.ad-form__element--time');

  // проверка соответствия кол-ва комнат и гостей
  function setRoomsCapacity() {
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
  function setMinPrice() {
    var minPrice = MinPrices[form.type.value];

    form.price.setAttribute('min', minPrice);
    form.price.setAttribute('placeholder', minPrice);
  }

  function onChangeRooms() {
    setRoomsCapacity();
  }

  function onChangeType() {
    setMinPrice();
  }


  // проверка времены заезда/выезда
  function onChangeTime(evt) {
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
  function onInvalidTitle() {
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
  function onInvalidPrice() {
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

  function onSubmitForm(evt) {
    window.backend.save(new FormData(form), function () {
      resetPage();
      window.backend.showSuccess();
    }, window.backend.showError);
    evt.preventDefault();
  }

  function onResetForm(evt) {
    evt.preventDefault();
    resetPage();
  }

  function disableOfferForm(isDisabled) {
    var formElements = form.elements;

    if (isDisabled) {
      form.classList.add('ad-form--disabled');
      removeListeners();
    } else {
      form.classList.remove('ad-form--disabled');
      addListeners();
      setRoomsCapacity();
      setMinPrice();
    }

    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = isDisabled;
    }
  }

  function removeListeners() {
    form.rooms.removeEventListener('change', onChangeRooms);
    form.type.removeEventListener('change', onChangeType);
    formTime.removeEventListener('change', onChangeTime);
    form.title.removeEventListener('invalid', onInvalidTitle);
    form.price.removeEventListener('invalid', onInvalidPrice);
    form.removeEventListener('submit', onSubmitForm);
    form.removeEventListener('reset', onResetForm);
  }

  function addListeners() {
    form.rooms.addEventListener('change', onChangeRooms);
    form.type.addEventListener('change', onChangeType);
    formTime.addEventListener('change', onChangeTime);
    form.title.addEventListener('invalid', onInvalidTitle);
    form.price.addEventListener('invalid', onInvalidPrice);
    form.addEventListener('submit', onSubmitForm);
    form.addEventListener('reset', onResetForm);
  }

  function resetFormElements(formElements) {
    for (var i = 0; i < formElements.length; i++) {
      var fieldType = formElements[i].type.toLowerCase();
      switch (fieldType) {
        case 'text':
        case 'textarea':
          formElements[i].value = '';
          break;
        case 'number':
          formElements[i].value = '';
          break;
        case 'checkbox':
          formElements[i].checked = false;
          break;
        case 'select-one':
          formElements[i].selectedIndex = (formElements[i].name === 'type') ? 1 : 0;
          break;
        default:
          break;
      }
    }
  }

  function resetPins() {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      } else {
        pins[i].style.left = window.pinMain.mapPinMainX + 'px';
        pins[i].style.top = window.pinMain.mapPinMainY + 'px';
        window.pinMain.setPinMainAddress(true);
      }
    }
  }

  function resetPage() {
    resetFormElements(form.elements);
    window.photo.deletePhotos('reset');
    resetFormElements(window.filter.form.elements);
    window.filter.disableFilterForm(true);
    window.form.disableOfferForm(true);
    resetPins();
    window.card.closeCard();
    window.main.map.classList.add('map--faded');
    window.pinMain.setPinMainAddress(false);
  }

  form.title.setAttribute('minlength', TITLE_MIN_LENGTH);
  form.title.setAttribute('maxlength', TITLE_MAX_LENGTH);
  form.price.setAttribute('max', PRICE_MAX);
  form.title.required = true;
  form.price.required = true;
  form.address.readOnly = true;

  // экспорт
  window.form = {
    form: form,
    disableOfferForm: disableOfferForm
  };
})();
