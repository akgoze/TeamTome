import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { configureSockets } from "./sockets";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

configureSockets(io);
