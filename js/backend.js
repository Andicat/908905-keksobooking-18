'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var serverTime = 10000;
  var statusOk = 200;

  // настройки загрузки/отправки/ошибок
  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
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

    xhr.timeout = serverTime;

    return xhr;
  }

  // загрузка данных с сервера
  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  // отправка данных на сервер
  /* function save(data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }*/

  // показ ошибки
  function showError() {
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
    showError: showError
  };
})();
