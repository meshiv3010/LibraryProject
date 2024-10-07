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
}

const LeftSide = ({ userId, selectedCategory, readBooks, userName, book }: LeftSideProps) => {
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
          ) : null}
        </div>
      )}

      {selectedCategory === 'book' && book && (
        <div>
          <Card title={book.title} />
          <h4>הקוראים של "{book.title}":</h4>
          <ul>
            {Array.isArray(book.readers) && book.readers.map((reader) => (
              <li key={reader._id}>{reader.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
