import { WebSocketServer } from "ws";
const map = new Map();

export const open = () => {
  const sockserver = new WebSocketServer({ port: 6969 });
  sockserver.on("connection", (ws, req) => {
    console.log(req.headers["sec-websocket-key"]);
    console.log("New client connected!");

    ws.send("connection established");
    ws.on("close", () => console.log("Client has disconnected!"));
    ws.on("message", (data) => {
      sockserver.clients.forEach((client) => {
        console.log(`distributing message: ${data}`);

        client.send(`${data}`);
      });
    });
    ws.onerror = function () {
      console.log("websocket error");
    };
  });
};
