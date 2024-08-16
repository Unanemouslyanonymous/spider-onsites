"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import Book from "@/components/Book";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import bookModel from "../models/bookModel";
import { Edit, Trash } from "lucide-react";

const ProfilePage = () => {
  interface Review {
    _id: string;
    book: bookModel;
    rating: number;
    comment: string;
  }
  const router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user, token, logout, isAuthenticated } = authContext;
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isAuthenticated) router.push("/login?origin=profile");
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/get-favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        setReviews(user.reviews);
        console.log(user.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchFavorites();
    fetchReviews();
  }, [token]);

  const handleEditProfile = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-profile`,
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      authContext.loadUser(token!);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteReview = async (reviewId: string, book: bookModel) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/books/review/delete`,
        { reviewId, book },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(reviews.filter((review: Review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button onClick={logout} className="bg-red-500 text-white">
          Logout
        </Button>
      </div>
      <div className="flex flex-col md:flex-row mb-6">
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          {isEditing ? (
            <form onSubmit={handleEditProfile}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <Button type="submit" className="bg-blue-500 text-white">
                Save
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                className="ml-2 bg-gray-500 text-white"
              >
                Cancel
              </Button>
            </form>
          ) : (
            <div>
              <p className="mb-2">
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user?.email}
              </p>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white"
              >
                <Edit className="h-5 w-5 mr-2 inline-block" />
                Edit Profile
              </Button>
            </div>
          )}
        </div>
        <div className="md:w-2/3 md:ml-6">
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Favorite Books</h2>
            <div className="flex flex-wrap">
              {favorites.length > 0 ? (
                favorites.map((book, index) => <Book key={index} book={book} />)
              ) : (
                <p>No favorite books found.</p>
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review: Review, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">
                        {review.book.title}
                      </p>
                      <p>
                        <strong>Rating:</strong> {review.rating}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        handleDeleteReview(review._id, review.book)
                      }
                      className="bg-red-500 text-white"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Comment:</strong> {review.comment}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No reviews found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
