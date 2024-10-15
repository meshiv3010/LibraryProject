import React from 'react';
import style from './leftSide.module.css';

interface LeftSideProps {
  userName?: string;
  userBooks?: any[];
  bookTitle?: string;
  bookAuthor?: string;
  authorName?: string;
  authorBooks?: any[];
  selectedCategory: 'user' | 'book' | 'author';
}

const LeftSide = ({ userName, userBooks, bookTitle, bookAuthor, authorName, authorBooks, selectedCategory }: LeftSideProps) => {
  return (
    <div className={style.leftSide}>
      {selectedCategory === 'user' && userName && (
        <div>
          <h2>שם משתמש: {userName}</h2>
          <div>
            {userBooks?.map((book) => (
              <h3 key={book._id}>{book.title} - {book.author.name}</h3>
            ))}
          </div>
        </div>
      )}

      {selectedCategory === 'book' && bookTitle && (
        <div>
          <h2>שם ספר: {bookTitle}</h2>
          <h3>סופר: {bookAuthor}</h3>
        </div>
      )}

      {selectedCategory === 'author' && authorName && (
        <div>
          <h2>שם סופר: {authorName}</h2>
          <div>
            {authorBooks?.map((book) => (
              <h3 key={book._id}>{book.title}</h3>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
