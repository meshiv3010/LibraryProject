import React from 'react';
import style from './leftSide.module.css';
import Card from '../card/card';
import { fetchUsers, fetchBooks, addBookToUser} from '../../../api'
import {useState, useEffect} from 'react';

interface LeftSideProps {
  userName?: string;
  userBooks?: any[];
  bookTitle?: string;
  bookAuthor?: string;
  favBookId?: string | null | undefined;
  userId?: string;
  loggedUserId?: string;
  bookReaders?: { _id: string; name: string; userNumber: number }[];
  authorName?: string;
  authorBooks?: any[];
  selectedCategory: 'user' | 'book' | 'author';
}

const LeftSide = ({
  userName,
  userBooks,
  bookTitle,
  bookAuthor,
  favBookId,
  loggedUserId,
  userId,
  bookReaders,
  authorName,
  authorBooks,
  selectedCategory,
}: LeftSideProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unreadBooks, setUnreadBooks] = useState<any[]>([]);

    useEffect(() => {
      if (isModalOpen && userId) {
        const fetchUnreadBooks = async () => {
          try {
            const allBooks = await fetchBooks();
            const users = await fetchUsers();
            const currentUser = users.find((user) => user._id === userId);

            if (currentUser) {
              const readBooksIds = currentUser.readBooks.map((book) => book._id);
              const unread = allBooks.filter(
                (book) => !readBooksIds.includes(book._id)
              );
              setUnreadBooks(unread);
            }
          } catch (error) {
            console.error('Error fetching unread books:', error);
          }
        };

        fetchUnreadBooks();
      }
    }, [isModalOpen, userId]);

    const handleAddBookToUser = async (bookId: string) => {
      if (userId) {
        try {
          await addBookToUser(userId, bookId);
          setUnreadBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
          alert('הספר נוסף בהצלחה!');
        } catch (error) {
          console.error('Error adding book to user:', error);
          alert('שגיאה בהוספת הספר למשתמש.');
        }
      }
    };


  return (
    <div className={style.leftSide}>
      {userId === loggedUserId && (
        <button
          className={style.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          הוסף ספר
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
                  />
                ))
              ) : (
                <div>אין ספרים להוספה</div>
              )}
            </div>
            <button
              className={style.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
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
                <div key={book._id} className={style.bookCard}>
                  <Card
                    title={book.title}
                    bookNumber={book.bookNumber}
                    authorName={book.author.name}
                    bookId={book._id}
                    userId={userId} // ה-ID של המשתמש הנבחר
                    loggedUserId={loggedUserId} // ה-ID של המשתמש המחובר
                    showActions={false}
                    selectedCategory="user"
                    isLeftSide={true}

                  />
                </div>
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
                  userId={userId} // מזהה המשתמש מועבר לקומפוננטת Card
                  isLeftSide={true}

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
                  authorName={book.author.name}
                  bookNumber={book.bookNumber}
                  bookId={book._id}
                  showActions={false}
                  isFavBook={favBookId === book._id}
                  isLeftSide={true}
                  userId={userId} // מזהה המשתמש מועבר לקומפוננטת Card
                />
              ))
            ) : (
              <div>אין ספרים לסופר זה</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSide;