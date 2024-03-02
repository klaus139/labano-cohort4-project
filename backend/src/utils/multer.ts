import multer from "multer";
import cloudinary from "cloudinary";

export const storage = multer.memoryStorage()

export const upload = multer({
  storage:storage,
  limits:{
    fileSize: 5 * 1024 * 1024, //5mb
  },
})

export const uploadImages = async(imageFiles:Express.Multer.File[]) => {
  try {
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      const dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url
    })

  } catch (error) {
    console.log(error)
  }
}
