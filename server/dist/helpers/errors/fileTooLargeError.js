"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTooLargeError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const customError_1 = require("./customError");
class FileTooLargeError extends customError_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.REQUEST_TOO_LONG;
        this.status = 'error';
    }
}
exports.FileTooLargeError = FileTooLargeError;
//# sourceMappingURL=fileTooLargeError.js.map