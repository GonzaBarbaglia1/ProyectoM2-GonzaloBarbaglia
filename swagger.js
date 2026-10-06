const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Proyecto M2 - API REST",
            version: "1.0.0",
            description: "API REST de autores y posts desarrollada con Node.js, Express y PostgreSQL"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            },
            {
                url: "https://proyectom2-gonzalobarbaglia-production.up.railway.app",
                description: "Servidor Railway"
            }
        ]
    },

    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;