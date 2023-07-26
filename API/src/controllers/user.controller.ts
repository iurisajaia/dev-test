import { Request, Response } from "express";
import axios from "axios";

import { User } from "../entity/user.entity";
import { ResponseUtil } from "../utils/Response";
import { dbConnection } from "../utils/Connection";
import { Address } from "../entity/address.entity";

export class UserController {
  async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await dbConnection.getRepository(User).find({
      relations: ["address"],
    });

    if (!users.length) {
      const externalUsers = await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.data);

      const userRepo = dbConnection.getRepository(User);
      const addressRepo = dbConnection.getRepository(Address);

      externalUsers.forEach(async (eu: User) => {
        const address = await addressRepo.save(eu.address);
        await userRepo.save({
          ...eu,
          address,
        });
      });

      return ResponseUtil.sendResponse(res, externalUsers, 200);
    }
    return ResponseUtil.sendResponse(res, users, 200);
  }
}
