import { Request, Response } from "express";
import axios from "axios";

import { User } from "../entity/user.entity";
import { ResponseUtil } from "../utils/Response";
import { dbConnection } from "../utils/Connection";
import { Post } from "../entity/post.entity";

export class PostController {
  async getPostsByUserId(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const user = await dbConnection.getRepository(User).findOne({
      where: {
        id: parseInt(userId),
      },
      relations: ["posts"],
    });

    if (!user) {
      return ResponseUtil.sendError(res, "User not found", 404);
    }

    if (!user.posts.length) {
      const externalUserPosts = await axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => res.data);

      const postRepo = dbConnection.getRepository(Post);

      externalUserPosts.forEach(async (post: Post) => {
        await postRepo.save({
          ...post,
          user,
        });
      });

      return ResponseUtil.sendResponse(res, externalUserPosts, 200);
    }

    return ResponseUtil.sendResponse(res, user.posts, 200);
  }

  async deletePostById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repo = dbConnection.getRepository(Post);
    const post = await repo.findOne({
      where: {
        id: parseInt(id),
      },
      relations: ["user"],
    });

    const userId = post?.user.id;

    if (!post) {
      return ResponseUtil.sendError(res, "Post Not Found", 404);
    }

    await repo.remove(post);

    // Fetch updated user posts
    const user = await dbConnection.getRepository(User).findOne({
      where: {
        id: userId,
      },
      relations: ["posts"],
    });

    if (!user) {
      return ResponseUtil.sendError(res, "User not found", 404);
    }

    return ResponseUtil.sendResponse(res, user.posts, 200);
  }
}
