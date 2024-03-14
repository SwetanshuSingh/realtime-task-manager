import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (result) {
      res.username = result.payload;
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized Access",
    });
  }
};

export default authMiddleware;
