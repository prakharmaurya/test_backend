const fs = require("fs");

exports.readDBFile = new Promise((resolve, reject) => {
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      resolve(err);
    } else {
      resolve(JSON.parse(data.toString()));
    }
  });
});

exports.writeDBFile = (d) => {
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
