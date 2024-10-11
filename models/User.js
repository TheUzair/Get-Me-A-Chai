import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
	name: { type: String },
	userName: {
		type: String,
		required: [true, 'Username is required'],
	  },
	  email: {
		type: String,
		required: true,
		unique: true,
	  },
	profilePic: { type: String },
	coverPic: { type: String },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	razorpayKey: { type: String },
	razorpaySecret: { type: String }
});

export default mongoose.models.User || model("User", UserSchema);
