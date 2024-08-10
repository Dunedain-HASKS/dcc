import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

}, {
  timestamps: true,
});

export default mongoose.model('Contest', contestSchema);
