'use client'

import { collection, orderBy, query } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'

import ChatRow from './ChatRow'
import NewChat from './NewChat'
import { firestore } from '../firebase/firebase'
import React, { useState } from 'react'
import Image from 'next/image'

type Props = {}

function Sidebar({}: Props) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(true)

  const [chats, loading] = useCollection(
    session &&
      query(
        collection(firestore, `users/${session?.user?.email!}/chats`),
        orderBy('createdAt', 'asc'),
      ),
  )

  const toggleSidebar = () => {
    setOpen(!open)
  }

  return (
    <>
      {open === false ? (
        <div
          onClick={() => toggleSidebar()}
          className="flex fixed max-w-[50px] sm:min-w-[50px] sm:ml-2 p-2 bg-[var(--color-bg-quaternary)] sm:justify-center items-center hover:bg-[var(--color-bg-tertiary)] bg- sm:py-3 sm:mx-6 sm:my-4 border-gray-500 border rounded-lg cursor-pointer m-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-[var(--color-bg-white)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      ) : (
        <div
          className={`p-2 flex flex-col h-screen border-r-2 bg-[var(--color-bg-quaternary)] border-[var(--color-bg-white)] ${open ? 'w-72 transition-w ease-in duration-2000 overflow-hidden' : 'w-0 transition-w ease-in duration-2000'}`}
        >
          <div className="no-scrollbar flex-1">
            <NewChat session={session} toggleSidebar={toggleSidebar} />
            <p className="text-[var(--color-text-gray-200)] mt-4 ml-4 pb-0 text-sm">
              Previous Chats
            </p>
            <div className="flex flex-col space-y-2 my-2">
              {loading && (
                <div className="animate-pulse text-center text-[var(--color-bg-white)]">
                  <p>Loading Chats...</p>
                </div>
              )}
              {chats?.docs.map((chat) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={chat.id}
                >
                  <ChatRow id={chat.id} session={session} />
                </motion.div>
              ))}
            </div>
          </div>
          {session && (
            <div className="border-t border-[var(--color-bg-tertiary)] py-3 ">
              <div className="chatRow items-center justify-start gap-5 hover:bg-[var(--color-bg-tertiary)] rounded-2xl">
                <Image
                  width={100}
                  height={100}
                  src={session?.user?.image!}
                  alt={session?.user?.name!}
                  className="h-8 w-8 rounded-sm cursor-pointer hover:opacity-50"
                />
                <p className="text-[var(--color-bg-white)]">
                  {session?.user?.name}
                </p>
              </div>
              <div
                className="chatRow items-center justify-start gap-5 text-[var(--color-bg-white)] hover:bg-[var(--color-bg-tertiary)] rounded-2xl"
                onClick={() => signOut()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[var(--color-bg-white)]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
                <p>Log out</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Sidebar
