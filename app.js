const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// const readDBFile = new Promise((resolve, reject) => {
//   fs.readFile("./db.json", (err, data) => {
//     if (err) {
//       resolve(err);
//     } else {
//       resolve(JSON.parse(data.toString()));
//     }
//   });
// });

const cb = (err, data, resolve) => {
  if (err) {
    resolve(err);
  } else {
    resolve(JSON.parse(data.toString()));
  }
};

const readDBFile = new Promise((resolve, reject) => {
  fs.readFile("./db.json", (err, data) => {
    cb(err, data, resolve, "Hello");
  });
});

app.get("/profiles", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.users);
  });
});

app.get("/posts", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.posts);
  });
});
app.get("/comments", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.comments);
  });
});

app.post("/profile", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.users);
  });
});
app.post("/posts", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.posts);
  });
});
app.post("/comments", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.comments);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
