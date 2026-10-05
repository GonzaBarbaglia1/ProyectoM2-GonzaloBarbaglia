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

const createPost = async (postData) => {
    const { author_id, title, content, published = false } = postData;

    const result = await pool.query(
        `INSERT INTO posts (author_id, title, content, published)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [author_id, title, content, published]
    );

    return result.rows[0];
};

const updatePost = async (id, postData) => {
    const { author_id, title, content, published } = postData;

    const result = await pool.query(
        `UPDATE posts
         SET author_id = $1, title = $2, content = $3, published = $4
         WHERE id = $5
         RETURNING *`,
        [author_id, title, content, published, id]
    );

    return result.rows[0];
};

const deletePost = async (id) => {
    const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

const getPostsByAuthor = async (authorId) => {
    const result = await pool.query(
        `SELECT
            posts.id,
            posts.title,
            posts.content,
            posts.published,
            posts.created_at,
            authors.id AS author_id,
            authors.name AS author_name,
            authors.apellido AS author_apellido,
            authors.email AS author_email
         FROM posts
         JOIN authors ON posts.author_id = authors.id
         WHERE authors.id = $1`,
        [authorId]
    );

    return result.rows;
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostsByAuthor
};