const express = require("express");

const router = express.Router();

const postsService = require("../services/post.service");

const validateId = require("../middlewares/validateId");

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todos los posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Lista de posts obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */


router.get("/", async (req, res, next) => {
    try {
        const posts = await postsService.getAllPosts();

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts/author/{authorId}:
 *   get:
 *     summary: Obtener los posts de un autor con los datos del autor
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del autor
 *     responses:
 *       200:
 *         description: Posts del autor obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */


router.get("/author/:authorId", validateId, async (req, res, next) => {
    const authorId = req.params.authorId;

    try {
        const posts = await postsService.getPostsByAuthor(authorId);

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener un post por ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Post encontrado correctamente
 *       400:
 *         description: El ID debe ser un número entero positivo
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id", validateId, async (req, res, next) => {
    const id = req.params.id;

    try {
        const post = await postsService.getPostById(id);

        if (!post) {
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear un nuevo post
 *     description: Crea una publicación asociada a un autor existente. El campo published es opcional y, si se omite, toma el valor false.
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author_id
 *               - title
 *               - content
 *             properties:
 *               author_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Mi primer post
 *               content:
 *                 type: string
 *                 example: Contenido del post
 *               published:
 *                 type: boolean
 *                 default: false
 *                 description: Indica si el post está publicado. Solo acepta true o false.
 *                 example: false
 *     responses:
 *       201:
 *         description: Post creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 author_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 published:
 *                   type: boolean
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Faltan datos obligatorios, published no es booleano o el autor indicado no existe
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", async (req, res, next) => {
    const { author_id, title, content } = req.body;

    if (!author_id || !title || !content) {
        return res.status(400).json({
            error: "author_id, title y content son obligatorios"
        });
    }
    if (
    req.body.published !== undefined &&
    typeof req.body.published !== "boolean"
    ) {
    return res.status(400).json({
        error: "El campo published debe ser true o false"
    });
    }
    try {
        const post = await postsService.createPost(req.body);

        res.status(201).json(post);
    } catch (error) {
    if (error.code === "23503") {
        error.operation = "createPost";
    }

    next(error);
}
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Post actualizado
 *               content:
 *                 type: string
 *                 example: Contenido actualizado
 *               published:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Post actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.put("/:id", validateId, async (req, res, next) => {
    const id = req.params.id;
    const { author_id, title, content } = req.body;

    if (!author_id || !title || !content) {
        return res.status(400).json({
            error: "author_id, title y content son obligatorios"
        });
    }
    if (
    req.body.published !== undefined &&
    typeof req.body.published !== "boolean"
    )   {
    return res.status(400).json({
        error: "El campo published debe ser true o false"
    });
    }

    try {
        const post = await postsService.updatePost(id, req.body);

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

        res.status(200).json(post);
    } catch (error) {
    if (error.code === "23503") {
        error.operation = "updatePost";
    }

    next(error);
}
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar un post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       204:
 *         description: Post eliminado correctamente
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:id", validateId, async (req, res, next) => {
    const id = req.params.id;

    try {
        const post = await postsService.deletePost(id);

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

       res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;