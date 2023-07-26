import express from "express";

import { PostController } from "./../controllers/post.controller";

const postController = new PostController();

const router = express.Router();

router.delete("/:id", postController.deletePostById);
router.get("/:userId", postController.getPostsByUserId);

export default router;
