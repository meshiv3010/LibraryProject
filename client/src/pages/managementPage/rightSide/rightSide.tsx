import React from 'react';
import Card from '../card/card';

interface ReaderType {
  _id: string;
  name: string;
  userNumber: number;
  readBooks: string[];
  favBook: string;
}

// נשתמש ב-UserType שהגדרת בקומפוננטה User
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
}

interface Book {
  _id: string;
  bookNumber: number;
  title: string;
  author: Author;
  readers: ReaderType[];
}

interface RightSideProps {
  users?: UserType[]; // שדה אופציונלי עבור המשתמשים
  books?: Book[]; // שדה אופציונלי עבור הספרים
  selectedCategory: 'user' | 'book'; // קטגוריה של משתמש או ספר
  onBookSelect?: (book: Book) => void; // הוספת onBookSelect כפרופ אופציונלי
  onUserSelect?: (user: UserType) => void; // השתמש ב-UserType כאן
}

const RightSide = ({ users, books, selectedCategory, onBookSelect, onUserSelect }: RightSideProps) => {
  console.log('RightSide props:', { users, books, selectedCategory });

  return (
    <div>
      {selectedCategory === 'user' && users && (
        <div>
          {users.map((user) => (
            <Card 
              key={user._id} 
              name={user.name} 
              userNumber={user.userNumber.toString()} 
              onClick={() => onUserSelect ? onUserSelect(user) : undefined} // הוספת פעולה על לחיצה
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
              onClick={() => onBookSelect ? onBookSelect(book) : undefined} // הוספת פעולה על לחיצה
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSide;
