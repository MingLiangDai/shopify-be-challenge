const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let errorResponse = { ...err };

  console.log(err);

  // handle json parse error in req.body
  if (err.type === "entity.parse.failed") {
    const message = "Request body not in json format";
    const statusCode = 400;
    errorResponse = new ErrorResponse(message, statusCode);
  }

  // handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const message =
      "Validation error: " +
      Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
    const statusCode = 400;
    errorResponse = new ErrorResponse(message, statusCode);
  }

  // handle Mongoose duplicate field error
  if (err.code === 11000) {
    const message =
      "Duplicate field values found on fields that should be unique";
    const statusCode = 400;
    errorResponse = new ErrorResponse(message, statusCode);
  }

  res.status(errorResponse.statusCode || 500).json({
    success: false,
    error: errorResponse.message || "Server error. Please try again later.",
  });
};

module.exports = errorHandler;
