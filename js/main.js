'use strict';

var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var placeType = ['palace', 'flat', 'house', 'bungalo'];
var mapBlock = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');

var getAdList = function (avatarNumbers, placeType) {
  var adList = [];
  var randomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  for (var i = 0; i < avatarNumbers.length; i++) {
    var locationX = randomInteger(50, 1100);
    var locationY = randomInteger(130, 630);
    var randomTypeValue = randomInteger(0, placeType.length - 1);
    adList.push({
      'author': {'avatar': 'img/avatars/user0' + avatarNumbers[i] + '.png'},
      'offer': {'type': placeType[randomTypeValue]},
      'location': {'x': locationX, 'y': locationY}
    });
  }
  return adList;
};

var adList = getAdList(avatarNumbers, placeType);

var renderPin = function (adList, i) {
  var pinTamplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTamplate.cloneNode(true);
  pinElement.style.left = adList[i].location.x - 25 + 'px';
  pinElement.style.top = adList[i].location.y - 70 + 'px';
  pinElement.querySelector('img').src = adList[i].author.avatar;
  pinElement.querySelector('img').alt = adList[i].offer.type;

  return pinElement;
};
var getPinsFragment = function (adList) {
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < adList.length; i++) {
    pinsFragment.appendChild(renderPin(adList, i));
  }
  return pinsFragment;
};

mapBlock.classList.remove('map--faded');

pinList.appendChild(getPinsFragment(adList));
