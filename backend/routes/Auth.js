const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-register', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already registered. Please sign in.' });
    }
    user = await User.create({ email, name, googleId });
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token: authToken, user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered. Please sign up first." });
    }
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: authToken, user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});
module.exports=router;