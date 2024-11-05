import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './book.module.css';
import { fetchBooks, deleteBook, Book as BookType } from '../../../api';

const Book = () => {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const queryClient = useQueryClient();

  const { data: books = [], isLoading, error } = useQuery<BookType[], Error>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const deleteBookMutation = useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      // מבצע רענון של השאילתה
      queryClient.invalidateQueries({ queryKey: ['books'] });
  
      // אם עדיין יש צורך במידול נוסף על מנת למנוע טעינה מחדש של ספרים ממטמון, ניתן להפעיל refetch ידנית:
      queryClient.refetchQueries({ queryKey: ['books'] });
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
      // כאן תוכל להוסיף הודעה למשתמש על השגיאה
    },
  });

  
  const handleBookSelect = (book: BookType) => {
    console.log('Selected book:', book);
    setSelectedBook(book);
  };

  const handleBookDelete = (bookId: string) => {
    deleteBookMutation.mutate(bookId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        {selectedBook && (
          <LeftSide 
            bookTitle={selectedBook.title} 
            bookAuthor={selectedBook.author?.name} 
            selectedCategory="book"
          />
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
