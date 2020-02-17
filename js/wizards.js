'use strict';

(function () {

  var QUANTITY_WIZARD = 4;

  var template = document.querySelector('#similar-wizard-template').content;
  var listWizards = document.querySelector('.setup-similar-list');

  var renderWisards = function (items) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_WIZARD; i++) {
      var element = template.cloneNode(true);
      var nameWizard = element.querySelector('.setup-similar-label');
      var clothesWizardColor = element.querySelector('.wizard-coat');
      var eyesWizardColor = element.querySelector('.wizard-eyes');

      nameWizard.textContent = items[i].name;
      clothesWizardColor.style.fill = items[i].colorCoat;
      eyesWizardColor.style.fill = items[i].colorEyes;
      fragment.append(element);
    }

    listWizards.innerHTML = '';
    listWizards.append(fragment);
  };

  window.wizards = {
    renderWisards: renderWisards
  };
})();
