const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true,
    maxLength: 120
  },

  date: {
    type: Date,
    required: true
  },

  note: {
    type: String,
    default: '',
    maxLength: 500
  }

},
{ 
  timestamps: true 
}
)

const Milestone = mongoose.model(milestoneSchema);

module.exports = Milestone;