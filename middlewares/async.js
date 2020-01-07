// eslint-disable-next-line implicit-arrow-linebreak
const asyncHandler = fn => (req, res, next) =>
   Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
