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

describe("GET /productos", () => {
    it("Verificar metodo obtener los productos", async () => {
        const res = await request(app).get("/productos")
        .set(header);
        expect(res.statusCode).toBe(200);
    });
});  

describe("POST /productos", () => {
    it("Agregar un producto", async () => {
        var body={
            "categoria_id":"63668e86eb962f48ce17799e",
            "nombre":"Pizza Veg",
            "descripcion":"Pizza con vegetales",
            "imagen":"assets/food-6.jpg",
            "precio": 150
        };
        const res = await request(app).post("/productos").send(body).set(header);
        expect(res.statusCode).toBe(201);
    });
});

describe("PUT /productos", () => {
    it("Error al actualizar un producto Inexistente", async () => {
        var body={
            "categoria_id":"63668e86eb962f48ce17799e",
            "nombre":"Pizza Veg1",
            "descripcion":"Pizza con vegetales",
            "imagen":"assets/food-6.jpg",
            "precio": 150,
            "_id":"asdasd",
            "activo":"true"
        };
        const res = await request(app).put("/productos").send(body).set(header);
        expect(res.statusCode).toBe(500);
    });
});

describe("GET /productos/id", () => {
    it("Error al obtener un producto por Id Inexistente", async () => {
        var id='sadasd';
        const res = await request(app).get("/productos/"+id).set(header);
        expect(res.statusCode).toBe(500);
    });
});

describe("DELETE /productos/id", () => {
    it("Error al borrar un producto por Id Inexistente", async () => {
        var id='sadasd';
        const res = await request(app).delete("/productos/"+id).set(header);
        expect(res.statusCode).toBe(500);
    });
});

describe("GET /productos/search/:parametroBusqueda", () => {
    it("Al buscar un producto por un Nombre Inexistente devuelve 0 resultados", async () => {
        var paramBusqueda='rererer';
        const res = await request(app).get("/productos/search/"+paramBusqueda).set(header);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(0);
    });
});