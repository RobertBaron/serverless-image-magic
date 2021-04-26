const imagemin = require('imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

module.exports.optimizeImage = ({ buffer }) => {
  return imagemin.buffer(buffer, {
    plugins: [
      imageminJpegRecompress(),
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });
};
