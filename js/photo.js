'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoPreviewTemplate = document.querySelector('.ad-form__photo');

  function loadImage(file, target) {
    var reader = new FileReader(file);

    reader.addEventListener('load', function () {
      if (target === avatarFileChooser) {
        avatarPreview.src = reader.result;
      }
      if (target === photoFileChooser) {
        var photoPreview = photoPreviewTemplate.cloneNode(true);

        photoPreview.style.backgroundImage = 'url(' + reader.result + ')';
        photoPreview.style.backgroundRepeat = 'no-repeat';
        photoPreview.style.backgroundSize = 'cover';

        photoContainer.appendChild(photoPreview);
      }
    });

    reader.readAsDataURL(file);
  }

  function deletePhotos(target) {
    if (target === photoFileChooser) {
      var photos = photoContainer.querySelectorAll('.ad-form__photo');

      photos.forEach(function (it) {
        photoContainer.removeChild(it);
      });
    }
  }

  function loadPhotos(evt) {
    var fileChooser = evt.target;
    var files = fileChooser.files;

    for (var i = 0; i < files.length; i++) {
      var fileName = files[i].name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        deletePhotos(evt.target);
        loadImage(files[i], evt.target);
      }
    }
  }

  photoFileChooser.setAttribute('multiple', 'multiple');

  avatarFileChooser.addEventListener('change', loadPhotos);
  photoFileChooser.addEventListener('change', loadPhotos);
})();
