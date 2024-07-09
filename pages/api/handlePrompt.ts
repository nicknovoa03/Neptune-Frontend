import {
  createAssistant,
  createThread,
  addMessageToThread,
  runThread,
} from '../../app/open_ai/AssistantTools'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' })
  }

  try {
    // Step 1: Create an assistant
    const assistant = await createAssistant()
    console.log('Assistant created:', assistant)

    // Step 2: Create a thread
    const thread = await createThread()
    console.log('Thread created:', thread)

    // Step 3: Add a message to the thread
    await addMessageToThread({
      threadId: thread.id,
      role: 'user',
      content: prompt,
    })
    console.log('Message added to thread')

    // Step 4: Run the thread
    await runThread({
      threadId: thread.id,
      assistant_id: assistant.id,
      instructions: 'address me as sudo',
    })
    console.log('Thread run completed')

    // Send a response back to the client
    res.status(200).json({ message: 'Prompt processed successfully' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
