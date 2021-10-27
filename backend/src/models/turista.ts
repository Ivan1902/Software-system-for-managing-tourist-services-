import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Turista = new Schema(
    {
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        godine: {
            type: Number
        },
        telefon: {
            type: Number
        },
        nocenje: {
            type: Number
        },
        lecenje: {
            type: Boolean
        },
        invaliditet: {
            type: Boolean
        },
        straniOslobodjen: {
            type: Boolean
        },
        objekat: {
            type: String
        },
        boravisnaTaksa: {
            type: Number
        },
        datum: {
            type: Date
        }
    }
)

export default mongoose.model('Turista', Turista, 'turisti');