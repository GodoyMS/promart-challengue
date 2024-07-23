"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientState = exports.updateClientSchemeValidation = void 0;
const clientDocument_interface_1 = require("@client/interfaces/clientDocument.interface");
const joi_1 = __importDefault(require("joi"));
const updateClientSchemeValidation = joi_1.default.object().keys({
    name: joi_1.default.string().optional().min(2).max(50).messages({
        'string.base': 'name must be of type string',
        'string.min': 'Invalid name',
        'string.max': 'Invalid name',
    }),
    fatherSurname: joi_1.default.string().optional().min(2).max(30).messages({
        'string.base': 'Father Surname must be of type string',
        'string.min': 'Invalid Father Surname',
        'string.max': 'Invalid Father Surname',
    }),
    motherSurname: joi_1.default.string().optional().max(50).messages({
        'string.min': 'Invalid Mother Surname',
        'string.max': 'Invalid Mother Surname',
    }),
    email: joi_1.default.string().email().optional().max(100).messages({
        'string.base': 'email must be type email',
        'string.min': 'Invalid email',
        'string.max': 'Invalid email',
    }),
    bornDate: joi_1.default.date().optional().messages({
        'string.base': 'BornDate must be of type date',
    }),
});
exports.updateClientSchemeValidation = updateClientSchemeValidation;
const updateClientState = joi_1.default.object().keys({
    state: joi_1.default.string().valid(clientDocument_interface_1.CLIENTSTATUS.INACTIVO, clientDocument_interface_1.CLIENTSTATUS.ACTIVO, clientDocument_interface_1.CLIENTSTATUS.BLOQUEADO).required().min(2).max(15).messages({
        'string.base': 'state must be of type string',
        'string.min': 'Invalid state',
        'string.max': 'Invalid name',
    }),
});
exports.updateClientState = updateClientState;
//# sourceMappingURL=update.js.map