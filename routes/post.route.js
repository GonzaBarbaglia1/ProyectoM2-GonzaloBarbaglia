const express = require("express");

const router = express.Router();

const postsService = require("../services/post.service");

router.get("/", async (req, res) => {
    try {
        const posts = await postsService.getAllPosts();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los posts" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const post = await postsService.getPostById(id);

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el post" });
    }
});

router.post("/", async (req, res) => {
    const { author_id, title, content } = req.body;

    if (!author_id || !title || !content) {
        return res.status(400).json({
            error: "author_id, title y content son obligatorios"
        });
    }

    try {
        const post = await postsService.createPost(req.body);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el post" });
    }
});

module.exports = router;