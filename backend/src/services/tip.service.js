const Milestone = require("../models/milestone.model");
const Tip = require("../models/tip.model");

class TipService {
    async addTip(tip, milestoneId, userId) {
        const milestone = await Milestone.findById({_id: milestoneId});
        if(!milestone) throw new Error("Something went wrong or Milestone not found");
        
        const addedTip = await Tip.create({tip, milestoneId, userId});
        return addedTip;
    }

    async getTips(milestoneId) {
    const tips = await Tip.find({milestoneId});
    if (!tips.length) throw new Error("No tips found for this milestone");
        return tips; 
    }
 
    async upvote(tipId, userId) {
        const tip = await Tip.findById(tipId);
        if(!tip) throw new Error("Tip not found");

        const likeExist = tip.upvoteBy.some(id => id.toString() === userId.toString());
        if(!likeExist){
            tip.likes += 1;
            tip.upvoteBy.push(userId);
            await tip.save();
        }

        return tip;
    }
    
}

module.exports = new TipService();