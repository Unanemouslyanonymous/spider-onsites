import mongoose from "mongoose";
import { bookSchema } from "./Book.js";
const review = new mongoose.Schema(
  {
    book: {
      type: bookSchema,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    dislikes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  securityQuestion: {
    type: String,
  },
  answer: {
    type: String,
  },
  googleId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  favorites: [
    {
      type: bookSchema,
      ref: "Book",
    },
  ],
  purchasedBooks: [
    {
      type: bookSchema,
      ref: "Book",
    },
  ],
  collections: [
    {
      type: bookSchema,
      ref: "Book",
    },
  ],
  reviews: [
    {
      book: bookSchema,
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      dislikes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
