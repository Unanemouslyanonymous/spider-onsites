export default interface Book {
  _id: string;
  title: string;
  authors: { name: string }[];
  publish_date: string;
  cover?: {
    medium?: string;
    large?: string;
  };
  description: string;
  genre: string;
  page: {type: number, default:150};
}
