'use strict';

(function () {
  var PinSize = {
    X: 50,
    Y: 70
  };
  var PINS_QUANTITY = 5;
  var housingTypeFilter = document.querySelector('#housing-type');
  var housingPriceFilter = document.querySelector('#housing-price');
  var housingRoomsFilter = document.querySelector('#housing-rooms');
  var housingGuestsFilter = document.querySelector('#housing-guests');


  window.pins = {

    getPinList: function (dataList) { // функция создания метки на основе шаблона и заполнения ее данными
      var numberedDataList = dataList;
      dataList.forEach(function (it, i) {
        numberedDataList[i].dataListIndex = i;
      });
      var filteredDataList;
      if (housingTypeFilter.value !== 'any') {
        filteredDataList = numberedDataList.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      } else {
        filteredDataList = numberedDataList;
      }
      if (housingPriceFilter.value !== 'any') {
        filteredDataList = filteredDataList.filter(function (it) {
          var filteredElements;
          switch (housingPriceFilter.value) {
            case 'low':
              filteredElements = it.offer.price < 10000;
              break;
            case 'middle':
              filteredElements = it.offer.price > 10000 && it.offer.price < 50000;
              break;
            case 'high':
              filteredElements = it.offer.price > 50000;
              break;
            default:
              filteredElements = it;
          }
          return filteredElements;
        });
      }
      if (housingRoomsFilter.value !== 'any') {
        filteredDataList = filteredDataList.filter(function (it) {
          return it.offer.rooms === parseInt(housingRoomsFilter.value, 10);
        });
      }
      if (housingGuestsFilter.value !== 'any') {
        filteredDataList = filteredDataList.filter(function (it) {
          return it.offer.guests === parseInt(housingGuestsFilter.value, 10);
        });
      }
      var pinElements = [];
      for (var i = 0; i < filteredDataList.length; i++) {
        var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pinElement = pinTamplate.cloneNode(true);
        pinElement.style.left = filteredDataList[i].location.x - (PinSize.X / 2) + 'px';
        pinElement.style.top = filteredDataList[i].location.y - PinSize.Y + 'px';
        pinElement.name = filteredDataList[i].dataListIndex;
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
