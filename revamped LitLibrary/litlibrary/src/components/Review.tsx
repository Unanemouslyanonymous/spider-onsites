
import { useState, useContext } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const Review = ({ review, book, token } : any) => {
    const authContext = useContext(AuthContext);
    if (!authContext) return null;
    const { user } = authContext;
    const [likes, setLikes] = useState(review.likes.length);
    const [dislikes, setDislikes] = useState(review.dislikes.length);
    const [liked, setLiked] = useState(review.likes.includes(user.id));
    const [disliked, setDisliked] = useState(review.dislikes.includes(user.id));

    const handleLike = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books/review/like`, { reviewId: review._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLikes(liked ? likes - 1 : likes + 1);
            setLiked(!liked);
        } catch (error) {
            console.error('Error liking review:', error);
        }
    };

    const handleDislike = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books/review/dislike`, { reviewId: review._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDislikes(disliked ? dislikes - 1 : dislikes + 1);
            setDisliked(!disliked);
        } catch (error) {
            console.error('Error disliking review:', error);
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded mb-2">
            <p className="mb-2">{review.comment}</p>
            <div className="flex items-center">
                <span className="mr-2">{review.rating} / 5</span>
                <button onClick={handleLike} className="mr-2">
                    <ThumbsUp className={liked ? "text-blue-500" : ""} />
                </button>
                <span className="mr-4">{likes}</span>
                <button onClick={handleDislike} className="mr-2">
                    <ThumbsDown className={disliked ? "text-red-500" : ""} />
                </button>
                <span>{dislikes}</span>
            </div>
        </div>
    );
};

export default Review;
