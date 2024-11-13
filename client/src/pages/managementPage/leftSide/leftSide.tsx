import React from 'react';
import style from './leftSide.module.css';
import Card from '../card/card'; // נייבא את קומפוננטת ה-Card

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
          <div className={style.cardContainer}>
            {userBooks?.map((book) => (
              <Card
                key={book._id}
                title={book.title}
                authorName={book.author.name}
                bookId={book._id}
                bookNumber={book.bookNumber}
                showActions={false}
              />
            ))}
          </div>
        </div>
      )}

      {selectedCategory === 'book' && bookTitle && (
        <div>
          <h2>שם ספר: {bookTitle}</h2>
          <h3>סופר: {bookAuthor}</h3>
          <div className={style.cardContainer}>
            <Card
              title={bookTitle}
              authorName={bookAuthor}
              showActions={false}
            />
          </div>
        </div>
      )}

      {selectedCategory === 'author' && authorName && (
        <div>
          <h2>שם סופר: {authorName}</h2>
          <div className={style.cardContainer}>
            {authorBooks?.map((book) => (
              <Card
                key={book._id}
                title={book.title}
                authorName={book.author.name}
                bookId={book._id}
                showActions={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
