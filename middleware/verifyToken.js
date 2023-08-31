const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.get("Authorization");
  
  const splittedData = token.split(" ");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(splittedData[1], process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
