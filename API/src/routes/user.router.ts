import express from "express";

import { UserController } from "../controllers/user.controller";

const userController = new UserController();

const router = express.Router();

router.get("/", userController.getUsers);

export default router;
