'use strict';

(function () {
  var houseTypeDictionary = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  window.cards = {
    getCardElement: function (dataObject) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var cardPhotoTamplate = document.querySelector('#card').content.querySelector('.popup__photo');
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__avatar').src = dataObject.author.avatar;
      cardElement.querySelector('.popup__title').textContent = dataObject.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = dataObject.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = dataObject.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = houseTypeDictionary[dataObject.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = dataObject.offer.rooms + ' комнаты для ' + dataObject.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObject.offer.checkin + ', выезд до ' + dataObject.offer.checkout;

      cardElement.querySelectorAll('.popup__feature').forEach(function (item) { // удаление всех пунктов списка из шаблона
        cardElement.querySelector('.popup__features').removeChild(item);
      });
      dataObject.offer.features.forEach(function (item) { // добавление необходимого количество пунктов списка на основе данных
        var popupFeature = document.createElement('li');
        popupFeature.style = 'margin-right: 3px';
        popupFeature.classList.add('popup__feature');
        popupFeature.classList.add('popup__feature--' + item);
        cardElement.querySelector('.popup__features').appendChild(popupFeature);
      });

      cardElement.querySelector('.popup__description').textContent = dataObject.offer.description;
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));

      dataObject.offer.photos.forEach(function (item) { // добавления фото на основе шаблона и данных (Не могу понять, почему добавляется только одино фото)
        var photoURL = cardPhotoTamplate.cloneNode(true);
        photoURL.src = item;
        cardElement.querySelector('.popup__photos').appendChild(photoURL);
      });

      return cardElement;
    },
    getCardsFragment: function (card) {
      var cardsFragment = document.createDocumentFragment();
      cardsFragment.appendChild(card);
      return cardsFragment;
    }
  };
})();
