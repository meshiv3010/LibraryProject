import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/card';
import { useQueryClient } from '@tanstack/react-query';


interface ReaderType {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: string[];
  favBook: string;
}

interface UserType {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: Array<{
    _id: string;
    title: string;
    author: {
      _id: string;
      name: string;
    };
    bookNumber: number;
  }>;
}

interface Author {
  _id: string;
  name: string;
  writerNumber: number;
}

interface Book {
  _id: string;
  bookNumber: number;
  title: string;
  author: Author;
  readers: ReaderType[];
}

interface RightSideProps {
  users?: UserType[];
  books?: Book[];
  authors?: Author[];
  selectedCategory: 'user' | 'book' | 'author';
  onBookSelect?: (book: Book) => void;
  onUserSelect?: (user: UserType) => void;
  onAuthorSelect?: (author: Author) => void;
  onEditUser?: (user: UserType) => void;
  onEditBook?: (book: Book) => void;
  onEditAuthor?: (author: Author) => void;
  onDeleteUser?: (userId: string) => void;
  onDeleteBook?: (bookId: string) => void;
  onDeleteAuthor?: (authorId: string) => void;
}

const RightSide = ({
  users: initialUsers,
  books,
  authors,
  selectedCategory,
  onBookSelect,
  onUserSelect,
  onAuthorSelect,
  onEditUser,
  onEditBook,
  onEditAuthor,
  onDeleteUser,
  onDeleteBook,
  onDeleteAuthor,
}: RightSideProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserType[] | undefined>(initialUsers);
  const loggedUserId = localStorage.getItem('loggedUserId'); // מזהה המשתמש המחובר
  const navigate = useNavigate(); // ניתוב מחדש לעמוד LogIn
  const queryClient = useQueryClient(); 

  useEffect(() => {
    setUsers(initialUsers); // מתעדכן כאשר initialUsers משתנה
  }, [initialUsers]);

  const handleCardClick = (id: string, type: 'user' | 'book' | 'author', item: any) => {
    setSelectedId(id);
    if (type === 'user' && onUserSelect) onUserSelect(item);
    if (type === 'book' && onBookSelect) onBookSelect(item);
    if (type === 'author' && onAuthorSelect) onAuthorSelect(item);
  };

  const handleDeleteUser = (userId: string) => {
    if (onDeleteUser) {
      onDeleteUser(userId);
      if (userId === loggedUserId) {
        localStorage.removeItem('loggedUserId'); 
        navigate('/login', { replace: true }); // עדכון הניווט
      } else {
        setUsers((prevUsers) => prevUsers?.filter(user => user._id !== userId));
      }
    }
  };

  const handleDeleteBook = (bookId: string) => {
    if (onDeleteBook) {
      onDeleteBook(bookId);
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.refetchQueries({ queryKey: ['books'] }); // רענון נוסף של השאילתה
    }
  };
  

  return (
    <div>
      {selectedCategory === 'user' && users && (
        <div>
          {users.map((user) => (
            <Card 
              key={user._id} 
              name={user.name} 
              userId={user._id}
              userNumber={user.userNumber}
              isSelected={user._id === selectedId}
              onClick={() => handleCardClick(user._id, 'user', user)} 
              onEdit={() => onEditUser && onEditUser(user)} 
              onDelete={user._id === loggedUserId ? () => handleDeleteUser(user._id) : undefined} 
            />
          ))}
        </div>
      )}
  
      {selectedCategory === 'book' && books && (
        <div>
          {books.map((book) => (
            <Card 
              key={book._id} 
              title={book.title} 
              authorName={book.author.name} 
              bookId={book._id} 
              bookNumber={book.bookNumber}
              isSelected={book._id === selectedId}
              onClick={() => handleCardClick(book._id, 'book', book)} 
              onEdit={() => onEditBook && onEditBook(book)}
              onDelete={() => handleDeleteBook(book._id)}
            />
          ))}
        </div>
      )}
  
      {selectedCategory === 'author' && authors && (
        <div>
          {authors.map((author) => (
            <Card 
              key={author._id} 
              name={author.name} 
              authorId={author._id}
              writerNumber={author.writerNumber}
              isSelected={author._id === selectedId}
              onClick={() => handleCardClick(author._id, 'author', author)} 
              onEdit={() => onEditAuthor && onEditAuthor(author)} 
              onDelete={onDeleteAuthor ? () => onDeleteAuthor(author._id) : undefined} 
            />
          ))}
        </div>
      )}
    </div>
  );  
};

export default RightSide;
