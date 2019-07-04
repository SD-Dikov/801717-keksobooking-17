'use strict';

var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 82;
var adForm = document.querySelector('.ad-form');
var fieldsetList = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var mapPinMainX = parseInt(mapPinMain.style.left, 10) + (MAP_PIN_MAIN_WIDTH / 2);
var mapPinMainY = parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT;
var inputAddress = adForm.querySelector('#address');
var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var placeType = ['palace', 'flat', 'house', 'bungalo'];
var mapBlock = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');

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
      'offer': {'type': typeList[randomTypeValue]},
      'location': {'x': locationX, 'y': locationY}
    });
  }
  return adList;
};

var adList = getAdList(avatarNumbers, placeType);
var renderPin = function (dataList, i) { // функция создания метки на основе шаблона и заполнения ее данными
  var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTamplate.cloneNode(true);
  pinElement.style.left = dataList[i].location.x + 25 + 'px';
  pinElement.style.top = dataList[i].location.y + 70 + 'px';
  pinElement.querySelector('img').src = dataList[i].author.avatar;
  pinElement.querySelector('img').alt = dataList[i].offer.type;

  return pinElement;
};

var getPinsFragment = function (dataList) { // функция создания фрагмента, состоящего из заполненных данными шаблонов меток
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < dataList.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
    pinsFragment.appendChild(renderPin(dataList, i));
  }
  return pinsFragment;
};

inputAddress.setAttribute('value', mapPinMainX + ',' + mapPinMainY); // внесение координат конца метки в поле адреса

makeFieldsetDisabled(fieldsetList); // блокировка всех fieldset внутри формы ad-form

mapFilters.classList.add('ad-form--disabled'); // добавление mapFilters класса ad-form--disabled

mapPinMain.addEventListener('click', function () { // перевод страницы в активное состояние по клику
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');
  makeFieldsetAnabled(fieldsetList);
  pinList.appendChild(getPinsFragment(adList)); // добавление созданного фрагмента в разметку
});
