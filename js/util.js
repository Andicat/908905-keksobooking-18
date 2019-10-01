'use strict';

(function () {
  window.util = {
    // получаем случайный элемент из массива
    getRandomElementFromArray: function (arr) {
      return arr[Math.round((arr.length - 1) * Math.random())];
    },

    // получаем массив случайной длины
    createRandomLengthArray: function (arr) {
      var randomArr = [];
      for (var i = 0; i < arr.length; i++) {
        var randomBoolean = Math.random() >= 0.5;
        if (randomBoolean) {
          randomArr.push(arr[i]);
        }
      }
      return randomArr;
    },

    // делаем элементы формы неактивными
    disabledForm: function (form, disabled, disabledClass) {
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
  };
})();
