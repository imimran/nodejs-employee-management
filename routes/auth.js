const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../utils/key");

router.get("/", (req, res) => {
  res.send("Hello Empolyee");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ error: "please add email or password" });
  }
  let user = await User.findOne({ email: email });
  if (req.body.email !== user.email)
    return res.status(400).send("Invalid email or password");

  if (req.body.password !== user.password)
    return res.status(400).send("Invalid email or password ");

  const token = jwt.sign({ id: user.id, email: user.email }, jwtKey);
  // res.json({ meg: "Successfully Login" });
  res.json({ token });
});

module.exports = router;
