const Milestone = require("../models/milestone.model");
const User = require("../models/user.model");
const checkOwnership = require("../utils/checkOwnership");

class MilestoneService {
  async addMilestone(title, date, note = "", user) {
    return await Milestone.create({ title, date, note, userId: user._id });
  }

  async getAllMilestones() {
    return await Milestone.find({});
  }

  async getUserMilestones(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User does not exist in database");

    return await Milestone.find({ userId });
  }

  async updateMilestone(data, id, userId) {
    const milestone = await Milestone.findById(id);
    if (!milestone) throw new Error("Milestone ID is incorrect");

    checkOwnership(milestone.userId, userId);

    return await Milestone.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMilestone(id, userId) {
    const milestone = await Milestone.findById(id);
    if (!milestone) throw new Error("Milestone ID is incorrect");
    checkOwnership(milestone.userId, userId);
    return await Milestone.findByIdAndDelete(id);
  }
}

module.exports = new MilestoneService(); 