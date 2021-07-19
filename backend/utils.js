import jwt from "jsonwebtoken";

export const generateToken = (user) =>
  jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },

    process.env.JWT_SECRET || "somethingfun",
    {
      expiresIn: "30d",
    }
  );

// authenticate user before updating order
export const isAuth = (req, res, next) => {
  // get authorization fiels from header
  const authorization = req.headers.authorization;
  if (authorization) {
    // get token

    const token = authorization.slice(7, authorization.length); //bearer xxxxxx
    // use jwt to decript token
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingfun",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

// check if user is admin

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
