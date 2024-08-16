"use client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import bookModel from "../models/bookModel";
import axios from "axios";
import Book from "@/components/Book";

const Collection = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user, token } = authContext;
  const [books, setBooks] = useState<bookModel[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        console.error("No token available");
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="mt-12 flex flex-wrap justify-center items-start gap-2">
      {books ? (
        books.map((book: any, index: number) => (
          <Book key={index} book={book} />
        ))
      ) : (
        <div className="text-2xl font-semibold flex justify-center">
          No Collection found
        </div>
      )}
    </div>
  );
};

export default Collection;
