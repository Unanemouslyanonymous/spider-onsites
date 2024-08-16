import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
