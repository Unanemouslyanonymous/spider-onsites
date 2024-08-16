import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  publish_date: String,
  cover: {
    thumbnail: String,
  },
  description: String,
  genre: [String],
  page: Number,

});

export const Book = mongoose.model("Book", bookSchema);
