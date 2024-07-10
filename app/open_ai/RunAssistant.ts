import {
  createAssistant,
  createThread,
  addMessageToThread,
  runThread,
} from './AssistantTools'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import * as dotenv from 'dotenv'
import { Session } from 'next-auth'
import chatGPTLogo from '@/app/public/ChatGPTLogo.png'
import { Thread } from 'openai/resources/beta/threads/threads.mjs'

dotenv.config()
export const maxDuration = 30

type RunAssistantProps = {
  session: Session | null
  chatId: string
  prompt: string
}
type RunAskQuestionProps = {
  session: Session | null
  chatId: string
  prompt: string
  response: string
}

export async function GenerateResponse({
  session,
  chatId,
  prompt,
}: RunAssistantProps) {

  const instructions = "Please respond to this question with a CSV formatted table that includes 'source,' 'target,' and 'type'. make sure to use new line characters to break up areas of the response. Create a source target network list of people who work on the field given by the user, and only associate names with one another in a row if they are associated with that person either as a mention or as a mentioned association. Print the entire list."
  try {

    // Step 1: Create a thread
    const thread = await createThread()
    console.log("Thread created")
    // Step 2: Add a message to the thread
    await addMessageToThread({
      threadId: thread.id,
      role: 'user',
      content: prompt,
    })
    console.log('Message added to thread')
    // Step 3: Run the thread
    const messages = await runThread({
      threadId: thread.id,
      assistant_id: process.env.ASSISTANT_ID!,
      instructions: instructions,
    })
    console.log('Thread run completed')

    // Create reponse variable
    let response = ''

    // loop through all the messages in the returned thread
    // Save the last message as the reponse from the API
    for (const message of messages!.data.reverse()) {
      if (message.content[0].type == 'text') {
        //console.log(`${message.role} > ${message.content[0].text.value}`)
        response = message.content[0].text.value
      }
    }
    return response
  } catch (error) {
    console.error('Run Assistant Error:', error)
  }
}


// TODO: how to use this as a server action
/*
async function SaveMessages({ session, chatId, prompt, response }: RunAskQuestionProps) {
  try {
    // Check for prompt and session
    if (!prompt && !session) return

    // Trim input and clear prompt
    const input = prompt.trim()

    // Create Message object to save to firebase
    const userMessage: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        name: session?.user?.name!,
        email: session?.user?.email!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    }

    console.log(userMessage)
    // Save Message to firebase
    await addDoc(
      collection(
        firestore,
        `users/${session?.user?.email!}/chats/${chatId}/messages`,
      ),
      userMessage,
    )
    // Create message for the DB
    const neptuneMessage: Message = {
      text: response || 'NeptuneGPT unable to answer that!',
      createdAt: serverTimestamp(),
      user: {
        name: 'NeptuneGPT',
        email: 'NeptuneGPT',
        avatar: chatGPTLogo.src,
      },
    }
    console.log(neptuneMessage)
    // Add message to DB
    await addDoc(
      collection(
        firestore,
        `users/${session?.user?.email!}/chats/${chatId}/messages`,
      ),
      neptuneMessage,
    )


  } catch (error: any) {
    console.log(error.message)
  }

}
  */
