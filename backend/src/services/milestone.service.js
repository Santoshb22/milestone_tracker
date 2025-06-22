const Milestone = require("../models/milestone.model");

const addMilestone = async (title, date, note = "", user) => {
    try {
        const result = await Milestone.create({title, date, note, userId: user._id});
        return result;
    } catch (error) {
        throw new Error(`Failed create milestone: ${error.message}`);
    }
}

const getMilestones = async () => {
    try {
        const result = await Milestone.find({});
        return result;
    } catch (error) {
        throw new Error(`Failed to get all milestones: ${error.message}`);
    }
}

const updateMilestone = async (data, id) => {
    try {
        const milestone = await Milestone.findById(id)
        if(!milestone) {
            throw new Error("Milestone ID is incorrect");
        }

        const updatedMilestone = await Milestone.findByIdAndUpdate(id, data, {new: true}); 
        return updatedMilestone;
    } catch (error) {
        throw new Error(`Failed to update milestone: ${error.message}`);
    }
}

const deleteMilestone = async (id) => {
    try {
        const milestone = await Milestone.findById(id);
        if(!milestone) throw new Error("Milestone ID is incorrect");
        
        const deletedMilestone = await Milestone.findOneAndDelete({_id: id});
        return deletedMilestone
    } catch (error) {
        throw new Error(`Failed to delete milestone: ${error.message}`);
    }
}

module.exports = {
    addMilestone,
    getMilestones,
    updateMilestone,
    deleteMilestone
}