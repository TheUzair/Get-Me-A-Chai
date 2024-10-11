import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

const Username = async ({ params }) => {
  await connectDB()
  let existingUser  = await User.findOne({ userName: params.username })

  // If user is not found, throw a 404 error
  if (!existingUser ) {
    throw notFound();
  }

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
}

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}