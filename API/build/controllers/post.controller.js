"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const axios_1 = __importDefault(require("axios"));
const user_entity_1 = require("../entity/user.entity");
const Response_1 = require("../utils/Response");
const Connection_1 = require("../utils/Connection");
const post_entity_1 = require("../entity/post.entity");
class PostController {
    getPostsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const user = yield Connection_1.dbConnection.getRepository(user_entity_1.User).findOne({
                where: {
                    id: parseInt(userId),
                },
                relations: ["posts"],
            });
            if (!user) {
                return Response_1.ResponseUtil.sendError(res, "User not found", 404);
            }
            if (!user.posts.length) {
                const externalUserPosts = yield axios_1.default
                    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                    .then((res) => res.data);
                const postRepo = Connection_1.dbConnection.getRepository(post_entity_1.Post);
                externalUserPosts.forEach((post) => __awaiter(this, void 0, void 0, function* () {
                    yield postRepo.save(Object.assign(Object.assign({}, post), { user }));
                }));
                return Response_1.ResponseUtil.sendResponse(res, externalUserPosts, 200);
            }
            return Response_1.ResponseUtil.sendResponse(res, user.posts, 200);
        });
    }
    deletePostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repo = Connection_1.dbConnection.getRepository(post_entity_1.Post);
            const post = yield repo.findOne({
                where: {
                    id: parseInt(id),
                },
                relations: ["user"],
            });
            const userId = post === null || post === void 0 ? void 0 : post.user.id;
            if (!post) {
                return Response_1.ResponseUtil.sendError(res, "Post Not Found", 404);
            }
            yield repo.remove(post);
            // Fetch updated user posts
            const user = yield Connection_1.dbConnection.getRepository(user_entity_1.User).findOne({
                where: {
                    id: userId,
                },
                relations: ["posts"],
            });
            if (!user) {
                return Response_1.ResponseUtil.sendError(res, "User not found", 404);
            }
            return Response_1.ResponseUtil.sendResponse(res, user.posts, 200);
        });
    }
}
exports.PostController = PostController;
