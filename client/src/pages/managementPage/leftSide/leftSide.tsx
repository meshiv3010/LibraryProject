import React from 'react';
import Card from '../card/card';

interface LeftSideProps {
  userId?: string;
  selectedCategory?: string | null; 
  readBooks: Array<{
    _id?: string;
    bookNumber?: number;
    title?: string;
    author?: {
      _id?: string;
      name?: string;
    };
  }>;
  userName: string; 
}

const LeftSide = ({ userId, selectedCategory, readBooks, userName }: LeftSideProps) => {
  return (
    <div>
      {selectedCategory === 'user' && (
        <div>
          <h3>ספרים שקרא {userName}:</h3>
          {readBooks.length > 0 ? (
            <ul>
              {readBooks.map(book => (
                <li key={`${book._id}-${book.bookNumber}`}>
                  <Card 
                    title={book.title} 
                    authorName={book.author?.name || 'Unknown Author'}
                    bookNumber={book.bookNumber} 
                  />
                </li>
              ))}
            </ul>
          ) : null} {/* לא מציגים כלום אם אין ספרים */}
        </div>
      )}
    </div>
  );
};


export default LeftSide;
