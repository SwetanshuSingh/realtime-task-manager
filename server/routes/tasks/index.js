import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authMiddleware, (req, res) => {
  // const { title, body } = req.body;

  res.json({
    message : "Test"
  })

})

export default router;