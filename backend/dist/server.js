"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const objekat_routes_1 = __importDefault(require("./routes/objekat.routes"));
const zahtev_routes_1 = __importDefault(require("./routes/zahtev.routes"));
const turista_routes_1 = __importDefault(require("./routes/turista.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb+srv://Korisnik:123@diplomski.mmq1m.mongodb.net/diplomski?retryWrites=true&w=majority");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Konekcija sa bazom je uspesna");
});
app.use('/uploads', express_1.default.static('src/uploads'));
app.use('/docs', express_1.default.static('src/docs'));
const router = express_1.default.Router();
router.use('/korisnici', korisnik_routes_1.default);
router.use('/objekti', objekat_routes_1.default);
router.use('/zahtevi', zahtev_routes_1.default);
router.use('/turisti', turista_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map