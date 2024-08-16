import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const register = async (req, res) => {
    const { name, email, password, securityQuestion, answer } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            securityQuestion,
            answer
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 720000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loadUser = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.user.id)
            .select('-password')
            .select('-answer')
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(500).send('Server error');
            });
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const payload = {
            user: {
                id: user.id,
                securityQuestion: user.securityQuestion
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, securityQuestion: user.securityQuestion });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token, answer, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.user.id);
        if (user.answer !== answer) {
            return res.status(400).json({ message: 'Incorrect answer' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateProfile = async (req, res) => {
    const { name, email, password, securityQuestions, securityAnswers } = req.body;
  
    // Build user object
    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      userFields.password = await bcrypt.hash(password, salt);
    }
    if (securityQuestions && securityAnswers) {
      userFields.securityQuestions = securityQuestions;
      userFields.securityAnswers = securityAnswers;
    }
  
    try {
      let user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true }
      ).select("-password");
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

export { register, login, loadUser, forgotPassword, resetPassword };
