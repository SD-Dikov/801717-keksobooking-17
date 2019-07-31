'use strict';

(function () {
  window.util = {
    PLACE_TYPE: [{house: 'bungalo', minPrice: 0}, {house: 'flat', minPrice: 1000}, {house: 'house', minPrice: 5000}, {house: 'palace', minPrice: 10000}],
    getErrorBlock: function () {
      var mainBlock = document.querySelector('main');
      var errorTamplate = document.querySelector('#error').content.querySelector('.error');
      mainBlock.appendChild(errorTamplate.cloneNode(true));

      var errorBlock = document.querySelector('.error');
      var removeErrorBlock = function () {
        mainBlock.removeChild(errorBlock);
      };

      errorBlock.addEventListener('click', function (evt) {
        evt.preventDefault();
        removeErrorBlock();
      });

      var onEscCloseErrorBlock = function (evt) {
        window.util.isEscEvent(evt, removeErrorBlock);
        document.removeEventListener('keydown', onEscCloseErrorBlock);
      };
      document.addEventListener('keydown', onEscCloseErrorBlock);
    }
  };
})();
