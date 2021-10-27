import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Objekat = new Schema(
    {
        naziv: {
            type: String
        },
        adresa: {
            type: String
        },
        grad: {
            type: String
        },
        opis:{
            type: String
        },
        slike: {
            type: Array
        },
        username:{
            type: String
        },
        kategorizovan:{
            type: Boolean
        },
        vrsta: {
            type: String
        },
        poslatZahtev: {
            type: Boolean
        },
        ovlasceni: {
            type: Array
        },
        zvezdice: {
            type: Number
        }
    }
)

export default mongoose.model('Objekat', Objekat, 'objekti');