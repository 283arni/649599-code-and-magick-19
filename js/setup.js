'use strict';

(function () {
  var QUANTITY_WIZARD = 4;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var blockSetup = document.querySelector('.setup');
  var listWizards = document.querySelector('.setup-similar-list');
  var similar = document.querySelector('.setup-similar');
  var setupOpen = document.querySelector('.setup-open');
  var iconUser = document.querySelector('.setup-open-icon');
  var setupClose = blockSetup.querySelector('.setup-close');
  var inputName = blockSetup.querySelector('.setup-user-name');
  var wizardSetupCoat = blockSetup.querySelector('.setup-wizard .wizard-coat');
  var wizardSetupEyes = blockSetup.querySelector('.setup-wizard .wizard-eyes');
  var wizardSetupFireboll = blockSetup.querySelector('.setup-fireball-wrap');
  var inputHidden = wizardSetupFireboll.querySelector('input');
  var form = blockSetup.querySelector('form');
  var btnSubmit = form.querySelector('.setup-submit');

  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var clothesColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var colorsForEyes = ['black', 'red', 'blue', 'yellow', 'green'];
  var colorsFireboll = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizards = [];
  var spaceBlockSetupX;
  var spaceBlockSetupY;

  // События

  var onButtonSubnitEnter = function (e) {
    if (e.key === ENTER_KEY) {
      e.preventDefault();
    }
  };

  var onNameInput = function (e) {
    var target = e.target;
    if (target.value.length < MIN_NAME_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов'
      );
    } else if (target.value.length > MAX_NAME_LENGTH) {
      target.setCustomValidity('Имя не должно быть больше ' + MAX_NAME_LENGTH + '-х символов'
      );
    } else {
      target.setCustomValidity('');
    }
  };

  var onPopupEsc = function (e) {
    if (e.key === ESC_KEY) {
      closePopup();
    }
  };

  var openPopup = function () {
    blockSetup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEsc);
    inputName.addEventListener('input', onNameInput);
    inputName.addEventListener('keydown', onButtonSubnitEnter);
    wizardSetupCoat.addEventListener('click', onSetupCoatClick);
    wizardSetupEyes.addEventListener('click', onSetupEyesClick);
    wizardSetupFireboll.addEventListener('click', onSetupFirebollCklick);
    getCoordsPlaceBlockSetup();
  };

  var closePopup = function () {

    blockSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEsc);
    inputName.removeEventListener('input', onNameInput);
    inputName.removeEventListener('keydown', onButtonSubnitEnter);
    wizardSetupCoat.removeEventListener('click', onSetupCoatClick);
    wizardSetupEyes.removeEventListener('click', onSetupEyesClick);
    wizardSetupFireboll.removeEventListener('click', onSetupFirebollCklick);
    setCoordsPlaceBlockSetup();
  };

  var getCoordsPlaceBlockSetup = function () {
    spaceBlockSetupX = getComputedStyle(blockSetup).left;
    spaceBlockSetupY = getComputedStyle(blockSetup).top;
  };

  var setCoordsPlaceBlockSetup = function () {
    blockSetup.style.left = spaceBlockSetupX;
    blockSetup.style.top = spaceBlockSetupY;
  };

  var onSetupCoatClick = function () {
    wizardSetupCoat.style.fill = clothesColors[randomSelection(clothesColors)];
  };

  var onSetupEyesClick = function () {
    wizardSetupEyes.style.fill = colorsForEyes[randomSelection(colorsForEyes)];
  };

  var onSetupFirebollCklick = function () {
    var randomColorFireboll = colorsFireboll[randomSelection(colorsFireboll)];
    wizardSetupFireboll.setAttribute('style', 'background: ' + randomColorFireboll);
    inputHidden.setAttribute('value', randomColorFireboll);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (e) {
    if (e.key === ENTER_KEY) {
      closePopup();
    }
  });

  iconUser.addEventListener('keydown', function (e) {
    if (e.key === ENTER_KEY) {
      openPopup();
    }
  });

  btnSubmit.addEventListener('keydown', function (e) {
    if (e.key !== ENTER_KEY) {
      e.preventDefault();
    }
  });

  // Случайный выбор из массивов

  var randomSelection = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  // Создание магов

  var creatElem = function (i, fragment, template) {
    var element = template.cloneNode(true);
    var nameWizard = element.querySelector('.setup-similar-label');
    var clothesWizardColor = element.querySelector('.wizard-coat');
    var eyesWizardColor = element.querySelector('.wizard-eyes');

    nameWizard.textContent = wizards[i].name;
    clothesWizardColor.style.fill = wizards[i].coatColor;
    eyesWizardColor.style.fill = wizards[i].eyesColor;

    fragment.append(element);
  };

  var addWizarts = function () {

    var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_WIZARD; i++) {
      wizards.push({
        name: firstNames[randomSelection(firstNames)] + ' ' + secondNames[randomSelection(secondNames)],
        coatColor: clothesColors[randomSelection(clothesColors)],
        eyesColor: colorsForEyes[randomSelection(colorsForEyes)]
      });

      creatElem(i, fragment, template);
    }

    return fragment;
  };

  listWizards.append(addWizarts());
  similar.classList.remove('hidden');
})();
