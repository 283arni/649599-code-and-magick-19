'use strict';

var blockSetup = document.querySelector('.setup');
var listWizards = document.querySelector('.setup-similar-list');
var similar = document.querySelector('.setup-similar');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var clothesColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var colorsForEyes = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_WIZARD = 4;
var wizards = [];

blockSetup.classList.remove('hidden');

var randomSelection = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

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

