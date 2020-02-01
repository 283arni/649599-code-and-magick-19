'use strict';

var blockSetup = document.querySelector('.setup');
var listWizards = document.querySelector('.setup-similar-list');
var similar = document.querySelector('.setup-similar');
var setupOpen = document.querySelector('.setup-open');
var setupClose = blockSetup.querySelector('.setup-close');
var iconUser = document.querySelector('.setup-open-icon');
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
var QUANTITY_WIZARD = 4;
var wizards = [];

// События

var onPopupEsc = function (e) {
  if (e.key === 'Escape') {
    closePopup();
  }
};

var onFormSubmit = function (e) {

  e.preventDefault();

  btnSubmit.addEventListener('mouseup', function () {
    form.submit();
  });

  btnSubmit.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      form.submit();
    }
  });
};

var openPopup = function () {
  blockSetup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEsc);
  inputName.addEventListener('invalid', onInputNameInvalid);
  wizardSetupCoat.addEventListener('click', onSetupCoatClick);
  wizardSetupEyes.addEventListener('click', onSetupEyesClick);
  wizardSetupFireboll.addEventListener('click', onSetupFirebollCklick);
  form.addEventListener('submit', onFormSubmit);
};

var closePopup = function () {
  blockSetup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEsc);
  inputName.removeEventListener('invalid', onInputNameInvalid);
  wizardSetupCoat.removeEventListener('click', onSetupCoatClick);
  wizardSetupEyes.removeEventListener('click', onSetupEyesClick);
  wizardSetupFireboll.removeEventListener('click', onSetupFirebollCklick);
  form.removeEventListener('submit', onFormSubmit);
};

var onInputNameInvalid = function () {
  if (inputName.validity.tooShort) {
    inputName.setCustomValidity('Имя должно состоять больше 1-го символа');
  } else {
    inputName.setCustomValidity('');
  }
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
  if (e.key === 'Enter') {
    closePopup();
  }
});

iconUser.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    openPopup();
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

