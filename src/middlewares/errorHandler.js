const APIError = require("../utils/errors")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    //err APIError sınıfına ait mi?
    return res.status(err.statusCode || 400).json({
      success: false,
      statusCode: err.statusCode || 400,
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Bir hata ile karşılaştınız. Lüften apinizi kontrol ediniz.",
  });
};

module.exports = errorHandlerMiddleware