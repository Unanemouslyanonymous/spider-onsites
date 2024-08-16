import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
    
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  console.log("token", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
