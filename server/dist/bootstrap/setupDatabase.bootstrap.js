"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configEnvs_1 = require("@configs/configEnvs");
const configLogs_1 = require("@configs/configLogs");
const log = configLogs_1.logger.createLogger('setupDatabase');
exports.default = () => {
    const connect = () => {
        mongoose_1.default
            .connect(`${configEnvs_1.config.DATABASE_URL}`)
            .then(() => {
            log.info('Successfully connected to database.');
        })
            .catch(error => {
            log.error('Error connecting to database', error);
            return process.exit(1);
        });
    };
    connect();
    mongoose_1.default.connection.on('disconnected', connect);
};
//# sourceMappingURL=setupDatabase.bootstrap.js.map