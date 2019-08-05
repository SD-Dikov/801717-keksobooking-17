'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FIRST_INDEX = 0;

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housingPhotoFileChooser = document.querySelector('#images');
  var housingPhotoPreview = document.querySelector('.ad-form__photo');

  var getMatches = function (loadFile) {
    var loadFileName = loadFile.name.toLowerCase();
    return FILE_TYPES.some(function (item) {
      return loadFileName.endsWith(item);
    });
  };

  var getHousingPhoto = function (readerResult) {
    var housingPhoto = document.createElement('img');
    housingPhoto.alt = 'Фотография жилья';
    housingPhoto.width = 45;
    housingPhoto.height = 40;
    housingPhoto.src = readerResult;
    housingPhotoPreview.appendChild(housingPhoto);
  };

  var getAvatarUrl = function (readerResult) {
    avatarPreview.src = readerResult;
  };

  var photoOnLoad = function (onLoad, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function functionName() {
      onLoad(reader.result);
    });

    reader.readAsDataURL(file);
  };

  avatarFileChooser.addEventListener('change', function () {
    var avatarFile = avatarFileChooser.files[FIRST_INDEX];

    if (getMatches(avatarFile)) {
      photoOnLoad(getAvatarUrl, avatarFile);
    }
  });

  housingPhotoFileChooser.addEventListener('change', function () {
    for (var i = 0; i < housingPhotoFileChooser.files.length; i++) {
      if (getMatches(housingPhotoFileChooser.files[i])) {
        photoOnLoad(getHousingPhoto, housingPhotoFileChooser.files[i]);
      }
    }
  });
})();
