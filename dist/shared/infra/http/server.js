"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var celebrate_1 = require("celebrate");
require("reflect-metadata");
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes/index"));
var upload_1 = __importDefault(require("../../../config/upload"));
require("../typeorm/index");
var AppError_1 = __importDefault(require("../../errors/AppError"));
require("../typeorm/index");
require("../../container/index");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(process.env.PORT || 3333, function () {
    console.log("SERVIDOR LIGOU");
});
