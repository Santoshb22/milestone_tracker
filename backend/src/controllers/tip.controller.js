const TipService = require("../services/tip.service");

class TipController {
    async create(req, res) {
        try {
            const {tip} = req.body;
            const milestoneId = req.params?.id;
            if(!tip.trim()){
                return res.status(400).json({message: "tip cannot be empty"});
            }

            const newTip = await TipService.addTip(tip, milestoneId, req.user._id);
            res.status(201).json({message: "Success", tip: newTip});
        } catch (error) {
            return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            });
        }
    }

    async getTips(req, res){
        try {
            const id = req.params?.id;
            const tips = await TipService.getTips(id);
            return res.status(200).json({message: "success", tips});
        } catch (error) {
            return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            });   
        }
    }

    async upvote(req, res){ 
        try {
            const updatedTip = TipService.upvote(req.params.id, req.user._id);
            return res.status(200).json({message: "Success", tip: updatedTip});
        } catch (error) {
            return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            });   
        }
    }
}

module.exports = new TipController();