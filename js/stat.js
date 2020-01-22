'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COORDX = 100;
var CLOUD_COORDY = 250;
var GAP = 50;
var COLUMN_WIDTH = 40;

var viewCloud = function (ctx, coordX, coordY, color) {
  ctx.fillStyle = color;
  ctx.fillRect(coordX, coordY, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {

  viewCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  viewCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_COORDX + GAP + (GAP + COLUMN_WIDTH) * i, CLOUD_COORDY);
    ctx.fillRect(CLOUD_COORDX + GAP + (GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - 150 - GAP, COLUMN_WIDTH, 150);
  }
};
