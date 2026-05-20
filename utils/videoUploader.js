const cloudinary =
 require("cloudinary").v2;

exports.uploadVideoToCloudinary =
 async (
  file,
  folder
 ) => {

  const options = {
    folder,
    resource_type: "video",
    chunk_size:
      6000000,
  };

  return await cloudinary
    .uploader
    .upload(
      file.tempFilePath,
      options
    );
};