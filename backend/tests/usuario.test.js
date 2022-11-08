const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const UsuarioController = require('../controllers/usuario');

require("dotenv").config();

const user = UsuarioController.getLogin("prueba@prueba.com", "1234");
const loggedUser=UsuarioController.generateTokenReponse(user);
var header={
    "authorization":loggedUser.token,
}

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
await mongoose.connection.close();
});

describe("GET /usuarios", () => {
    it("Obtener todos los usuarios", async () => {
        const res = await request(app).get("/usuarios")
        .set(header);
        expect(res.statusCode).toBe(200);
    });
});