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
  onAddBook: (book: Book) => void; 
}

const AddBook: React.FC<AddBookProps> = ({ unreadBooks, onAddBook }) => {
  const [isOpen, setIsOpen] = useState(false); // Manages pop-up mode
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); //Manages the book selection

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    setSelectedBook(null); //Clears the selection after closing the pop-up, without selecting a book
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleAddBook = () => {
    if (selectedBook) {
      onAddBook(selectedBook); //Calls a function that moves the selected book to LeftSide
      handleClosePopup(); // Closes the pop-up after selection
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
