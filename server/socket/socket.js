import { Server } from "socket.io";
import http from "http"
import express from "express"

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors : {
    origin : ["http://localhost:3000", "https://realtime-task-manager.onrender.com"],
    methods : ["GET", "POST"]
  }
});

io.on("connection", (socket) => {

  socket.on("disconnect", () => {
  })
})

export { app, io, server };