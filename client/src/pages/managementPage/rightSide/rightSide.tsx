
import React, { useState } from 'react';
import Card from '../card/card';

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
  writerNumber: number; // ודא ששדה זה קיים כאן
}

interface Book {
  _id: string;
  bookNumber: number;
  title: string;
  author: Author; // Author כולל כעת writerNumber
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
  onEditUser?: (user: UserType) => void; // פונקציה לעריכת משתמש
  onEditBook?: (book: Book) => void; // פונקציה לעריכת ספר
  onEditAuthor?: (author: Author) => void; // פונקציה לעריכת סופר

}

const RightSide = ({ users, books, authors, selectedCategory, onBookSelect, onUserSelect, onAuthorSelect, onEditUser, onEditBook,onEditAuthor }: RightSideProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCardClick = (id: string, type: 'user' | 'book' | 'author', item: any) => {
    setSelectedId(id);
    if (type === 'user' && onUserSelect) onUserSelect(item);
    if (type === 'book' && onBookSelect) onBookSelect(item);
    if (type === 'author' && onAuthorSelect) onAuthorSelect(item);
  };

  const handleDelete = (id: string) => {
    // הוסף לוגיקה למחיקה (קריאה ל-API או עדכון מצב)
  };

  return (
    <div>
      {selectedCategory === 'user' && users && (
        <div>
          {users.map((user) => (
            <Card 
              key={user._id} 
              name={user.name} 
              userNumber={user.userNumber} 
              onClick={() => handleCardClick(user._id, 'user', user)} 
              isSelected={user._id === selectedId}
              onEdit={() => onEditUser && onEditUser(user)} // עריכת משתמש
              onDelete={() => handleDelete(user._id)} // מחיקת משתמש
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
              bookNumber={book.bookNumber} 
              onClick={() => handleCardClick(book._id, 'book', book)} 
              isSelected={book._id === selectedId}
              onEdit={() => onEditBook && onEditBook(book)} // עריכת ספר
              onDelete={() => handleDelete(book._id)} // מחיקת ספר
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
              writerNumber={author.writerNumber} 
              onClick={() => handleCardClick(author._id, 'author', author)} 
              isSelected={author._id === selectedId}
              onEdit={() => onEditAuthor && onEditAuthor(author)} // עריכת סופר
              onDelete={() => handleDelete(author._id)} // מחיקת סופר
            />
          ))}
        </div>
      )}
    </div>
  );
};
 
export default RightSide;