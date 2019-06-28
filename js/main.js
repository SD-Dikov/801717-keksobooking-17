'use strict';

var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var placeType = ['palace', 'flat', 'house', 'bungalo'];
var mapBlock = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
// Функция создания массива объектов со случайными координатами, случайным типом жилья и аватарами
var getAdList = function (imageNumbers, typeList) {
  var adList = [];
  // Функция нахождения случаного числа в диапазоне
  var randomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  // цикл, в теле которого, в массив добавляются данные, количество циклов ограниченно количеством файлов с аватарами
  for (var i = 0; i < imageNumbers.length; i++) {
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
// функция создания метки на основе шаблона и заполнения ее данными
var renderPin = function (dataList, i) {
  var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTamplate.cloneNode(true);
  pinElement.style.left = dataList[i].location.x - 25 + 'px';
  pinElement.style.top = dataList[i].location.y - 70 + 'px';
  pinElement.querySelector('img').src = dataList[i].author.avatar;
  pinElement.querySelector('img').alt = dataList[i].offer.type;

  return pinElement;
};
// функция создания фрагмента, состоящего из заполненных данными шаблонов меток
var getPinsFragment = function (dataList) {
  var pinsFragment = document.createDocumentFragment();
  // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
  for (var i = 0; i < dataList.length; i++) {
    pinsFragment.appendChild(renderPin(dataList, i));
  }
  return pinsFragment;
};

mapBlock.classList.remove('map--faded');
// добавление созданного фрагмента в разметку
pinList.appendChild(getPinsFragment(adList));
