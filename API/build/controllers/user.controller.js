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
exports.UserController = void 0;
const axios_1 = __importDefault(require("axios"));
const user_entity_1 = require("../entity/user.entity");
const Response_1 = require("../utils/Response");
const Connection_1 = require("../utils/Connection");
const address_entity_1 = require("../entity/address.entity");
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield Connection_1.dbConnection.getRepository(user_entity_1.User).find({
                relations: ["address"],
            });
            if (!users.length) {
                const externalUsers = yield axios_1.default
                    .get("https://jsonplaceholder.typicode.com/users")
                    .then((res) => res.data);
                const userRepo = Connection_1.dbConnection.getRepository(user_entity_1.User);
                const addressRepo = Connection_1.dbConnection.getRepository(address_entity_1.Address);
                externalUsers.forEach((eu) => __awaiter(this, void 0, void 0, function* () {
                    const address = yield addressRepo.save(eu.address);
                    yield userRepo.save(Object.assign(Object.assign({}, eu), { address }));
                }));
                return Response_1.ResponseUtil.sendResponse(res, externalUsers, 200);
            }
            return Response_1.ResponseUtil.sendResponse(res, users, 200);
        });
    }
}
exports.UserController = UserController;
