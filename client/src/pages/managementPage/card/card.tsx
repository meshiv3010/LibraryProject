import React from 'react';
import style from './card.module.css';

interface CardProps {
  title?: string; 
  authorName?: string; 
  bookNumber?: number; 
  name?: string; 
  userNumber?: number; 
  customMessage?: string; // אופציה שלישית עם הודעה מותאמת אישית
  writerNumber?: number;

  onClick?: () => void; // הוספת פרופס onClick
}

const Card = ({ title, authorName, bookNumber, name, userNumber, onClick, writerNumber }: CardProps) => {
  console.log('Card props:', { title, authorName, bookNumber, name, userNumber, writerNumber });
  
  return (
    <div className={style.card} onClick={onClick}>
      {/* כרטיס ספר עם סופר */}
      {bookNumber !== undefined && title && authorName && (
        <h2>מזהה: {bookNumber} שם: {title} סופר: {authorName}</h2>
      )}

      {/* כרטיס ספר ללא סופר */}
      {bookNumber !== undefined && title && !authorName && (
        <h2>מזהה: {bookNumber} שם: {title}</h2>
      )}

      {/* כרטיס משתמש */}
      {name && userNumber !== undefined && (
        <h2>מזהה: {userNumber} שם משתמש: {name}</h2>
      )}
      
      {/* כרטיס סופר */}
      {name && writerNumber !== undefined && (
        <h2>מזהה: {writerNumber} שם סופר: {name}</h2>
      )}
    </div>
  );
};

export default Card;
