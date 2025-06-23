const MilestoneService = require("../services/milestone.service");

class MilestoneController {
  async create(req, res) {
    try {
      const { title, date, note } = req.body;
      if (!title?.trim() || !date) {
        return res.status(400).json({ message: "Title and date are required" });
      }

      const newMilestone = await MilestoneService.addMilestone(title, date, note, req.user);
      return res.status(201).json({ message: "Success", milestone: newMilestone });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const milestones = await MilestoneService.getAllMilestones();
      return res.status(200).json({ message: "Success", data: milestones });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  async getPersonal(req, res) {
    try {
      const milestones = await MilestoneService.getUserMilestones(req.user._id);
      return res.status(200).json({ message: "Success", personalMilestones: milestones });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await MilestoneService.updateMilestone(req.body, req.params.id, req.user._id);
      return res.status(200).json({ message: "Success", result: updated });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await MilestoneService.deleteMilestone(req.params.id, req.user._id);
      return res.status(200).json({ message: "Success", deleted_item: deleted });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}

module.exports = new MilestoneController();
