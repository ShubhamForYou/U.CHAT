import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8081 });
wss.on("connection", (ws) => {
    console.log("WSS CONNECTED 😉");
    ws.on("message", (message) => {
        console.log("📩 Message:", message.toString());
    });
    ws.send("Hello Everyone 🙋🏻");
});
//# sourceMappingURL=index.js.map