const Developer = require("../models/Developer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup
exports.devSignup = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const dev = await Developer.create({
    email,
    password: hashed,
  });

  res.json(dev);
};

// login
exports.devLogin = async (req, res) => {
  const { email, password } = req.body;

  const dev = await Developer.findOne({ email });

  if (!dev) return res.status(404).json({ msg: "Not found" });

  const isMatch = await bcrypt.compare(password, dev.password);

  if (!isMatch)
    return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { devId: dev._id },
    process.env.JWT_SECRET
  );

  res.json({ token });
};