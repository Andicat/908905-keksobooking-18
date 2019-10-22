'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  function loadPhoto(evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target === avatarFileChooser) {
          avatarPreview.src = reader.result;
        }
        if (evt.target === photoFileChooser) {
          photoPreview.style.backgroundImage = 'url(' + reader.result + ')';
          photoPreview.style.backgroundRepeat = 'no-repeat';
          photoPreview.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  }

  avatarFileChooser.addEventListener('change', loadPhoto);
  photoFileChooser.addEventListener('change', loadPhoto);
})();
