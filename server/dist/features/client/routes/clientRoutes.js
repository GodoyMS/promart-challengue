"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoutes = void 0;
const deleteClient_1 = require("@client/controllers/deleteClient");
const readClients_1 = require("@client/controllers/readClients");
const signUp_1 = require("@client/controllers/signUp");
const updateClient_1 = require("@client/controllers/updateClient");
const express_1 = __importDefault(require("express"));
class ClientRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        this.router.post('/clients/create', signUp_1.SignUpClient.prototype.create);
        this.router.get('/clients/read', readClients_1.ReadClient.prototype.read);
        this.router.delete('/clients/delete/:id', deleteClient_1.DeleteClient.prototype.deleteById);
        this.router.put('/clients/update-info/:id', updateClient_1.UpdateClient.prototype.updateById);
        this.router.put('/clients/update-state/:id', updateClient_1.UpdateClient.prototype.updateStateById);
        return this.router;
    }
}
exports.clientRoutes = new ClientRoutes();
//# sourceMappingURL=clientRoutes.js.map