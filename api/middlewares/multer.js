import multer from "multer";

const uploadPath = "/tmp";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
