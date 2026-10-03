const express = require("express");

const router = express.Router();

const authorsService = require("../services/authors.service");

router.get("/", async (req, res) => {
    try {
        const authors = await authorsService.getAllAuthors();

        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los autores" });
    }
});

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