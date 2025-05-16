const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/user.json");

router.post("/", (req, res) => {
  const { firstName, lastName, email, password, category, occupation } = req.body;

  if (!firstName || !lastName || !email || !password || !category || !occupation) {
    return res.status(400).json({ message: "Missing fields." });
  }

  const users = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "This email has already been used." });
  }

  users.push({ firstName, lastName, email, password, category, occupation });

  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  res.json({ message: "Register successfully" });
});

module.exports = router;