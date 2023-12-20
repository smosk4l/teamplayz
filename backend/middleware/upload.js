const path = require('path');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg'
    ) {
      cb(null, false);
    } else {
      file.extension = path.extname(file.originalname);
      cb(null, true);
    }
  },
});
module.exports = upload;
