"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const vehicle_routes_1 = __importDefault(require("./modules/vehicles/vehicle.routes"));
const booking_routes_1 = __importDefault(require("./modules/bookings/booking.routes"));
const app = (0, express_1.default)();
const port = config_1.default.port;
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Hello i am the boss!");
});
// !users crud
app.use("/api/v1/users", user_routes_1.default);
// ! vehicles api crud
app.use("/api/v1/vehicles", vehicle_routes_1.default);
// ! bookings api crud
app.use("/api/v1/bookings", booking_routes_1.default);
// !auth api
app.use("/api/v1/auth", auth_routes_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
