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
        resolve(d);
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

app.use(express.static("public"));

app.use(express.json());

app.get("/post/:id", (req, res) => {
  readDBFile.then((d) => {
    d.posts.forEach((post) => {
      if (post.id == req.params.id) {
        res.send(post);
      }
    });
    res.status(404).send("Not post found");
  });
});

app.get("/profile/:id", (req, res) => {
  readDBFile.then((d) => {
    d.users.forEach((user) => {
      if (user.id == req.params.id) {
        res.send(user);
      }
    });
    res.status(404).send("Not user found");
  });
});

app.get("/profile", (req, res) => {
  readDBFile.then((d) => {
    d.users.forEach((user) => {
      if (
        user.email == req.query.email &&
        user.password == req.query.password
      ) {
        res.send({ name: user.name, email: user.email });
      }
    });
    res.status(404).send("No user found");
  });
});

app.get("/comment/:id", (req, res) => {
  readDBFile.then((d) => {
    d.comments.forEach((comment) => {
      if (comment.id == req.params.id) {
        res.send(comment);
      }
    });
    res.status(404).send("Not comment found");
  });
});

// send large
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
  readDBFile.then((d) => {
    let isExists = false;

    d.users.forEach((user) => {
      if (user.email === req.body.email) {
        isExists = true;
      }
    });

    if (isExists) {
      res.send("Already registered!!!");
    } else {
      d.users.push({
        id: d.users[d.users.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      writeDBFile(d).then((dx) => {
        res.status(201).send(dx.users[dx.users.length - 1]);
      });
    }
  });
});

app.post("/post", (req, res) => {
  readDBFile.then((d) => {
    // edit d
    d.posts.push({
      id: d.posts[d.posts.length - 1].id + 1,
      post: req.body.post,
      userId: req.body.userId,
    });

    writeDBFile(d).then((dx) => {
      res.status(201).send(dx.posts[dx.posts.length - 1]);
    });
  });
});

app.post("/comment", (req, res) => {
  readDBFile.then((d) => {
    // edit d
    d.comments.push({
      id: d.comments[d.comments.length - 1].id + 1,
      postId: req.body.postId,
      comment: req.body.comment,
      userId: req.body.userId,
    });

    writeDBFile(d).then((dx) => {
      res.status(201).send(dx.comments[dx.comments.length - 1]);
    });
  });
});

app.get("*", (req, res) => {
  res.status(404).send("ppassword not found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
