'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var serverTime = 10000;
  var statusOk = 200;

  var mainContainer = document.querySelector('main');

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
  function save(data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }

  // ошибка :(
  function showError() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    var errorText = errorMessage.querySelector('.error__message');
    var errorCloseButton = errorMessage.querySelector('.error__button');

    errorText.textContent = 'Произошла ошибка';
    mainContainer.appendChild(errorMessage);

    errorCloseButton.addEventListener('click', function () {
      mainContainer.removeChild(errorMessage);
    });

    errorMessage.addEventListener('click', function () {
      mainContainer.removeChild(errorMessage);
    });
  }

  // успешная отправка
  function showSuccess() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    var successText = successMessage.querySelector('.success__message');

    successText.textContent = 'Данные успешно отправлены';
    mainContainer.appendChild(successMessage);

    successMessage.addEventListener('click', function () {
      mainContainer.removeChild(successMessage);
    });
  }

  // экспорт
  window.backend = {
    load: load,
    save: save,
    showError: showError,
    showSuccess: showSuccess
  };
})();
