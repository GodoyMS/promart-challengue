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
exports.SignUpClient = void 0;
const mongodb_1 = require("mongodb");
const joi_validation_decorators_1 = require("@decorators/joi-validation.decorators");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const signup_1 = require("@client/schemes/signup");
const signup_utility_1 = require("./signup.utility");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const client_service_1 = require("@services/db/client.service");
class SignUpClient extends signup_utility_1.SignUpClientUtility {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, motherSurname, fatherSurname, bornDate, } = req.body;
            const clientExist = yield client_service_1.clientsDbService.getClientByEmail(email);
            if (clientExist) {
                throw new badRequestError_1.BadRequestError('This email is already in use');
            }
            const clientObjectId = new mongodb_1.ObjectId();
            const clientDoc = SignUpClient.prototype.signUpClient({
                _id: clientObjectId,
                name,
                motherSurname,
                fatherSurname,
                bornDate,
                email
            });
            const createdClient = yield client_service_1.clientsDbService.createClient(clientDoc);
            res.status(http_status_codes_1.default.CREATED).json({
                message: 'Client  created succesfully',
                doc: createdClient
            });
        });
    }
}
exports.SignUpClient = SignUpClient;
__decorate([
    (0, joi_validation_decorators_1.joiValidation)(signup_1.signUpClientSchemeValidation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignUpClient.prototype, "create", null);
//# sourceMappingURL=signUp.js.map