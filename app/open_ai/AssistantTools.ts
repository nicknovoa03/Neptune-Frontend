import OpenAI from 'openai'
import * as dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apiKey: process.env.CHAT_GPT_KEY })

type addMessageProps = {
  threadId: string
  role: 'user' | 'assistant'
  content: string
}

type runThreadProps = {
  threadId: string
  assistant_id: string
  instructions: string
}

export async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: 'Math Tutor',
    instructions:
      'You are a personal math tutor. Write and run code to answer math questions.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4o',
  })
  return assistant
}

export async function createThread() {
  const thread = await openai.beta.threads.create()
  return thread
}

export async function addMessageToThread({
  threadId,
  role,
  content,
}: addMessageProps) {
  const message = await openai.beta.threads.messages.create(threadId, {
    role: role,
    content: content,
  })
}

export async function runThread({
  threadId,
  assistant_id,
  instructions,
}: runThreadProps) {
  let run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistant_id,
    instructions: instructions,
  })

  if (run.status === 'completed') {
    return await openai.beta.threads.messages.list(run.thread_id)
  } else {
    console.log(run.status)
  }
}
