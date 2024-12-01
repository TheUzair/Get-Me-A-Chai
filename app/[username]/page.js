import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

const Username = async ({ params }) => {
  try {
    console.log("Params username:", params.username);
    
    await connectDB();
    console.log("Database connected successfully!");

    const existingUser = await User.findOne({
      userName: { $regex: new RegExp(`^${params.username}$`, 'i') },
    });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return <PaymentPage username={params.username} />;
    }

    console.log(`User not found: ${params.username}`);
    return notFound();
  } catch (error) {
    console.error("Error in Username component:", error);
    return notFound();
  }
};

export default Username;

export async function generateMetadata({ params }) {
  return { title: `Support ${params.username} - Get Me A Chai` };
}
