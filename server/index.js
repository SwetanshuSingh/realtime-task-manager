import express from "express";
import authRouter from "./routes/auth/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server Running");
});
