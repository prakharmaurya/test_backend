const mongoose = require("mongoose");
const { DATABASE } = require("./config");
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    log.error(`Failed to connect to database ${err}`);
  });

const app = require("./app");

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const apple = new User({ name: "Apple" , email: 'a@a.com'});
// const banana = new User({ name: "Banana" , email: 'b@b.com'});
// apple.save().then(() => console.log("new user created"));
// banana.save().then(() => console.log("new user created"));
