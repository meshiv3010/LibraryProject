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
  onEdit?: (newName: string, newTitle: string) => void; // לחיצה על כפתור עריכה
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
  const [editedTitle, setEditedTitle] = useState(title); // משתנה לעריכת הכותרת
  const [editedUserName, setEditedUserName] = useState(name);
  const [editedWriterName, setEditedWriterName] = useState(name);



  const handleEditClick = () => {
    setIsEditing(true);
    setEditedName(authorName); // אתחל את השם לעריכה
    setEditedTitle(title); // אתחל את הכותרת לעריכה
  };

  const handleSave = () => {
    if (onEdit && editedName && editedTitle) {
      onEdit(editedName, editedTitle); // שלח את השם והכותרת החדשים
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
              value={editedUserName} // נשתמש במשתנה state עבור השם
              onChange={(e) => setEditedUserName(e.target.value)} // מעדכן את השם בעריכה
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
              value={editedWriterName} // עריכת שם הסופר
              onChange={(e) => setEditedWriterName(e.target.value)} // מעדכן את שם הסופר בעריכה
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
