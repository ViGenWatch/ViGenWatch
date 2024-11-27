const jwtVariable = require("../utils/jwt");
const userServices = require("../services/userServices");
const authMethods = require("../utils/authMethods");
const process = require("process");
const db = require("../models/index");

const authMiddleware = async (req, res, next) => {
  try {
    let accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader || !accessTokenFromHeader.startsWith("Bearer ")) {
      return res.status(401).send("Access token not found!");
    }
    accessTokenFromHeader = accessTokenFromHeader.split(" ")[1].replace(/^"|"$/g, "");
    const checkIfBlacklisted = await db.Blacklist.findOne({ where: { token: accessTokenFromHeader } });
    if (checkIfBlacklisted) {
      return res.status(401).json({ message: "This session has expired. Please login" });
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
    req.accessToken = accessTokenFromHeader;
    return next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = authMiddleware;
