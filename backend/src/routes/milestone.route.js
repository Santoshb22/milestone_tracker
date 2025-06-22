const express = require("express");
const MilestoneController = require("../controllers/milestone.controller");
const verifyJwt = require("../middlewares/verifyJwt");

const router = express.Router();

router.post("/", verifyJwt, MilestoneController.create);
router.put("/:id", verifyJwt, MilestoneController.update);
router.get("/personal", verifyJwt, MilestoneController.getPersonal)
router.get("/", MilestoneController.getAll);
router.delete("/:id", verifyJwt, MilestoneController.delete);

// router.get("/:id/tips"); //get tips
// router.post("/:id/tips"); //add tips

module.exports = router;