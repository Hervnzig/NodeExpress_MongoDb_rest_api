const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "rwandanguy6",
  api_key: "556677218372673",
  api_secret: "g8f07pG_1Ri9OvGjMJ9kdP6nB4w",
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};
