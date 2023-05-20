import { io } from "socket.io-client";

const socket = io();

const editor = document.getElementById("editor") as HTMLTextAreaElement;

editor.addEventListener("input", () => {
  const roomId = "example-room";
  const text = editor.value;
  socket.emit("text-change", { roomId, text });
});

socket.on("text-update", (data: string) => {
  editor.value = data;
});
