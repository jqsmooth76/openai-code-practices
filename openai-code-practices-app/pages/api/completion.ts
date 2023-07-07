import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai'

import practices from '../../sourceFiles/practices/0001-React-Component-Development.md'
import guardrails from '../../sourceFiles/guardrails/0001-Restful-API-Development.md'

const configuration = new Configuration({
  organization: process.env.OPENAIA_ORG,
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const response = await openai.listEngines()

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { "role": "system", "content": "You are an expert software developer giving best practices advice to developers" },
        { "role": "user", "content": "Hello, what is a react component?" }
      ]
    })

    res.status(200).json({ data: completion.data })

  } catch (err) {
    console.log('Error creating chat', err)
    res.status(500).json({ error: 'Error creating chat 🤦‍♂️😅, try again later' })
  }
}