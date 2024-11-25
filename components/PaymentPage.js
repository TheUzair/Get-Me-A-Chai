"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { initiate, fetchUser, fetchPayments } from '@/actions/useraction';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: ""
  });

  const [currentUser, setCurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()


  const getData = useCallback(async () => {
    let user = await fetchUser(username);

    if (user) {
      setCurrentUser(user);
      let dbPayments = await fetchPayments(username);
      setPayments(dbPayments);
    } else {
      toast.warn("No user found, payments will not be fetched.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [username]);

  useEffect(() => {
    getData();
  }, [getData, searchParams]);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("Thanks a lot!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push(`/${username}`);
    }
  }, [searchParams, router, username]);

  const handleChange = (e) => {
    setPaymentForm({ ...paymentform, [e.target.name]: e.target.value });
  };

  const isValidName = paymentform.name.length >= 3;

  const isValidMessage = paymentform.message.length >= 6;

  const isValidAmount = paymentform.amount >= 1 && paymentform.amount <= 500000;

  const pay = async (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      let order = await initiate(amount, username, paymentform);
      console.log("Order from initiate:", order);

      if (!order || !order.id) {
        toast.error('Order creation failed.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      let orderId = order.id;

      var options = {
        "key": currentUser.razorpayKey,
        "amount": amount * 100,
        "currency": "INR",
        "name": "MOH UJER_TESTING",
        "description": "Test Transaction",
        "image": "/your_logo.png",
        "order_id": orderId,
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": {
          "name": paymentform.name,
          "email": session?.user?.email || "",
          "contact": "9000090000",
        },
        "notes": {
          "address": "Razorpay Corporate Office",
        },
        "theme": {
          "color": "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Error in payment process.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
  };

  // Lock scroll when focusing on inputs
  const handleFocus = () => lockScroll();
  const handleBlur = () => unlockScroll();

  useEffect(() => {
    return () => unlockScroll();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className='cover w-full relative'>
        <Image
          className="object-cover w-full h-[350px]"
          src={currentUser.coverPic}
          alt="cover"
          width={1920} 
          height={350}
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="flex justify-center items-center border-4 border-white rounded-xl bg-white">
            <Image
              className="rounded-lg"
              src={currentUser.profilePic}
              alt="profile"
              width={80}
              height={80}
            />
          </div>
        </div>
      </div>
      <div className="info flex justify-center items-center flex-col gap-2 mt-16 mb-32">
        <div className="text-2xl font-bold text-green-300">
          @{username}
        </div>
        <div className="text-slate-300">
          Lets help {username} to get a chai !!
        </div>
        <div className="text-slate-400">
          {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>
        <div className="join">
          <button className='bg-red-200 text-black rounded-3xl mx-9 p-4 w-54'>Join For Free</button>
          <div className="social-logins flex flex-col justify-center items-center bg-red-200">
            <a href="https://twitter.com/Beneos" role="link" target="_blank"><svg data-tag="IconBrandTwitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.712 10.622 20.413 3h-1.588l-5.818 6.618L8.36 3H3l7.027 10.007L3 21h1.588l6.144-6.989L15.64 21H21zm-2.174 2.474-.713-.997L5.16 4.17H7.6l4.571 6.4.712.996 5.943 8.319h-2.439z"></path></svg></a>
            <a href="https://www.instagram.com/benjaminharmstadt" role="link" target="_blank"><svg data-tag="IconBrandInstagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3.803c2.67 0 2.987.01 4.042.058 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.047 1.37-.057 4.04-.057M12 2c-2.716 0-3.056.012-4.122.06-3.632.167-5.65 2.182-5.817 5.817C2.01 8.944 2 9.284 2 12s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122c-.163-3.629-2.18-5.65-5.816-5.817C15.057 2.01 14.716 2 12 2m0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27m0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666m5.338-9.87a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4"></path></svg></a>
          </div>
        </div>
        <div className="payment-container flex flex-col md:flex-row gap-20 md:gap-3 w-full md:w-[80%] mt-11 p-2 md:p-0">
          <div className="supporters-section w-[80%] mx-auto md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Top Supporters</h2>
            <ul className="mx-3 text-lg">
              {payments.length == 0 && <li>No payments yet</li>}
              {payments.map((payment, index) => (
                <li key={index} className="my-4 flex gap-2 items-center">
                  <Image
                    src="/user.gif"
                    alt="user_avatar"
                    width={33}
                    height={33}
                    className="rounded-full"
                    priority
                    unoptimized
                  />
                  <span>
                    {payment.name} donated{" "}
                    <span className="font-bold">₹{payment.amount}</span> with a message: {payment.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="payment-section w-[80%] mx-auto md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={paymentform.name}
                name="name"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />

              <div className="flex justify-center text-slate-700">or</div>

              <div className="flex justify-around m-5 custom-gap">
                <button
                  className={`p-3 rounded-lg transition duration-300 ease-in-out transform 
      ${isValidName && isValidMessage
                      ? "bg-slate-800 hover:bg-slate-700 hover:scale-105 hover:shadow-lg"
                      : "bg-slate-500 cursor-not-allowed"
                    }`}
                  onClick={() => pay(10)}
                  disabled={!isValidName || !isValidMessage}
                >
                  Pay ₹10
                </button>

                <button
                  className={`p-3 rounded-lg transition duration-300 ease-in-out transform 
      ${isValidName && isValidMessage
                      ? "bg-slate-800 hover:bg-slate-700 hover:scale-105 hover:shadow-lg"
                      : "bg-slate-500 cursor-not-allowed"
                    }`}
                  onClick={() => pay(20)}
                  disabled={!isValidName || !isValidMessage}
                >
                  Pay ₹20
                </button>

                <button
                  className={`p-3 rounded-lg transition duration-300 ease-in-out transform 
      ${isValidName && isValidMessage
                      ? "bg-slate-800 hover:bg-slate-700 hover:scale-105 hover:shadow-lg"
                      : "bg-slate-500 cursor-not-allowed"
                    }`}
                  onClick={() => pay(30)}
                  disabled={!isValidName || !isValidMessage}
                >
                  Pay ₹30
                </button>
              </div>


              <div className="pl-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => pay(paymentform.amount)}
                  className="w-[85%] text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-blue-300 disabled:from-blue-300 disabled:cursor-not-allowed"
                  disabled={!isValidName || !isValidMessage || !isValidAmount}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default PaymentPage
