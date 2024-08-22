'use client'

import { signIn } from 'next-auth/react'
import logo from '@/app/public/NeptuneLogo.png'
import Image from 'next/image'

type Props = {}

function Login({}: Props) {
  return (
    <div className="bg-[var(--color-bg-quaternary)] h-screen flex flex-col items-center justify-center text-center">
      <div className="mb-10">
        <Image src={logo} alt="Logo" width={350} height={350} />
      </div>
      <div>
        <h3 className="text-[var(--color-bg-white)] text-xl sm:text-3xl font-semibold">
          Welcome to Neptune GPT
        </h3>
      </div>
      <div className="mt-10">
        <button
          onClick={() => signIn('google')}
          className="text-[var(--color-bg-white)] hover:bg-[var(--color-bg-tertiary)] text-lg py-3 rounded-lg px-6 border border-[var(--color-bg-white)] transform transition-colors duration-500"
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Login
