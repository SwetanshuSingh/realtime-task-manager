import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { username } = res;

    const userDetails = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        tasks: true,
      },
    });

    const isExistingTask = userDetails.tasks.filter(
      (task) => task.title === title
    );

    if (isExistingTask) {
      return res.status(403).json({
        message: "Task already exists",
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userDetails.id,
      },
    });

    res.status(200).json({
      message: "Task created Succesfully",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
