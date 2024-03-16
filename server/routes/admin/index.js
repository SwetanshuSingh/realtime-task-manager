import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();
const primsa = new PrismaClient();

router.get("/all", authMiddleware, async (req, res) => {
  const { username } = res;
  
  const isAdmin = await primsa.user.findFirst({
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

  const allTasks = await primsa.task.findMany({
    include : {
      user : {
        select : {
          username : true
        }
      }
    }
  });

  res.json({
    data : allTasks
  })
})

export default router;