import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/card';
import { useQueryClient } from '@tanstack/react-query';
import {UserLogged} from '../../../types'


interface ReaderType {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: string[];
  favBook: string;
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
  users?: UserLogged[];
  books?: Book[];
  authors?: Author[];
  loggedUserId?: string;
  selectedCategory: 'user' | 'book' | 'author';
  onBookSelect?: (book: Book) => void;
  onUserSelect?: (user: UserLogged) => void;
  onAuthorSelect?: (author: Author) => void;
  onEditUser?: (user: UserLogged) => void;
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
  loggedUserId,
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
  const [users, setUsers] = useState<UserLogged[] | undefined>(initialUsers);
  const navigate = useNavigate(); // Navigate to LogIn page
  const queryClient = useQueryClient(); 

  useEffect(() => {
    setUsers(initialUsers); //Updates when initialUsers changes
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
        navigate('/login', { replace: true }); // Navigation update
      } else {
        setUsers((prevUsers) => prevUsers?.filter(user => user._id !== userId));
      }
    }
  };

  const handleDeleteBook = (bookId: string) => {
  if (onDeleteBook) {
    onDeleteBook(bookId);
    queryClient.invalidateQueries({ queryKey: ['books'] });
    queryClient.invalidateQueries({ queryKey: ['users'] });
    queryClient.refetchQueries({ queryKey: ['books'] }); // Refresh the query again
  }
};

return (
  <div className="RightSide">
    {selectedCategory === 'user' && users && (
      <div className="CardContainer">
        {users.map((user) => (
          <Card 
            key={user._id} 
            name={user.name} 
            userId={user._id}
            userNumber={user.userNumber}
            showActions={true}
            isSelected={user._id === selectedId}
            onClick={() => handleCardClick(user._id, 'user', user)} 
            onEdit={() => onEditUser && onEditUser(user)} 
            onDelete={user._id === loggedUserId ? () => handleDeleteUser(user._id) : undefined} 
            isLeftSide={false}
            loggedUserId={loggedUserId}
          />
        ))}
      </div>
    )}

    {selectedCategory === 'book' && books && (
      <div className="CardContainer">
        {books.map((book) => (
          <Card 
            key={book._id} 
            title={book.title} 
            authorName={book.author.name} 
            bookId={book._id} 
            bookNumber={book.bookNumber}
            showActions={true}
            isSelected={book._id === selectedId}
            onClick={() => handleCardClick(book._id, 'book', book)} 
            onEdit={() => onEditBook && onEditBook(book)}
            onDelete={() => handleDeleteBook(book._id)}
            isLeftSide={false}
            loggedUserId={loggedUserId}
          />
        ))}
      </div>
    )}

    {selectedCategory === 'author' && authors && (
      <div className="CardContainer">
        {authors.map((author) => (
          <Card 
            key={author._id} 
            name={author.name} 
            authorId={author._id}
            writerNumber={author.writerNumber}
            showActions={true}
            isSelected={author._id === selectedId}
            onClick={() => handleCardClick(author._id, 'author', author)} 
            onEdit={() => onEditAuthor && onEditAuthor(author)}
            onDelete={() => onDeleteAuthor && onDeleteAuthor(author._id)}
            loggedUserId={loggedUserId}
            isLeftSide={false}
          />
        ))}
      </div>
    )}
  </div>
);
};
export default RightSide;