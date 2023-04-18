import { Router } from "express";
import pg from "pg";
import { getUserByEmail, updateUserData } from "./services/user-service";
import config from "../config.json";
import { GenericError } from "./interfaces/error.interface";
import { getCoversetionsByUserID } from "./services/messages-service";
import { getChatByUserId } from "./services/chats-service";

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
  console.log(req.params)
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
  console.log(req.params)
  const userId = +req.params.userId
  const conversationUserId = +req.params.conversationUserId
  getChatByUserId(pool, userId, conversationUserId).then(
    (results) => {
      console.log(results)
      res.send(results);
    },
    (error: GenericError) => {
      res.status(error.status).json(error.message)
    }
  )
})



