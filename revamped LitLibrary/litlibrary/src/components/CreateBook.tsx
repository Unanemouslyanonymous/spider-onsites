"use client";
import { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/books', { title, author, genre, coverImage, description });
            console.log("Book created:", res.data);
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
            <input type="text" placeholder="Cover Image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            <button type="submit">Create Book</button>
        </form>
    );
};

export default CreateBook;
