const express = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");

const route = express.Router();

route.use("/auth/", authRouter);
route.use("/admin/", adminRouter);

module.exports = route;
