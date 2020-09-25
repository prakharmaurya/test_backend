const express = require("express");
const User = require("./UserModel");
const { loginChecker, roleChecker } = require("./userController");
const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/profile", loginChecker, roleChecker);

app.get("*", (req, res) => {
  res.status(404).send("route not found");
});

module.exports = app;
