import { Router } from "express";
import { UserSignUpSchema, UserSignInSchema } from "../../schema/User.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    const result = UserSignUpSchema.safeParse(req.body);
    if (result.success !== true) {
      return res.status(403).json({
        error: "Invalid Form Details",
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
        error: "User already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
        role: role,
      },
    });

    if (newUser) {
      const token = jwt.sign({ payload: username }, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "Successfully Signed Up",
        role: newUser.role,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = UserSignInSchema.safeParse(req.body);
    if (result.success !== true) {
      return res.status(403).json({
        error: "Invalid Form Details",
      });
    }

    const isExisitingUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (isExisitingUser === null) {
      return res.status(403).json({
        error: "User does not Exists",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExisitingUser.password
    );

    if (isPasswordCorrect === false) {
      return res.status(403).json({
        error: "Invalid Password",
      });
    }

    const token = jwt.sign({ payload: username }, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Successfully Signed In",
      role: isExisitingUser.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
