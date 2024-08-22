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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`py-5 text-[var(--color-bg-white)] ${isNeptuneGPT ? 'bg-[var(--color-bg-terntiary)]' : 'bg-[var(--color-bg-quaternary)] rounded-2xl mx-8'}`}
    >
      <div className="flex items-center justify-center space-x-5 px-10 max-w-4xl mx-auto text-center">
        {' '}
        {!isNeptuneGPT && (
          <>
            <Image
              width={100}
              height={100}
              src={message.user.avatar}
              alt=""
              className="h-6 w-6 sm:h-10 sm:w-10 rounded-lg "
            />
            <p className="display-linebreak pt-1 text-sm sm:text-base ">
              {response}
            </p>
          </>
        )}
      </div>
      {isNeptuneGPT && (
        <div className="container mx-auto p-4 items-center w-full">
          <CsvTable csvData={response} />
        </div>
      )}
    </motion.div>
  )
}

export default Message
