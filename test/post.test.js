const request = require("supertest");
const app = require("../app");

describe("Endpoints de Posts", () => {

    test("GET /posts debe devolver todos los posts", async () => {
        const response = await request(app).get("/posts");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

test("GET /posts/:id debe devolver un post", async () => {
    let authorId;
    let postId;

    try {
        const authorResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor Posts",
                apellido: "Test",
                email: `autor.posts.${Date.now()}@test.com`,
                bio: "Autor creado para probar GET posts"
            });

        expect(authorResponse.status).toBe(201);
        authorId = authorResponse.body.id;

        const postResponse = await request(app)
            .post("/posts")
            .send({
                author_id: authorId,
                title: "Post de prueba GET",
                content: "Contenido de prueba",
                published: false
            });

        expect(postResponse.status).toBe(201);
        postId = postResponse.body.id;

        const response = await request(app)
            .get(`/posts/${postId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(postId);
        expect(response.body.title).toBe("Post de prueba GET");
        expect(response.body.author_id).toBe(authorId);
        expect(response.body).toHaveProperty("content");

    } finally {
        if (postId) {
            await request(app).delete(`/posts/${postId}`);
        }

        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
});

test("GET /posts/:id debe devolver 404 si el post no existe", async () => {
    let authorId;
    let postId;

    try {
        const authorResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor Temporal",
                apellido: "Test",
                email: `autor.temporal.${Date.now()}@test.com`,
                bio: "Prueba de post inexistente"
            });

        expect(authorResponse.status).toBe(201);
        authorId = authorResponse.body.id;

        const postResponse = await request(app)
            .post("/posts")
            .send({
                author_id: authorId,
                title: "Post Temporal",
                content: "Post creado para probar el error 404",
                published: false
            });

        expect(postResponse.status).toBe(201);
        postId = postResponse.body.id;

        const deleteResponse = await request(app)
            .delete(`/posts/${postId}`);

        expect(deleteResponse.status).toBe(204);

        const response = await request(app)
            .get(`/posts/${postId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Post no encontrado");

    } finally {
        if (postId) {
            await request(app).delete(`/posts/${postId}`);
        }

        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
});
test("GET /posts/author/:authorId debe devolver los posts del autor", async () => {
    let authorId;
    let postId;

    try {
        const authorResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor Publicaciones",
                apellido: "Test",
                email: `autor.publicaciones.${Date.now()}@test.com`,
                bio: "Autor para probar sus publicaciones"
            });

        expect(authorResponse.status).toBe(201);
        authorId = authorResponse.body.id;

        const postResponse = await request(app)
            .post("/posts")
            .send({
                author_id: authorId,
                title: "Publicación del autor",
                content: "Contenido de prueba",
                published: true
            });

        expect(postResponse.status).toBe(201);
        postId = postResponse.body.id;

        const response = await request(app)
            .get(`/posts/author/${authorId}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const postEncontrado = response.body.find(
            post => post.id === postId
        );

        expect(postEncontrado).toBeDefined();
        expect(postEncontrado.author_id).toBe(authorId);
        expect(postEncontrado.title).toBe("Publicación del autor");

    } finally {
        if (postId) {
            await request(app).delete(`/posts/${postId}`);
        }

        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
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
    let authorId;
    let postId;

    try {
        const authorResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor CRUD",
                apellido: "Test",
                email: `autor.crud.${Date.now()}@test.com`,
                bio: "Autor para probar el CRUD de posts"
            });

        expect(authorResponse.status).toBe(201);
        authorId = authorResponse.body.id;

        const createResponse = await request(app)
            .post("/posts")
            .send({
                author_id: authorId,
                title: "Post Test",
                content: "Post creado por Supertest",
                published: false
            });

        expect(createResponse.status).toBe(201);
        postId = createResponse.body.id;

        const updateResponse = await request(app)
            .put(`/posts/${postId}`)
            .send({
                author_id: authorId,
                title: "Post Test Actualizado",
                content: "Post actualizado por Supertest",
                published: true
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.title).toBe("Post Test Actualizado");
        expect(updateResponse.body.published).toBe(true);

        const deleteResponse = await request(app)
            .delete(`/posts/${postId}`);

        expect(deleteResponse.status).toBe(204);

    } finally {
        if (postId) {
            await request(app).delete(`/posts/${postId}`);
        }

        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
});

test("POST /posts debe devolver 400 si el autor no existe", async () => {
    let authorId;

    try {
        const authorResponse = await request(app)
            .post("/authors")
            .send({
                name: "Autor Inexistente",
                apellido: "Test",
                email: `autor.inexistente.${Date.now()}@test.com`,
                bio: "Prueba de autor eliminado"
            });

        expect(authorResponse.status).toBe(201);
        authorId = authorResponse.body.id;

        const deleteResponse = await request(app)
            .delete(`/authors/${authorId}`);

        expect(deleteResponse.status).toBe(204);

        const response = await request(app)
            .post("/posts")
            .send({
                author_id: authorId,
                title: "Publicación de prueba",
                content: "Probando un autor inexistente",
                published: true
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe(
            "El autor indicado no existe"
        );

    } finally {
        if (authorId) {
            await request(app).delete(`/authors/${authorId}`);
        }
    }
});

test("GET /posts/:id debe devolver 400 si el ID no es válido", async () => {
    const response = await request(app).get("/posts/abc");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
        "El ID debe ser un número entero positivo"
    );
});
test("POST /posts devuelve 400 si published es null", async () => {
    const response = await request(app)
        .post("/posts")
        .send({
            author_id: 1,
            title: "Prueba published",
            content: "Validación de valor nulo",
            published: null
        });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        error: "El campo published debe ser true o false"
    });
});
test("PUT /posts/:id devuelve 400 si published es null", async () => {
    const response = await request(app)
        .put("/posts/1")
        .send({
            author_id: 1,
            title: "Post actualizado",
            content: "Probando published null",
            published: null
        });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        error: "El campo published debe ser true o false"
    });
});
});