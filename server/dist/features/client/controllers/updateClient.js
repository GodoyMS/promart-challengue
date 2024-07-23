"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UpdateClient = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const client_service_1 = require("@services/db/client.service");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const clientDocument_interface_1 = require("@client/interfaces/clientDocument.interface");
const update_utility_1 = require("./update.utility");
const joi_validation_decorators_1 = require("@decorators/joi-validation.decorators");
const update_1 = require("@client/schemes/update");
class UpdateClient extends update_utility_1.UpdateClientUtility {
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = req.params.id;
            const { email, name, motherSurname, fatherSurname, bornDate } = req.body;
            const updateDate = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (email !== undefined ? { email } : {})), (name !== undefined ? { name } : {})), (fatherSurname !== undefined ? { fatherSurname } : {})), (motherSurname !== undefined ? { motherSurname } : {})), (bornDate !== undefined ? { bornDate } : {}));
            const existingClient = yield client_service_1.clientsDbService.getClientById(clientId);
            if (!existingClient) {
                throw new badRequestError_1.BadRequestError('Client does not exist');
            }
            const updatedClient = yield client_service_1.clientsDbService.updateClientById({
                clientId: clientId,
                value: updateDate,
            });
            yield updatedClient.save();
            res.status(http_status_codes_1.default.OK).json({
                message: 'Client has been updated',
                doc: updatedClient,
            });
        });
    }
    updateStateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = req.params.id;
            const { state } = req.body;
            const existingClient = yield client_service_1.clientsDbService.getClientById(clientId);
            if (!existingClient) {
                throw new badRequestError_1.BadRequestError('Client does not exist');
            }
            if (!existingClient.active) {
                throw new badRequestError_1.BadRequestError('Can update a deleted client');
            }
            let updatedClient;
            // Update state based on described flow
            if (existingClient.state === clientDocument_interface_1.CLIENTSTATUS.PROSPECTO && state === clientDocument_interface_1.CLIENTSTATUS.ACTIVO) {
                updatedClient = yield client_service_1.clientsDbService.updateClientStateById({
                    clientId: clientId,
                    state: clientDocument_interface_1.CLIENTSTATUS.ACTIVO,
                });
            }
            else if (existingClient.state === clientDocument_interface_1.CLIENTSTATUS.ACTIVO && state === clientDocument_interface_1.CLIENTSTATUS.INACTIVO) {
                updatedClient = yield client_service_1.clientsDbService.updateClientStateById({
                    clientId: clientId,
                    state: clientDocument_interface_1.CLIENTSTATUS.INACTIVO,
                });
            }
            else if (existingClient.state === clientDocument_interface_1.CLIENTSTATUS.INACTIVO && (state === clientDocument_interface_1.CLIENTSTATUS.INACTIVO || state === clientDocument_interface_1.CLIENTSTATUS.BLOQUEADO)) {
                updatedClient = yield client_service_1.clientsDbService.updateClientStateById({
                    clientId: clientId,
                    state: state,
                });
            }
            else if (existingClient.state === clientDocument_interface_1.CLIENTSTATUS.BLOQUEADO && state === clientDocument_interface_1.CLIENTSTATUS.ACTIVO) {
                // Special authorization logic not described
                updatedClient = yield client_service_1.clientsDbService.updateClientStateById({
                    clientId: clientId,
                    state: clientDocument_interface_1.CLIENTSTATUS.ACTIVO,
                });
            }
            else {
                throw new badRequestError_1.BadRequestError('Invalid state transition');
            }
            if (updatedClient) {
                yield updatedClient.save();
                res.status(http_status_codes_1.default.OK).json({
                    message: 'Client has been updated',
                    doc: updatedClient,
                });
            }
            else {
                throw new badRequestError_1.BadRequestError('Client state update failed');
            }
        });
    }
}
exports.UpdateClient = UpdateClient;
__decorate([
    (0, joi_validation_decorators_1.joiValidation)(update_1.updateClientSchemeValidation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UpdateClient.prototype, "updateById", null);
__decorate([
    (0, joi_validation_decorators_1.joiValidation)(update_1.updateClientState),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UpdateClient.prototype, "updateStateById", null);
//# sourceMappingURL=updateClient.js.map