import { recommendBooks } from "../services/recommendatipnService..js";

export const getRecommendations = async (req, res) => {
  const userId = req.user.id; // Assuming user authentication is handled
  try {
    const recommendations = await recommendBooks(userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Failed to get recommendations", error });
  }
};
