import { Router, json } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";
import { taskSchema } from "../../schema/Task.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const { username } = res;

    const userDetails = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        tasks: true,
      },
    });

    if (userDetails.tasks === null) {
      return res.status(403).json({
        message: "You have no tasks",
      });
    }

    return res.status(200).json({
      data: userDetails.tasks,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { username } = res;

    const result = taskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(403).json({
        error: "Invalid Details",
      });
    }

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

    if (isExistingTask.length > 0) {
      return res.status(403).json({
        error: "Task already exists",
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userDetails.id,
      },
    });

    return res.status(200).json({
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

router.get("/delete", authMiddleware, async (req, res) => {
  try {
    const { taskid } = req.headers;
    const { username } = res;

    const userDetails = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    const deletedTask = await prisma.task.delete({
      where: {
        id: taskid,
        userId: userDetails.id,
      },
    });

    return res.status(200).json({
      message: "Task Deleted Successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
