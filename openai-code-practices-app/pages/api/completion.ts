import { Configuration, OpenAIApi } from 'openai'

import practices from '../../sourceFiles/practices/0001-React-Component-Development.md'
import guardrails from '../../sourceFiles/guardrails/0001-Restful-API-Development.md'

const configuration = new Configuration({
  organization: process.env.OPENAIA_ORG,
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // const response = await openai.listEngines()


  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { "role": "system", "content": "You are an expert software developer giving best practices advice to developers" },
      { "role": "user", "content": "Hello!" }
    ]
  })

  res.status(200).json({ data: completion.data })
}