"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect('mongodb://localhost:27017/dreams');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo open');
});
var routeType = require('./routes/DreamTypeRoutes');
var dreamRoutes = require('./routes/DreamRoutes');
var searchRoutes = require('./routes/DreamSearchRoutes');
app.use('/', routeType);
app.use('/dream', dreamRoutes);
app.use('/search', searchRoutes);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map