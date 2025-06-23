const express = require("express");
const MilestoneController = require("../controllers/milestone.controller");
const verifyJwt = require("../middlewares/verifyJwt");
const tipController = require("../controllers/tip.controller");

const router = express.Router();

router.post("/", verifyJwt, MilestoneController.create);
router.put("/:id", verifyJwt, MilestoneController.update);
router.get("/personal", verifyJwt, MilestoneController.getPersonal)
router.get("/", verifyJwt, MilestoneController.getAll);
router.delete("/:id", verifyJwt, MilestoneController.delete);

router.get("/:id/tips", verifyJwt, tipController.getTips); 
router.post("/:id/tips", verifyJwt, tipController.create); 

module.exports = router;