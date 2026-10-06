const request = require("supertest");
const app = require("../app");

describe("Endpoints de Authors", () => {

    test("GET /authors debe devolver todos los autores", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /authors/:id debe devolver un autor", async () => {
        const response = await request(app).get("/authors/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
    });

    test("GET /authors/:id debe devolver 404 si el autor no existe", async () => {
        const response = await request(app).get("/authors/99999");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Autor no encontrado");
    });

    test("POST /authors debe devolver 400 si el nombre está vacío", async () => {
        const response = await request(app)
            .post("/authors")
            .send({
                name: "",
                apellido: "Prueba",
                email: "prueba@test.com",
                bio: "Autor de prueba"
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("El nombre es obligatorio");
    });

     test("Debe crear, actualizar y eliminar un autor de prueba", async () => {

    // 1. CREATE
    const createResponse = await request(app)
        .post("/authors")
        .send({
            name: "Autor",
            apellido: "Test",
            email: `autor.test.${Date.now()}@mail.com`,
            bio: "Autor creado por Supertest"
        });

    expect(createResponse.status).toBe(201);

    const authorId = createResponse.body.id;

    // 2. UPDATE
    const updateResponse = await request(app)
        .put(`/authors/${authorId}`)
        .send({
            name: "Autor Actualizado",
            apellido: "Test",
            email: createResponse.body.email,
            bio: "Autor actualizado por Supertest"
        });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Autor Actualizado");

    // 3. DELETE
    const deleteResponse = await request(app)
        .delete(`/authors/${authorId}`);

    expect(deleteResponse.status).toBe(204);
});
});