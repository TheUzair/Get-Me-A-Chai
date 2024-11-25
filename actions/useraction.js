"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import mongoose from "mongoose";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  // Fetch the secret of the user who is accepting the paymnet
  let owner = await User.findOne({ userName: to_username })
  const ownerSecret = owner.razorpaySecret

  try {
    const instance = new Razorpay({
      key_id: owner.razorpayKey, // Razorpay API key
      key_secret: ownerSecret, // Razorpay secret key
    });

    const options = {
      amount: Number.parseInt(amount) * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    if (!order) {
      throw new Error("Failed to create order");
    }

    // Create a payment record in the database
    await Payment.create({
      order_id: order.id,
      amount: amount,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });

    return order;
  } catch (error) {
    return undefined;
  }
};

export const fetchUser = async (email) => {
  try {
    await connectDB();

    const db = mongoose.connection.useDb('patreon');
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ email });

    // Serialize the data for client component
    const serializedUser = {
      _id: user._id.toString(),
      name: user.name,
      userName: user.userName,
      email: user.email,
      profilePic: user.profilePic,
      coverPic: user.coverPic,
      razorpayKey: user.razorpayKey,
      razorpaySecret: user.razorpaySecret,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString()
    };

    return serializedUser;

  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchPayments = async (to_username) => {
  await connectDB();

  // Fetch payments related to the user
  const payments = await Payment.find({ to_user: to_username, done: true }).sort({ amount: -1 }).limit(10).lean();
  return payments;
};

export const updateProfile = async (data, oldUsername) => {
  try {
    await connectDB();  
    const ndata = data; 

    if (oldUsername !== ndata.username) {  
      let existingUser = await User.findOne({ userName: ndata.username });
      if (existingUser) {
        return { error: "Username already exists" };  
      }
    }

    // Use upsert to update if exists, insert if not
    const result = await User.updateOne(
      { email: ndata.email }, 
      {
        $set: {
          name: ndata.name,       
          userName: ndata.username,
          profilePic: ndata.profilePic,
          coverPic: ndata.coverPic,
          razorpayKey: ndata.razorpayKey,
          razorpaySecret: ndata.razorpaySecret
        }
      },
      { upsert: true }  // This will insert if no document matches the query
    );

    if (result.upsertedCount > 0) {
      return { success: true, message: "Profile created successfully" };  
    } else if (result.modifiedCount > 0) {
      return { success: true, message: "Profile updated successfully" }; 
    } else {
      return { success: true, message: "No changes made" };  
    }

  } catch (error) {
    return { error: "Internal Server Error" };  
  }
};
