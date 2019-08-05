'use strict';

(function () {
  var SUCCESS_CODE = 200;

  window.backend = {
    onLoad: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },

    upLoad: function (data, upLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          upLoad();
        } else {
          onError();
        }
      });

      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    }
  };
})();
