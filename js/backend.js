'use strict';

(function () {
  function load(onLoad) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  }

  function onError() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    var errorText = errorMessage.querySelector('.error__message');
    var errorCloseButton = errorMessage.querySelector('.error__button');

    errorText.textContent = 'Произошла ошибка при загрузке';
    document.querySelector('main').appendChild(errorMessage);

    errorCloseButton.addEventListener('click', function () {
      document.querySelector('main').removeChild(errorMessage);
    });
  }

  // экспорт
  window.backend = {
    load: load,
    onError: onError
  };
})();
