'use client'
import { useState, ChangeEvent } from 'react'
import { css } from '../styled-system/css';
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios';


export default function Home() {
  const [input, setInput] = useState<string>('');

  const mutation = useMutation((input) => axios.post('/api/completion', { input }));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(input as any);
  };

  return (
    <div className={css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'gray-200'
    })}>
      <div className={css({ fontSize: "4xl", fontWeight: 'bold' })}>Hello 🐼!</div>
      <textarea
        className={css({
          width: '50%',
          height: '50%',
          padding: '1rem',
          fontSize: '1rem',
          borderRadius: 'md',
          borderColor: 'gray-300'
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
        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'gray.200'
        })}>
          {mutation.data.data.data}
        </div>
      )}
    </div>

  )
}