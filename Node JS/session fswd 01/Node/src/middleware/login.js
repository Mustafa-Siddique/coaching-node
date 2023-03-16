const { Customers } = require("./../../model/Customers");
const { responseCreator } = require("../utils/responseCreator");

exports.loginMiddleware = async (req, res, next) => {
  const email = req.body.email;
  const isExists = await Customers.exists({ email: email });
  console.log(isExists, email);
  if (isExists !== null) {
    next();
  } else {
    const resp = responseCreator("Email does not exists");
    res.status(500).send(resp);
  }
};