const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Add the new admin authorization middleware
const authorizeAdmin = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!req.user.role) {
      return res
        .status(403)
        .json({ message: "Access denied: User has no role assigned" });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient privileges" });
    }

    next();
  };
};

// Add permission check middleware
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (
      !req.user.permissions ||
      !req.user.permissions.includes(requiredPermission)
    ) {
      return res
        .status(403)
        .json({
          message: `Access denied: Missing '${requiredPermission}' permission`,
        });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
  checkPermission,
};
