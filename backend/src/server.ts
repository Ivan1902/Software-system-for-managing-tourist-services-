import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import objekatRouter from './routes/objekat.routes';
import zahtevRouter from './routes/zahtev.routes';
import turistaRouter from './routes/turista.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Korisnik:123@diplomski.mmq1m.mongodb.net/diplomski?retryWrites=true&w=majority");
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log("Konekcija sa bazom je uspesna");
})

app.use('/uploads',express.static('src/uploads'));
app.use('/docs',express.static('src/docs'));

const router = express.Router();
router.use('/korisnici', korisnikRouter );
router.use('/objekti', objekatRouter);
router.use('/zahtevi', zahtevRouter);
router.use('/turisti', turistaRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));