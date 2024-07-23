"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientRoutes_1 = require("@client/routes/clientRoutes");
exports.default = (app) => {
    const routes = () => {
        app.use('/api/', clientRoutes_1.clientRoutes.routes());
        app.get('/health', (req, res) => {
            res.send('Server running');
        });
    };
    routes();
};
//# sourceMappingURL=httpRoutes.js.map