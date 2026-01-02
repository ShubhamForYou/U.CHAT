import { WebSocket } from "ws";
import { WebSocketServer } from "ws";

const allSocket = new Map<WebSocket, string>();
const wss = new WebSocketServer({ port: 8081 });
wss.on("connection", (ws) => {
  console.log("Connection established 📡");
  ws.on("message", (message: any) => {
    message = JSON.parse(message);
    if (message.type === "join") {
      allSocket.set(ws, message.payload.roomId);
      ws.send(`Welcome to ${message.payload.roomId}`);
    }
    if (message.type === "chat") {
      const roomId = allSocket.get(ws);
      allSocket.forEach((room, socket) => {
        console.log("in-side for each");
        console.log("message", message);
        console.log("roomId", roomId);
        console.log("room", room);
        if (room === roomId && socket !== ws) {
          console.log("sending");
          socket.send(message.payload.message.toString());
        }
      });
    }
  });

  ws.on("close", () => {
    allSocket.delete(ws);
  });
});
