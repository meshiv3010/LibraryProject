import React from 'react';
import Card from '../card/card';

interface LeftSideProps {
  userId: string;
  selectedCategory: string | null; 
  readBooks: Array<{
    _id: string;
    bookNumber: number;
    title: string;
    author: {
      _id: string;
      name: string;
    };
  }>;
  userName: string; // Keep userName here
}

const LeftSide = ({ userId, selectedCategory, readBooks, userName }: LeftSideProps) => {
  return (
    <div>
      {selectedCategory === 'ניהול משתמשים' && (
        <div>
          <h3>ספרים שקרא {userName}:</h3>
          <ul>
            {readBooks.map(book => (
              <li key={book._id}>
                <Card 
                  title={book.title} 
                  authorName={book.author.name} 
                  bookNumber={book.bookNumber} 
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
