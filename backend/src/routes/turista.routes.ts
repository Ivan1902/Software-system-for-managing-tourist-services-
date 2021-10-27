import express from 'express';
import { TuristaController } from '../controllers/turisti.controller';

const turistaRouter = express.Router();

turistaRouter.route('/unosTuriste').post(
    (req, res)=> new TuristaController().unosTuriste(req, res)
)

turistaRouter.route('/dohvatiTuristeOvlascenogKorisnika').post(
    (req, res) => new TuristaController().dohvatiTuristeOvlascenogKorisnika(req, res)
)

turistaRouter.route('/izmeniTuristu').post(
    (req, res) => new TuristaController().izmeniTuristu(req, res)
)

turistaRouter.route('/ukloniTuristu').post(
    (req, res) => new TuristaController().ukloniTuristu(req, res)
)


export default turistaRouter;