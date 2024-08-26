'use client'

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

  return (
    <div
      className={`flex ${!isNeptuneGPT ? 'justify-end' : 'justify-center'} `}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`text-[var(--color-bg-white)] ${isNeptuneGPT ? 'bg-[var(--color-bg-terntiary)]' : 'bg-[var(--color-bg-quaternary)] rounded-2xl mx-5 py-3'}`}
      >
        <div className=" space-x-5 px-5 mx-auto">
          {!isNeptuneGPT && (
            <p className="display-linebreak p-1 text-sm sm:text-base ">
              {response}
            </p>
          )}
        </div>
        {isNeptuneGPT && (
          <div className="container mx-auto p-4 items-center w-full">
            <CsvTable csvData={response} />
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Message
