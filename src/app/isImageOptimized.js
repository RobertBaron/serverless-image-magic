module.exports.isImageOptimized = async ({ bucket, filePath, s3 }) => {
  const objectData = await s3
    .getObject({
      Bucket: bucket,
      Key: filePath,
    })
    .promise();

  if (!objectData.ContentLength) {
    throw new Error('No content');
  }

  return objectData.Metadata.optimized;
};
