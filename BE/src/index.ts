import express from 'express';
import pg from 'pg'
import { getUserByEmail } from './service';
import config from '../config.json'
import { GenericError } from './interfaces/error.interface';
import cors from 'cors';

const { Pool } = pg

const app = express();
const port = 3000;
app.use(cors());

const pool = new Pool(config.postgres)

//GET by EMAIL
app.get("/login/:email", async (req, res) => {
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

app.listen(port, () => console.log(`Express app running on port ${port}!`));