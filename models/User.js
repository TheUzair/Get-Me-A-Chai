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
	}, {
		timestamps: true, // This will handle createdAt and updatedAt automatically
		collection: 'users'
});

// Add a serialization method to handle the ObjectId conversion
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret._id = ret._id.toString();
    return ret;
  }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;