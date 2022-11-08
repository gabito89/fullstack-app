const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const UsuarioController = require('../controllers/usuario');

require("dotenv").config();

const user = UsuarioController.getLogin("prueba@prueba.com", "1234");
const loggedUser=UsuarioController.generateTokenReponse(user);
var UsuarioId="";
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

describe("POST /usuarios/registro", () => {
    it("Registra un usuario nuevo", async () => {
        var body={
            "email":"testing@test.com",
            "nombre":"Usuario Test",
            "direccion":"Prueba Direccion",
            "clave":"123456"
        };
        const res = await request(app).post("/usuarios/registro").send(body).set(header);
        expect(res.statusCode).toBe(201);
        UsuarioId=res.body.id;
    });
});

describe("POST /usuarios/login", () => {
    it("Testear login de usuario creado", async () => {
        var body={
            "email":"testing@test.com",
            "clave":"123456"
        };
        const res = await request(app).post("/usuarios/login").send(body).set(header);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(UsuarioId);
    });
});

describe("PUT /usuarios", () => {
    it("Actualizar Usuario Creado", async () => {
        var body={
            "_id":UsuarioId,
            "email":"testing@test.com",
            "nombre":"Usuario Test Cambio",
            "direccion":"Prueba Direccion Cambio",
            "clave":"12345678"
        };
        const res = await request(app).put("/usuarios").send(body).set(header);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(UsuarioId);
        expect(res.body.nombre).toBe("Usuario Test Cambio");
    });
});

describe("GET /usuarios/:usuarioId", () => {
    it("Obtener el Usuario Cargado", async () => {
        const res = await request(app).get("/usuarios/"+UsuarioId).set(header);
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /usuarios/:usuarioId", () => {
    it("Borrar el Usuario Cargado", async () => {
        const res = await request(app).delete("/usuarios/"+UsuarioId).set(header);
        expect(res.statusCode).toBe(200);
    });
});