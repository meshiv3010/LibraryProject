import React from 'react';
import Card from '../card/card';

interface ReaderType {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: string[];
  favBook: string;
}

interface UserType {
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
}

interface Author {
  _id: string;
  name: string;
  writerNumber: number; // ודא ששדה זה קיים כאן
}

interface Book {
  _id: string;
  bookNumber: number;
  title: string;
  author: Author; // Author כולל כעת writerNumber
  readers: ReaderType[];
}

interface RightSideProps {
  users?: UserType[];
  books?: Book[];
  authors?: Author[];
  selectedCategory: 'user' | 'book' | 'author';
  onBookSelect?: (book: Book) => void;
  onUserSelect?: (user: UserType) => void;
  onAuthorSelect?: (author: Author) => void;
}

const RightSide = ({ users, books, authors, selectedCategory, onBookSelect, onUserSelect, onAuthorSelect }: RightSideProps) => {
  return (
    <div>
      {selectedCategory === 'user' && users && (
        <div>
          {users.map((user) => (
            <Card 
              key={user._id} 
              name={user.name} 
              userNumber={user.userNumber} 
              onClick={() => {
                console.log('User selected:', user);
                onUserSelect?.(user);
              }} // ודא שהפונקציה עוברת ומופעלת
            />
          ))}
        </div>
      )}

      {selectedCategory === 'book' && books && (
        <div>
          {books.map((book) => (
            <Card 
              key={book._id} 
              title={book.title} 
              authorName={book.author.name} 
              bookNumber={book.bookNumber} 
              onClick={() => {
                console.log('Book selected:', book);
                onBookSelect?.(book);
              }} // ודא שהפונקציה עוברת ומופעלת
            />
          ))}
        </div>
      )}

      {selectedCategory === 'author' && authors && (
        <div>
          {authors.map((author) => (
            <Card 
              key={author._id}
              name={author.name}
              writerNumber={author.writerNumber} 
              onClick={() => {
                console.log('Author selected:', author);
                onAuthorSelect?.(author); 
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default RightSide;
