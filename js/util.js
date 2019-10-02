'use strict';

(function () {
  // получаем случайный элемент из массива
  function getRandomElementFromArray(arr) {
    return arr[Math.round((arr.length - 1) * Math.random())];
  }

  // получаем массив случайной длины
  function createRandomLengthArray(arr) {
    var randomArr = [];
    for (var i = 0; i < arr.length; i++) {
      var randomBoolean = Math.random() >= 0.5;
      if (randomBoolean) {
        randomArr.push(arr[i]);
      }
    }
    return randomArr;
  }

  // делаем элементы формы неактивными
  function disabledForm(form, disabled, disabledClass) {
    var formElements = form.elements;

    if (disabled) {
      form.classList.add(disabledClass);
    } else {
      form.classList.remove(disabledClass);
    }
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = disabled;
    }
  }

  // экспорт
  window.util = {
    getRandomElementFromArray: getRandomElementFromArray,
    createRandomLengthArray: createRandomLengthArray,
    disabledForm: disabledForm
  };
})();
