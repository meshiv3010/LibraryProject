import React, { useState } from 'react';
import style from './card.module.css';

interface CardProps {
  title?: string;
  authorName?: string;
  bookNumber?: number;
  name?: string;
  userNumber?: number;
  writerNumber?: number;
  isSelected?: boolean;
  onClick?: () => void;
  onEdit?: (newName: string, newTitle: string) => void;
  onDelete?: () => void;
  userId?: string; // הוספת ID של המשתמש
}

const Card = ({ 
  title, 
  authorName, 
  bookNumber, 
  name, 
  userNumber, 
  onClick, 
  writerNumber, 
  isSelected, 
  onEdit, 
  onDelete,
  userId // קבלת ID של המשתמש
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(authorName);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedUserName, setEditedUserName] = useState(name);
  const [editedWriterName, setEditedWriterName] = useState(name);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedName(authorName);
    setEditedTitle(title);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedUserName }), // דאג שהשדה יהיה נכון
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user'); // טיפול בשגיאות
      }
  
      const updatedUser = await response.json();
      console.log('Updated user:', updatedUser);
  
      // אם השמירה הצליחה, תוכל לעדכן את השמות בשמות החדשים
      setEditedName(updatedUser.name);
      setEditedTitle(updatedUser.title); // אם יש צורך בשדה נוסף
      setEditedUserName(updatedUser.name); // אם יש צורך בשדה נוסף
    } catch (error) {
      console.error('Error updating user:', error); // טיפול בשגיאות
    }
  
    setIsEditing(false);
  };
  

  return (
    <div 
      className={`${style.card} ${isSelected ? style.selected : ''}`} 
      onClick={onClick}
    >
      {bookNumber !== undefined && title && (
        <h2>
          מזהה: {bookNumber} 
          שם: {isEditing ? (
            <input 
              type="text" 
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)} 
            />
          ) : (
            title
          )}
          סופר: {isEditing ? (
            <input 
              type="text" 
              value={editedName} 
              onChange={(e) => setEditedName(e.target.value)} 
            />
          ) : (
            authorName
          )}
        </h2>
      )}

      {name && userNumber !== undefined && (
        <h2>
          מזהה: {userNumber} 
          שם משתמש: {isEditing ? (
            <input 
              type="text" 
              value={editedUserName} 
              onChange={(e) => setEditedUserName(e.target.value)} 
            />
          ) : (
            name
          )}
        </h2>
      )}

      {name && writerNumber !== undefined && (
        <h2>
          מזהה: {writerNumber} 
          שם סופר: {isEditing ? (
            <input 
              type="text" 
              value={editedWriterName} 
              onChange={(e) => setEditedWriterName(e.target.value)} 
            />
          ) : (
            name
          )}
        </h2>
      )}

      {/* כפתורי עריכה ומחיקה */}
      {onEdit && (
        <>
          {isEditing ? (
            <>
              <button onClick={handleSave}>שמור</button>
              <button onClick={() => setIsEditing(false)}>ביטול</button>
            </>
          ) : (
            <button onClick={handleEditClick}>עריכה</button>
          )}
        </>
      )}
      {onDelete && <button onClick={onDelete}>מחיקה</button>}
    </div>
  );
};

export default Card;
