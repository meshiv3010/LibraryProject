import React, { useState } from 'react';
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
  // ניהול מצב עבור הכרטיס שנבחר
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // פונקציה לטיפול בלחיצה על כרטיס
  const handleCardClick = (id: string, type: 'user' | 'book' | 'author', item: any) => {
    setSelectedId(id); // עדכון הכרטיס הנבחר לפי ID
    if (type === 'user' && onUserSelect) onUserSelect(item);
    if (type === 'book' && onBookSelect) onBookSelect(item);
    if (type === 'author' && onAuthorSelect) onAuthorSelect(item);
  };

  return (
    <div>
      {selectedCategory === 'user' && users && (
        <div>
          {users.map((user) => (
            <Card 
              key={user._id} 
              name={user.name} 
              userNumber={user.userNumber} 
              onClick={() => handleCardClick(user._id, 'user', user)} // לחיצה על כרטיס משתמש
              isSelected={user._id === selectedId} // בדיקת האם הכרטיס נבחר
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
              onClick={() => handleCardClick(book._id, 'book', book)} // לחיצה על כרטיס ספר
              isSelected={book._id === selectedId} // בדיקת האם הכרטיס נבחר
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
              onClick={() => handleCardClick(author._id, 'author', author)} // לחיצה על כרטיס סופר
              isSelected={author._id === selectedId} // בדיקת האם הכרטיס נבחר
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSide;