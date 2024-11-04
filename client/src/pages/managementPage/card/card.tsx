import React, { useState } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';


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
  writerNumber,
  name,
  userNumber,
  isSelected,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedName, setEditedName] = useState(name);
  const loggedUserId = localStorage.getItem('loggedUserId'); // מזהה המשתמש המחובר
  const navigate = useNavigate();
  const queryClient = useQueryClient();


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

        // עדכון מטמון כדי לגרום ל-React Query לרענן את המידע
        queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (error) {
        console.error(`Error updating ${bookId ? 'book' : userId ? 'user' : 'author'}:`, error);
    }

    setIsEditing(false);
  };

  
  const handleDelete = async () => {
    const { endpoint, id } = getEndpointAndId(); // הפונקציה שמחזירה את הנקודת קצה וה-ID
    if (id) {
      try {
        const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete');
        }
        
        // אם קטגוריית היוזרים, נבצע עדכון כדי להבטיח שהיוזר הנוכחי הוא זה שנמחק
        if (endpoint === 'users' && id === loggedUserId) {
          console.log('Current user deleted successfully. Redirecting to login...');
          // הפניה למסך ההתחברות
          navigate('/login');
        } else {
          // נניח שיש לוגיקה לעדכון הסטייט לאחר מחיקה של ספרים או סופרים
          console.log(`${endpoint} with ID ${id} deleted successfully.`);
          // כאן תוכל להוסיף לוגיקה לעדכון הסטייט
        }
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
          {bookId && (
            <div>
              <h2>{title}</h2>
              <p>שם סופר: {authorName}</p>
              <p>מזהה: {bookNumber}</p>
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
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setIsEditing(true)}>
              Edit
            </button>
            {/* כפתור Delete יוצג רק עבור יוזרים מחוברים */}
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
        </div>
      )}
    </div>
  );
};

export default Card;
