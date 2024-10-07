import React, { useEffect, useState } from 'react';
import RightSide from '../rightSide/rightSide'; // יבוא הקומפוננטה RightSide
import LeftSide from '../leftSide/leftSide'; // יבוא הקומפוננטה LeftSide

interface ReaderType {
  _id: string;
  name: string;
  userNumber: number; // נוסיף ערך ברירת מחדל
  readBooks: string[]; // נוסיף ערך ברירת מחדל
  favBook: string; // נוסיף ערך ברירת מחדל
}

interface BookType {
  _id: string;
  bookNumber: number;
  title: string;
  author: {
    _id: string;
    name: string;
  };
  readers: ReaderType[]; // הוספת readers
}

const Book = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null); // מצב לספר שנבחר

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/books');
        const booksData = await response.json();
        
        // שמירה של המידע של הספרים
        const formattedBooks = booksData.map((book: any) => ({
          _id: book._id,
          bookNumber: book.bookNumber,
          title: book.title,
          author: {
            _id: book.author?._id || 'Unknown Author ID',
            name: book.author?.name || 'Unknown Author',
          },
          readers: book.readers.map((reader: any) => ({
            _id: reader._id,
            name: reader.name,
            userNumber: reader.userNumber || 0, // ערך ברירת מחדל
            readBooks: reader.readBooks || [], // ערך ברירת מחדל
            favBook: reader.favBook || '', // ערך ברירת מחדל
          })) || [], // אם אין קוראים, העברת מערך ריק
        }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // פונקציה שתבחר ספר
  const handleBookSelect = (book: BookType) => {
    setSelectedBook(book);
  };

  return (
    <div>
      {/* קריאה לקומפוננטה RightSide עם העברת רשימת הספרים */}
      <RightSide 
        books={books} // העברת הספרים
        selectedCategory="book"
        onBookSelect={handleBookSelect} // הוספת פונקציית הבחירה
      />

      {/* קריאה לקומפוננטה LeftSide עם העברת הספר שנבחר */}
      <LeftSide 
        book={selectedBook} // העברת הספר הנבחר
        selectedCategory="book"
      />
    </div>
  );
};

export default Book;
