'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = adForm.querySelectorAll('fieldset');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');
  var inputCapacityOptionList = inputCapacity.querySelectorAll('option');

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

  var removeDisabled = function (node) {
    if (node.hasAttribute('disabled')) {
      node.removeAttribute('disabled');
    }
  };

  fieldType.addEventListener('change', function () { // изменить тип жилья
    inputPrice.min = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
    inputPrice.placeholder = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
  });

  fieldTimeIn.addEventListener('change', function (evt) { // обработчик измененения времени въезда, изменяющий время выезда
    setTime(evt);
  });
  fieldTimeOut.addEventListener('change', function (evt) { // обработчик измененения времени выезда, изменяющий время въезда
    setTime(evt);
  });

  inputRoomNumber.addEventListener('change', function () {
    if (inputRoomNumber.value === '1') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '1') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    } else if (inputRoomNumber.value === '2') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '1') {
          removeDisabled(it);
        } else if (it.value === '2') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    } else if (inputRoomNumber.value === '3') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '1') {
          removeDisabled(it);
        } else if (it.value === '2') {
          removeDisabled(it);
        } else if (it.value === '3') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    } else if (inputRoomNumber.value === '100') {
      inputCapacityOptionList.forEach(function (it) {
        if (it.value === '0') {
          removeDisabled(it);
          it.selected = true;
        } else {
          it.disabled = true;
        }
      });
    }
  });
})();
