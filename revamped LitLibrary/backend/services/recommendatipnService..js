import pkg from "@pinecone-database/pinecone";
const { PineconeClient } = pkg;
import searchGoogleBooks from "./searchGoogleBooks.js";

const pinecone = new PineconeClient();

await pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

export const recommendBooks = async (userId) => {
  const userEmbedding = await index.query({
    vector: user_embedding, 
    topK: 10,
    includeValues: true,
  });

  const recommendedBooks = [];
  for (const result of userEmbedding.matches) {
    const query = `${result.metadata.title} ${result.metadata.genre}`;
    const googleBooks = await searchGoogleBooks(query);
    recommendedBooks.push(...googleBooks);
  }

  return recommendedBooks;
};
