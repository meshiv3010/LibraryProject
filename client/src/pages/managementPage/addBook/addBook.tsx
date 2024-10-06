import React, { useState } from 'react';

interface Book {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
  };
  bookNumber: number;
}

interface AddBookProps {
  unreadBooks: Book[];
  onAddBook: (book: Book) => void; // פונקציה שנקראת לאחר שהמשתמש בחר ספר
}

const AddBook: React.FC<AddBookProps> = ({ unreadBooks, onAddBook }) => {
  const [isOpen, setIsOpen] = useState(false); // מנהל את מצב הפופ-אפ
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // מנהל את הבחירה של הספר

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    setSelectedBook(null); // מנקה את הבחירה אם סוגרים את הפופ-אפ בלי לבחור ספר
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleAddBook = () => {
    if (selectedBook) {
      onAddBook(selectedBook); // קורא לפונקציה שמעבירה את הספר שנבחר ל-LeftSide
      handleClosePopup(); // סוגר את הפופ-אפ לאחר הבחירה
    }
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>הוסף ספר</button>
      
      {isOpen && (
        <div className="popup">
          <h3>בחר ספר להוספה</h3>
          <ul>
            {unreadBooks.map(book => (
              <li 
                key={book._id}
                style={{ cursor: 'pointer', backgroundColor: selectedBook?._id === book._id ? 'lightgray' : 'white' }}
                onClick={() => handleSelectBook(book)}
              >
                {book.title} - {book.author.name}
              </li>
            ))}
          </ul>
          <button onClick={handleAddBook} disabled={!selectedBook}>
            הוסף
          </button>
          <button onClick={handleClosePopup}>ביטול</button>
        </div>
      )}
    </div>
  );
};

export default AddBook;
