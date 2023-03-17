const { Customers } = require("../../../model/Customers");
const { responseCreator } = require("../../utils/responseCreator");
const { createHash } = require("../../utils/utils");
const { HASH_KEY } = require("../../utils/constants.json");

exports.login = async(request, response) => {
  const { email, password } = request.body;
  const processedPassword = createHash(password);
  try {
    // Find user by email
    const user = await Customers.findOne({ email: email });
    console.log("User found", user)
    if (user === null) {
        const respObject = responseCreator("Error while logging in", err);
        console.log("Error while logging in", err);
        response.status(400).send(respObject);
      } else {
        if (user) {
          // Check if the password is correct
          if (user.password === processedPassword) {
            // Sending token back to the user with the response
            const token = createHash(password + HASH_KEY);
            const respObject = responseCreator("Logged in successfully", {
              token: token,
            });
            response.status(200).send(respObject);
          } else {
            const respObject = responseCreator("Invalid password");
            response.status(400).send(respObject);
          }
        } else {
          const respObject = responseCreator("User does not exists");
          response.status(400).send(respObject);
        }
      }
  } catch (err) {
    const respObject = responseCreator("Error while logging in", err);
    response.status(400).send(respObject);
  }
};
