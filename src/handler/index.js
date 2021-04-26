const AWS = require('aws-sdk');

const { getFromBucket } = require('../app/getFromBucket');
const { getImageType } = require('../app/getImageType');
const { isImageOptimized } = require('../app/isImageOptimized');
const { optimizeImage } = require('../app/optimizeImage');
const { processGM } = require('../app/graphicsMagick');
const { uploadToBucket } = require('../app/uploadToBucket');

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async function (event, _context, callback) {
  const bucket = event.Records[0].s3.bucket.name;

  const filePath = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const dstFilePath = filePath;

  const imageExt = getImageType({ filePath });
  if (!imageExt) {
    throw new Error('Invalid image type');
  }

  const isOptimized = await isImageOptimized({ filePath, bucket, s3 });
  if (isOptimized) {
    return;
  }

  const s3Object = await getFromBucket({ filePath, bucket, s3 });
  const buffer = await processGM({ s3Object, imageExt });
  const optimized = await optimizeImage({ buffer });
  await uploadToBucket({ bucket, dstFilePath, data: optimized, contentType: s3Object.ContentType, s3 });

  callback(null, 'message');
};
