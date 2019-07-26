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
      var filteredDataList;
      if (housingTypeFilter.value !== 'any') {
        filteredDataList = dataList.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      } else {
        filteredDataList = dataList;
      }
      var pinElements = [];
      for (var i = 0; i < filteredDataList.length; i++) {
        var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pinElement = pinTamplate.cloneNode(true);
        pinElement.style.left = filteredDataList[i].location.x - (PinSize.X / 2) + 'px';
        pinElement.style.top = filteredDataList[i].location.y - PinSize.Y + 'px';
        pinElement.querySelector('img').src = filteredDataList[i].author.avatar;
        pinElement.querySelector('img').alt = filteredDataList[i].offer.title;
        pinElements.push(pinElement);
      }
      return pinElements;
    },
    getPinsFragment: function (pinsList) { // функция создания фрагмента, состоящего из заполненных данными шаблонов меток
      var pinsFragment = document.createDocumentFragment();
      var pinsOnMap;
      if (pinsList.length < PINS_QUANTITY) {
        pinsOnMap = pinsList.slice();
      } else {
        pinsOnMap = pinsList.slice(PINS_QUANTITY);
      }
      for (var i = 0; i < pinsOnMap.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
        pinsFragment.appendChild(pinsOnMap[i]);
      }
      return pinsFragment;
    }
  };
})();
