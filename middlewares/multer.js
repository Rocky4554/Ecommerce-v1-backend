const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/temp');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4|webm/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png) and videos (mp4, webm) are allowed'));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB for files
    files: 5, // Max 5 files (thumbnail + 3 images + video)
    fieldSize: 10 * 1024 * 1024, // 10MB for text fields (e.g., JSON strings)
  },
});

module.exports = { upload };