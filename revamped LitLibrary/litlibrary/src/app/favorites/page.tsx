"use client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import bookModel from "../models/bookModel";
import axios from "axios";
import Book from "@/components/Book";

const Favorites = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user, token } = authContext;
  const [favBooks, setFavBooks] = useState<bookModel[]>([]);

  useEffect(() => {
    const fetchFavBooks = async () => {
      if (!token) {
        console.error("No token available");
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/get-favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavBooks(response.data);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };
    fetchFavBooks();
  }, []);
  return (
    <div className="mt-12 flex flex-wrap justify-center items-start gap-2">
      {favBooks ? (
        favBooks.map((book: any, index: number) => (
          <Book key={index} book={book} />
        ))
      ) : (
        <div className="text-2xl font-semibold flex justify-center">
          No Favorites found
        </div>
      )}
    </div>
  );
};

export default Favorites;
