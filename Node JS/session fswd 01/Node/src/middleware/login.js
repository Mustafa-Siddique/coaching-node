const { Customers } = require("./../../model/Customers");
const { responseCreator } = require("../utils/responseCreator");

exports.loginMiddleware = async (req, res, next) => {
  const isExists = await Customers.exists({ email: req.body.email });
  console.log(isExists);
  if (isExists !== null) {
    next();
  } else {
    const resp = responseCreator("Email does not exists");
    res.status(500).send(resp);
  }
};
