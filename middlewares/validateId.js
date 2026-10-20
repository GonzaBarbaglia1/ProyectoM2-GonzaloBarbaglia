function validateId(req, res, next) {
    const id = req.params.id ?? req.params.authorId;

    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return res.status(400).json({
            error: "El ID debe ser un número entero positivo"
        });
    }

    next();
}

module.exports = validateId;