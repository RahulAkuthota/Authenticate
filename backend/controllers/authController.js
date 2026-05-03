const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Application = require("../models/Application");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");


// ===================== SIGNUP =====================
exports.signup = async (req, res) => {
  try {
    const { email, password, clientId } = req.body;

    // validation
    if (!email || !password || !clientId) {
      return res.status(400).json({
        msg: "Email, password and clientId required",
      });
    }

    // validate app
    const app = await Application.findOne({ clientId });
    if (!app) {
      return res.status(400).json({ msg: "Invalid clientId" });
    }

    // check user INSIDE same app (multi-tenant fix 🔥)
    const existingUser = await User.findOne({
      email,
      appId: clientId,
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists in this application",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      email,
      password: hashedPassword,
      appId: clientId,
    });

    res.json({
      msg: "User created",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===================== LOGIN =====================
exports.login = async (req, res) => {
  try {
    const { email, password, clientId } = req.body;

    if (!email || !password || !clientId) {
      return res.status(400).json({
        msg: "Email, password and clientId required",
      });
    }

    // find user in same app
    const user = await User.findOne({
      email,
      appId: clientId,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // generate tokens 🔥
    const accessToken = generateAccessToken(
        user._id,
        user.appId,
        user.role
      );
          const refreshToken = generateRefreshToken(user._id, user.appId);

    // store refresh token
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===================== REFRESH TOKEN =====================
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ msg: "No refresh token provided" });
    }

    // verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.userId);

    // check token match
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    // generate new access token
    const newAccessToken = generateAccessToken(
      user._id,
      user.appId
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({
      msg: "Expired or invalid refresh token",
    });
  }
};


// ===================== GET CURRENT USER =====================
exports.getMe = async (req, res) => {
  res.json({ user: req.user });
};