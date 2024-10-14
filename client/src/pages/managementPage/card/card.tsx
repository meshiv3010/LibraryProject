import React, { useState } from 'react';
import style from './card.module.css';

interface CardProps {
  title?: string;
  authorName?: string;
  bookNumber?: number;
  name?: string;
  userNumber?: number;
  writerNumber?: number;
  isSelected?: boolean; // האם הכרטיס נבחר
  onClick?: () => void; // לחיצה על כרטיס
  onEdit?: (newName: string) => void; // לחיצה על כפתור עריכה
  onDelete?: () => void; // לחיצה על כפתור מחיקה
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
  onDelete 
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(authorName);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedName(authorName); // אתחל את השם לעריכה
  };

  const handleSave = () => {
    if (onEdit && editedName) {
      onEdit(editedName); // שלח את השם החדש
    }
    setIsEditing(false); // סיים עריכה
  };

  return (
    <div 
      className={`${style.card} ${isSelected ? style.selected : ''}`} 
      onClick={onClick}
    >
      {bookNumber !== undefined && title && (
        <h2>
          מזהה: {bookNumber} שם: {title} סופר: {isEditing ? (
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
        <h2>מזהה: {userNumber} שם משתמש: {name}</h2>
      )}

      {name && writerNumber !== undefined && (
        <h2>מזהה: {writerNumber} שם סופר: {name}</h2>
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
