export const formatSuccess = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

export const formatError = (error, statusCode = 500) => {
  return {
    success: false,
    error: error.message || 'An error occurred',
    statusCode,
    timestamp: new Date().toISOString()
  };
};