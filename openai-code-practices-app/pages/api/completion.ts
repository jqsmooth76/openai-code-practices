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
  const { input } = req.body

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { "role": "system", "content": "You are an expert software developer giving best practices advice to developers" },
        { "role": "user", "content": `Use the information in the practices delimited by <> to answer any further questions: <${practices}>` },
        { "role": "user", "content": `How could this component be improved, return the answer in markdown and list the references to the practices used in the answer at the end: ${input}` }
      ]
    })
    const content = completion.data.choices[0].message?.content
    res.status(200).json({ data: content })

  } catch (err) {
    console.log('Error creating chat', err)
    res.status(500).json({ error: 'Error creating chat 🤦‍♂️😅, try again later' })
  }
} 
