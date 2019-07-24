'use strict';

(function () {
  var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  window.pins = {

    adList: window.getAdList(avatarNumbers, window.util.PLACE_TYPE),

    getPinList: function (dataList) { // функция создания метки на основе шаблона и заполнения ее данными
      var pinElements = [];
      for (var i = 0; i < dataList.length; i++) {
        var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pinElement = pinTamplate.cloneNode(true);
        pinElement.style.left = dataList[i].location.x - 25 + 'px';
        pinElement.style.top = dataList[i].location.y - 70 + 'px';
        pinElement.querySelector('img').src = dataList[i].author.avatar;
        pinElement.querySelector('img').alt = dataList[i].offer.house;
        pinElements.push(pinElement);
      }
      return pinElements;
    },
    getPinsFragment: function (pinsList) { // функция создания фрагмента, состоящего из заполненных данными шаблонов меток
      var pinsFragment = document.createDocumentFragment();
      for (var i = 0; i < pinsList.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
        pinsFragment.appendChild(pinsList[i]);
      }
      return pinsFragment;
    }
  };
})();
