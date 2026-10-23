const fs = require("fs");
const YAML = require("yaml");
const swaggerSpec = require("./swagger");

const contenido = YAML.stringify(swaggerSpec);

fs.writeFileSync("openapi.yaml", contenido, "utf8");

console.log("Archivo openapi.yaml generado correctamente");
