import mongoose from 'mongoose';  // Use default import instead of '* as mongoose'

const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
  name: { type: String, required: true },
  to_user: { type: String, required: true },
  order_id: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});

mongoose.connect('mongodb://localhost:27017/patreon', {
});

export default mongoose.models.Payment || model("Payment", PaymentSchema);
