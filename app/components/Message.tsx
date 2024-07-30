'use client'

import Network from './Network'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { DocumentData } from 'firebase/firestore'

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
      className={`py-5 text-white ${isNeptuneGPT && 'bg-[#434654]'}`}
    >
      <div className="flex items-center space-x-5 px-10 max-w-4xl mx-auto">
        <Image
          width={100}
          height={100}
          src={message.user.avatar}
          alt=""
          className="h-6 w-6 sm:h-10 sm:w-10 rounded-sm"
        />
        <p className="display-linebreak pt-1 text-sm sm:text-base">
          {response}
        </p>
      </div>
      {isNeptuneGPT && (
        <div>
          <Network csvData={response} />
        </div>
      )}
    </motion.div>
  )
}

export default Message
