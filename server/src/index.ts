import { WebSocketServer} from "ws";
const connections:any= [];
const wss = new WebSocketServer({ port: 8081 });
wss.on("connection", (ws) => {
  connections.push(ws);
  // console.log("WSS CONNECTED 😉");
  console.log(ws);
  ws.on("message", (message: any) => {
    console.log("📩 Message:", message.toString());
    connections.forEach((c:any) => {
      c.send(message.toString());
    });
  });
  ws.send("Hello Everyone 🙋🏻");
});
