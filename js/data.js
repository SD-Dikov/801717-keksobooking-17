'use strict';

(function () {
  window.getAdList = function (imageNumbers, typeList) { // Функция создания массива объектов со случайными координатами, случайным типом жилья и аватарами
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
})();
