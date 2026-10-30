require("dotenv").config();

const app = require("./app");
const pool = require("./db");

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        // 1. Comprobar la conexión a PostgreSQL
        await pool.query("SELECT NOW()");

        console.log("Conexión a PostgreSQL exitosa");

        // 2. Iniciar Express solo si la conexión funciona
        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });

    } catch (error) {
        // 3. Si falla la conexión, no iniciar el servidor
        console.error(
            "Error al conectar con PostgreSQL:",
            error.message
        );

        await pool.end();
        process.exitCode = 1;
    }
};

iniciarServidor();