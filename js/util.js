'use strict';

(function () {
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
    disableForm: disableForm
  };
})();
