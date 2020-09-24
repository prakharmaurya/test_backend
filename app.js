const express = require("express");
const User = require("./UserModel");
const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/profiles", (req, res) => {
  User.find({}, (err, result) => {
    res.send(result);
  });
});

app.get("/profile", (req, res) => {
  User.find(
    {
      email: req.query.email,
      password: req.query.password,
    },
    (err, result) => {
      res.send(result[0]);
    }
  );
});

app.post("/profile", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save().then(() => {
    res.status(201).send(req.body);
  });
});

app.get("*", (req, res) => {
  res.status(404).send("route not found");
});

module.exports = app;
