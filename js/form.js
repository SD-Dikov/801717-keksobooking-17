'use strict';

(function () {
  var RoomNumber = {
    ONE_ROOM: '1',
    TWO_ROOMS: '2',
    THREE_ROOMS: '3',
    HUNDRED_ROOMS: '100'
  };
  var PersonNumber = {
    ZERO_PERSON: '0',
    ONE_PERSON: '1',
    TWO_PERSONS: '2',
    THREE_PERSONS: '3'
  };

  var adForm = document.querySelector('.ad-form');
  var fieldsetList = adForm.querySelectorAll('fieldset');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');
  var fieldRoomNumber = document.querySelector('#room_number');
  var fieldCapacity = document.querySelector('#capacity');
  var capacityVariantList = fieldCapacity.querySelectorAll('option');

  var makeFieldsetDisabled = function (elementList) { // функция добавления элементам из коллекции атрибута disabled
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].setAttribute('disabled', 'disabled');
    }
  };


  var setTime = function (evt) { // функция зависимости полей времени
    var select = evt.target === fieldTimeIn ? fieldTimeOut : fieldTimeIn;
    select.value = evt.target.value;
  };

  makeFieldsetDisabled(fieldsetList); // блокировка всех fieldset внутри формы ad-form

  var getMinPrice = function (house, placeType) { // функция получения минимальной цены, в зависимости от типа жилья
    var minPrice;
    for (var i = 0; i < placeType.length; i++) {
      if (house === placeType[i].house) {
        minPrice = placeType[i].minPrice;
      }
    }
    return minPrice;
  };

  var removeDisabled = function (nodeList) {
    nodeList.forEach(function (it) {
      if (it.hasAttribute('disabled')) {
        it.removeAttribute('disabled');
      }
    });
  };

  var setPersonNumber = function () {
    fieldRoomNumber.addEventListener('change', function () {
      removeDisabled(capacityVariantList);
      switch (fieldRoomNumber.value) {
        case RoomNumber.ONE_ROOM:
          capacityVariantList.forEach(function (it) {
            if (it.value === PersonNumber.ONE_PERSON) {
              it.selected = true;
            } else {
              it.disabled = true;
            }
          });
          break;
        case RoomNumber.TWO_ROOMS:
          capacityVariantList.forEach(function (it) {
            if (it.value === PersonNumber.ONE_PERSON) {
              it.disabled = false;
            } else if (it.value === PersonNumber.TWO_PERSONS) {
              it.selected = true;
            } else {
              it.disabled = true;
            }
          });
          break;
        case RoomNumber.THREE_ROOMS:
          capacityVariantList.forEach(function (it) {
            if (it.value === PersonNumber.THREE_PERSONS) {
              it.selected = true;
            } else if (it.value === PersonNumber.ZERO_PERSON) {
              it.disabled = true;
            }
          });
          break;
        case RoomNumber.HUNDRED_ROOMS:
          capacityVariantList.forEach(function (it) {
            if (it.value === PersonNumber.ZERO_PERSON) {
              it.selected = true;
            } else {
              it.disabled = true;
            }
          });
          break;
      }
    });
  };

  fieldType.addEventListener('change', function () { // изменить тип жилья
    fieldPrice.min = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
    fieldPrice.placeholder = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
  });

  fieldTimeIn.addEventListener('change', function (evt) { // обработчик измененения времени въезда, изменяющий время выезда
    setTime(evt);
  });
  fieldTimeOut.addEventListener('change', function (evt) { // обработчик измененения времени выезда, изменяющий время въезда
    setTime(evt);
  });

  setPersonNumber();
})();
