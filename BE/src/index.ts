import express from "express";
import cors from "cors";
import { router } from "./controller";
import * as webSocket from "./websocket";

const server = () => {
  const app = express();
  const port = 3000;
  app.use(cors());

  app.use(router);

  app.listen(port, () => console.log(`Express app running on port ${port}!`));
};

//server
server()

//webSocket
webSocket.open()
