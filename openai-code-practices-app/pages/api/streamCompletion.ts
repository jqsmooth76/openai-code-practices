import { OpenAI } from "openai-streams";
// import { NextRequest, NextApiResponse } from 'next';

import practices from '../../sourceFiles/practices/0001-React-Component-Development.md'
import { NextRequest } from "next/server";
import Script from "next/script";


export default async function handler(req: NextRequest) {
  const { input } = await req.json()

  if (!input) {
    return new Response(null, { status: 400, statusText: "Did not include `input ` parameter" });
  }

  const stream = await OpenAI(
    "chat",
    {
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are an expert software developer giving best practices advice to developers" },
        { "role": "user", "content": `Use the information in the practices delimited by <> to answer any further questions: <${practices}>` },
        { "role": "user", "content": `How could this component be improved, return the answer in markdown and list the references to the practices used in the answer at the end, include a code example: ${input}` }
      ],
    },
    { apiKey: process.env.OPENAI_API_KEY },
  );
  return new Response(stream);
}


export const config = {
  runtime: "edge"
};