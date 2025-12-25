import { WebSocketServer } from "ws";
const allSocket: any = [];
const wss = new WebSocketServer({ port: 8081 });
wss.on("connection", (ws) => {
  allSocket.push(ws);
  console.log("Connection established 📡");
  console.log(ws);
  ws.on("message", (message: any) => {
    console.log("📩 Message:", message.toString());
    allSocket.forEach((c: any) => {
      c.send(message.toString());
    });
  });
  ws.send("Hello Everyone 🙋🏻");
  ws.on("disconnect", () => {
    allSocket.filter((c: any) => c !== ws);
  });
});
