import ws, { WebSocketServer } from "ws";
import config from "../config.json";
import pg from "pg";

import { updateUserData } from "./services/user-service";
const { Pool } = pg;
const pool = new Pool(config.postgres);

//map to assign websocket connection and user id
const map = new Map();

//open web socket connection
export const open = () => {
  const sockserver = new WebSocketServer({ port: 6969 });
  sockserver.on("connection", async (ws, req) => {
    //take user reference and websocket key from url and request header
    if (req.url && req.headers["sec-websocket-key"]) {
      console.log("New client connected!");
      const id = +req.url.substring(1);
      //update on DB
      const isUpdate = await updateUserData(
        pool,
        id,
        req.headers["sec-websocket-key"],
        new Date()
      );
      if (isUpdate) {
        map.set(id, ws);

        // ws.send("connection established");
        ws.on("close", () => console.log("Client has disconnected!"));
        ws.onerror = function () {
          console.log("websocket error");
        };
      }
    }
  });
};

// ws istance to send messages
export const send = (
  userId: number,
  conversationId: number,
  message: string
) => {
  const ws = map.get(conversationId);
  
  if (ws) {
    const data = {
      userId: userId,
      conversationId: conversationId,
      message: message,
    };

    ws.send(JSON.stringify(data));
  }
};

//3 param idutende messaggio id ricevente
//cerco su mappa istanza e si manda un json con il metodo send
