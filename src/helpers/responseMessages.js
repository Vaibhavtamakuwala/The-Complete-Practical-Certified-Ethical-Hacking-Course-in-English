const { RESPONSE_CODE, RESPONSE_STS_CODE } = require("../constants");

const successResponse = (data, res) => {
  return res.status(RESPONSE_STS_CODE.success).json({
    code: RESPONSE_CODE.DEFAULT,
    message: res.message,
    data: data,
  });
};

const failureResponse = (data, res) => {
  res.message = data.message;
  return res.status(RESPONSE_STS_CODE.validationError).json({
    code: RESPONSE_CODE.ERROR,
    message: data.message ?? data,
  });
};

module.exports = {
  successResponse,
  failureResponse,
};
