import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/login').post(
    (req, res)=> new KorisnikController().login(req, res)
)

korisnikRouter.route('/dohvatiUgostitelje').get(
    (req, res)=> new KorisnikController().dohvatiUgostitelje(req, res)
)

korisnikRouter.route('/dodajUgostitelja').post(
    (req, res)=> new KorisnikController().dodajUgostitelja(req, res)
)

korisnikRouter.route('/ukloniKorisnika').post(
    (req, res) => new KorisnikController().ukloniKorisnika(req, res)
)

korisnikRouter.route('/dohvatiOvlascene').get(
    (req, res) => new KorisnikController().dohvatiOvlascene(req, res)
)

korisnikRouter.route('/dohvatiSveKorisnike').get(
    (req, res) => new KorisnikController().dohvatiSveKorisnike(req, res)
)

korisnikRouter.route('/izmeniKorisnika').post(
    (req, res) => new KorisnikController().izmeniKorisnika(req, res)
)

korisnikRouter.route('/uplacenaBoravisnaTaksa').post(
    (req, res) => new KorisnikController().uplacenaBoravisnaTaksa(req, res)
)

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => new KorisnikController().dohvatiKorisnika(req, res)
)

export default korisnikRouter;