'use strict';

(function () {
  var PinSize = {
    X: 50,
    Y: 70
  };
  var PINS_QUANTITY = 5;
  var housingTypeFilter = document.querySelector('#housing-type');

  window.pins = {

    getPinList: function (dataList) { // функция создания метки на основе шаблона и заполнения ее данными
      if (housingTypeFilter.value !== 'any') {
        dataList = dataList.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      }
      var pinElements = [];
      for (var i = 0; i < dataList.length; i++) {
        var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pinElement = pinTamplate.cloneNode(true);
        pinElement.style.left = dataList[i].location.x - (PinSize.X / 2) + 'px';
        pinElement.style.top = dataList[i].location.y - PinSize.Y + 'px';
        pinElement.querySelector('img').src = dataList[i].author.avatar;
        pinElement.querySelector('img').alt = dataList[i].offer.title;
        pinElements.push(pinElement);
      }
      return pinElements;
    },
    getPinsFragment: function (pinsList) { // функция создания фрагмента, состоящего из заполненных данными шаблонов меток
      var pinsFragment = document.createDocumentFragment();
      var fivePins;
      if (pinsList.length < PINS_QUANTITY) {
        fivePins = pinsList.slice();
      } else {
        fivePins = pinsList.slice(5);
      }
      for (var i = 0; i < fivePins.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
        pinsFragment.appendChild(fivePins[i]);
      }
      return pinsFragment;
    }
  };
})();
