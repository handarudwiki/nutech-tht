import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
    destination: (req:Request, file, cb) => {
        cb(null, "uploads/profile"); 
    },
    filename: (req:Request, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const fileFilter = (req:Request, file:Express.Multer.File, cb:FileFilterCallback) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"));
  }

  cb(null, true);
};


const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
