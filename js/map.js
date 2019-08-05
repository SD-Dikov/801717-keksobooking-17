'use strict';
(function () {
  var MAP_PIN_MAIN_WIDTH = 66;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var Y_TOP_BORDER = 130;
  var Y_BOTTOM_BORDER = 630;
  var X_LEFT_BORDER = 0;
  var X_RIGHT_BORDER = 1200;
  var DEBOUNCE_INTERVAL = 500;
  var dataList = [];
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var fieldAddress = document.querySelector('#address');
  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = document.querySelectorAll('fieldset');
  var pinList = document.querySelector('.map__pins');
  var housingFeaturesFilter = document.querySelector('#housing-features');
  var lastTimeout;

  var renderPins = function (data) {
    pinList.appendChild(window.pins.getPinsFragment(window.pins.getPinList(data)));
  };

  var renderCard = function (data, index) {
    mapBlock.insertBefore(window.cards.getCardsFragment(window.cards.getCardElement(data[index])), document.querySelector('.map__filters-container'));
  };

  var makeFieldsetEnabled = function (elementsList) {
    for (var i = 0; i < elementsList.length; i++) {
      elementsList[i].removeAttribute('disabled', 'disabled');
    }
  };

  var openPopup = function () {
    mapBlock.addEventListener('click', function (evt) {
      var target = evt.target;
      while (!target.classList.contains('map')) {
        if (target.classList.contains('popup__close')) {
          closePopup();
          break;
        }
        if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
          closePopup();
          renderCard(dataList, target.name);
          target.classList.add('map__pin--active');
          document.addEventListener('keydown', onEscClosePopup);
          break;
        }
        target = target.parentNode;
      }
    });
  };

  var closePopup = function () {
    if (document.querySelector('.map__card')) {
      mapBlock.removeChild(document.querySelector('.map__card'));
      var pinsOnMap = document.querySelectorAll('.map__pin');
      pinsOnMap.forEach(function (item) {
        if (item.classList.contains('map__pin--active')) {
          item.classList.remove('map__pin--active');
        }
      });
    }
  };

  var onEscClosePopup = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      closePopup();
    }
    document.removeEventListener('keydown', onEscClosePopup);
  };

  var onSuccess = function (data) {
    renderPins(data);
    dataList = data;
    openPopup();
  };

  var debounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };

  var onChangeFilter = function () {
    debounce(function () {
      closePopup();
      var delPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < delPins.length; i++) {
        pinList.removeChild(delPins[i]);
      }
      renderPins(dataList);
    });
  };

  mapFilters.addEventListener('change', onChangeFilter);
  housingFeaturesFilter.addEventListener('change', onChangeFilter);

  fieldAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));

  mapFilters.classList.add('ad-form--disabled');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (mapBlock.classList.contains('map--faded')) {
      window.backend.onLoad(onSuccess, window.util.getErrorBlock);
    }

    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    makeFieldsetEnabled(fieldsetList);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      if (parseInt(mapPinMain.style.top, 10) <= (Y_TOP_BORDER - MAP_PIN_MAIN_HEIGHT)) {
        mapPinMain.style.top = (Y_TOP_BORDER - MAP_PIN_MAIN_HEIGHT) + 'px';
      } else if (parseInt(mapPinMain.style.top, 10) >= Y_BOTTOM_BORDER) {
        mapPinMain.style.top = Y_BOTTOM_BORDER + 'px';
      }
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      if (parseInt(mapPinMain.style.left, 10) <= (X_LEFT_BORDER - (MAP_PIN_MAIN_WIDTH / 2))) {
        mapPinMain.style.left = (X_LEFT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) + 'px';
      } else if (parseInt(mapPinMain.style.left, 10) >= X_RIGHT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) {
        mapPinMain.style.left = (X_RIGHT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) + 'px';
      }

      fieldAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
