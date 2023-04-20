import { Router } from "express";
import pg from "pg";
import { getUserByEmail, updateUserData } from "./services/user-service";
import config from "../config.json";
import { GenericError } from "./interfaces/error.interface";
import { getCoversetionsByUserID } from "./services/messages-service";
import { getChatByUserId, postChatByUserId } from "./services/chats-service";
import * as webSocket from "./websocket";

const { Pool } = pg;
export const router = Router();
const pool = new Pool(config.postgres);

//getUserByEmail
router.get("/login/:email", async (req, res) => {
  const email = req.params.email;
  getUserByEmail(pool, email).then(
    (result) => {
      res.send(result);
    },
    (error: GenericError) => {
      res.status(error.status).json(error.message);
    }
  );
});

router.get("/message/:id", async (req, res) => {
 
  const id = +req.params.id
  getCoversetionsByUserID(pool, id).then(
    (results) => {
      res.send(results);
    },
    (error: GenericError) => {
      res.status(error.status).json(error.message)
    }
  )
})

router.get("/chat/:userId/:conversationUserId", async (req, res) => {
  const userId = +req.params.userId
  const conversationUserId = +req.params.conversationUserId
  getChatByUserId(pool, userId, conversationUserId).then(
    (results) => {
      res.send(results);
    },
    (error: GenericError) => {
      res.status(error.status).json(error.message)
    }
  )
})

router.post("/chat/:userId/:conversationUserId",async (req, res) => {
  const userId = +req.params.userId
  const conversationUserId = +req.params.conversationUserId
  const date = new Date()
  const text  = req.body.text
  postChatByUserId(pool, userId, conversationUserId, date, text).then(
    (results)=> {
      res.send(results)
      webSocket.send(userId, conversationUserId, text)

    },
    (error: GenericError) => {
      res.status(error.status).json(error.message)

    }
  )
})



