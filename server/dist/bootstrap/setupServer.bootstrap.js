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
exports.PromartChallengueServer = void 0;
const express_1 = require("express");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
require("express-async-errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const configEnvs_1 = require("@configs/configEnvs");
const configLogs_1 = require("@configs/configLogs");
const customError_1 = require("@helpers/errors/customError");
const httpRoutes_1 = __importDefault(require("@routes/httpRoutes"));
// import session from 'express-session';
const log = configLogs_1.logger.createLogger('server');
class PromartChallengueServer {
    constructor(app) {
        this.app = app;
    }
    start() {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }
    securityMiddleware(app) {
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Encoding, x-apollo-tracing');
            res.header('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
            res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With, Range');
            next();
        });
        app.use((0, cors_1.default)({
            origin: configEnvs_1.config.CLIENT_URL,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
            // allowedHeaders: [
            //    'Authorization',
            //    'Content-Type',
            //    'Access-Control-Allow-Headers',
            //    'Access-Control-Allow-Methods',
            // ],
        }));
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
    }
    standardMiddleware(app) {
        app.use((0, express_1.json)({ limit: '50mb' }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    }
    routesMiddleware(app) {
        (0, httpRoutes_1.default)(app);
    }
    globalErrorHandler(app) {
        app.all('*', (req, res) => {
            res.status(http_status_codes_1.default.NOT_FOUND).json({
                message: `${req.originalUrl} not found`,
            });
        });
        app.use((error, _req, res, next) => {
            log.error(error);
            if (error instanceof customError_1.CustomError) {
                return res
                    .status(error.statusCode)
                    .json(error.serializeErrors());
            }
            next();
        });
    }
    startServer(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpServer = new http_1.default.Server(app);
                log.info(`Server has started with process ${process.pid}.`);
                const PORT = Number(configEnvs_1.config.PORT) || 5000;
                httpServer.listen(PORT, () => {
                    console.log(`Server listening on port ${PORT}`);
                    log.info(`Server running at ${PORT}.`);
                });
            }
            catch (error) {
                log.error(error);
            }
        });
    }
}
exports.PromartChallengueServer = PromartChallengueServer;
//# sourceMappingURL=setupServer.bootstrap.js.map