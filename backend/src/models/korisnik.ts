import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        tip: {
            type: String
        },
        brTelefona: {
            type: Number
        },
        boravisnaTaksa: {
            type: Number
        },
        registrovan: {
            type: Boolean
        }
    }
)

export default mongoose.model('Korisnik', Korisnik, 'korisnici');