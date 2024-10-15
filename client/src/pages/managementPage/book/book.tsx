import React, { useEffect, useState } from 'react';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './book.module.css';

const Book = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:3000/books');
      const booksData = await response.json();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  const handleBookSelect = (book: any) => {
    console.log('Selected book:', book);
    setSelectedBook(book);
  };

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        {selectedBook && (
          <LeftSide 
            bookTitle={selectedBook?.title} 
            bookAuthor={selectedBook?.author?.name} 
            selectedCategory="book"
          />
        )}
      </div>

      <div className={style.rightSide}>
        <RightSide 
          books={books} 
          selectedCategory="book" 
          onBookSelect={handleBookSelect} 
        />
      </div>
    </div>
  );
};

export default Book;
