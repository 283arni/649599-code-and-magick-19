'use strict';

(function () {

  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad();
      } else {
        onError(xhr.status);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };

})();
