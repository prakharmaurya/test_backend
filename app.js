const express = require("express");
const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/profiles", (req, res) => {
  res.send("Hello");
});

app.get("*", (req, res) => {
  res.status(404).send("route not found");
});

module.exports = app;
