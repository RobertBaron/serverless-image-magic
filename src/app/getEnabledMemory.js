/**
 * Get enable to use memory size in ImageMagick
 * Typically we determine to us 90% of max memory size
 * @see https://docs.aws.amazon.com/lambda/latest/dg/lambda-environment-variables.html
 */
module.exports.getEnableMemory = () => {
  const mem = parseInt(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE, 10);
  return Math.floor((mem * 90) / 100);
};
