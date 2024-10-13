import React from 'react';
import Card from '../card/card';
import style from './leftSide.module.css';

interface ReaderType {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: string[];
  favBook: string;
}

interface LeftSideProps {
  userId?: string;
  selectedCategory?: string | null;
  readBooks?: Array<{
    _id?: string;
    bookNumber?: number;
    title?: string;
    author?: {
      _id?: string;
      name?: string;
    };
  }>;
  userName?: string;
  book?: {
    _id: string;
    title: string;
    readers: ReaderType[];
  } | null; 
  authorName?: string; 
  authorBooks?: Array<{
    _id?: string;
    title: string;
    bookNumber: number;
  }>; 
  onDeleteBook?: (bookId: string) => void; // פונקציה למחיקת ספר
  onDeleteReader?: (readerId: string) => void; // פונקציה למחיקת קורא
}

const LeftSide = ({ userId, selectedCategory, readBooks, userName, book, authorName, authorBooks, onDeleteBook, onDeleteReader }: LeftSideProps) => {
  return (
    <div className={style.leftSide}>
      {selectedCategory === 'user' && userName && readBooks && (
        <div>
          <h3>ספרים שקרא {userName}:</h3>
          {readBooks.length > 0 ? (
            <div>
              {readBooks.map((book) => (
                <Card 
                  key={`${book._id}-${book.bookNumber}`} 
                  title={book.title} 
                  authorName={book.author?.name || 'Unknown Author'} 
                  bookNumber={book.bookNumber} 
                  onDelete={() => onDeleteBook && book._id && onDeleteBook(book._id)} // מחיקת ספר
                />
              ))}
            </div>
          ) : <p>אין ספרים לקריאה.</p>}
        </div>
      )}

      {selectedCategory === 'book' && book && (
        <div>
          <h4>הקוראים של "{book.title}":</h4>
          {Array.isArray(book.readers) && book.readers.length > 0 ? (
            book.readers.map((reader) => (
              <Card 
                key={reader._id} 
                name={reader.name} 
                userNumber={reader.userNumber} 
                onDelete={() => onDeleteReader && onDeleteReader(reader._id)} // מחיקת קורא
              />
            ))
          ) : <p>אין קוראים לספר זה.</p>}
        </div>
      )}

      {selectedCategory === 'author' && authorName && authorBooks && (
        <div>
          <h3>ספרים של {authorName}:</h3>
          {authorBooks.length > 0 ? (
            <div>
              {authorBooks.map((book) => (
                <Card 
                  key={book._id} 
                  title={book.title} 
                  bookNumber={book.bookNumber} 
                  onDelete={() => onDeleteBook && book._id && onDeleteBook(book._id)} // מחיקת ספר
                />
              ))}
            </div>
          ) : <p>אין ספרים לסופר זה.</p>}
        </div>
      )}
    </div>
  );
};

export default LeftSide;
