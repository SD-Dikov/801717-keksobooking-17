'use strict';

(function () {
  var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  window.pins = {

    adList: window.getAdList(avatarNumbers, window.util.PLACE_TYPE),

    renderPin: function (dataList, i) { // функция создания метки на основе шаблона и заполнения ее данными
      var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinTamplate.cloneNode(true);
      pinElement.style.left = dataList[i].location.x - 25 + 'px';
      pinElement.style.top = dataList[i].location.y - 70 + 'px';
      pinElement.querySelector('img').src = dataList[i].author.avatar;
      pinElement.querySelector('img').alt = dataList[i].offer.house;
      return pinElement;
    },
    getPinsFragment: function (dataList) { // функция создания фрагмента, состоящего из заполненных данными шаблонов меток
      var pinsFragment = document.createDocumentFragment();
      for (var i = 0; i < dataList.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
        pinsFragment.appendChild(window.pins.renderPin(dataList, i));
      }
      return pinsFragment;
    }
  };
})();
