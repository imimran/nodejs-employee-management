exports.success = (message, results, statusCode) => {
    return {
      message,
      error: false,
      code: statusCode,
      results
    };
  };

  exports.fail = (message, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
  
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
  
    return {
      message,
      code: statusCode,
      error: true
    };
  };

  exports.validation = (errors, statusText = null) => {
    return {
      message: statusText || "Please Enter Valid Data",
      error: true,
      code: 501,
      errors,
    };
  };