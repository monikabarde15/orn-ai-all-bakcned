const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (
  file,
  folder,
  resource_type = "auto"
) => {

  const options = {
    folder,
    resource_type,
  };

  options.resource_type = resource_type;

  return await cloudinary.uploader.upload(
    file.tempFilePath,
    options
  );
};