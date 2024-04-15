const { RESPONSE_CODE, RESPONSE_STS_CODE } = require("../constants/index");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const message = err.message ?? err;
    console.error("Error - catchAsync: ", message);
    res.status(RESPONSE_STS_CODE.internalServerError).json({
      code: RESPONSE_CODE.ERROR,
      message: message,
      data: {},
    });
  });
};

module.exports = catchAsync;