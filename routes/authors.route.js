const express = require("express");

const router = express.Router();

const authorsService = require("../services/authors.service");

const validateId = require("../middlewares/validateId");

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

router.get("/", async (req, res, next) => {
    try {
        const authors = await authorsService.getAllAuthors();

        res.status(200).json(authors);
    } catch (error) {
        next(error);
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

router.get("/:id", validateId, async (req, res, next) => {
    const id = req.params.id;

    try {
        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(200).json(author);
    } catch (error) {
        next(error);
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

    router.post("/", async (req, res, next) => {
    const { name, email } = req.body;

    // Validar nombre obligatorio
    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }

    // Validar email obligatorio
    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({
            error: "El email es obligatorio"
        });
    }

    // Validar formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "El formato del email no es válido"
        });
    }

    try {
        const author = await authorsService.createAuthor(req.body);

        res.status(201).json(author);
  } catch (error) {
    next(error);
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

router.put("/:id", validateId, async (req, res, next) => {
    const id = req.params.id;

const { name, email } = req.body;

// Validar nombre obligatorio
if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
        error: "El nombre es obligatorio"
    });
}

// Validar email obligatorio
if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
        error: "El email es obligatorio"
    });
}

// Validar formato del email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        error: "El formato del email no es válido"
    });
}

    try {
        const author = await authorsService.updateAuthor(id, req.body);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(200).json(author);
        
      } catch (error) {
        next(error);
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

router.delete("/:id", validateId, async (req, res, next) => {
    const id = req.params.id;

    try {
        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;