'use strict';

(function () {
  // получаем случайный элемент из массива
  function getRandomElementFromArray(arr) {
    return arr[Math.round((arr.length - 1) * Math.random())];
  }

  // делаем элементы формы неактивными
  function disableForm(form, isDisabled, disabledClass) {
    var formElements = form.elements;

    if (isDisabled) {
      form.classList.add(disabledClass);
    } else {
      form.classList.remove(disabledClass);
    }
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = isDisabled;
    }
  }

  // экспорт
  window.util = {
    getRandomElementFromArray: getRandomElementFromArray,
    disableForm: disableForm
  };
})();
