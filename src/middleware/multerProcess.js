const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, baseDir + "/upload");
    } catch (error) {
      console.error("Error - fileStorageDestination: ", error);
      throw new Error(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      const unixTimeStamp = Math.floor(new Date().getTime() / 1000);
      const convertedName = `${unixTimeStamp}-${file.originalname?.toLowerCase().replace(/\s/g, "-")}`;
      file.filename = convertedName;
      cb(null, convertedName);
    } catch (error) {
      console.error("Error - fileStorageFileName: ", error);
      throw new Error(error);
    }
  }
});

module.exports = multer({ storage: fileStorage });