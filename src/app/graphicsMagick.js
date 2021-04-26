const { getEnableMemory } = require('./getEnabledMemory');
// requires imageMagick layer
// https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~image-magick-lambda-layer
const gm = require('gm').subClass({ imageMagick: true, binPath: '/opt/bin' });

module.exports.processGM = ({ s3Object, imageType }) => {
  return new Promise((resolve, reject) => {
    gm(s3Object.Body)
      .limit('memory', `${getEnableMemory()}MB`)
      .autoOrient()
      .size(function () {
        this.toBuffer(imageType, function (err, buffer) {
          if (err) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });
  });
};
