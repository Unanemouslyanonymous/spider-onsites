import axios from "axios";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

const searchGoogleBooks = async (query) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: query,
        key: process.env.GOOGLE_BOOKS_API_KEY,
      },
    });
    return response.data.items || [];
  } catch (error) {
    console.error("Failed to search Google Books:", error);
    return [];
  }
};

export default searchGoogleBooks;
