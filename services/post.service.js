const pool = require("../db");

const getAllPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");

    return result.rows;
};

const getPostById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM posts WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllPosts,
    getPostById
};