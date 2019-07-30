'use strict';

(function () {
  var MAP_PIN_MAIN_WIDTH = 66;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = adForm.querySelectorAll('fieldset');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');
  var inputCapacityOptionList = inputCapacity.querySelectorAll('option');
  var mapFilters = document.querySelector('.map__filters');
  var mapBlock = document.querySelector('.map');
  var pinList = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainDefaultX = mapPinMain.style.left;
  var mapPinMainDefaultY = mapPinMain.style.top;
  var inputAddress = document.querySelector('#address');
  var resetButton = document.querySelector('.ad-form__reset');

  var makeFieldsetDisabled = function (elementList) { // функция добавления элементам из коллекции атрибута disabled
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].setAttribute('disabled', 'disabled');
    }
  };

  var setTime = function (evt) { // функция зависимости полей времени
    var select = evt.target === fieldTimeIn ? fieldTimeOut : fieldTimeIn;
    select.value = evt.target.value;
  };


  var getSuccessBlock = function () {
    var mainBlock = document.querySelector('main');
    var successTamplate = document.querySelector('#success').content.querySelector('.success');
    mainBlock.appendChild(successTamplate.cloneNode(true));

    var successBlock = document.querySelector('.success');
    var removeSuccessBlock = function () {
      mainBlock.removeChild(successBlock);
    };

    successBlock.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeSuccessBlock();
    });

    var onEscCloseSuccessBlock = function (evt) {
      window.util.isEscEvent(evt, removeSuccessBlock);
      document.removeEventListener('keydown', onEscCloseSuccessBlock);
    };
    document.addEventListener('keydown', onEscCloseSuccessBlock); // Не могу понять, почему не срабатывает ESC
  };

  var onSuccess = function () {
    getDefaultView();
    getSuccessBlock();
  };


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

  var getDefaultView = function () {
    adForm.reset();
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].disabled = true;
    }
    var mapBlockChildren = mapBlock.children;
    for (var k = 0; k < mapBlockChildren.length; k++) {
      if (mapBlockChildren[k].classList.contains('map__card')) {
        mapBlock.removeChild(document.querySelector('.map__card'));
      }
    }
    var mapPins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < mapPins.length; j++) {
      if (!mapPins[j].classList.contains('map__pin--main')) {
        pinList.removeChild(mapPins[j]);
      }
    }
    mapPinMain.style.left = mapPinMainDefaultX;
    mapPinMain.style.top = mapPinMainDefaultY;
    inputAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));
  };

  makeFieldsetDisabled(fieldsetList); // блокировка всех fieldset внутри формы ad-form

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    getDefaultView();
  });

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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upLoad(new FormData(adForm), onSuccess, window.util.getErrorBlock);
  });

})();
