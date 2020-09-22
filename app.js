const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const readDBFile = new Promise((resolve, reject) => {
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      resolve(err);
    } else {
      resolve(JSON.parse(data.toString()));
    }
  });
});

const writeDBFile = (d) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./db.json", JSON.stringify(d), (err) => {
      if (err) {
        resolve(err);
      } else {
        resolve(d.users[d.users.length - 1]);
      }
    });
  });
};

// const cb = (err, data, resolve, reject) => {
//   if (err) {
//     resolve(err);
//   } else {
//     resolve(JSON.parse(data.toString()));
//   }
// };

// const readDBFile = new Promise((resolve, reject) => {
//   fs.readFile("./db.json", (err, data) => {
//     cb(err, data, resolve, reject);
//   });
// });

app.use(express.json());

app.get("/posts", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.posts);
  });
});

app.get("/profiles", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.users);
  });
});

app.get("/comments", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.comments);
  });
});

app.post("/profile", (req, res) => {
  console.log(req.body);
  readDBFile.then((d) => {
    // edit d
    d.users.push({
      id: d.users[d.users.length - 1].id + 1,
      name: req.body.name,
      age: req.body.age,
    });

    writeDBFile(d).then((dx) => {
      res.status(201).send(dx);
    });
  });
});

app.post("/post", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.posts);
  });
});

app.post("/comment", (req, res) => {
  readDBFile.then((d) => {
    res.send(d.comments);
  });
});

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
