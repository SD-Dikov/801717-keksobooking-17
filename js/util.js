'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    PLACE_TYPE: [{house: 'bungalo', minPrice: 0}, {house: 'flat', minPrice: 1000}, {house: 'house', minPrice: 5000}, {house: 'palace', minPrice: 10000}],

    isEscEvent: function (evt, action) {
      evt.preventDefault();
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
  };
})();
