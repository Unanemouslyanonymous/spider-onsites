import { User } from "../models/User.js";

export const addReview = async (req, res) => {
    const { book, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newReview = { book, rating, comment };
        user.reviews.push(newReview);
        await user.save();
        res.status(201).json(user.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReviewsByBook = async (req, res) => {
    const { book } = req.body;

    try {
        const users = await User.find({ "reviews.book.title": book.title });
        console.log(users)
        const reviews = users.reduce((acc, user) => {
            const bookReviews = user.reviews.filter(review => review.book.title === book.title);
            return acc.concat(bookReviews);
        }, []);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editReview = async (req, res) => {
    const { reviewId, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const review = user.reviews.id(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.rating = rating;
        review.comment = comment;
        await user.save();
        res.status(200).json(user.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    const { reviewId } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.reviews = user.reviews.filter(review => review._id.toString() !== reviewId);
        await user.save();
        res.status(200).json(user.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likeReview = async (req, res) => {
    const { reviewId } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findOne({ "reviews._id": reviewId });
        if (!user) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const review = user.reviews.id(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.likes.some(like => like.toString() === userId)) {
            review.likes = review.likes.filter(like => like.toString() !== userId);
        } else {
            review.likes.push(userId);
        }
        
        await user.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const dislikeReview = async (req, res) => {
    const { reviewId } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findOne({ "reviews._id": reviewId });
        if (!user) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const review = user.reviews.id(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.dislikes.some(dislike => dislike.toString() === userId)) {
            review.dislikes = review.dislikes.filter(dislike => dislike.toString() !== userId);
        } else {
            review.dislikes.push(userId);
        }
        
        await user.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
