// backend/routes/login.js 
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/user.json");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields." });
  }

  const users = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Incorrected Username" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Incorrected Password." });
  }

  res.json({ message: "Login successfully" });
});

module.exports = router;
