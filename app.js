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

app.post("/authors", async (req, res) => {
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio" });
}

    try {
        const result = await pool.query(
            "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bio]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el autor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});