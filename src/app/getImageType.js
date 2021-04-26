module.exports.getImageType = ({ filePath }) => {
  const extMatch = filePath.match(/\.([^.]*)$/);
  if (!extMatch) {
    return false;
  }

  const ext = extMatch[1].toLowerCase();
  if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'gif' && ext !== 'png' && ext !== 'svg') {
    return undefined;
  }

  return ext;
};
