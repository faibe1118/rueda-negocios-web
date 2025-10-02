const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET: obtener todos los usuarios
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST: crear usuario
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

module.exports = router;

