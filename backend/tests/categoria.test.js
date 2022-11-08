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

describe("GET /categorias", () => {
    it("Verificar metodo obtener las categorias", async () => {
        const res = await request(app).get("/categorias")
        .set(header);
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /categorias", () => {
    it("Agregar una Categoria", async () => {
        var body={
            "nombre":"Test Categoria",
        };
        const res = await request(app).post("/categorias").send(body).set(header);
        expect(res.statusCode).toBe(201);
    });
});

describe("PUT /categorias", () => {
    it("Error al actualizar una categoria Inexistente", async () => {
        var body={
            "nombre":"Cambio Categoria",
            "_id":"asdasd",
        };
        const res = await request(app).put("/categorias").send(body).set(header);
        expect(res.statusCode).toBe(500);
    });
});

describe("GET /categorias/:categoriaId", () => {
    it("Devuelve vacio al obtener una categoria por Id Inexistente", async () => {
        var id='sadaadsasdsd';
        const res = await request(app).get("/categorias/"+id).set(header);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(null);
    });
});

describe("DELETE /:categoriaId", () => {
    it("Error al borrar una categoria por Id Inexistente", async () => {
        var id='sadasd';
        const res = await request(app).delete("/categorias/"+id).set(header);
        expect(res.statusCode).toBe(500);
    });
});

describe("GET /categorias/tags", () => {
    it("Al obtener los tags devuelve por defecto siempre uno", async () => {
        const res = await request(app).get("/categorias/tags").set(header);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /categorias/:categoriaId/productos", () => {
    it("Error al buscar los productos por un id de Categoria Inexistente", async () => {
        var id='sadaadsasdsd';
        const res = await request(app).get("/categorias/"+id+"/productos").set(header);
        expect(res.statusCode).toBe(500);
    });
});