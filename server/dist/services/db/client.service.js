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
exports.clientsDbService = void 0;
const client_schema_1 = require("@client/models/client.schema");
const mongoose_1 = __importDefault(require("mongoose"));
class ClientsDbService {
    createClient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProduct = yield client_schema_1.ClientModel.create(data);
            return createdProduct;
        });
    }
    getClientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientExists = (yield client_schema_1.ClientModel.findOne({
                email,
            }).exec());
            return clientExists;
        });
    }
    getClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientExists = (yield client_schema_1.ClientModel.findOne({
                _id: id,
            }).exec());
            return clientExists;
        });
    }
    getAllClients(_a) {
        return __awaiter(this, arguments, void 0, function* ({ skip, limit, id }) {
            let query = { active: true };
            if (id) {
                if (mongoose_1.default.Types.ObjectId.isValid(id)) {
                    query._id = new mongoose_1.default.Types.ObjectId(id);
                }
                else {
                    // Return empty result if the id is not valid
                    return { docs: [], total: 0 };
                }
            }
            const [docs, total] = yield Promise.all([
                client_schema_1.ClientModel.find(query).skip(skip).limit(limit).exec(),
                client_schema_1.ClientModel.countDocuments(query),
            ]);
            return { docs, total };
        });
    }
    deleteClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = (yield client_schema_1.ClientModel.findByIdAndUpdate(id, { active: false }, {
                new: true,
            }).exec());
            return client;
        });
    }
    updateClientById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = (yield client_schema_1.ClientModel.findByIdAndUpdate(data.clientId, data.value, {
                new: true,
            }).exec());
            return client;
        });
    }
    updateClientStateById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = (yield client_schema_1.ClientModel.findByIdAndUpdate(data.clientId, { state: data.state }, {
                new: true,
            }).exec());
            return client;
        });
    }
}
exports.clientsDbService = new ClientsDbService();
//# sourceMappingURL=client.service.js.map