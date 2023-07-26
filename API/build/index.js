"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const post_router_1 = __importDefault(require("./routes/post.router"));
const Connection_1 = require("./utils/Connection");
const ErrorHandler_1 = require("./utils/ErrorHandler");
Connection_1.dbConnection
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use("/users", ErrorHandler_1.ErrorHandler.handleErrors(user_router_1.default));
app.use("/posts", ErrorHandler_1.ErrorHandler.handleErrors(post_router_1.default));
app.all("*", (req, res) => {
    return res.status(404).send({
        success: false,
        message: "Invalid route",
    });
});
// Define a middleware function to handle errors
app.use((err, req, res, next) => {
    return res.status(500).send({
        success: false,
        message: "Internal server error",
    });
});
const port = 8000;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
