import React from 'react';
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
  onEdit?: () => void; // לחיצה על כפתור עריכה
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
  return (
    <div 
      className={`${style.card} ${isSelected ? style.selected : ''}`} 
      onClick={onClick}
    >
      {bookNumber !== undefined && title && authorName && (
        <h2>מזהה: {bookNumber} שם: {title} סופר: {authorName}</h2>
      )}

      {bookNumber !== undefined && title && !authorName && (
        <h2>מזהה: {bookNumber} שם: {title}</h2>
      )}

      {name && userNumber !== undefined && (
        <h2>מזהה: {userNumber} שם משתמש: {name}</h2>
      )}

      {name && writerNumber !== undefined && (
        <h2>מזהה: {writerNumber} שם סופר: {name}</h2>
      )}

      {/* כפתורי עריכה ומחיקה */}
      {onEdit && <button onClick={onEdit}>עריכה</button>}
      {onDelete && <button onClick={onDelete}>מחיקה</button>}
    </div>
  );
};

export default Card;
