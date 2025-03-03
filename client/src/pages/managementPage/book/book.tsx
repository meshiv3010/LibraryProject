import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './book.module.css';
import { deleteBook, Book as BookType } from '../../../api';
import { UserLogged } from '../../../types';

type BookProps = {
  books: BookType[]; // Get the list of books from the ManagementPage
  currentUser: UserLogged; //Matching data received from ManagementPage
};

const Book = ({ books, currentUser }: BookProps) => { // Adding currentUser as part of the prop
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const queryClient = useQueryClient();

  console.log(currentUser._id);
  const deleteBookMutation = useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
    },
  });

  const handleBookSelect = (book: BookType) => {
    setSelectedBook(book);
  };

  const handleBookDelete = (bookId: string) => {
    deleteBookMutation.mutate(bookId);
  };

  if (books.length === 0) return <div>No books available</div>;

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        {selectedBook ? (
          <LeftSide
            bookTitle={selectedBook.title}
            bookAuthor={selectedBook.author?.name}
            bookReaders={selectedBook.readers.length > 0 ? selectedBook.readers : []}
            selectedCategory="book"
            selectedBookId={selectedBook._id} // Pass the selected book ID here
            loggedUserId={currentUser._id}
          />
        ) : (
          <h2 style={{ textAlign: 'right', fontSize: '30px' ,fontFamily: 'Arial'}}>בחר ספר </h2>
        )}
      </div>

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