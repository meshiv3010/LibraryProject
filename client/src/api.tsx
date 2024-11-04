import axios from 'axios';

export interface ReaderType {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: string[];
  favBook: string;
}

export interface User {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: Array<{
    _id: string;
    title: string;
    author: {
      _id: string;
      name: string;
    };
    bookNumber: number;
  }>;
  favBook?: { title: string };
}

interface Book {
  _id: string;
  bookNumber: number;
  title: string;
  author: Author;
  readers: ReaderType[];
}

interface Author {
  _id: string;
  name: string;
  writerNumber: number;
}

// יצירת אליאס של UserType המבוסס על User
export type UserType = User;

export const fetchUsers = async (): Promise<UserType[]> => {
  const response = await axios.get('http://localhost:3000/users');
  return response.data;
};

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get('http://localhost:3000/books');
  return response.data;
};

export const fetchAuthors = async (): Promise<Author[]> => {
  const response = await axios.get('http://localhost:3000/authors');
  return response.data;
};


export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`http://localhost:3000/users/${userId}`);
};

export const deleteAuthor = async (authorId: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/authors/${authorId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete author');
  }
};

export const deleteBook = async (bookId: string): Promise<void> => {
  await axios.delete(`http://localhost:3000/books/${bookId}`);
};

export const updateEntity = async (endpoint: string, id: string, payload: object): Promise<void> => {
  await axios.put(`http://localhost:3000/${endpoint}/${id}`, payload);
};
