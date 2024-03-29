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

  var MAP_PIN_MAIN_WIDTH = 66;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = adForm.querySelectorAll('fieldset');
  var fieldsetSubmit = adForm.querySelector('.ad-form__element--submit');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');
  var fieldRoomNumber = document.querySelector('#room_number');
  var fieldCapacity = document.querySelector('#capacity');
  var capacityVariantList = fieldCapacity.querySelectorAll('option');
  var mapFilters = document.querySelector('.map__filters');
  var mapBlock = document.querySelector('.map');
  var pinList = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainDefaultX = mapPinMain.style.left;
  var mapPinMainDefaultY = mapPinMain.style.top;
  var fieldAddress = document.querySelector('#address');
  var resetButton = document.querySelector('.ad-form__reset');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housingPhotoPreview = document.querySelector('.ad-form__photo');

  var makeFieldsetDisabled = function (elementList) {
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].setAttribute('disabled', 'disabled');
    }
  };

  var setTime = function (evt) {
    var select = evt.target === fieldTimeIn ? fieldTimeOut : fieldTimeIn;
    select.value = evt.target.value;
  };

  var getSuccessBlock = function () {
    var mainBlock = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    mainBlock.appendChild(successTemplate.cloneNode(true));

    var successBlock = document.querySelector('.success');
    var removeSuccessBlock = function () {
      mainBlock.removeChild(successBlock);
    };

    successBlock.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeSuccessBlock();
      document.removeEventListener('keydown', onEscCloseSuccessBlock);
    });

    var onEscCloseSuccessBlock = function (evt) {
      if (evt.keyCode === 27) {
        removeSuccessBlock();
      }
      document.removeEventListener('keydown', onEscCloseSuccessBlock);
    };
    document.addEventListener('keydown', onEscCloseSuccessBlock);
  };

  var onSuccess = function () {
    getDefaultView();
    getSuccessBlock();
  };

  var onError = function () {
    window.util.getErrorBlock();
    fieldsetSubmit.disabled = false;
  };

  var getMinPrice = function (house, placeTypes) {
    var minPrice;
    for (var i = 0; i < placeTypes.length; i++) {
      if (house === placeTypes[i].house) {
        minPrice = placeTypes[i].minPrice;
      }
    }
    return minPrice;
  };

  var removeDisabled = function (nodeList) {
    nodeList.forEach(function (item) {
      if (item.hasAttribute('disabled')) {
        item.removeAttribute('disabled');
      }
    });
  };

  var getDefaultView = function () {
    var housingPhotos = housingPhotoPreview.querySelectorAll('img');
    for (var l = 0; l < housingPhotos.length; l++) {
      housingPhotoPreview.removeChild(housingPhotos[l]);
    }

    adForm.reset();
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
    avatarPreview.src = DEFAULT_AVATAR;

    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].disabled = true;
    }

    var mapBlockChildrens = mapBlock.children;
    for (var k = 0; k < mapBlockChildrens.length; k++) {
      if (mapBlockChildrens[k].classList.contains('map__card')) {
        mapBlock.removeChild(document.querySelector('.map__card'));
      }
    }
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPins.length; j++) {
      pinList.removeChild(mapPins[j]);
    }
    mapPinMain.style.left = mapPinMainDefaultX;
    mapPinMain.style.top = mapPinMainDefaultY;
    fieldAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));
  };

  var setPersonNumber = function () {
    fieldRoomNumber.addEventListener('change', function () {
      removeDisabled(capacityVariantList);
      switch (fieldRoomNumber.value) {
        case RoomNumber.ONE_ROOM:
          capacityVariantList.forEach(function (item) {
            if (item.value === PersonNumber.ONE_PERSON) {
              item.selected = true;
            } else {
              item.disabled = true;
            }
          });
          break;
        case RoomNumber.TWO_ROOMS:
          capacityVariantList.forEach(function (item) {
            if (item.value === PersonNumber.ONE_PERSON) {
              item.disabled = false;
            } else if (item.value === PersonNumber.TWO_PERSONS) {
              item.selected = true;
            } else {
              item.disabled = true;
            }
          });
          break;
        case RoomNumber.THREE_ROOMS:
          capacityVariantList.forEach(function (item) {
            if (item.value === PersonNumber.THREE_PERSONS) {
              item.selected = true;
            } else if (item.value === PersonNumber.ZERO_PERSON) {
              item.disabled = true;
            }
          });
          break;
        case RoomNumber.HUNDRED_ROOMS:
          capacityVariantList.forEach(function (item) {
            if (item.value === PersonNumber.ZERO_PERSON) {
              item.selected = true;
            } else {
              item.disabled = true;
            }
          });
          break;
      }
    });
  };

  makeFieldsetDisabled(fieldsetList);

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    getDefaultView();
  });

  fieldType.addEventListener('change', function () {
    fieldPrice.min = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
    fieldPrice.placeholder = getMinPrice(fieldType.value, window.util.PLACE_TYPE);
  });

  fieldTimeIn.addEventListener('change', function (evt) {
    setTime(evt);
  });
  fieldTimeOut.addEventListener('change', function (evt) {
    setTime(evt);
  });

  setPersonNumber();

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upLoad(new FormData(adForm), onSuccess, onError);
    fieldsetSubmit.disabled = true;
  });
})();
