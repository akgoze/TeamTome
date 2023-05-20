import socketIO from "socket.io";

export function configureSockets(io: socketIO.Server) {
  io.on("connection", (socket: socketIO.Socket) => {
    console.log();

    // Handle 'join' event
    socket.on("join", (roomId: string) => {
      socket.join(roomId);
      console.log();
    });

    // Handle 'text-update' event
    socket.on("text-update", (roomId: string, text: string) => {
      // Broadcast the text update to all clients in the room
      socket.to(roomId).emit("text-update", text);
    });

    // Handle 'disconnect' event
    socket.on("disconnect", () => {
      console.log();
    });
  });
}
