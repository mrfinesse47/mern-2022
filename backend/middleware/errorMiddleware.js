const errorHandler = (error, req, res, next) => {
  //I believe the function signature of error registers this as an error handler
  //http://expressjs.com/en/guide/error-handling.html
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

module.exports = errorHandler;
