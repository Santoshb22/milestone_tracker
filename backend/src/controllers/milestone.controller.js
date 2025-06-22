const { addMilestone, getMilestones, updateMilestone, deleteMilestone } = require("../services/milestone.service");

const createMilestone = async (req, res) => {
    const {title, date, note} = req.body;
    if (!title?.trim() || !date) {
        return res.status(400).json({ message: "Title and date are required" });
    }

    try {
        const newMilestone = await addMilestone(title, date, note, req.user);
        return res.status(201).json({message: "Success", milestone: newMilestone});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const getAllMilestones = async (req, res) => {
    try {
        const result = await getMilestones();
        return res.status(200).json({message: "Success", data: result});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const editMilestone = async (req, res) => {
    try {
        const result = await updateMilestone(req.body, req.params.id);
        return res.status(200).json({message: "Success", result});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const deleteItem = async (req, res) => {
    try {
        const deletedItem = await deleteMilestone(req.params.id);
        return res.status(200).json({message: "Success", deleted_item: deletedItem})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message});
    }
}

module.exports = {
    createMilestone,
    getAllMilestones,
    editMilestone,
    deleteItem
}