'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { useTextBuffer } from "nextjs-openai";


import { css } from '../styled-system/css';
import { Container, VStack } from '../styled-system/jsx'



export default function Home() {
  const [data, setInput] = useState({ input: "" });
  const [codeSnippet, setCodeSnippet] = useState("")

  const [result, setResult] = useState<string>('');

  const { buffer, done, error, refresh, cancel } = useTextBuffer({
    url: "/api/streamCompletion",
    throttle: 100,
    options: {
      method: "POST",
    },
    data,
  });


  const text = buffer.join("")
  const empty = buffer.length === 0 || text.trim() === ""
  const loading = buffer.length > 0 && !done && !error

  useEffect(() => {
    if (buffer.length > 0) {
      // whenever a new chunk arrives in buffer, append it to the result
      setResult(result => result + buffer[buffer.length - 1]);
    }
  }, [buffer]);


  const handleSubmit = () => {
    setInput({ input: codeSnippet })
    refresh()
  };

  const renderers = {
    code: ({ node, inline, className = "blog-code", children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={a11yDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
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
          value={codeSnippet}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCodeSnippet(e.target.value)}
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
        // disabled={loading}
        >
          {'Submit'}
        </button>
        <button className={css({
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          borderRadius: 'md',
          backgroundColor: 'blue.500',
          color: 'white',
          cursor: 'pointer'
        })} onClick={cancel}>Cancel</button>

        <ReactMarkdown components={renderers}>
          {empty ? '' : result}
        </ReactMarkdown>


      </VStack>
    </Container>
  )
}