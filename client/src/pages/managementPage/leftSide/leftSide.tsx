import React from 'react';
import style from './leftSide.module.css';
import Card from '../card/card';

interface LeftSideProps {
  userName?: string;
  userBooks?: any[];
  bookTitle?: string;
  bookAuthor?: string;
  bookReaders?: { _id: string; name: string; userNumber: number }[];
  authorName?: string;
  authorBooks?: any[];
  selectedCategory: 'user' | 'book' | 'author';
}

const LeftSide = ({ 
  userName, 
  userBooks, 
  bookTitle, 
  bookAuthor, 
  bookReaders, 
  authorName, 
  authorBooks, 
  selectedCategory 
}: LeftSideProps) => {

  return (
    <div className={style.leftSide}>
      {selectedCategory === 'user' && userName && (
        <div>
          <h2>הספרים שקרא {userName}:</h2>
          <div className={style.cardContainer}>
            {userBooks && userBooks.length > 0 ? (
              userBooks.map((book) => (
                <Card
                  key={book._id}
                  title={book.title}
                  authorName={book.author.name}
                  bookId={book._id}
                  bookNumber={book.bookNumber}
                  showActions={false}
                />
              ))
            ) : (
              <div>אין ספרים עבור משתמש זה</div>
            )}
          </div>
        </div>
      )}
  
      {selectedCategory === 'book' && bookTitle && (
        <div>
          <h2>הקוראים של {bookTitle}:</h2>
          <div className={style.cardContainer}>
            {bookReaders && bookReaders.length > 0 ? (
              bookReaders.map((reader) => (
                <Card
                  key={reader._id} 
                  readers={[reader]}  
                  showActions={false} 
                />
              ))
            ) : (
              <div>אין קוראים לספר זה</div>
            )}
          </div>
        </div>
      )}

      {selectedCategory === 'author' && authorName && (
        <div>
          <h2>הספרים של {authorName}:</h2>
          <div className={style.cardContainer}>
            {authorBooks && authorBooks.length > 0 ? (
              authorBooks.map((book) => (
                <Card
                  key={book._id}
                  title={book.title}
                  authorName={book.author.name}
                  bookId={book._id}
                  showActions={false}
                />
              ))
            ) : (
              <div>אין ספרים לסופר זה</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
