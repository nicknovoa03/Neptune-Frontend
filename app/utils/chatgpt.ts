import { OpenAI } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY,
})

export default openai
