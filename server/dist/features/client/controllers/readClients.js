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
exports.ReadClient = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const client_service_1 = require("@services/db/client.service");
class ReadClient {
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 15;
            const id = req.query.id;
            const skip = (page - 1) * limit;
            const { docs, total } = yield client_service_1.clientsDbService.getAllClients({
                skip,
                limit,
                id: id ? id : undefined
            });
            const totalPages = Math.ceil(total / limit);
            const hasNextPage = page < totalPages;
            const hasPrevPage = page > 1;
            res.status(http_status_codes_1.default.OK).json({
                docs,
                total,
                hasPrevPage,
                hasNextPage,
                totalPages,
            });
        });
    }
}
exports.ReadClient = ReadClient;
//# sourceMappingURL=readClients.js.map