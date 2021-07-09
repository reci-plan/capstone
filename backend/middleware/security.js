const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

// Extract token from headers authorization
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }

  return undefined;
};

// set user who has token to res.locals.user
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (err) {
    console.log(err);
    return next();
  }
};

// Middleware for authenticated view
const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    if (!user?.email) throw new UnauthorizedError();
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  extractUserFromJwt,
  requireAuthenticatedUser,
};
