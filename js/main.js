'use strict';

var MAP_PIN_MAIN_WIDTH = 66;
var MAP_PIN_MAIN_HEIGHT = 80;
var Y_TOP_BORDER = 130;
var Y_BOTTOM_BORDER = 630;
var X_LEFT_BORDER = 0;
var X_RIGHT_BORDER = 1200;
var PLACE_TYPE = [{house: 'bungalo', minPrice: 0}, {house: 'flat', minPrice: 1000}, {house: 'house', minPrice: 5000}, {house: 'palace', minPrice: 10000}];
var adForm = document.querySelector('.ad-form');
var fieldsetList = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var inputAddress = adForm.querySelector('#address');
var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var mapBlock = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
var inputPrice = document.querySelector('#price');
var fieldType = document.querySelector('#type');
var fieldTimeIn = document.querySelector('#timein');
var fieldTimeOut = document.querySelector('#timeout');

var makeFieldsetDisabled = function (elementList) { // функция добавления элементам из коллекции атрибута disabled
  for (var i = 0; i < elementList.length; i++) {
    elementList[i].setAttribute('disabled', 'disabled');
  }
};

var makeFieldsetAnabled = function (elementList) { // функция удаления элементам из коллекции атрибута disabled
  for (var i = 0; i < elementList.length; i++) {
    elementList[i].removeAttribute('disabled', 'disabled');
  }
};

var getAdList = function (imageNumbers, typeList) { // Функция создания массива объектов со случайными координатами, случайным типом жилья и аватарами
  var adList = [];
  var randomInteger = function (min, max) { // Функция нахождения случаного числа в диапазоне
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  for (var i = 0; i < imageNumbers.length; i++) { // цикл, в теле которого, в массив добавляются данные, количество циклов ограниченно количеством файлов с аватарами
    var locationX = randomInteger(50, 1100);
    var locationY = randomInteger(130, 630);
    var randomTypeValue = randomInteger(0, typeList.length - 1);
    adList.push({
      'author': {'avatar': 'img/avatars/user0' + imageNumbers[i] + '.png'},
      'offer': {'type': typeList[randomTypeValue].house},
      'location': {'x': locationX, 'y': locationY}
    });
  }
  return adList;
};

var adList = getAdList(avatarNumbers, PLACE_TYPE);

var renderPin = function (dataList, i) { // функция создания метки на основе шаблона и заполнения ее данными
  var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTamplate.cloneNode(true);
  pinElement.style.left = dataList[i].location.x - 25 + 'px';
  pinElement.style.top = dataList[i].location.y - 70 + 'px';
  pinElement.querySelector('img').src = dataList[i].author.avatar;
  pinElement.querySelector('img').alt = dataList[i].offer.house;
  return pinElement;
};

var getPinsFragment = function (dataList) { // функция создания фрагмента, состоящего из заполненных данными шаблонов меток
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < dataList.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
    pinsFragment.appendChild(renderPin(dataList, i));
  }
  return pinsFragment;
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

var setTime = function (evt) {
  var select = evt.target === fieldTimeIn ? fieldTimeOut : fieldTimeIn;
  select.value = evt.target.value;
};

inputAddress.setAttribute('value', (parseInt(mapPinMain.style.left, 10) + parseInt((MAP_PIN_MAIN_WIDTH / 2), 10)) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT)); // внесение координат конца метки в поле адреса

makeFieldsetDisabled(fieldsetList); // блокировка всех fieldset внутри формы ad-form

mapFilters.classList.add('ad-form--disabled'); // добавление mapFilters класса ad-form--disabled

mapPinMain.addEventListener('mousedown', function (evt) { // отслеживание нажатия кнопки мыши
  evt.preventDefault();

  if (mapBlock.classList.contains('map--faded')) { // условие ограничивающее повление случайный меток при каждом нажатии
    pinList.appendChild(getPinsFragment(adList)); // добавление созданного фрагмента в разметку
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

fieldType.addEventListener('change', function () { // изменить тип жилья
  inputPrice.min = getMinPrice(fieldType.value, PLACE_TYPE);
  inputPrice.placeholder = getMinPrice(fieldType.value, PLACE_TYPE);
});

fieldTimeIn.addEventListener('change', function (evt) { // обработчик измененения времени въезда, изменяющий время выезда
  setTime(evt);
});
fieldTimeOut.addEventListener('change', function (evt) { // обработчик измененения времени выезда, изменяющий время въезда
  setTime(evt);
});
