"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUser, updateProfile } from '@/actions/useraction';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    profilePic: '',
    coverPic: '',
    razorpayKey: '',
    razorpaySecret: '',
  });

  const [showEmail, setShowEmail] = useState(false);
  const [showRazorpayKey, setShowRazorpayKey] = useState(false);
  const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    getData();
    if (!session) {
      router.push('/login?redirect=/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const getData = async () => {
    let u = await fetchUser(session.user.name);
    if (!u) {
      console.warn('No user found');
      return null; // Handle the error, or redirect or show a message
    }

    setFormData({
      name: u.name || '',
      email: u.email || '',
      username: u.userName || '',
      profilePic: u.profilePic || '',
      coverPic: u.coverPic || '',
      razorpayKey: u.razorpayKey || '',
      razorpaySecret: u.razorpaySecret || ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update();
    console.log("formdata inside handleSubmit:", formData);

    let result = await updateProfile(formData, session.user.name);

    if (result?.error) {
      toast.error(result.error, {
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
    } else {
      toast('Profile Updated !', {
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
    }
  };

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
      <div className="min-h-[85vh] flex justify-center items-center overflow-x-hidden">
        <div className="bg-slate-900 p-10 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome to your Dashboard</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md bg-slate-300 text-black"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-400">Email</label>
              <div className="relative">
                <input
                  type={showEmail ? 'text' : 'password'}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded-md bg-slate-300 text-black"
                  placeholder="Enter your email"
                />
                <button
                  type="button"
                  onClick={() => setShowEmail(!showEmail)}
                  className="absolute right-3 top-3"
                >
                  <Image
                    src={showEmail ? '/eye-open.png' : '/eye-closed.png'}
                    alt="Toggle Email Visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md bg-slate-300 text-black"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-gray-400">Profile Picture URL</label>
              <input
                type="text"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md bg-slate-300 text-black"
                placeholder="Enter profile picture URL"
              />
            </div>

            <div>
              <label className="block text-gray-400">Cover Picture URL</label>
              <input
                type="text"
                name="coverPic"
                value={formData.coverPic}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md bg-slate-300 text-black"
                placeholder="Enter cover picture URL"
              />
            </div>

            <div>
              <label className="block text-gray-400">Razorpay Key</label>
              <div className="relative">
                <input
                  type={showRazorpayKey ? 'text' : 'password'}
                  name="razorpayKey"
                  value={formData.razorpayKey}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded-md bg-slate-300 text-black"
                  placeholder="Enter Razorpay Key"
                />
                <button
                  type="button"
                  onClick={() => setShowRazorpayKey(!showRazorpayKey)}
                  className="absolute right-3 top-3"
                >
                  <Image
                    src={showRazorpayKey ? '/eye-open.png' : '/eye-closed.png'}
                    alt="Toggle Razorpay Key Visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400">Razorpay Secret</label>
              <div className="relative">
                <input
                  type={showRazorpaySecret ? 'text' : 'password'}
                  name="razorpaySecret"
                  value={formData.razorpaySecret}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded-md bg-slate-300 text-black"
                  placeholder="Enter Razorpay Secret"
                />
                <button
                  type="button"
                  onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                  className="absolute right-3 top-3"
                >
                  <Image
                    src={showRazorpaySecret ? '/eye-open.png' : '/eye-closed.png'}
                    alt="Toggle Razorpay Secret Visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
                          hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                          font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  );
};

export default Dashboard;