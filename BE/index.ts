import express, { Errback, ErrorRequestHandler } from 'express';
import pg from 'pg'
import { getUserByEmail } from './service';
import config from './config.json'

const { Pool } = pg

const app = express();
const port = 3000;

const pool = new Pool(config.postgres)

//GET by EMAIL
app.get('/login/:email', async (req, res) => {
    const email = req.params.email
    try{
        const result = await getUserByEmail(pool, email )
        res.send(result)
    }catch (err: any) {
        res.status(err.status).json(err.message)
    }
    
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));