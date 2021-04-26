module.exports.uploadToBucket = ({ bucket, dstFilePath, data, contentType, s3 }) => {
  return s3
    .putObject({
      Bucket: bucket,
      Key: dstFilePath,
      Body: data,
      ContentType: contentType,
      CacheControl: 'max-age=314496000,immutable',
      Metadata: { optimized: 'true' },
    })
    .promise();
};
