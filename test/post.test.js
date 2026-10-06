const request = require("supertest");
const app = require("../app");

describe("Endpoints de Posts", () => {

    test("GET /posts debe devolver todos los posts", async () => {
        const response = await request(app).get("/posts");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /posts/:id debe devolver un post", async () => {
        const response = await request(app).get("/posts/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("content");
        expect(response.body).toHaveProperty("author_id");
    });

    test("GET /posts/:id debe devolver 404 si el post no existe", async () => {
        const response = await request(app).get("/posts/99999");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Post no encontrado");
    });

    test("GET /posts/author/:authorId debe devolver los posts del autor", async () => {
        const response = await request(app).get("/posts/author/1");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /posts debe devolver 400 si faltan datos obligatorios", async () => {
        const response = await request(app)
            .post("/posts")
            .send({
                author_id: 1,
                title: ""
            });

        expect(response.status).toBe(400);
    });
    
    test("Debe crear, actualizar y eliminar un post de prueba", async () => {

    // 1. CREATE
    const createResponse = await request(app)
        .post("/posts")
        .send({
            author_id: 1,
            title: "Post Test",
            content: "Post creado por Supertest",
            published: false
        });

    expect(createResponse.status).toBe(201);

    const postId = createResponse.body.id;

    // 2. UPDATE
    const updateResponse = await request(app)
        .put(`/posts/${postId}`)
        .send({
            author_id: 1,
            title: "Post Test Actualizado",
            content: "Post actualizado por Supertest",
            published: true
        });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe("Post Test Actualizado");

    // 3. DELETE
    const deleteResponse = await request(app)
        .delete(`/posts/${postId}`);

    expect(deleteResponse.status).toBe(204);
});
});