const express = require("express");
const authRoutes = require("./auth.route");
const milestoneRoutes = require("./milestone.route");
const tipRoutes = require("./tip.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/milestones", milestoneRoutes);
router.use("/tips", tipRoutes)

module.exports = router;