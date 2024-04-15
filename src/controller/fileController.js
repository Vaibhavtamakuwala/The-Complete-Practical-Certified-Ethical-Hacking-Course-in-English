const { FILE_MESSAGES } = require("../constants");
const catchAsync = require("../helpers/catchAsync");
const responseMessages = require("../helpers/responseMessages");
const { fileStore } = require("../services/fileService");

const fileUpload = catchAsync(async (req, res) => {
  if (!req.files?.length) {
    return responseMessages.failureResponse(FILE_MESSAGES.NOT_FOUND, res);
  }
  const result = await fileStore(req.files);
  res.message = FILE_MESSAGES.UPLOADED;
  return responseMessages.successResponse(result, res);
});

module.exports = {
    fileUpload
}
