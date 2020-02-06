'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_COORDX = 100;
  var CLOUD_COORDY = 10;
  var GAP = 50;
  var COLUMN_WIDTH = 40;
  var COLUMN_HEIGHT = 150;
  var INDENT = 20;

  var shiftSaturation = 30;
  var maxNumber = 0;

  var calculateHeight = function (time) {
    return (COLUMN_HEIGHT * time) / maxNumber;
  };

  var viewCloud = function (ctx, coordX, coordY, color) {
    ctx.fillStyle = color;
    ctx.fillRect(coordX, coordY, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var drawRect = function (ctx, names, time, i) {

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';

    if (names[i] !== 'Вы') {
      ctx.fillStyle = 'hsl(240, ' + shiftSaturation * i + '%, 50%)';
    }

    ctx.fillRect(CLOUD_COORDX + GAP + (GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - calculateHeight(time) - GAP + INDENT, COLUMN_WIDTH, calculateHeight(time));
  };

  window.renderStatistics = function (ctx, names, times) {

    maxNumber = Math.max.apply(null, times);

    viewCloud(ctx, CLOUD_COORDX, CLOUD_COORDY + CLOUD_COORDY, 'rgba(0, 0, 0, 0.7)');
    viewCloud(ctx, CLOUD_COORDX - CLOUD_COORDY, CLOUD_COORDY, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_COORDX + GAP, CLOUD_COORDY + INDENT);
    ctx.fillText('Список результатов:', CLOUD_COORDX + GAP, CLOUD_COORDY + INDENT + INDENT);

    for (var i = 0; i < names.length; i++) {

      var itemTimes = Math.round(times[i]);

      ctx.fillStyle = '#000';
      ctx.fillText(names[i], CLOUD_COORDX + GAP + (GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - CLOUD_COORDY);
      ctx.fillText(itemTimes, CLOUD_COORDX + GAP + (GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - calculateHeight(itemTimes) - GAP + CLOUD_COORDY);

      drawRect(ctx, names, itemTimes, i);
    }
  };
})();
