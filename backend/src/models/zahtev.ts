import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema(
    {
        username: {
            type: String
        },
        naziv: {
            type: String
        },
        formular: {
            type: String
        }
    }
)

export default mongoose.model('Zahtev', Zahtev, 'zahtevi');