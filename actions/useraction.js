"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB(); // Ensure DB connection

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
  await connectDB(); // Ensure DB connection

  // Find the user by email
  const userRecord = await User.findOne({ email });


  // Check if the user exists
  if (!userRecord) {
    return null; // Return null or handle this case as needed
  }

  // Convert user record to plain object
  const user = userRecord.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchPayments = async (to_username) => {
  await connectDB(); // Ensure DB connection

  // Fetch payments related to the user
  const payments = await Payment.find({ to_user: to_username, done: true }).sort({ amount: -1 }).limit(10).lean();
  return payments;
};

export const updateProfile = async (data, oldUsername) => {
  try {

    await connectDB();  // Ensure the DB connection
    const ndata = data;  // Assuming `data` is already an object

    // Check if username is being changed and validate the new one
    if (oldUsername !== ndata.username) {  // Ensure correct field comparison
      let existingUser = await User.findOne({ userName: ndata.username });
      if (existingUser) {
        return { error: "Username already exists" };  // Return error if username exists
      }
    }

    // Use upsert to update if exists, insert if not
    const result = await User.updateOne(
      { email: ndata.email },  // Use email as the unique identifier
      {
        $set: {
          name: ndata.name,        // Assuming `name` is part of the profile
          userName: ndata.username,
          profilePic: ndata.profilePic,
          coverPic: ndata.coverPic,
          razorpayKey: ndata.razorpayKey,
          razorpaySecret: ndata.razorpaySecret
        }
      },
      { upsert: true }  // This will insert if no document matches the query
    );


    // Return success status or a message if the update/insert was successful
    if (result.upsertedCount > 0) {
      return { success: true, message: "Profile created successfully" };  // New profile inserted
    } else if (result.modifiedCount > 0) {
      return { success: true, message: "Profile updated successfully" };  // Profile updated
    } else {
      return { success: true, message: "No changes made" };  // No changes if data was identical
    }

  } catch (error) {
    return { error: "Internal Server Error" };  // Catch and log errors
  }
};
