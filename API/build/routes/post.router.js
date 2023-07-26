"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./../controllers/post.controller");
const postController = new post_controller_1.PostController();
const router = express_1.default.Router();
router.delete("/:id", postController.deletePostById);
router.get("/:userId", postController.getPostsByUserId);
exports.default = router;
