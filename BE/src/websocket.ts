import { WebSocketServer } from "ws";
import config from "../config.json";
import pg from "pg";

import { updateUserData } from "./services/user-service";
const { Pool } = pg;
const pool = new Pool(config.postgres);

const map = new Map();

export const open = () => {
  const sockserver = new WebSocketServer({ port: 6969 });
  sockserver.on("connection", async (ws, req) => {
    if (req.url && req.headers["sec-websocket-key"]) {
      console.log("New client connected!");
      const id = +req.url.substring(1);

      const isUpdate = await updateUserData(
        pool,
        id,
        req.headers["sec-websocket-key"],
        new Date()
      );
      if (isUpdate) {
        map.set(id, ws);

        ws.send("connection established");
        ws.on("close", () => console.log("Client has disconnected!"));
        ws.onerror = function () {
          console.log("websocket error");
        };
      }
     
    }
  });
};
