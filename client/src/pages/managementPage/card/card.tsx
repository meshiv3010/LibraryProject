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
  onDelete?: () => void;
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
  const handleSave = async () => {
    try {
      let endpoint;
      let id;
      let payload;
  
      if (bookId) {
        endpoint = 'books';
        id = bookId;
        payload = { title: editedTitle };
      } else if (userId) {
        endpoint = 'users';
        id = userId;
        payload = { name: editedName };
      } else if (authorId) {
        endpoint = 'authors'; 
        id = authorId; 
        payload = { name: editedName };
      }
  
      // Debugging output
      console.log(`Updating ${endpoint} with ID: ${id} and payload:`, payload);
  
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
  
      // Update displayed fields
      if (bookId) {
        setEditedTitle(updatedData.title);
      } else if (userId) {
        setEditedName(updatedData.name);
      } else if (authorId) {
        setEditedName(updatedData.name);
      }
    } catch (error) {
      console.error(`Error updating ${bookId ? 'book' : userId ? 'user' : 'author'}:`, error);
    }
  
    setIsEditing(false);
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
          {authorId && <p>Author: {name}</p>} {/* הוספת הצגת השם של הסופר */}
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className={styles.button} onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
