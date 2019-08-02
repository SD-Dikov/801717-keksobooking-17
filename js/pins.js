'use strict';

(function () {
  var PinSize = {
    X: 50,
    Y: 70
  };
  var PriceLimits = {
    TEN_THOUSAND: 10000,
    FIFTY_THOUSAND: 50000
  };
  var PINS_QUANTITY = 5;
  var housingTypeFilter = document.querySelector('#housing-type');
  var housingPriceFilter = document.querySelector('#housing-price');
  var housingRoomsFilter = document.querySelector('#housing-rooms');
  var housingGuestsFilter = document.querySelector('#housing-guests');
  var housingFeaturesFilter = document.querySelector('#housing-features');
  var defaultFilterValue = 'any';

  window.pins = {

    getPinList: function (dataList) { // функция создания метки на основе шаблона и заполнения ее данными
      var checkedFeaturesList = housingFeaturesFilter.querySelectorAll('input:checked');
      var numberedDataList = dataList;
      var filteredDataList = numberedDataList;

      var filterFeatures = function (filterName) {
        filteredDataList = filteredDataList.filter(function (item) {
          return item.offer.features.includes(filterName.value);
        });
        return filteredDataList;
      };

      dataList.forEach(function (item, i) {
        numberedDataList[i].dataListIndex = i;
      });

      if (housingTypeFilter.value !== defaultFilterValue) {
        filteredDataList = numberedDataList.filter(function (item) {
          return item.offer.type === housingTypeFilter.value;
        });
      }
      if (housingPriceFilter.value !== defaultFilterValue) {
        filteredDataList = filteredDataList.filter(function (item) {
          var filteredElements;
          switch (housingPriceFilter.value) {
            case 'low':
              filteredElements = item.offer.price < PriceLimits.TEN_THOUSAND;
              break;
            case 'middle':
              filteredElements = item.offer.price >= PriceLimits.TEN_THOUSAND && item.offer.price <= PriceLimits.FIFTY_THOUSAND;
              break;
            case 'high':
              filteredElements = item.offer.price > PriceLimits.FIFTY_THOUSAND;
              break;
            default:
              filteredElements = item;
          }
          return filteredElements;
        });
      }
      if (housingRoomsFilter.value !== defaultFilterValue) {
        filteredDataList = filteredDataList.filter(function (item) {
          return item.offer.rooms === parseInt(housingRoomsFilter.value, 10);
        });
      }
      if (housingGuestsFilter.value !== defaultFilterValue) {
        filteredDataList = filteredDataList.filter(function (item) {
          return item.offer.guests === parseInt(housingGuestsFilter.value, 10);
        });
      }
      if (checkedFeaturesList.length > 0) {
        checkedFeaturesList.forEach(function (item) {
          filterFeatures(item);
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
        pinsOnMap = pinsList.slice(0, PINS_QUANTITY);
      }
      for (var i = 0; i < pinsOnMap.length; i++) { // цикл, на каждой итерации которого, вызывается функция создания метки на основе шаблона и заполнения ее данными, количество циклов ограниченно длиной массива с данными
        pinsFragment.appendChild(pinsOnMap[i]);
      }
      return pinsFragment;
    }
  };
})();
