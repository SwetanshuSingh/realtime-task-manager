import path from "path";
import express from "express";
import authRouter from "./routes/auth/index.js";
import taskRouter from "./routes/tasks/index.js";
import adminRouter from "./routes/admin/index.js";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/tasks/admin", adminRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {});
