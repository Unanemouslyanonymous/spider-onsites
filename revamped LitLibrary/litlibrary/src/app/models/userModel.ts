export default interface User {
    name: string;
    email: string;
    password: string;
    securityQuestion: string;
    answer: string;
    isAdmin: boolean;
    favorites: string[];
    purchasedBooks: string[];
    collection: string[];
  }
  