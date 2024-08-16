import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooksBySearch = async (query,startIndex) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=20&key=AIzaSyAfE7vyHaHdPMucVydv0GdjmD537rfh6As`);
    const books = response.data.items.map(item => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      publish_date: item.volumeInfo.publishedDate,
      cover: item.volumeInfo.imageLinks,
      description: item.volumeInfo.description,
      genre: item.volumeInfo.categories,
      page: item.volumeInfo.pageCount,
    }));
    console.log("books", books)
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
