import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './book.module.css';
import { deleteBook, Book as BookType } from '../../../api';

type BookProps = {
  books: BookType[]; // תקבל את רשימת הספרים מתוך ה-ManagementPage
};

const Book = ({ books }: BookProps) => {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const queryClient = useQueryClient();

  // מחיקת ספר
  const deleteBookMutation = useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
    },
  });

  // בחירת ספר
  const handleBookSelect = (book: BookType) => {
    console.log('Selected book:', book);
    setSelectedBook(book);
  };

  // מחיקת ספר
  const handleBookDelete = (bookId: string) => {
    deleteBookMutation.mutate(bookId);
  };

  if (books.length === 0) return <div>No books available</div>;

  return (
    <div className={style.container}>
      {/* צד שמאל - פרטי ספר */}
      <div className={style.leftSide}>
        {selectedBook ? (
          <LeftSide
            bookTitle={selectedBook.title}
            bookAuthor={selectedBook.author?.name}
            bookReaders={selectedBook.readers.length > 0
              ? selectedBook.readers
              : []}
            selectedCategory="book"
          />
        ) : (
          <div>בחר ספר</div>
        )}
      </div>

      {/* צד ימין - רשימת ספרים */}
      <div className={style.rightSide}>
        <RightSide
          books={books}
          selectedCategory="book"
          onBookSelect={handleBookSelect}
          onDeleteBook={handleBookDelete}
        />
      </div>
    </div>
  );
};

export default Book;
