"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const [showDropDown, setshowDropDown] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className='bg-blue-950 text-white flex justify-between items-center px-3 md:px-6 h-20'>
      <Link href={"/"} className='logo font-bold text-lg flex justify-center items-center'>
        <img className='invertImg w-[50px] md:w-[44px]' src="tea.gif" alt="tea" />
        <span className='hidden md:inline'>GetMeAChai</span>
      </Link>

      <div className='flex justify-center items-center'>

        <div className="relative " onMouseEnter={() => setshowDropDown(true)} onMouseLeave={() => setshowDropDown(false)}>
          {session && <>
            <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"  className="md:bg-gradient-to-br md:from-purple-600 md:to-blue-500 md:hover:bg-gradient-to-bl md:focus:ring-4 md:focus:outline-none md:focus:ring-blue-300 md:dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-white md:mx-4  md:px-5 py-4 md:py2.5 text-center inline-flex items-center" type="button">
              <img src={session.user.image} alt="User Avatar" className="w-10 h-10 md:w-8 md:h-8 rounded-full mr-0 md:mr-2" />
              <span className="hidden md:inline ml-2">{session.user.name}</span>
              <svg className="w-2.5 h-2.5 ml-2 hidden md:inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="dropdownHover" className={`z-10 ${showDropDown ? "" : "hidden"} absolute left-[1rem] mx-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div></>
          }
        </div>

        {!session && <Link href={"/login"} >
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2 mr-5">
            Login
          </button>
        </Link>}

      </div>
    </nav>
  )
}

export default Navbar