'use strict';

(function () {
  window.util = {
    PLACE_TYPE: [{house: 'bungalo', minPrice: 0}, {house: 'flat', minPrice: 1000}, {house: 'house', minPrice: 5000}, {house: 'palace', minPrice: 10000}],

    getErrorBlock: function () {
      var mainBlock = document.querySelector('main');
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      mainBlock.appendChild(errorTemplate.cloneNode(true));

      var errorBlock = document.querySelector('.error');
      var removeErrorBlock = function () {
        mainBlock.removeChild(errorBlock);
      };

      errorBlock.addEventListener('click', function (evt) {
        evt.preventDefault();
        removeErrorBlock();
      });

      var onEscCloseErrorBlock = function (evt) {
        if (evt.keyCode === 27) {
          removeErrorBlock();
        }
        document.removeEventListener('keydown', onEscCloseErrorBlock);
      };
      document.addEventListener('keydown', onEscCloseErrorBlock);
    }
  };
})();
