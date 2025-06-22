const express = require("express");
const { createMilestone, getAllMilestones, editMilestone, deleteItem} = require("../controllers/milestone.controller");
const verifyJwt = require("../middlewares/verifyJwt");

const router = express.Router();

router.post("/", createMilestone);

router.put("/:id", editMilestone);

router.get("/", getAllMilestones);

router.delete("/:id", deleteItem);

module.exports = router;