import React from 'react';
import style from './card.module.css';

interface CardProps {
  title?: string; // יכול להיות undefined אם מדובר במשתמש
  authorName?: string; // שם הסופר
  bookNumber?: number; // מספר הספר
  name?: string; // שם המשתמש
  userNumber?: string; // מספר המשתמש
}

const Card = ({ title, authorName, bookNumber, name, userNumber }: CardProps) => {
  return (
    <div className={style.card}>
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
