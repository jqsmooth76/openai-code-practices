'use client'
import axios from 'axios';
import { useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';


import { css } from '../styled-system/css';
import { Container, VStack } from '../styled-system/jsx'


export default function Home() {
  const [input, setInput] = useState<string>('');

  const mutation = useMutation((input) => axios.post('/api/completion', { input }));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(input as any);
  };

  const renderers = {
    code: ({ node, ...props }: any) => <SyntaxHighlighter style={solarizedlight} language='js' {...props} />
  }

  return (
    <Container>
      <VStack>

        <div className={css({ fontSize: "4xl", fontWeight: 'bold' })}>Hello 🐼!</div>
        <textarea
          className={css({
            width: '50em',
            height: '30em',
            padding: '1rem',
            fontSize: '1rem',
            border: '1px solid',
            borderRadius: 'md',
            borderColor: 'gray.300'
          })}
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          placeholder="Type here..."
        />
        <button
          className={css({
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: 'md',
            backgroundColor: 'blue.500',
            color: 'white',
            cursor: 'pointer'
          })}
          onClick={handleSubmit}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Loading...' : 'Submit'}
        </button>
        {mutation.isError && (
          <div className={css({ color: 'red.500' })}>
            An error occurred: {(mutation.error as Error).message}
          </div>
        )}
        {mutation.isSuccess && (

          <ReactMarkdown components={renderers}>
            {mutation.data.data.data}
          </ReactMarkdown>

        )}
      </VStack>
    </Container>
  )
}