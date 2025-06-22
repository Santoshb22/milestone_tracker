const express = require("express");
const authRoutes = require("./auth.route");
const milestoneRoutes = require("./milestone.route");
const verifyJwt = require("../middlewares/verifyJwt");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/milestones", verifyJwt, milestoneRoutes);

module.exports = router;