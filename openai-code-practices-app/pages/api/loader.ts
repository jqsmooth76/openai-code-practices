import { NextApiRequest, NextApiResponse } from 'next';
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import "@tensorflow/tfjs-backend-cpu";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";

// 2 phases, 
// 1) Ingestion and storage
// 2) Retrieval
// https://python.langchain.com/docs/modules/data_connection/vectorstores/

//HNSWLib:
// HNSWLib is an in-memory vectorstore that can be saved to a file. It uses HNSWLib.

// TensorFlowEmbeddings: 
// This Embeddings integration runs the embeddings entirely in your browser or Node.js environment, using TensorFlow.js. 
// This means that your data isn't sent to any third party, and you don't need to sign up for any API keys. More memory and CPU use tho.

// Integration with prompt chain example: https://github.com/hwchase17/langchainjs/blob/main/examples/src/use_cases/local_retrieval_qa/qa_chain.ts

// Useful resources:
// - https://www.youtube.com/watch?v=EFM-xutgAvY&t=54s (Doc loaders and creating embeddings)
// - https://www.youtube.com/watch?v=CF5buEVrYwo&t=834s (Pinecone example)

// Load documents
const loader = new TextLoader("sourceFiles/practices/docs.txt");
const docs = await loader.load();

// Chunk docs to create embeddings
console.log('...splitting docs')
const splitter = new RecursiveCharacterTextSplitter({
  chunkOverlap: 0,
  chunkSize: 500,
});
const splitDocuments = await splitter.splitDocuments(docs);

// Generate and store embeddings
console.log('...generating and storing embeddings')
const embeddings = new TensorFlowEmbeddings()
const vectorstore = await HNSWLib.fromDocuments(
  splitDocuments,
  embeddings
);

// Run similarity search on the vector store (2)
console.log('...similarity search retrival')
const retrievedDocs = await vectorstore.similaritySearch(
  "What are the best practices for styling?"
);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ data: retrievedDocs })
  } catch (err) {
    console.log('Error creating chat', err)
    res.status(500).json({ error: 'Error creating chat 🤦‍♂️😅, try again later' })
  }
} 