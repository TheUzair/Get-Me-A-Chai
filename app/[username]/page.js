import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

export const dynamic = 'force-dynamic';
const Username = async ({ params }) => {
  try {
    await connectDB();
    
    const existingUser = await User.findOne({ 
      userName: params.username 
    });

    // If user exists, return the PaymentPage component
    if (existingUser) {
      return <PaymentPage username={params.username} />;
    }

    // If no user is found, throw notFound
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
