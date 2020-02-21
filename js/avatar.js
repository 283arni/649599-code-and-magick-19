'use strict';

(function () {
  var FILE_FORMATS = ['gif', 'png', 'jpg', 'jpeg'];

  var fileBox = document.querySelector('input[type=file]');
  var avatar = document.querySelector('.setup-user-pic');

  fileBox.addEventListener('change', function () {
    var file = fileBox.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_FORMATS.some(function (item) {
        return fileName.endsWith(item);
      });
    }

    if (matches) {
      var readerImage = new FileReader();

      readerImage.addEventListener('load', function () {
        avatar.src = readerImage.result;
      });

      readerImage.readAsDataURL(file);
    }
  });
})();
