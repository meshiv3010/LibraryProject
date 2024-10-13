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
}

const Card = ({ title, authorName, bookNumber, name, userNumber, onClick, writerNumber, isSelected }: CardProps) => {
  console.log('Card props:', { title, authorName, bookNumber, name, userNumber, writerNumber, isSelected });

  return (
    <div 
      className={`${style.card} ${isSelected ? style.selected : ''}`} // אם הכרטיס נבחר, נוסיף את המחלקה 'selected'
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
    </div>
  );
};

export default Card;
