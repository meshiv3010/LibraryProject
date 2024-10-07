import React from 'react';
import style from './card.module.css';

interface CardProps {
  title?: string; 
  authorName?: string; 
  bookNumber?: number; 
  name?: string; 
  userNumber?: string; 
  onClick?: () => void; // הוספת פרופס onClick
}

const Card = ({ title, authorName, bookNumber, name, userNumber, onClick }: CardProps) => {
  return (
    <div className={style.card} onClick={onClick}> {/* הוספת פונקציית onClick לכרטיס */}
      {bookNumber !== undefined && (
        <h2>מזהה: {bookNumber} שם: {title} סופר: {authorName}</h2>
      )}
      {name && (
        <h2>שם משתמש: {name} מספר משתמש: {userNumber}</h2>
      )}
    </div>
  );
};

export default Card;
