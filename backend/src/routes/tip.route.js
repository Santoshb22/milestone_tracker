const express = require("express");
const TipController = require("../controllers/tip.controller");
const verifyJwt = require("../middlewares/verifyJwt");
const router = express.Router();

router.put("/:id/like", verifyJwt, TipController.upvote);

module.exports = router;