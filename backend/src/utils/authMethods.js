const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    return await sign(
      {
        payload
      },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife
      }
    );
  } catch (error) {
    throw new Error(error.message, error.statusCode);
  }
};

const verifyToken = async (token, secretKey) => {
  try {
    return await verify(token, secretKey);
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const decodeToken = async (token, secretKey) => {
  try {
    return await verify(token, secretKey, {
      ignoreExpiration: true
    });
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

module.exports = { generateToken, verifyToken, decodeToken };
