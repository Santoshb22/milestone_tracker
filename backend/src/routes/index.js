const express = require("express");
const authRoutes = require("./router.auth");
const router = express.Router();

router.use("/auth", authRoutes);


module.exports = router;