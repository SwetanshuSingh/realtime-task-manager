import { Router } from "express";
import UserSchema from "../../schema/User.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const result = UserSchema.safeParse(req.body);
    if (result.success !== true) {
      return res.status(403).json({
        message: "Invalid Form Details",
      });
    }

    const isExisitingUser = await prisma.user.findFirst({
      where: {
        email: email,
        username: username,
      },
    });

    if (isExisitingUser !== null) {
      return res.status(403).json({
        message: "User already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    if (newUser) {
      return res.json({
        message: "User created successfully",
      });
    }
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
