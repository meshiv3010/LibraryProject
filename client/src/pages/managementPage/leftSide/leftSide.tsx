import React from 'react';
import Card from '../card/card';

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
    _id?: string; // הוספת מזהה של הספר
    title: string;
    bookNumber: number;
  }>; 
}

const LeftSide = ({ userId, selectedCategory, readBooks, userName, book, authorName, authorBooks }: LeftSideProps) => {
  console.log('LeftSide props:', { userId, selectedCategory, readBooks, userName, book, authorName, authorBooks });
  return (
    <div>
      {selectedCategory === 'user' && userName && readBooks && (
        <div>
          <h3>ספרים שקרא {userName}:</h3>
          {readBooks.length > 0 ? (
            <ul>
              {readBooks.map((book) => (
                <li key={`${book._id}-${book.bookNumber}`}>
                  <Card 
                    title={book.title} 
                    authorName={book.author?.name || 'Unknown Author'}
                    bookNumber={book.bookNumber} 
                  />
                </li>
              ))}
            </ul>
          ) : <p>אין ספרים לקריאה.</p>}
        </div>
      )}

      {selectedCategory === 'book' && book && (
        <div>
          <h4>הקוראים של "{book.title}":</h4>
          {Array.isArray(book.readers) && book.readers.length > 0 ? (
            <ul>
              {book.readers.map((reader) => (
                <li key={reader._id}>
                  <Card userNumber={reader.userNumber} name={reader.name} />
                </li>
              ))}
            </ul>
          ) : <p>אין קוראים לספר זה.</p>}
        </div>
      )}

{selectedCategory === 'author' && authorName && authorBooks && (
        <div>
          <h3>ספרים של {authorName}:</h3>
          {authorBooks.length > 0 && (
            <ul>
              {authorBooks.map((authorBook) => (
                <li key={authorBook._id}>
                  <Card 
                    title={authorBook.title} 
                    bookNumber={authorBook.bookNumber} 
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LeftSide;
