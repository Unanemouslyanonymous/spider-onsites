
# LitLibrary
List of Completed Feats

Level 1
- Users should be able to create, read and delete books.
- Each book should have a title, author, genre, cover image and a brief description.
- Provide an option for users to save their favorite books.
- Give an option to buy the book with a section showing which books have been bought.
- Allow users to create, view, and update their profile page.
- Enable users to upload and update their profile picture.
- Allow users to change their password.

Level 2
- Implement secure login and logout functionality.
- Implement password reset/recovery.
- Use API for accessing more data related to the book which is already created by the user. If the cursor hovers over the book, it must show the metadata. 
- Users should be able to give reviews for each book.
- Each review should have a 5-star rating and space for comments.
- Allow users to edit and delete their reviews.
- Enable users to like/dislike reviews and display the count of likes/dislikes.

Level 3
- Implement OAuth login using any social media(e.g., Google, Facebook).

## Project Structure

The project is divided into two main directories: `backend` and `frontend`.

### Backend

The backend is built using Node.js and Express.js. It uses Mongoose to interact with MongoDB.
- `models`: contains Mongoose models for the database.
- `config`: contains Mongoose configuration.
- `controllers`: contains API controllers for the backend.
- `routes`: contains API routes for the backend.
- `services`: contains utility services for fetching the books from Google Books API and the auth Controller for GAuth.
- `server.js`: starts the server.

### Frontend

The frontend is built using Next.js. I preferred and learned NextJS for its mindblowing routing capabilites.
        PS: I Know Nextjs is generally to construct serverless Apps, I used a server here to add a little bit of a spice.

- `components`: contains reusable UI components.
- `context`: contains context providers.
- `app`: contains Next.js pages.
- `lib` - contains an utility function for seamless usage of tailwind classes.

## Features

- User authentication: registration, login, and password reset, You can log in using Google Too.
- User profile management: viewing and updating user information.
- Book management: adding, updating, and deleting books.
- Book search: searching for books by title and author.
- User favorites: adding and removing books from favorites.
- User purchases: adding and removing books from purchases.
- User reviews: adding and editing reviews.
- User ratings: adding and editing ratings.
- User Collections: adding books to personal database.


## Features added during Onsites

- Caching with Redis: Implemented caching using Redis to cache the responses and improve the performance of the application.
- Progressive Web App (PWA): Enabled PWA functionality to provide an enhanced user experience, allowing users to install the application on their devices and access it offline.
- reCAPTCHA Verification: Implemented reCAPTCHA verification to enhance security and prevent automated bots from accessing the application.- Caching with Redis: Implemented caching using Redis to cache the responses and improve the performance of the application.
- Suspense loading for data to provide a better user experience.
- Infinite scroll for seamless browsing through a large number of books.
- Toggle dark mode for customizable visual preferences.
- Utilized Redux for efficient management of theme context.


## Installation
1. Clone the repository using `git clone https://github.com/Unanemouslyanonymous/litlibrary_prefinal.git`.
2. Install necessary dependencies by running `npm install` in both the `backend` and `frontend` directories.
3. I have already included the env variables, so not to worry about them, i will be removing them from the repo after the inductions

## Running the App

1. Run the backend server using `node server.js` in the `backend` directory, by default the backend runs    on the port 5000.
2. Run the frontend server using `npm run dev` in the `frontend` directory, by default the frontend runs on the port 3000.

   
