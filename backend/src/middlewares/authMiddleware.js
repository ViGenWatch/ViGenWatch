const jwtVariable = require("../utils/jwt");
const userServices = require("../services/userServices");
const authMethods = require("../utils/authMethods");
const process = require("process");

const authMiddleware = async (req, res, next) => {
  const accessTokenFromHeader = req.headers.x_authorization;
  if (!accessTokenFromHeader) {
    return res.status(401).send("Access token not found!");
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

  const verified = await authMethods.verifyToken(accessTokenFromHeader, accessTokenSecret);
  if (!verified) {
    return res.status(401).send("You do not have access to this feature!");
  }

  const user = await userServices.getUserAccountByEmail(verified.payload.email);
  if (!user) {
    return res.status(401).send("User not found");
  }
  req.user = user;
  return next();
};

module.exports = authMiddleware;
