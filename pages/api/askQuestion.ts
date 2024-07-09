// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from '@/app/firebase/firebaseAdmin'
import query from '@/app/utils/queryApi'
import admin from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { prompt, chatId, model, session } = req.body

  if (!prompt) {
    res.status(400).json({ answer: 'Please Provide a prompt' })
    return
  }

  if (!chatId) {
    res.status(400).json({ answer: 'Please provide a valid chat Id' })
    return
  }

  // NeptuneGPT Query

  const response = await query(prompt, chatId, model)

  const message: Message = {
    text: response || 'NeptuneGPT unable to answer that!',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      name: 'NeptuneGPT',
      email: 'NeptuneGPT',
      avatar:
        'https://drive.google.com/uc?export=download&id=1ikaBBU-OsBSHkleHQmf15ww0vgX-A0Kz',
    },
  }

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  res.status(200).json({ answer: message.text })
}
