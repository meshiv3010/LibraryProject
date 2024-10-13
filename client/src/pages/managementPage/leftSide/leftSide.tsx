import React from 'react';
import Card from '../card/card';
import style from './leftSide.module.css'

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
}

const LeftSide = ({ userId, selectedCategory, readBooks, userName, book, authorName, authorBooks }: LeftSideProps) => {
  console.log('LeftSide props:', { userId, selectedCategory, readBooks, userName, book, authorName, authorBooks });
  
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
            <div>
              {book.readers.map((reader) => (
                <Card 
                  key={reader._id}
                  name={reader.name}
                  userNumber={reader.userNumber}
                />
              ))}
            </div>
          ) : <p>אין קוראים לספר זה.</p>}
        </div>
      )}

      {selectedCategory === 'author' && authorName && authorBooks && (
        <div>
          <h3>ספרים של {authorName}:</h3>
          {authorBooks.length > 0 && (
            <div>
              {authorBooks.map((authorBook) => (
                <Card 
                  key={authorBook._id}
                  title={authorBook.title} 
                  bookNumber={authorBook.bookNumber} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeftSide;
