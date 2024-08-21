'use server'
import {
  createThread,
  addMessageToThread,
  runThread,
} from '../open_ai/AssistantTools'

import * as dotenv from 'dotenv'
import { Session } from 'next-auth'

dotenv.config()

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
  const instructions2 = `
    Please respond to this question with a comma separated values table that includes
    'source,' 'target,' and 'association', make sure to include the title row.
    Create a source target network list of people
    who work on ${prompt}, source and target must be people not organizations,
    and type is the assosiation of the two people.
    Print the entire list. Do not limit responses give the entire network of associations.
    Remove the source tags in the response.
    Do not include any Source tags in the response.
  `

  const instructions = ` Please respond to this question with a comma separated values table that includes
    'interviewee','organization','title', and 'team', make sure to include the title row.
    Create a list of organizations that work on ${prompt}, and the people who work there.    
    Print the entire list. Do not limit responses give the entire network of associations.
    Remove the source tags in the response.
    Do not include any Source tags in the response.`

  try {
    // Step 1: Create a thread
    const thread = await createThread()
    console.log('Thread created')
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

    // Create response variable
    let response = ''

    // loop through all the messages in the returned thread
    // Save the last message as the response from the API
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
    if (!prompt && !session) return;

    // Trim input and clear prompt
    const input = prompt.trim();

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
    };

    console.log(userMessage);
    // Save Message to firebase
    await addDoc(
      collection(
        firestore,
        `users/${session?.user?.email!}/chats/${chatId}/messages`,
      ),
      userMessage,
    );
    // Create message for the DB
    const neptuneMessage: Message = {
      text: response || 'NeptuneGPT unable to answer that!',
      createdAt: serverTimestamp(),
      user: {
        name: 'NeptuneGPT',
        email: 'NeptuneGPT',
        avatar: chatGPTLogo.src,
      },
    };
    console.log(neptuneMessage);
    // Add message to DB
    await addDoc(
      collection(
        firestore,
        `users/${session?.user?.email!}/chats/${chatId}/messages`,
      ),
      neptuneMessage,
    );


  } catch (error: any) {
    console.log(error.message);
  }

}
  */
