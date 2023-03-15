/**
 * All the routes goes here
 */

const { signup } = require("./user/signup");
const { signupMiddleware } = require("./../middleware/signup");
const { login } = require("./user/login");
const { loginMiddleware } = require("./../middleware/login");
var bodyParser = require("body-parser");

exports.loadRoutes = (app) => {
  app.use(bodyParser.json());

  // base routes goes here
  app.get("/", (req, res) => {
    res.send("You're at Food Adda");
  });

  // user related goes here
  app.post("/signup", signupMiddleware, signup);
  app.post("/login", loginMiddleware, login);
};
//routes related to home page - home page
//routes related to user activity - login, signup, checkout, order, address
//routes related to admin activity
