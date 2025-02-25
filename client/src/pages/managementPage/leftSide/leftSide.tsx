import React, { useState, useEffect } from 'react';
import style from './leftSide.module.css';
import Card from '../card/card';
import { fetchUsers, fetchBooks, addBookToUser, removeBookFromUser } from '../../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IoAddSharp } from "react-icons/io5";


interface LeftSideProps {
  userName?: string;
  userBooks?: any[];
  bookTitle?: string;
  bookAuthor?: string;
  selectedBookId?: string;
  favBookId?: string | null | undefined;
  userId?: string;
  loggedUserId?: string;
  bookReaders?: { _id: string; name: string; userNumber: number }[];
  authorName?: string;
  authorBooks?: any[];
  selectedCategory: 'user' | 'book' | 'author';
  setUserBooks?: React.Dispatch<React.SetStateAction<any[]>>;
}

interface AddBookInput {
  userId: string;
  bookId: string;
}

const LeftSide = ({
  userName,
  userBooks,
  bookTitle,
  bookAuthor,
  selectedBookId, 
  favBookId,
  loggedUserId,
  userId,
  bookReaders,
  authorName,
  authorBooks,
  selectedCategory,
  setUserBooks,
}: LeftSideProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unreadBooks, setUnreadBooks] = useState<any[]>([]);
  const queryClient = useQueryClient();  // מיקום נכון של ה-hook בתוך הקומפוננטה

  const { mutate: addBookMutation } = useMutation<void, Error, AddBookInput>({
    mutationFn: ({ userId, bookId }) => addBookToUser(userId, bookId),
    onSuccess: async (data, { userId, bookId }) => {
      // ביטול המטמון לנתוני המשתמשים והספרים
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });

      // שליפת נתוני המשתמשים מחדש
      const users = await fetchUsers();
      const updatedUser = users.find((user) => user._id === userId);

      if (updatedUser && setUserBooks) {
        setUserBooks(updatedUser.readBooks); // עדכון ספרי המשתמש
      }

      alert('הספר נוסף בהצלחה!');
      setIsModalOpen(false); // סגירת המודאל לאחר ההוספה
    },
    onError: (error) => {
      alert('שגיאה בהוספת הספר למשתמש.');
      console.error('Error adding book to user:', error);
    },
  });

  const handleRemoveBookFromUser = async (bookId: string) => {
    if (userId && bookId) {  // לבדוק אם userId ו- bookId קיימים
      try {
        // שליחה ל-API כדי להסיר את הספר מהמשתמש
        await removeBookFromUser(userId, bookId);  // פונקציה שתיצור ב-API
        alert('הספר הוסר בהצלחה!');

        // עדכון רשימת הספרים אחרי המחיקה
        if (userBooks && setUserBooks) {  // לבדוק אם userBooks ו- setUserBooks לא undefined
          const updatedBooks = userBooks.filter((book) => book._id !== bookId);
          setUserBooks(updatedBooks);  // עדכון רשימת הספרים בקומפוננטה
        } else {
          console.error('setUserBooks או userBooks לא מוגדרים');
        }

        // רענון של העמוד - invalidation של השאילתות
        queryClient.invalidateQueries({ queryKey: ['users'] });  // רענון נתונים של המשתמשים
        queryClient.invalidateQueries({ queryKey: ['books'] });  // רענון נתונים של הספרים

      } catch (error) {
        console.error('שגיאה בהסרת הספר:', error);
        alert('שגיאה בהסרת הספר.');
      }
    } else {
      alert('שגיאה: חסר מידע על המשתמש או הספר.');
    }
  };

  const handleAddBookToUser = (bookId: string) => {
    if (userId) {
      addBookMutation({ userId, bookId });
    }
  };

  useEffect(() => {
    if (isModalOpen && userId) {
      const fetchUnreadBooks = async () => {
        try {
          const allBooks = await fetchBooks();
          const users = await fetchUsers();
          const currentUser = users.find((user) => user._id === userId);

          if (currentUser) {
            const readBooksIds = currentUser.readBooks.map((book) => book._id);
            const unread = allBooks.filter((book) => !readBooksIds.includes(book._id));
            setUnreadBooks(unread);
          }
        } catch (error) {
          console.error('Error fetching unread books:', error);
        }
      };

      fetchUnreadBooks();
    }
  }, [isModalOpen, userId]);

  return (
    <div className={style.leftSide}>
      {selectedCategory === 'user' && userId === loggedUserId && (
        <button className={style.addButton} onClick={() => setIsModalOpen(true)}>
        <IoAddSharp className="plus-icon" size={20} />
      </button>
      )}

      {isModalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>בחר ספר להוספה:</h2>
            <div className={style.cardContainer}>
              {unreadBooks.length > 0 ? (
                unreadBooks.map((book) => (
                  <Card
                    key={book._id}
                    title={book.title}
                    authorName={book.author.name}
                    bookNumber={book.bookNumber}
                    bookId={book._id}
                    showActions={true}
                    isLeftSide={true}
                    onAddBook={() => handleAddBookToUser(book._id)}
                  />
                ))
              ) : (
                <div>אין ספרים להוספה</div>
              )}
            </div>
            <button className={style.closeButton} onClick={() => setIsModalOpen(false)}>
              סגור
            </button>
          </div>
        </div>
      )}

      {selectedCategory === 'user' && userName && (
        <div>
          <h2>הספרים שקרא {userName}:</h2>
          <div className={style.cardContainer}>
            {userBooks && userBooks.length > 0 ? (
              userBooks.map((book) => (
                <Card
                  key={book._id}
                  title={book.title}
                  bookNumber={book.bookNumber}
                  authorName={book.author.name}
                  bookId={book._id}
                  userId={userId}
                  loggedUserId={loggedUserId}
                  showActions={false}
                  selectedCategory="user"
                  isLeftSide={true}
                  isFavBook={favBookId === book._id} 
                  onRemoveBookFromUser={handleRemoveBookFromUser} 
                />
              ))
            ) : (
              <div>אין ספרים עבור משתמש זה</div>
            )}
          </div>
        </div>
      )}

      {selectedCategory === 'book' && bookTitle && (
        <div>
          <h2>הקוראים של {bookTitle}:</h2>
          <div className={style.cardContainer}>
            {bookReaders && bookReaders.length > 0 ? (
              bookReaders.map((reader) => (
                <Card
                  key={reader._id}
                  readers={[reader]}
                  showActions={false}
                  userId={userId}
                  isLeftSide={true}
                  loggedUserId={loggedUserId}
                  selectedBookId={selectedBookId}
                />
              ))
            ) : (
              <div>אין קוראים לספר זה</div>
            )}
          </div>
        </div>
      )}

      {selectedCategory === 'author' && authorName && (
        <div>
          <h2>הספרים של {authorName}:</h2>
          <div className={style.cardContainer}>
            {authorBooks && authorBooks.length > 0 ? (
              authorBooks.map((book) => (
                <Card
                  key={book._id}
                  title={book.title}
                  bookNumber={book.bookNumber}
                  bookId={book._id}
                  showActions={false}
                  isLeftSide={true}
                />
              ))
            ) : (
              <div>אין ספרים עבור סופר זה</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
