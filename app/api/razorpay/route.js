import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import Razorpay from "razorpay";
import User from "@/models/User";

export const POST = async (req) => {
	await connectDB(); // Ensure the database is connected

	// Convert request body form data to an object
	let formData = await req.formData();
	let paymentDetails = Object.fromEntries(formData);

	// Find the corresponding payment by order_id in the database
	let existingPayment = await Payment.findOne({"order_id": paymentDetails.razorpay_order_id});
	if (!existingPayment) {
		return NextResponse.json({ success: false, message: "Order Id not found!!" });
	}

	// Fetch the secret of the user who is accepting the paymnet
	let owner = await User.findOne({ userName: existingPayment.to_user})
	const ownerSecret = owner.razorpaySecret
	
	// Validate the payment using Razorpay's verification utility
	let isValidSignature = validatePaymentVerification(
		{ "order_id": paymentDetails.razorpay_order_id, "payment_id": paymentDetails.razorpay_payment_id },
		paymentDetails.razorpay_signature,
		ownerSecret
	);

	if (isValidSignature) {
		// Update the payment status to 'done' in the database
		const updatedPayment = await Payment.findOneAndUpdate(
			{ order_id: paymentDetails.razorpay_order_id },
			{ done: true },
			{ new: true }
		);

		// Redirect to the user's page with a payment success query parameter
		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
	} else {
		// Handle payment verification failure
		return NextResponse.json({ success: false, message: "Payment Verification Failed!!" });
	}
};
