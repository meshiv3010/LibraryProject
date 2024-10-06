import React, { useEffect, useState } from 'react';
import RightSide from '../rightSide/rightSide'; // יבוא הקומפוננטה RightSide

// ממשק עבור פרטי הספר
interface BookType {
  _id: string; // הוספת ה-ID של הספר
  bookNumber: number;
  title: string;
  author: {
    _id: string; // הוספת ה-ID של הסופר
    name: string;
  };
  readers: string[]; // רשימת הקוראים
}

const Book = () => {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/books');
        const booksData = await response.json();
        
        // שמירה של המידע של הספרים
        const formattedBooks = booksData.map((book: any) => ({
          _id: book._id, // הוספת ה-ID של הספר
          bookNumber: book.bookNumber,
          title: book.title,
          author: {
            _id: book.author?._id || 'Unknown Author ID', // הוספת ה-ID של הסופר
            name: book.author?.name || 'Unknown Author',
          },
          readers: book.readers || [], // ודא שיש רשימה ריקה אם אין קוראים
        }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {/* קריאה לקומפוננטה RightSide עם העברת רשימת הספרים */}
      <RightSide 
        books={books.map(book => ({
          _id: book._id, // הוספת ה-ID של הספר
          bookNumber: book.bookNumber,
          title: book.title,
          author: {
            _id: book.author._id, // הוספת ה-ID של הסופר
            name: book.author.name,
          },
        }))} 
        selectedCategory="book" // העברת הקטגוריה
      />
    </div>
  );
};

export default Book;
