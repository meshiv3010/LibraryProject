import React, { useState } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  authorName?: string;
  bookId?: string;
  userId?: string;
  authorId?: string;
  bookNumber?: number;
  name?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onEdit?: (newName: string, newTitle: string) => void;
  onDelete?: (id: string) => void;  // נוסיף את ה-ID לפריט למחיקה
}

const Card: React.FC<CardProps> = ({
  title,
  authorName,
  bookId,
  userId,
  authorId,
  bookNumber,
  name,
  isSelected,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedName, setEditedName] = useState(name);

  // פונקציה לקביעת נקודת הקצה וה-ID
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update ${endpoint}`);
      }
  
      const updatedData = await response.json();
      console.log(`Updated ${endpoint}:`, updatedData);
  
      if (bookId) {
        setEditedTitle(updatedData.title);
      } else if (userId || authorId) {
        setEditedName(updatedData.name);
      }
    } catch (error) {
      console.error(`Error updating ${bookId ? 'book' : userId ? 'user' : 'author'}:`, error);
    }
  
    setIsEditing(false);
  };
  
  const handleDelete = async () => {
    try {
      const { endpoint, id } = getEndpointAndId();
      if (!endpoint || !id) return;
  
      const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete ${endpoint}`);
      }
  
      console.log(`Deleted ${endpoint} with ID: ${id}`);
  
      if (onDelete && id) {
        onDelete(id);
      }
    } catch (error) {
      console.error(`Error deleting ${bookId ? 'book' : userId ? 'user' : 'author'}:`, error);
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
          {bookId && (
            <div>
              <h2>{title}</h2>
              <p>Author: {authorName}</p>
              <p>Book Number: {bookNumber}</p>
            </div>
          )}
          {userId && <p>Name: {name}</p>}
          {authorId && <p>Author: {name}</p>}
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className={styles.button} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
