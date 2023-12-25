const multer = require("multer");
const handleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `profile-${Date.now()}-${file.originalname}`);
  },
});
const handleFileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("File format not correct not accepted..."));
  }
};
const upload = multer({
  storage: handleStorage,
  fileFilter: handleFileFilter,
});

module.exports = upload;
