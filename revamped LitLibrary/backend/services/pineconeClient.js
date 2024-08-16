import pinecone from 'pinecone-client';

const client = new pinecone.Client();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const index = client.Index(process.env.PINECONE_INDEX_NAME);

export default index;
