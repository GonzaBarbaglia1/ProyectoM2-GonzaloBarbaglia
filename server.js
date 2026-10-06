const app = require("./app");

const PORT = 3000;

const pool = require("./db");

pool.query("SELECT NOW()")
    .then(() => {
        console.log("Conexión a PostgreSQL exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar con PostgreSQL:", error.message);
    });

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});