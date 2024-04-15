const FILE_MESSAGES = {
  NOT_FOUND: "No file uploaded!",
  UPLOADED: "File(s) uploaded successfully.",
  SUPPORTED_FILE_TYPES: "Only video files are allowed.",
};

const EMAIL_MESSAGE = {
  subject: "Video processing mail",
  body(fileNm) {
    return `The video ${fileNm} has been successfully converted and uploaded.`;
  },
};

module.exports = {
  FILE_MESSAGES,
  EMAIL_MESSAGE
};
