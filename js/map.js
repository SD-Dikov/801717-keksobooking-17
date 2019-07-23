'use strict';
(function () {
  var MAP_PIN_MAIN_WIDTH = 66;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var Y_TOP_BORDER = 130;
  var Y_BOTTOM_BORDER = 630;
  var X_LEFT_BORDER = 0;
  var X_RIGHT_BORDER = 1200;
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var inputAddress = document.querySelector('#address');
  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetList = document.querySelectorAll('fieldset');
  var pinList = document.querySelector('.map__pins');

  var renderPins = function (data) {
    pinList.appendChild(window.pins.getPinsFragment(window.pins.getPinList(data)));
  };

  var getErrorBlock = function () {
    var mainBlock = document.querySelector('main');
    var errorTamplate = document.querySelector('#error').content.querySelector('.error__message');
    var errorBlock = errorTamplate.cloneNode(true);
    mainBlock.appendChild(errorBlock);
  };

  var makeFieldsetAnabled = function (elementList) { // функция удаления элементам из коллекции атрибута disabled
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].removeAttribute('disabled', 'disabled');
    }
  };


  inputAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT)); // внесение координат конца метки в поле адреса


  mapFilters.classList.add('ad-form--disabled'); // добавление mapFilters класса ad-form--disabled

  mapPinMain.addEventListener('mousedown', function (evt) { // отслеживание нажатия кнопки мыши
    evt.preventDefault();

    if (mapBlock.classList.contains('map--faded')) { // условие ограничивающее повление меток при каждом нажатии
      window.load(renderPins, getErrorBlock); // добавление созданного фрагмента в разметку
    }

    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
    makeFieldsetAnabled(fieldsetList);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) { // отслеживание премещения мыши
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
      if (parseInt(mapPinMain.style.top, 10) <= (Y_TOP_BORDER - MAP_PIN_MAIN_HEIGHT)) { // условие ограничивающее поле перемещения
        mapPinMain.style.top = (Y_TOP_BORDER - MAP_PIN_MAIN_HEIGHT) + 'px';
      } else if (parseInt(mapPinMain.style.top, 10) >= Y_BOTTOM_BORDER) {
        mapPinMain.style.top = Y_BOTTOM_BORDER + 'px';
      }
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      if (parseInt(mapPinMain.style.left, 10) <= (X_LEFT_BORDER - (MAP_PIN_MAIN_WIDTH / 2))) { // условие ограничивающее поле перемещения
        mapPinMain.style.left = (X_LEFT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) + 'px';
      } else if (parseInt(mapPinMain.style.left, 10) >= X_RIGHT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) {
        mapPinMain.style.left = (X_RIGHT_BORDER - (MAP_PIN_MAIN_WIDTH / 2)) + 'px';
      }

      inputAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT)); // внесение координат конца метки в поле адреса
    };
    var onMouseUp = function (upEvt) { // отслеживание отпускания кнопки мыши
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
