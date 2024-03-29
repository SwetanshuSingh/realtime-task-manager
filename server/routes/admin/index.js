import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { taskSchema } from "../../schema/Task.js";
import { io } from "../../socket/socket.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/all", authMiddleware, async (req, res) => {
  const { username } = res;
  
  const isAdmin = await prisma.user.findFirst({
    where : {
      username : username
    },
    select : {
      role : true
    }
  });

  if(isAdmin.role !== "admin"){
    return res.status(403).json({
      message : "Unauthorized Access"
    })
  }

  const allTasks = await prisma.task.findMany({
    include : {
      user : {
        select : {
          username : true
        }
      }
    }
  });

  res.status(200).json({
    data : allTasks
  })
})

router.get("/delete", authMiddleware, async (req, res) => {
  const { taskid } = req.headers
  const { username } = res;
  
  const isAdmin = await prisma.user.findFirst({
    where : {
      username : username
    },
    select : {
      role : true
    }
  });

  if(isAdmin.role !== "admin"){
    return res.status(403).json({
      message : "Unauthorized Access"
    })
  }

  const deletedTask = await prisma.task.delete({
    where : {
      id : taskid
    }
  });

  return res.status(200).json({
    message : "Task Deleted Successfully",
    data : deletedTask
  })

})

router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { taskId, title, description } = req.body;
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

      const isAdmin = await prisma.user.findFirst({
        where : {
          username : username
        },
        select : {
          role : true
        }
      });
    
      if(isAdmin.role !== "admin"){
        return res.status(403).json({
          message : "Unauthorized Access"
        })
      }
  
      const isExistingTask = userDetails.tasks.filter(
        (task) => task.title === title
      );
  
      if (isExistingTask.length > 0) {
        return res.status(403).json({
          error: "No details changed",
        });
      }
  
      const updatedTask = await prisma.task.update({
        where : {
          id : taskId,
        },
        data : {
          title : title,
          description : description
        },
      });

      io.emit("newTask", updatedTask);
  
      return res.status(200).json({
        message : "Task Updated Successfully",
        data : updatedTask
      });
  
    } catch (error) {
      res.status(500).json({
        error : "Internal Server Error"
      })
    }
})

router.post("/update/status", authMiddleware, async (req, res) => {
  try {
    const { taskId, isCompleted } = req.body;
    const { username } = res;

    const isAdmin = await prisma.user.findFirst({
      where : {
        username : username
      },
      select : {
        role : true
      }
    });
  
    if(isAdmin.role !== "admin"){
      return res.status(403).json({
        message : "Unauthorized Access"
      })
    }

    const isTaskCompleted = await prisma.task.update({
      where: {
        id: taskId,
      },
      data : {
        completed : isCompleted
      }
    });

    return res.status(200).json({
      message: "Updated Successfully",
      data : isTaskCompleted
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;