const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const UsuarioController = require('../controllers/usuario');

require("dotenv").config();


var loggedUser="";
var header=null;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await UsuarioController.getLogin("prueba@prueba.com", "1234");
    this.loggedUser= await UsuarioController.generateTokenReponse(user);
    this.header={"authorization":this.loggedUser.token,"user":this.loggedUser,};
});

afterAll(async () => {
await mongoose.connection.close();
});

describe("GET /pedidos", () => {
    it("Verificar que el Usuario Actual no tiene pedidos", async () => {
        const res = await request(app).get("/pedidos").send(this.loggedUser).set(this.header);
        expect(res.statusCode).toBe(404);
    });
});