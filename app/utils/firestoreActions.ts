'use server'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import { Session } from 'next-auth'

type NewChatActionProps = {
  session: Session | null
}

type RemoveChatActionProps = {
  session: Session | null
  id: string | null
}

type NewMessageProps = {
  session: Session | null
  chatId: string
  message: Message
}

export async function NewChatAction({ session }: NewChatActionProps) {
  try {
    if (!session) return
    const doc = await addDoc(
      collection(firestore, `users/${session.user?.email}/chats`),
      {
        userId: session?.user?.name,
        userEmail: session?.user?.email,
        createdAt: serverTimestamp() as Timestamp,
        info: 'New Chat Created',
      },
    )
  } catch (error: any) {
    console.log(error.message)
    return null
  }
}

export async function RemoveChatAction({ session, id }: RemoveChatActionProps) {
  try {
    if (!session) return
    await deleteDoc(
      doc(firestore, `users/${session?.user?.email!}/chats/${id}`),
    )
  } catch (error: any) {
    console.log(error.message)
    return null
  }
}

export async function NewMessageAction({
  session,
  chatId,
  message,
}: NewMessageProps) {
  addDoc(
    collection(
      firestore,
      `users/${session?.user?.email!}/chats/${chatId}/messages`,
    ),
    message,
  )
}
