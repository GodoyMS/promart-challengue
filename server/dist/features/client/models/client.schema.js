"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    fatherSurname: { type: String, required: true },
    motherSurname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    bornDate: { type: Date, required: true },
    state: { type: String, required: true },
    active: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now() },
});
const ClientModel = (0, mongoose_1.model)('Client', clientSchema, 'Client');
exports.ClientModel = ClientModel;
//# sourceMappingURL=client.schema.js.map