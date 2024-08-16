import { useState } from "react";
import { Rating } from "@mui/material";

const AddReviewModal = ({ book, token, addReview, onClose } : any) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const handleSubmit = (e : any) => {
        e.preventDefault();
        addReview(rating, comment);
    };

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-full max-w-md mx-4">
                <h2 className="text-xl font-semibold mb-4">Add Review</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Rating:</label>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue: number | null) => setRating(newValue!)}
                        className="mb-4"
                    />
                    <label className="block mb-2">Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="w-full p-2 border rounded mb-4"
                    />
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Submit</button>
                        <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReviewModal;
