function errorsHandler(err, req, res, next) {
  res.status(500).json({
    error: true,
    message: err.message,
  });
}

module.exports = errorsHandler;