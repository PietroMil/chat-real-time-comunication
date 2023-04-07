import express from 'express';
import pg from 'pg'
import { getUserByEmail } from './service.js';
import config from './config.json' assert { type: "json" };

const { Pool } = pg

const app = express();
const port = 3000;

const pool = new Pool(config.postgres)

//GET by EMAIL
app.get('/login/:email', async (req, res) => {
    const email = req.params.email
    try{
        const result = await getUserByEmail(req, res, pool, email )
        res.send(result)
    }catch (err) {
        res.status(err)
    }
    
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));