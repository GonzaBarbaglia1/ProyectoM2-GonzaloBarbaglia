const express = require("express");

const pool = require("./db"); 

const app = express();

const PORT = 3000;

app.use(express.json());

pool.query("SELECT NOW()")
    .then(() => {
        console.log("Conexión a PostgreSQL exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar con PostgreSQL:", error.message);
    });

app.get("/", (req, res) => {
    res.status(200).json({ message: "API funcionando correctamente" });
});

app.get("/authors", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM authors");

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los autores" });
    }
});

app.get("/authors/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            "SELECT * FROM authors WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el autor" });
    }
});

app.post("/authors", async (req, res) => {
    const { name, apellido, email, bio } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El nombre es obligatorio" });
}

    try {
        const result = await pool.query(
            "INSERT INTO authors (name, apellido, email, bio) VALUES ($1, $2, $3, $4) RETURNING *",
             [name, apellido, email, bio]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el autor" });
    }
});

app.put("/authors/:id", async (req, res) => {
    const id = req.params.id;
    const { name, apellido, email, bio } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    try {
        const result = await pool.query(
            `UPDATE authors
             SET name = $1, apellido = $2, email = $3, bio = $4
             WHERE id = $5
             RETURNING *`,
            [name, apellido, email, bio, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el autor" });
    }
});

app.delete("/authors/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            "DELETE FROM authors WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el autor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});