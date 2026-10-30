const request = require("supertest");
const app = require("../app");
const pool = require("../db");

describe("Endpoints de Authors", () => {

test("GET /authors debe devolver todos los autores", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

test("GET /authors/:id debe devolver un autor", async () => {
    let authorId;

    try {
        const createResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor GET",
                apellido: "Test",
                email: `autor.get.${Date.now()}@test.com`,
                bio: "Autor creado para probar GET"
            });

        expect(createResponse.status).toBe(201);
        authorId = createResponse.body.id;

        const response = await request(app)
            .get(`/authors/${authorId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(authorId);
        expect(response.body.name).toBe("Autor GET");
        expect(response.body).toHaveProperty("email");

    } finally {
        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
});

test("GET /authors/:id debe devolver 404 si el autor no existe", async () => {
    let authorId;

    try {
        const createResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor Temporal",
                apellido: "Test",
                email: `autor.temporal.${Date.now()}@test.com`,
                bio: "Prueba de autor inexistente"
            });

        expect(createResponse.status).toBe(201);
        authorId = createResponse.body.id;

        const deleteResponse = await request(app)
            .delete(`/authors/${authorId}`);

        expect(deleteResponse.status).toBe(204);

        const response = await request(app)
            .get(`/authors/${authorId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Autor no encontrado");

    } finally {
        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
});

test("GET /authors/:id debe devolver 400 si el ID no es válido", async () => {
    const response = await request(app).get("/authors/abc");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("El ID debe ser un número entero positivo");
    });

test("POST /authors debe devolver 400 si el email tiene un formato inválido", async () => {
    const response = await request(app)
        .post("/authors")
        .send({
            name: "Autor Prueba",
            apellido: "Test",
            email: "correo-invalido",
            bio: "Prueba de validación de email"
        });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("El formato del email no es válido");
    });


test("POST /authors debe devolver 409 si el email ya existe", async () => {
    const email = `duplicado.${Date.now()}@test.com`;
    let authorId;

    try {
        // 1. Crear un autor de prueba
        const createResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor Original",
                apellido: "Test",
                email: email,
                bio: "Prueba de email duplicado"
            });

        expect(createResponse.status).toBe(201);
        authorId = createResponse.body.id;

        // 2. Intentar crear otro autor con el mismo email
        const response = await request(app)
            .post("/authors")
            .send({
                name: "Autor Duplicado",
                apellido: "Test",
                email: email,
                bio: "Prueba de email duplicado"
            });

        // 3. Comprobar el error 409
        expect(response.status).toBe(409);
        expect(response.body.error).toBe(
            "No se puede registrar el autor porque el email ya está registrado"
        );
    } finally {
        // 4. Eliminar el autor de prueba
        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
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

test("POST /authors debe devolver 400 si el JSON está malformado", async () => {
    const response = await request(app)
        .post("/authors")
        .set("Content-Type", "application/json")
        .send('{"name": "Autor Prueba", "email": "prueba@test.com"');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
        "El JSON enviado no tiene un formato válido"
    );
});

afterAll(async () => {
    await pool.end();
});
});