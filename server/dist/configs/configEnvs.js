"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
class Config {
    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.PORT = process.env.PORT;
    }
    validateConfig() {
        console.log(this);
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`Configuration ${key} is undefined`);
            }
        }
    }
}
exports.config = new Config();
//# sourceMappingURL=configEnvs.js.map