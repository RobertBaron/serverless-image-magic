module.exports.getFromBucket = ({ bucket, filePath, s3 }) => {
  return s3
    .getObject({
      Bucket: bucket,
      Key: filePath,
    })
    .promise();
};
