function errorHandler(err, req, res, next) {
    console.error(err);

    // 1. JSON inválido
    
    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        return res.status(400).json({
            error: "El JSON enviado no tiene un formato válido"
        });
    }

    // 2. PostgreSQL: email duplicado

    if (err.code === "23505") {
        return res.status(409).json({
            error: "No se puede registrar el autor porque el email ya está registrado"
        });
    }

    // 3. PostgreSQL: error de clave foránea

    if (err.code === "23503") {
        if (err.operation === "createPost" || err.operation === "updatePost") {
            return res.status(400).json({
                error: "El autor indicado no existe"
            });
        }

        if (err.operation === "deleteAuthor") {
            return res.status(409).json({
                error: "No se puede eliminar el autor porque tiene publicaciones asociadas"
            });
        }

        return res.status(400).json({
            error: "La referencia indicada no es válida"
        });
    }

    // 4. PostgreSQL: formato de dato inválido

    if (err.code === "22P02") {
        if (err.field === "id" || err.field === "authorId") {
            return res.status(400).json({
                error: "El ID debe ser un número entero positivo"
            });
        }

        return res.status(400).json({
            error: "Uno de los datos enviados tiene un formato inválido"
        });
    }

    // 5. Errores inesperados del servidor

    return res.status(500).json({
        error: "Error interno del servidor"
    });
}

module.exports = errorHandler;