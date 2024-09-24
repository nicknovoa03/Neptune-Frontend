'use client'

import { useState } from 'react'
import Network from './Network'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { DocumentData } from 'firebase/firestore'
import CsvTable from './CsvTable'

type Props = {
  message: DocumentData
}

function Message({ message }: Props) {
  const isNeptuneGPT = message.user.name === 'NeptuneGPT'
  const response = message.text as string
  const [showNetwork, setShowNetwork] = useState(false)

  return (
    <div
      className={`flex w-full text-[var(--color-bg-white)]  ${isNeptuneGPT ? 'justify-center' : 'justify-center'} `}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={` ${isNeptuneGPT ? 'bg-[var(--color-bg-terntiary)] w-full max-w-[90%] lg:max-w-[90%]' : 'bg-[var(--color-bg-quaternary)] rounded-2xl mx-5 py-3'}`}
      >
        <div className="space-x-5 px-5 mx-auto">
          {!isNeptuneGPT && (
            <p className="display-linebreak p-1 text-sm sm:text-base">
              {response}
            </p>
          )}
        </div>
        {isNeptuneGPT && (
          <div className="container mx-auto p-4 w-full">
            <CsvTable csvData={response} />
            <div className="mt-4 justify-end">
              <button
                onClick={() => setShowNetwork(!showNetwork)}
                className="bg-[var(--color-bg-quaternary)] text-white p-3 rounded-xl"
              >
                {showNetwork ? 'Hide Network' : 'Show Network'}
              </button>
              {showNetwork && (
                <div className="">
                  <Network csvData={response} />
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Message
