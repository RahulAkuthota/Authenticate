const jwt = require("jsonwebtoken");

// access token (short life)
const generateAccessToken = (userId, appId, role) => {
    return jwt.sign(
      { userId, appId, role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
  };

// refresh token (long life)
const generateRefreshToken = (userId, appId) => {
  return jwt.sign(
    { userId, appId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};