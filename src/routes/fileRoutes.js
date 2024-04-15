const router = require("express").Router();
const { fileUpload } = require("../controller/fileController");
const mediaUploader = require("../middleware/multerProcess");

router.post("/upload-media", mediaUploader.array("media"), fileUpload);

module.exports = router;