import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

const Username = async ({ params }) => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // Debugging: Case insensitive search for the username
    const existingUser = await User.findOne({
      userName: { $regex: new RegExp("^" + params.username + "$", "i") }
    });

    console.log('Querying user with username:', params.username);
    console.log('Database response:', existingUser);

    if (existingUser) {
      return <PaymentPage username={params.username} />;
    }

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
