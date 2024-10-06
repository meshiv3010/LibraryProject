import React from 'react';
import Card from '../card/card';

interface Book {
  _id: string;
  title: string;
  bookNumber: number;
  author: {
    _id: string;
    name: string;
  };
}

interface User {
  _id: string;
  name: string;
  userNumber: number;
}

interface RightSideProps {
  users?: User[]; // שדה אופציונלי עבור המשתמשים
  books?: Book[]; // שדה אופציונלי עבור הספרים
  selectedCategory: string;
}

const RightSide = ({ users, books, selectedCategory }: RightSideProps) => {
  console.log('RightSide props:', { users, books, selectedCategory });

  return (
    <div>
      {selectedCategory === 'user' && users && (
        <div>
          <h1>רשימת המשתמשים</h1>
          {users.map((user) => (
            <Card 
              key={user._id} 
              name={user.name} 
              userNumber={user.userNumber.toString()} 
            />
          ))}
        </div>
      )}
      {selectedCategory === 'book' && books && (
        <div>
          <h1>רשימת הספרים</h1>
          {books.map((book) => (
            <Card 
              key={book._id} 
              title={book.title} 
              authorName={book.author.name} 
              bookNumber={book.bookNumber} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSide;
