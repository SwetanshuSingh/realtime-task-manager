import path from "path"
import express from "express";
import authRouter from "./routes/auth/index.js";
import taskRouter from "./routes/tasks/index.js"
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));  
})

app.listen(PORT, () => {
  console.log("Server Running");
});