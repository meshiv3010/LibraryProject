import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteUser, deleteBook, deleteAuthor, updateFavoriteBook } from '../../../api';

interface CardProps {
  title?: string;
  authorName?: string;
  bookId?: string;
  userId?: string;
  authorId?: string;
  bookNumber?: number;
  userNumber?: number;
  writerNumber?: number;
  selectedCategory?: string;
  name?: string;
  isSelected?: boolean;
  loggedUserId?: string;
  readers?: { _id: string; name: string; userNumber: number }[];
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddBook?: () => void;
  showActions?: boolean;
  category?: 'BOOK' | 'USER' | 'AUTHOR';
  isFavBook?: boolean;
  isLeftSide: boolean;
  isModalOpen?: boolean;
}

interface UpdateFavoriteBookInput {
  userId: string;
  bookId: string;
}

const Card: React.FC<CardProps> = ({
  title,
  authorName,
  readers,
  bookId,
  userId,
  authorId,
  bookNumber,
  selectedCategory,
  writerNumber,
  name,
  loggedUserId,
  userNumber,
  isSelected,
  isFavBook,
  onClick,
  onAddBook,
  showActions = false,
  isLeftSide,
  isModalOpen = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedName, setEditedName] = useState(name);
  const [isFavorite, setIsFavorite] = useState(isFavBook); // initialize with isFavBook
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isLoggedInUser = loggedUserId === userId;

  const renderActions =
    !isModalOpen &&
    (showActions || (selectedCategory === 'USER' && isLoggedInUser)) &&
    !isLeftSide;

  const getEndpointAndId = () => {
    if (bookId) {
      return { endpoint: 'books', id: bookId, payload: { title: editedTitle } };
    } else if (userId) {
      return { endpoint: 'users', id: userId, payload: { name: editedName } };
    } else if (authorId) {
      return { endpoint: 'authors', id: authorId, payload: { name: editedName } };
    }
    return { endpoint: '', id: '', payload: {} };
  };

  const handleSave = async () => {
    try {
      const { endpoint, id, payload } = getEndpointAndId();
      if (!endpoint || !id) return;

      const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Failed to update ${endpoint}`);

      const updatedData = await response.json();
      console.log(`Updated ${endpoint}:`, updatedData);

      if (bookId) {
        setEditedTitle(updatedData.title);
      } else if (userId || authorId) {
        setEditedName(updatedData.name);
      }

      queryClient.invalidateQueries({ queryKey: [endpoint] });
    } catch (error) {
      console.error(`Error updating ${bookId ? 'book' : userId ? 'user' : 'author'}:`, error);
    }

    setIsEditing(false);
  };

  const handleDelete = async () => {
    const { endpoint, id } = getEndpointAndId();

    if (endpoint === 'users' && id !== loggedUserId) {
      console.log('You can only delete your own account');
      alert('You can only delete your own account');
      return;
    }

    if (id) {
      try {
        if (endpoint === 'users' && id === loggedUserId) {
          console.log('Deleting the current user...');
          await deleteUser(id);
          navigate('/login');
        } else if (endpoint === 'books') {
          await deleteBook(id);
          console.log('Book deleted successfully');
        } else if (endpoint === 'authors') {
          await deleteAuthor(id);
          console.log('Author deleted successfully');
        }

        queryClient.invalidateQueries({ queryKey: [endpoint] });
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const updateFavBook = useMutation<void, Error, UpdateFavoriteBookInput>({
    mutationFn: ({ userId, bookId }) => updateFavoriteBook(userId, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error updating favorite book:', error);
    },
  });
  

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (userId && bookId && loggedUserId) {
      updateFavBook.mutate({ userId, bookId });
    }
  };

  useEffect(() => {
    // Ensure initial favorite state matches the actual favorite book from DB
    if (isFavBook !== undefined) {
      setIsFavorite(isFavBook);
    }
  }, [isFavBook]);

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      {isEditing ? (
        <div className={styles.editMode}>
          {bookId ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit Title"
            />
          ) : authorId ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Edit Author Name"
            />
          ) : null}
  
          <div className={styles.buttonGroup}>
            <button className={`${styles.button} ${styles.saveButton}`} onClick={handleSave}>
              Save
            </button>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {title && <h3>{`מזהה: ${bookNumber}  שם: ${title}`}</h3>}
          {authorName && <h4>{authorName}</h4>}
          {readers && readers.length > 0 && (
            <ul>
              {readers.map((reader) => (
                <li key={reader._id}>
                  {`מזהה: ${reader.userNumber}  שם: ${reader.name}`}
                </li>
              ))}
            </ul>
          )}
          {!isLeftSide && (
            <>
              {userId && <h2>{`מזהה: ${userNumber}  שם: ${name}`}</h2>}
              {authorId && <h2>{'מזהה: ' + writerNumber + '  :שם ' + name}</h2>}
            </>
          )}
  
          {showActions && onAddBook && (
            <button onClick={onAddBook}>הוסף ספר</button>
          )}
        </div>
      )}

      {/* Displaying the favorite star icon if it's the logged-in user's book */}
      {isLeftSide && loggedUserId === userId && selectedCategory === 'user' && (
        <div onClick={handleFavoriteClick} className={styles.favoriteIcon}>
          {isFavorite ? (
            <FaStar color="gold" />
          ) : (
            <FaRegStar />
          )}
        </div>
      )}
  
      {renderActions && (
        <div className={styles.buttonGroup}>
          <button
            className={styles.button}
            onClick={() => {
              setIsEditing(true);
              console.log('Edit mode enabled');
            }}
          >
            Edit
          </button>
          {((userId && loggedUserId === userId) || bookId || authorId) && (
            <button className={styles.button} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
