import { cloudinaryupload } from "../services/cloudinary.js";

const UploadProfileImage = async (req, res) => {
  const { photo } = req.body;
  const result = await cloudinaryupload(photo);
  if (result.status === true) {
    res.status(200).json({
      error: false,
      success: true,
      data: result.data,
    });
  } else {
    res.status(400).json({
      error: true,
      success: false,
      data: "Photo Upload Fail",
    });
  }
};

export { UploadProfileImage };
