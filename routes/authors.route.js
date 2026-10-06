const express = require("express");

const router = express.Router();

const authorsService = require("../services/authors.service");

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Obtener todos los autores
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Lista de autores obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", async (req, res) => {
    try {
        const authors = await authorsService.getAllAuthors();

        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los autores" });
    }
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Obtener un autor por ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del autor
 *     responses:
 *       200:
 *         description: Autor encontrado correctamente
 *       404:
 *         description: Autor no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el autor" });
    }
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Crear un nuevo autor
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gonzalo
 *               apellido:
 *                 type: string
 *                 example: Barbaglia
 *               email:
 *                 type: string
 *                 example: autor@correo.com
 *               bio:
 *                 type: string
 *                 example: Desarrollador Full Stack
 *     responses:
 *       201:
 *         description: Autor creado correctamente
 *       400:
 *         description: Datos inválidos o email ya existente
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    try {
        const author = await authorsService.createAuthor(req.body);

        res.status(201).json(author);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        res.status(500).json({ error: "Error al crear el autor" });
    }
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Actualizar un autor
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gonzalo
 *               apellido:
 *                 type: string
 *                 example: Barbaglia
 *               email:
 *                 type: string
 *                 example: autor@correo.com
 *               bio:
 *                 type: string
 *                 example: Desarrollador Full Stack
 *     responses:
 *       200:
 *         description: Autor actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Autor no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    try {
        const author = await authorsService.updateAuthor(id, req.body);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(200).json(author);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        res.status(500).json({ error: "Error al actualizar el autor" });
    }
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Eliminar un autor
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del autor
 *     responses:
 *       204:
 *         description: Autor eliminado correctamente
 *       404:
 *         description: Autor no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el autor" });
    }
});

module.exports = router;