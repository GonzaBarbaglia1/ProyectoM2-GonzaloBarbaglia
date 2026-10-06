const express = require("express");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

const authorsRouter = require("./routes/authors.route");

const postsRouter = require("./routes/post.route");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/authors", authorsRouter);

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.status(200).json({ message: "API funcionando correctamente" });
});

module.exports = app;