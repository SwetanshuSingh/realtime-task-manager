import express from "express";
import authRouter from "./routes/auth/index.js";
import taskRouter from "./routes/tasks/index.js"
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter)

app.listen(PORT, () => {
  console.log("Server Running");
});