const User = require("./UserModel");

exports.roleChecker = (req, res, next) => {
  User.find({ email: req.query.email }, (err, result) => {
    const role = Object.values(result[0])[Object.values(result[0]).length - 2]
      .type
      ? Object.values(result[0])[Object.values(result[0]).length - 2].type
      : "user";

    res.json({
      statusCode: 200,
      message: `login Successful you are ${role}`,
      user: {
        name: result[0].name,
        email: result[0].email,
        role: role,
      },
    });
  });
};

exports.loginChecker = (req, res, next) => {
  User.find({ email: req.query.email }, (err, result) => {
    if (result[0]) {
      if (result[0].password === req.query.password) {
        next();
      } else {
        res.json({ statusCode: 403, message: "Password incorrect" });
      }
    } else {
      res.json({ statusCode: 404, message: "Account DNE" });
    }
  });
};
