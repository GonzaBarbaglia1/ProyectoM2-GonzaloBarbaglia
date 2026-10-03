const express = require("express");

const pool = require("./db");

const authorsRouter = require("./routes/authors.route");

const postsRouter = require("./routes/post.route");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/authors", authorsRouter);

app.use("/posts", postsRouter);

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

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});