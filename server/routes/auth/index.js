import { Router } from "express";
import UserSchema from "../../schema/User.js";

const router = Router();

router.post("/signup", (req, res) => {
  try {
    const { email, username, password } = req.body;

    const result = UserSchema.safeParse(req.body);
    if (result.success !== true) {
      return res.status(403).json({
        message: "Invalid Form Details",
      });
    }

    

    return res.json({
      message: "Sign Up Route",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
});

router.post("/signin", (req, res) => {
  res.json({
    message: "Sign In Route",
  });
});

export default router;
