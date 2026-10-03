const pool = require("../db");

const getAllAuthors = async () => {
    const result = await pool.query("SELECT * FROM authors");
    return result.rows;
};

const getAuthorById = async (id) => {
    const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
    return result.rows[0];
};

const createAuthor = async (authorData) => {
    const { name, apellido, email, bio } = authorData;
    const result = await pool.query(
        "INSERT INTO authors (name, apellido, email, bio) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, apellido, email, bio]
    );
    return result.rows[0];
};

const updateAuthor = async (id, authorData) => {
    const { name, apellido, email, bio } = authorData;
    const result = await pool.query(
        `UPDATE authors
         SET name = $1, apellido = $2, email = $3, bio = $4
         WHERE id = $5
         RETURNING *`,
        [name, apellido, email, bio, id]
    );
    return result.rows[0];
};

const deleteAuthor = async (id) => {
    const result = await pool.query("DELETE FROM authors WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};