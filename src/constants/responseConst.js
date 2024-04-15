const RESPONSE_CODE = {
  DEFAULT: "SUCCESS",
  ERROR: "ERROR",
  ALERTS: "ALERTS"
};

const RESPONSE_STS_CODE = {
  success: 200,
  badRequest: 400,
  internalServerError: 500,
  notFound: 404,
  validationError: 422
};

module.exports = {
  RESPONSE_CODE, 
  RESPONSE_STS_CODE
};
