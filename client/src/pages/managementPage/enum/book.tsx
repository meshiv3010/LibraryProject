import React, { useEffect, useState } from 'react';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';

const Book = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:3000/book');
      const booksData = await response.json();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
        {books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
    </div>
  );
};

export default Book;
