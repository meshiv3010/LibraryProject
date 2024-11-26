import React, { useState } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { deleteUser, deleteBook, deleteAuthor } from '../../../api';

interface CardProps {
  title?: string;
  authorName?: string;
  bookId?: string;
  userId?: string;
  authorId?: string;
  bookNumber?: number;
  userNumber?: number;
  writerNumber?: number;
  name?: string;
  isSelected?: boolean;
  readers?: { _id: string; name: string; userNumber: number }[];
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  category?: 'BOOK' | 'USER' | 'AUTHOR';
}

const Card: React.FC<CardProps> = ({
  title,
  authorName,
  readers,
  bookId,
  userId,
  authorId,
  bookNumber,
  writerNumber,
  name,
  userNumber,
  isSelected,
  onClick,
  showActions = false,
  category,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedName, setEditedName] = useState(name);
  const loggedUserId = localStorage.getItem('loggedUserId');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
          ) : (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Edit Name"
            />
          )}
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
          {title && <h3>{title}</h3>}
          {authorName && <h4>{authorName}</h4>}
          {readers && readers.length > 0 && (
            <div>              <ul>
                <li key={readers[0]._id}>
                  {readers[0].name}
                </li>
              </ul>
            </div>
          )}
          {userId && (
            <div>
              <h2>{name}</h2>
              <p>מזהה: {userNumber}</p>
            </div>
          )}
          {authorId && (
            <div>
              <h2>{name}</h2>
              <p>מזהה: {writerNumber}</p>
            </div>
          )}
        </div>
      )}

      {showActions && (
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
          {userId && loggedUserId === userId ? (
            <button className={styles.button} onClick={handleDelete}>
              Delete
            </button>
          ) : (
            (bookId || authorId) && (
              <button className={styles.button} onClick={handleDelete}>
                Delete
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
